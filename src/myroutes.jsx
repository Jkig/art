// can fairly simply swap this in for app, where just a few extra things...
// planning on react render dom
// this will be the top level link file...
import { Routes, Route } from 'react-router-dom';
import App from './App'
import Login from './auth/login';
// import Home from './Pages/Home'; some other junk

function MyRoutes() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/login.html" element={<Login />} />
      </Routes>
    </div>
  )
}

export default MyRoutes
