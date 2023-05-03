import { auth, db, storage } from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/Ai";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // new
import { nanoid } from 'nanoid'


export default function Create(props){
    const [post, setPost] = useState({imageSrc: undefined, title: "", description: ""})
    const [preview, setPreview] = useState();
    const [user,loading] = useAuthState(auth);


    useEffect(() => {
        if (!post.imageSrc) {
            setPost({...post, imageSrc: undefined})
            return
        }
        const objectUrl = URL.createObjectURL(post.imageSrc)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [post.imageSrc])


    const handleFile = async (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setPost({...post, imageSrc: undefined})
            return
        }

        const storageRef = ref(storage);
        const fileRef = ref(storageRef, `images/${nanoid()}`)
        uploadBytes(fileRef, e.target.files[0]).then(() => {
            console.log("successful upload!")
        })
        setPost({...post, imageSrc: e.target.files[0], imageRef: fileRef})
    }
    

    const submitPost = async (e) => {
        if (post.title.length > 50){
            alert("FAILED, Title is too long")
            return;
        }
        if (post.description.length > 300){
            alert("FAILED, Description is too long")
            return;
        }
        if (!post.imageSrc) {
            alert("FAILED, no image given")
            return;
        }
        e.preventDefault();
        const collectionRef = collection(db, "posts");

        getDownloadURL(ref(storage, post.imageRef)).then((ans) =>{
            addDoc(collectionRef, {
                title: post.title,
                description: post.description,
                imageRef: post.imageRef.fullPath, 
                imageURL: ans,
                timestamp: serverTimestamp(),
                user: user.uid,
                avatar: user.photoURL,
                username: user.displayName,
            });
        })
        
        if (post.imageSrc && (post.description.length <= 300) && (post.title.length <= 50)){
            props.handleCreating() // closes this when done
        }
    }

    return (
        <div className="mainCreate">
            <AiOutlineCloseCircle onClick={() => props.handleCreating()} className="closeIcon"/>
            <form onSubmit={submitPost}>
                <div className="imageBox">
                    {post.imageSrc ? <img className="imagePreview" src={preview}/> : <h2>No Image</h2>}
                    {!post.imageSrc && <input type="file" onChange={handleFile}/>}
                </div>
                <textarea className="title" placeholder="Title" onChange={(e) => setPost({...post, title: e.target.value})} value={post.title} />
                <p className={`lengthIndicator${post.title.length > 50 ? "Red" : ""}`}>{post.title.length}/50</p>
                <textarea className="description" placeholder="Description" onChange={(e) => setPost({...post, description: e.target.value})} value={post.description} />
                <p className={`lengthIndicator${post.description.length > 300 ? "Red" : ""}`}>{post.description.length}/300</p>
                <button className="createButton" type="submit">Create</button>
            </form>
        </div>
    )
}