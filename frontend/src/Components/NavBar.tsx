import { Link } from "react-router-dom";


export default function NavBar() {
    return (
        <nav className="flex justify-center m-0 gap-10 text-3xl">
            <Link 
            className="font-bold" 
            to={"/"}>Recepty</Link>
            <Link 
            className="font-bold" 
            to={"/add"}>Přidat</Link>
        </nav>
    )
}