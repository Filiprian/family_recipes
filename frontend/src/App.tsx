import './App.css'
import NavBar from './Components/NavBar'
import Home from "./Pages/Home"
import Add from "./Pages/Add"
import Details from "./Pages/Details"
import {Route, Routes} from "react-router-dom"

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/add"} element={<Add/>}/>
          <Route path={"/add/:id"} element={<Add/>}/>
          <Route path={"/details/:id"} element={<Details/>}/>
      </Routes>
    </>
  )
}

export default App
