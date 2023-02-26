export default function User(){
    return(
        <div>
            {
                // if logged in, show log out instead
            }
            <div className="authButtons">
                <a className="authButton" href="/auth/login.html">Join</a>
                <div className="spacer" />
                <a className="authButton" href="/auth/login.html">log In</a>
            </div>
            <ul className="unBulleted">
                <li><a>Profile</a></li>
                <li><a>Saved</a></li>
                <li><a>Folowing</a></li>
            </ul>
        </div>
    )
}