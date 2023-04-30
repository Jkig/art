export default function Post(props) {
    return (
        <div>
            <ul className="horizontal1">
                <li key={props.imageRef}><h2>{props.title}</h2></li>
                <li key={props.user}>
                    <ul className="horizontal">
                        <li key={props.photo}><img className="smallProfilePhoto" src={props.avatar}/></li>
                        <li key={props.uname}><small>{props.username}</small></li>
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