export default function User(){
    return(
        <div>
            {
                // if logged in, show log out instead
            }
            <div className="authButtons">
            </div>
            <a className="authButton" href="/auth/login.html">log In</a>
            <ul className="unBulleted">
                <li><a>Profile</a></li>
                <li><a>Saved</a></li>
                <li><a>Folowing</a></li>
            </ul>
        </div>
    )
}