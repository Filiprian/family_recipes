import { Link, useNavigate } from "react-router-dom";
import { SignInContext } from "../Context/Context";
import { useContext } from "react";
import { FaBook, FaPlus } from "react-icons/fa6";


export default function NavBar() {

    const navigate = useNavigate()

    const isAdmin = useContext(SignInContext);

    return (
        <nav className="flex justify-between items-center px-6 py-4">
            <div className="flex justify-center m-0 gap-10 text-4xl font-bold">
                <Link
                    className={location.pathname === "/" ? "gap-3 flex items-center font-bold underline text-[#59c170]" : "gap-3 items-center flex text-[#98C9A3]"}
                    to={"/"}>
                    <FaBook className={location.pathname === "/" ? "font-bold text-3xl text-[#59c170]" : "text-2xl text-[#98C9A3]"} />
                    Recepty
                </Link>
                <Link
                    className={location.pathname === "/add" ? "gap-3 flex items-center font-bold underline text-[#59c170]" : "gap-3 items-center flex text-[#98C9A3]"}
                    to={"/add"}>
                    <FaPlus className={location.pathname === "/add" ? "font-bold text-3xl text-[#59c170]" : "text-2xl text-[#98C9A3]"} />
                    Přidat
                </Link>
            </div>
            <div 
            onClick={() => navigate("/sign-in")}
            className="flex justify-end items-end text-3xl cursor-pointer font-bold text-[#59c170]">
                {isAdmin ? "Admin" : "Host"}
            </div>
        </nav>
    )
}