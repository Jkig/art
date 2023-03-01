import { auth, db } from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/Ai";
// TODO: add photos later... add connections between things later

export default function Create(props){
    const [post, setPost] = useState({imageSrc: "", title: "", description: ""})//maybe user id too?, probably fine without
    
    // stuffs here
    const [preview, setPreview] = useState()
    useEffect(() => {
        if (!post.imageSrc) {
            setPost({imageSrc: undefined})
            return
        }
        const objectUrl = URL.createObjectURL(post.imageSrc)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [post.imageSrc])

    const handleFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setPost({imageSrc: undefined})
            return
        }
        setPost({imageSrc: e.target.files[0]})
    }


    return (
        <div className="mainCreate">
            <AiOutlineCloseCircle onClick={() => props.handleCreating()} className="closeIcon"/>
            <form>
                <div className="imageBox">
                    {post.imageSrc ? <img className="imagePreview" src={preview}/> : <h2>No Image</h2>}
                    {!post.imageSrc && <input type="file" onChange={handleFile}/>}
                </div>
                <textarea className="title" placeholder="Title" onChange={(e) => setPost({title: e.target.value})} value={post.title} />
                <textarea className="description" placeholder="Description" onChange={(e) => setPost({description: e.target.value})} value={post.description} />
                <button className="createButton">Create</button>
            </form>
        </div>
    )
}