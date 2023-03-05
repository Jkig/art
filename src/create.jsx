import { auth, db } from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/Ai";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


// I need to upload the photo
// create reference
// create post, including reference
import { getStorage, ref } from "firebase/storage";


export default function Create(props){
    const [post, setPost] = useState({imageSrc: undefined, title: "", description: ""})//maybe user id too?, probably fine without
    const [preview, setPreview] = useState();
    const[user,loading] = useAuthState(auth);


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
        setPost({...post, imageSrc: e.target.files[0]})
    }
    
    
    const submitPost = async (e) => {
        e.preventDefault();
        const collectionRef = collection(db, "posts");
        await addDoc(collectionRef, {
            ...post,
            //imageSrc: imageRef.fullPath, // just connect the image reference here, but trough the firebase bucket
            timestamp: serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username: user.displayName,
        });
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
                <p className={`lengthIndicator${post.title.length > 100 ? "Red" : ""}`}>{post.title.length}/100</p>
                <textarea className="description" placeholder="Description" onChange={(e) => setPost({...post, description: e.target.value})} value={post.description} />
                <p className={`lengthIndicator${post.description.length > 300 ? "Red" : ""}`}>{post.description.length}/300</p>
                <button className="createButton" type="submit">Create</button>
            </form>
        </div>
    )
}