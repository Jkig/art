import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './navbar'
import Feed from './feed'
import RecentFeed from './recentFeed'
import User from './User'
import Create from './create'
import Login from './auth/login'

function App() {
  const [page, setPage] = useState("RecentFeed") // eventually, probs a big single object for state
  const [creating, setCreating] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)

  function handlePage(newPage){
    setPage(newPage)
  }

  function handleCreating(){
    setCreating(!creating)
  }
  function handleAuthenticating(){
    setAuthenticating(!authenticating)
  }

  return (
    <div className="App">
      <NavBar handlePage={handlePage} page={page}/>
      {(page == "RecentFeed") && <RecentFeed />}
      {(page == "Feed") && <Feed />}
      {(page == "User") && <User handleCreating={handleCreating} handleAuthenticating={handleAuthenticating} />}
      {creating && <Create handleCreating={handleCreating}/>}
      {authenticating && <Login handleAuthenticating={handleAuthenticating}/>}
      
    </div>
  )
}

export default App
