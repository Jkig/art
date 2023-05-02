export default function User(props){
    console.log(props)
    console.log(props.user)
    return(
        <div>
            <ul className="unBulleted">
                {!props.user && <a className="authButton" onClick={props.handleAuthenticating}>log In</a>}
                <li>
                    {props.user && <img className="bigProfilePhoto" src={props.user.photoURL} />}
                    {props.user && <p>{props.user.displayName}</p>}
                    {props.user && <button onClick={() => auth.signOut()}>Sign Out</button>}
                </li>
                <div className="spacer5"/>
                {props.user && <li><button onClick={() => props.handlePage("UserPosts")}>Your Posts</button></li>}
                {props.user && <li><button onClick={() => props.handlePage("Following")}>Folowing</button></li>}
                {props.user && <li><button onClick={() => props.handleCreating()}>New Post</button></li>}
            </ul>
        </div>
    )
}