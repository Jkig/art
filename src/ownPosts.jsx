import { db, storage } from "../utils/firebase"
import {
    deleteDoc,
    doc,
  } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export default function OwnPosts(props) {
    const deletePost = async (id, imageRef) => {
        const docRef = doc(db, "posts", id);
        const storageRef = ref(storage,imageRef)

        await deleteDoc(docRef);
        await deleteObject(storageRef);
    };

    return (
        <div>
            <ul className="horizontal1">
                <li key={props.imageRef}><h2>{props.title}</h2></li>
                <li key={props.user}>
                    <ul className="horizontal">
                        <li key={props.photo}><img className="smallProfilePhoto" src={props.avatar}/></li>
                        <li key={props.uname}><small>{props.username}</small></li>
                    </ul>
                </li>
                
            </ul>
            <div className="imageWraper">
                <img className="mainImg" src={props.imageURL}/>
            </div>
            <ul className="horizontal1">
                <li><small>{props.description}</small></li>
                <li><button className="deleteButton" onClick={() => deletePost(props.id, props.imageRef)}>  Delete this post </button></li>
            </ul>
        </div>
    )
}