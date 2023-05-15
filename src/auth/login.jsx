import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase.js";



export default function Login() {
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
                <h2 className="centerMe">SignIn or Sign Up!</h2>
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