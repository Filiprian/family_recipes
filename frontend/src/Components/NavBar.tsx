import { Link, useNavigate } from "react-router-dom";
import { SignInContext } from "../Context/Context";
import { useContext } from "react";


export default function NavBar() {

    const navigate = useNavigate()

    const isAdmin = useContext(SignInContext);

    return (
        <nav className="flex justify-between items-center px-6 py-4">
            <div className="flex justify-center m-0 gap-10 text-4xl font-bold">
                <Link 
                to={"/"}>Recepty</Link>
                <Link 
                to={"/add"}>Přidat</Link>
            </div>
            <div 
            onClick={() => navigate("/sign-in")}
            className="flex justify-end items-end text-3xl cursor-pointer">
                {isAdmin ? "Admin" : "Host"}
            </div>
        </nav>
    )
}