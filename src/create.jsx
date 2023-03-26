import { auth, db } from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/Ai";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


// I need to upload the photo
// create reference
// create post, including reference
import { getStorage, ref, uploadBytes } from "firebase/storage"; // new
import { nanoid } from 'nanoid'
import { storage } from '../utils/firebase'


export default function Create(props){
    const [post, setPost] = useState({imageSrc: undefined, title: "", description: ""})//maybe user id too?, probably fine without
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

        ///////// new
        const storageRef = ref(storage);
        const fileRef = ref(storageRef, `images/${nanoid()}`)
        console.log(post.imageSrc)
        uploadBytes(fileRef, e.target.files[0]).then(() => {
            console.log("successful upload!")
        })
        // setPost({...post, imageSrc: fileRef})
        setPost({...post, imageSrc: e.target.files[0], imageRef: fileRef})
        //console.log(post.imageSrc)
    }
    

    const submitPost = async (e) => {
        if (!post.imageSrc) {
            return;
        }
        /*
        const storageRef = ref(storage);
        const fileRef = ref(storageRef, `images/${nanoid()}`)

        console.log("here0")
        console.log(post)
        console.log("here.25")
        console.log(post.imageSrc)
        console.log("here.5")
        
        uploadBytes(fileRef, post.imageSrc).then(() => {
            console.log("successful upload!")
        })

        console.log("here1")
        */
        /*
        try {
            await fileRef.put(post.imageSrc);
            console.log('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        e.preventDefault();
        const collectionRef = collection(db, "posts");
        /*


        // uploading image first:
        const photoID = nanoid()
        const storageRef = ref(storage, `images/${photoID}`);
        
        console.log(storageRef, post.imageSrc)
        uploadBytes(storageRef, post.imageSrc).then(() => {
            console.log("successful upload!")
        })
        */

        // creating image reference:
        console.log("here0")
        console.log(post.imageRef)

        
        const collectionRef = collection(db, "posts");
        console.log(collectionRef)
        // normal stuff:
        await addDoc(collectionRef, {
            title: post.title,
            description: post.description,
            //imageRef: fileRef, // just connect the image reference here, but trough the firebase bucket// why no imageref...
            //imageRef: post.imageRef, // this one is newer
            timestamp: serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username: user.displayName,
        });
        
        console.log("here1")

        props.handleCreating() // closes this when done
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