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

// TODO: rm auth from lower levels

function App() {
  const [page, setPage] = useState("RecentFeed")
  const [userToSee, setUserToSee] = useState("")
  const [creating, setCreating] = useState(false)

  const [user, loading] = useAuthState(auth);

  function handlePage(newPage){
    setPage(newPage)
  }

  function handleCreating(){
    setCreating(!creating)
  }
  function SignOutUser(){
    auth.signOut();
  }

  function handleUserToSee(new_uid){
    // have a lot of work to do here, going to have it so i can have more state up top
    //  and see who to filter through for someone else's
    //  this is next!
    setUserToSee(new_uid)
  }

  return (
    <div className="App">
      <NavBar handlePage={handlePage} page={page}/>
      {(page == "RecentFeed") && <RecentFeed user={user}/>}
      {(page == "User") && <User 
        handleCreating={handleCreating}
        SignOutUser={SignOutUser}
        handlePage={handlePage} 
        handleUserToSee={handleUserToSee}
        user={user}
      />}
      {(page == "UserPosts") && <UserPosts user={user} userToSee={userToSee} />}
      {(page == "Following") && <Following handleUserToSee={handleUserToSee} userUID={user.uid} />}
      {creating && <Create handleCreating={handleCreating}/>}
      
    </div>
  )
}

export default App
