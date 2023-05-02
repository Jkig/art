import { db } from "../utils/firebase"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import OwnPosts from "./ownPosts.jsx"

// TODO: swap this out, instead take in uid as a prop, so this can load anyone's posts, where uids can come from 
//      our follower/following relationship
//      swap out user with userToSee, where its an object storing uid, photoURL and displayName, 
//      then only use user for test if user.uid = userToSee.uid, then show delete button

export default function UserPosts(props){
    const [allPosts, setAllPosts] = useState([]);

    const getPosts = async () => {
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, where("user", "==", props.user.uid), orderBy('timestamp', 'desc'))
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
            <img className="bigProfilePhoto" src={props.user.photoURL} />
            <p>{props.user.displayName}'s posts: </p>
            {allPosts.map(post => (<OwnPosts { ...post} />))}
            <div className="spacer"></div>
        </div>
    )
}