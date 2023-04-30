import { db} from "../utils/firebase"
import { collection, onSnapshot, orderBy, query} from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "./post.jsx"



export default function RecentFeed(){
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
    
    return(
        <div>
            {allPosts.map(post => (<Post { ...post}/>))}
            <div className="spacer"></div>
        </div>
    )
}