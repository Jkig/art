import { db } from "../utils/firebase"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import OwnPosts from "./ownPosts.jsx"

import { auth } from "../utils/firebase.js";
import { useAuthState } from 'react-firebase-hooks/auth';


export default function UserPosts(){
    const [allPosts, setAllPosts] = useState([]);
    const [user, loading] = useAuthState(auth);

    const getPosts = async () => {
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, where("user", "==", user.uid), orderBy('timestamp', 'desc'))
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
            <img className="bigProfilePhoto" src={user.photoURL} />
            <p>{user.displayName}'s posts: </p>
            {allPosts.map(post => (<OwnPosts { ...post} />))}
            <div className="spacer"></div>
        </div>
    )
}