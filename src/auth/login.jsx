import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase.js";
//import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
// TODO: Set-Cookie: SameSite=None; Secure, its still working, but ~bad practice



export default function Login() {
    //const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    const googleProvider = new GoogleAuthProvider();

    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="loginPage">
            <div className="loginBox">
                <h2 className="centerMe">Join</h2>
                <div>
                    <button 
                        onClick={GoogleLogin}
                        className="loginButton"
                    >
                        Sign in with Google
                        <div className="oneSpace"></div>
                        <FcGoogle className="googleIcon"/>
                    </button>
                </div>
                <h1>
                    
                    { user && // does this do it?
                        <a href="/" className="goHome">
                            Success! Go home!
                            </a>}
                </h1>
            </div>
        </div>
    )
}