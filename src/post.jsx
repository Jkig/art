export default function Post(props) {
    // take in an object, and send out a box with all the stuff.
    return (
        <div>
            <ul className="horizontal1">
                <li><h2>{props.title}</h2></li>
                <li>
                    <ul className="horizontal">
                    <li><img className="smallProfilePhoto" src={props.avatar}/></li>
                    <li><small>{props.username}</small></li>
                </ul>
                </li>
                
            </ul>
            <img className="mainImg" src={props.imageURL}/>
            <small>{props.description}</small>
        </div>
    )
}