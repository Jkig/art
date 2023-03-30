import { db, storage } from "../utils/firebase"
import { child, get } from "firebase/database"; // ref sometimes here
import { ref, getDownloadURL } from "firebase/storage"
import { collection, onSnapshot, orderBy, query} from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "./post.jsx"
// TODO apperently gotta also pass in unique key props for list items


export default function RecentFeed(){
    const [allPosts, setAllPosts] = useState([]);

    const getPosts = async () => {
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, orderBy('timestamp', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))// set imageRef to newImgRef
        })
        return unsubscribe;
    }

    useEffect(() => {
        getPosts();
      }, []);
    
    return(
        <div>
            {/*<Post { ...allPosts[0] }/>/*allPosts.map(post => (<Post { ...post }/>))*/}
            {allPosts.map(post => (<Post { ...post}/>))}
            <div className="spacer"></div>
        </div>
    )
}