import FollowingCard from "./followingCard"
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../utils/firebase"

export default function Following(props) {
    const [allAcc, setAllAcc] = useState([]);
    let uidsArr = null;
    const testUID = "m3j6Gq7z52XeLLhw34zytOdqion1"
    // now i need to use this uid arr and get the info i need from the users given their ids
    // getUsers will take in full array and return all the uses, hust set state to that

    const getData = async () => {
        if (uidsArr === null) {
            return
        }
        /*
        for (followingID in uidsArr) {
            
        }
        */
    }


    const getAcc = async () => {
        let allFollowing = await getDoc(doc(db,"following", props.userUID));
        uidsArr = await allFollowing.data().uid;
        console.log("uid arr:", uidsArr);
        getData();
    }


    useEffect(() => {
        getAcc();
    }, []);

    return (
        <>
            <h1> The accounts you follow: </h1>
            {/*allPosts.map(acc => (<FollowingCard {...acc}/>))*/}
        </>
    )
};