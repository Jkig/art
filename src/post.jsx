import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase"
import { useState, useEffect } from "react";

export default function Post(props) {
    // make a set/array of all who we follow:
    // if the given uid is in the array then
    // use useeffect here??
    const [setFollowing, setSetFollowing] = useState(new Set())

    function handleSetSetFollowing (newSet){
        setSetFollowing(newSet)
    }

    // working on only rendering not self and not following already
    const getFollowers = async () => {
        // const location = doc(db,"following", props.viewerID)
        let allFolowing = await getDoc(doc(db,"following", props.viewerID))
        const arrFollowing = await allFolowing.data().uid
        handleSetSetFollowing(new Set( await arrFollowing))
    }
    useEffect(() => {

        getFollowers();
    }, []);

    function handleFollowing() {
        if (props.viewerID){
            props.followAccount(props.user).then(getFollowers)
        }
        else{
            alert('You must login to follow, you can login in the "User" page')
        }
    }

    return (
        <div>
            <ul className="horizontal1">
                <li key={props.imageRef}><h2>{props.title}</h2></li>
                <li key={props.user}>
                    <ul className="horizontal">
                        <li key={props.photo}><img className="smallProfilePhoto" src={props.avatar}/></li>
                        <li key={props.uname}><small>{props.username}</small></li>
                        {props.viewerID !== props.user && !setFollowing.has(props.user) && <li key="followButton">
                            <button className="followButton" onClick={() => handleFollowing()}> Follow </button>
                        </li>}
                    </ul>
                </li>
                
            </ul>
            <div className="imageWraper">
                <img className="mainImg" src={props.imageURL}/>
            </div>
            <small>{props.description}</small>
        </div>
    )
}