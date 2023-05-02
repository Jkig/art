export default function FollowingCard(props) {
    // basics here
    return (
        <>
            <img className="bigProfilePhoto" src={props.user.photoURL} />
            <p>{props.user.displayName}</p>
            <h1> maybe include a bio or something for each user, can allow it to be an empty string </h1>
        </>
    )
};