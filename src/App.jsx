import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './navbar'
import Feed from './feed'
import RecentFeed from './recentFeed'
import User from './User'

function App() {
  const [page, setPage] = useState("RecentFeed") // eventually, probs a big single object for state

  function handlePage(newPage){
    setPage(newPage)
  }

  // navbar position
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });


  return (
    <div className="App">
      {isDesktop && <NavBar handlePage={handlePage} page={page}/>}
      {(page == "RecentFeed") && <RecentFeed />}
      {(page == "Feed") && <Feed />}
      {(page == "User") && <User />}
      {!isDesktop && <NavBar handlePage={handlePage} page={page}/>}
      
    </div>
  )
}

export default App
