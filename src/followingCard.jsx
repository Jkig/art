export default function FollowingCard(props) {
    // basics here
    return (
        <>
            <img className="bigProfilePhoto" src={props.photoURL} />
            <ul className="horizontal">
                <p>{props.displayName}</p>
            </ul>
        </>
    )
};