export default function NavBar(props) {
    return (
        <div>
            <div className="locker">
                <nav className="main-navbar">
                    <div className={`page${props.page === "RecentFeed" ? "Selected" : ""}`} onClick={() => props.handlePage("RecentFeed")}>Recent</div>
                    <div className={`page${props.page === "User" ? "Selected" : ""}`} onClick={() => props.handlePage("User")}>User</div>
                </nav>
            </div>
            <div className="spacer" />
            <div className="spacer" />
        </div>
    )
}