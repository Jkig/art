import { db } from "../utils/firebase"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "./post.jsx"

import { doc, setDoc, getDoc } from "firebase/firestore";


export default function RecentFeed(props){
    const [allPosts, setAllPosts] = useState([]);

    const getPosts = async () => {
        // convert this to a call to a GCP cloud function, 
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, orderBy('timestamp', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        console.log(allPosts)
        return unsubscribe;
    }

    useEffect(() => {
        getPosts();
    }, []);
    
    
    async function followAccount(uidToFollow) {
        const location = doc(db,"following", props.user.uid)
        

        try{
            let allFolowing = await getDoc(location)
            const newSet = allFolowing.data()
            newSet.uid.push(uidToFollow)

            setDoc(location, {uid: newSet.uid})
        }catch (e) {
            console.log(e)
        }
    }

    return(
        <div>
            {!props.user && allPosts.map(post => (<Post { ...post} followAccount={followAccount} viewerID={""} />))
                /* Throws a firebase error but not a problem*/
            }
            {props.user && allPosts.map(post => (<Post { ...post} followAccount={followAccount} viewerID={props.user.uid} />))}
            <div className="spacer"></div>
        </div>
    )
}