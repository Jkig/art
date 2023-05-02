import { useState, useEffect } from 'react'
import './index.css'
import NavBar from './navbar'
// import Feed from './feed' // add back when I have the ability to follow other accounts
import RecentFeed from './recentFeed'
import User from './User'
import Create from './create'
import Login from './auth/login'
import UserPosts from './userPosts'
import Following from './following'


import { auth } from "../utils/firebase.js";
import { useAuthState } from 'react-firebase-hooks/auth';

// TODO: add in user info, as this will change things soon
//    pull auth up to this layer and pass info down
//    (ex auth is in user)

function App() {
  const [page, setPage] = useState("RecentFeed")
  const [userToSee, setUserToSee] = useState("") // make sure this can never be a problem, and uid is stored as
  const [creating, setCreating] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)

  const [user, loading] = useAuthState(auth);

  function handlePage(newPage){
    setPage(newPage)
  }

  function handleCreating(){
    setCreating(!creating)
  }
  function handleAuthenticating(){
    setAuthenticating(!authenticating)
  }

  function handleUserToSee(new_uid){
    // have a lot of 
    setUserToSee(new_uid)
  }

  return (
    <div className="App">
      <NavBar handlePage={handlePage} page={page}/>
      {(page == "RecentFeed") && <RecentFeed />}
      {(page == "User") && <User 
        handleCreating={handleCreating} 
        handleAuthenticating={handleAuthenticating} 
        handlePage={handlePage} 
        handleUserToSee={handleUserToSee}
        user={user}
      />}
      {(page == "UserPosts") && <UserPosts user={user} userToSee={userToSee} />}
      {(page == "Following") && <Following handleUserToSee={handleUserToSee} userToSee={userToSee} />}
      {creating && <Create handleCreating={handleCreating}/>}
      {authenticating && <Login handleAuthenticating={handleAuthenticating}/>}
      
    </div>
  )
}

export default App
