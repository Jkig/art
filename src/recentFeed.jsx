import { db} from "../utils/firebase"
import { addDoc, serverTimestamp, collection, onSnapshot, orderBy, query} from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "./post.jsx"



export default function RecentFeed(props){
    const [allPosts, setAllPosts] = useState([]);

    const getPosts = async () => {
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, orderBy('timestamp', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })
        return unsubscribe;
    }

    useEffect(() => {
        getPosts();
      }, []);
    

    
    function followAccount(uidToFollow){
    // all i have to do is ad a document that only has the uid of the to follow account
        console.log("haven't done this stuff yet")
        const collectionRef = collection(db, "following");
        /*
        // add a new document with user and timestamp as only fields... this is close
        addDoc(collectionRef, {
            user: user.uid,
            timestamp: serverTimestamp(),
        });
        */


    }

    return(
        <div>
            {allPosts.map(post => (<Post { ...post} followAccount={followAccount} />))}
            <div className="spacer"></div>
        </div>
    )
}