import { Link, useNavigate } from "react-router-dom";
import { SignInContext } from "../Context/Context";
import { useContext } from "react";
import { FaUser } from "react-icons/fa";


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
            className="bg-[#00d382] rounded-md font-bold text-[#feffeb] text-xl cursor-pointer p-2 whitespace-nowrap max-w-fit items-center text-center flex gap-2">
                <FaUser/>
                {isAdmin === "Admin" ? "Admin" : "Host"}
            </div>
        </nav>
    )
}