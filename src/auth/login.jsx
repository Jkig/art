import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase.js";
import { useAuthState } from 'react-firebase-hooks/auth';



export default function Login(props) {
    const [user, loading] = useAuthState(auth);

    const googleProvider = new GoogleAuthProvider();

    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error)
        }
        props.handleAuthenticating();
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
            </div>
        </div>
    )
}