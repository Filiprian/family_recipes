import './App.css'
import NavBar from './Components/NavBar'
import Home from "./Pages/Home"
import Add from "./Pages/Add"
import Details from "./Pages/Details"
import {Route, Routes, useNavigate} from "react-router-dom"
import SignIn from './Pages/SignIn'
import { useEffect, useState } from 'react'
import { SignInContext } from './Context/Context'

function App() {

  const [isAdmin, setIsAdmin] = useState(false)

  const navigate = useNavigate()

  // Checking if user is already signed-in
  useEffect(() => {
    const storedAuth = localStorage.getItem("Admin")
    if (storedAuth === "true") {
        setIsAdmin(true)
    }
  }, []);

  console.log(isAdmin)

  // Storing user role
  function onAdmin () {
    localStorage.setItem("Admin", "true")
    setIsAdmin(true)
    navigate("/")
  }
  function onGuest () {
    localStorage.setItem("Admin", "false")
    setIsAdmin(false)
    navigate("/")
  }


  
  return (
    <>
      <SignInContext.Provider value={isAdmin}>
        <NavBar/>
        <Routes>
            <Route path={"/sign-in"} element={<SignIn onAdmin={onAdmin} onGuest={onGuest}/>}/>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/add"} element={<Add/>}/>
            <Route path={"/add/:id"} element={<Add/>}/>
            <Route path={"/details/:id"} element={<Details/>}/>
        </Routes>
      </SignInContext.Provider>
    </>
  )
}

export default App
