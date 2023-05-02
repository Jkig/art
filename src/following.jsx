import FollowingCard from "./followingCard"
// more imports will be needed


export default function Following(props) {
    /**
     * this is copied from the posts thing, fundementally very simple differences after I set up database stuff
     * 
     * 
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
    */

    return (
        <>
            <h1> The accounts you follow: </h1>
            {/** allPosts.map(post => (<FollowingCard />)) */}
        </>
    )
};