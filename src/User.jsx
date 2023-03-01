import { auth } from "../utils/firebase.js";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function User(props){
    const [user, loading] = useAuthState(auth);
    return(
        <div>
            <ul className="unBulleted">
                {!user && <a className="authButton" href="/auth/login.html">log In</a>}
                <li>
                    {user && <img className="bigProfilePhoto" src={user.photoURL} />}
                    {user && <p>{user.displayName}</p>}
                    {user && <button onClick={() => auth.signOut()}>Sign Out</button>}
                </li>
                <div className="spacer"/>
                <li><a>Profile</a></li>
                <li><a>Saved</a></li>
                <li><a>Folowing</a></li>
                <li><button onClick={() => props.handleCreating()}>New Post</button></li>
            </ul>
        </div>
    )
}