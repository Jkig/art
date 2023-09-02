import FollowingCard from "./followingCard"
import { collection, onSnapshot, orderBy, query, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../utils/firebase"

export default function Following(props) {
    /*
    const [allAcc, setAllAcc] = useState([]);
    let uidsArr = null;
    const testUID = "m3j6Gq7z52XeLLhw34zytOdqion1"
    // now i need to use this uid arr and get the info i need from the users given their ids
    // getUsers will take in full array and return all the uses, hust set state to that

    // I wanted to keep it simple, what I'll have to do is call a GCP function
    const getData = async () => {
        if (uidsArr === null) {
            return
        }

        const collectionRef = collection(db, "users");
        const q = query(collectionRef, orderBy('name'))
        console.log("q:", q)
        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (true) {
                setAllAcc(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
            }
        })
        console.log("allacc:", allAcc)
        
        for (let followingID in uidsArr) {
            console.log(uidsArr[followingID])
            // get their info
            setAllAcc(allAcc.concat([{}]))
        }
        
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
            {//allPosts.map(acc => (<FollowingCard {...acc}/>))
            }
        </>
    )
    */
    const runCloud = async () => {
    try {
      const response = await fetch(
        'https://us-central1-art-share-fb752.cloudfunctions.net/getRecent',
        {
          method: 'POST', // or 'GET' depending on your function
          headers: {
            'Content-Type': 'application/json',
          },
          // Add any payload or data if required
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log('Function response:', result);
      } else {
        console.error('Function call failed.');
      }
    } catch (error) {
      console.error('Error calling function:', error);
    }
  };

    return (
        <>
            <button onClick={runCloud}> Test Button </button>
        </>
    )
};