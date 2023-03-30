import { auth } from "../utils/firebase.js";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function User(props){
    const [user, loading] = useAuthState(auth);
    return(
        <div>
            <ul className="unBulleted">
                {!user && <a className="authButton" onClick={props.handleAuthenticating}>log In</a>}{/*href="/auth/login.html">log In</a>
                */}
                <li>
                    {user && <img className="bigProfilePhoto" src={user.photoURL} />}
                    {user && <p>{user.displayName}</p>}
                    {user && <button onClick={() => auth.signOut()}>Sign Out</button>}
                </li>
                <div className="spacer5"/>
                <li><button onClick={() => props.handleCreating()}>New Post</button></li>
            </ul>
        </div>
    )
}