import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './navbar'
import Feed from './feed'
import RecentFeed from './recentFeed'
import User from './User'
import Create from './create'

function App() {
  const [page, setPage] = useState("RecentFeed") // eventually, probs a big single object for state
  const [creating, setCreating] = useState(false)

  function handlePage(newPage){
    setPage(newPage)
  }

  function handleCreating(){
    setCreating(!creating)
  }

  return (
    <div className="App">
      <NavBar handlePage={handlePage} page={page}/>
      {(page == "RecentFeed") && <RecentFeed />}
      {(page == "Feed") && <Feed />}
      {(page == "User") && <User handleCreating={handleCreating} />}
      {creating && <Create handleCreating={handleCreating} />}
      
    </div>
  )
}

export default App
