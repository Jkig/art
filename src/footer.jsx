export default function FooterNavBar(props) {
    // TODO: I gotta make fix this, its running the handle page automatically everytime, i think i need annother component that makes it work, annoying
    return (
        <div>
            <footer>
                <nav className="main-navbar">
                    <div className={`page${props.page === "RecentFeed" ? "Selected" : ""}`} onClick={() => props.handlePage("RecentFeed")}>Recent</div>
                    <div className={`page${props.page === "Feed" ? "Selected" : ""}`} onClick={() => props.handlePage("Feed")}>Main</div>
                    <div className={`page${props.page === "User" ? "Selected" : ""}`} onClick={() => props.handlePage("User")}>User</div>
                </nav>
            </footer>
        </div>
    )
}