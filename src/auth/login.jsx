import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase.js";
//import { useNavigate } from 'react-router-dom';


export default function Login() {

    //const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();

    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
        } catch (error) {}
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
                    <a href="/" className="goHome">"{"{is loged in && "}" Success! go home! {"}"}</a>
                </h1>
            </div>
        </div>
    )
}