import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { SignInContext } from "../Context/Context";
import DeletePopUp from "../Components/DeletePopUp";

interface Recipe {
  id: string;
  name: string;
  tag: string;
  ingredients: string;
  process: string;
  minutes: number;
  portions: number;
  image: string;
}


export default function Details() {

    const {id} = useParams()

    const navigate = useNavigate();

    const isAdmin = useContext(SignInContext);

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [popup, setPopup] = useState(false)

    async function getRecipe() {
        try {
            const response = await fetch(`http://localhost:5000/api/recipes/${id}`)
            const data = await response.json()
            if (data) {
                setRecipe(data)
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function onDelete(deleteId: string) {
        if (isAdmin === "Admin") {
            try {
                const response = await fetch(`http://localhost:5000/api/recipes/${deleteId}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                });
                if (response.ok) {
                    navigate("/")
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    const handlePopup = () => {
        setPopup(!popup)
    }

    useEffect(() => {
        getRecipe()
    }, [id]);

    return (
        <div className="relative min-h-screen">
            {
                recipe 
                    ? (
                        <main className="flex gap-20 outline-black min-h-[50vh] flex-row">
                            <div className="p-5 flex flex-col max-w-275 gap-2">
                                <div className="flex gap-3">
                                    <h1 className="text-4xl font-bold">{recipe.name}</h1>
                                    <h3 className="rounded-md font-bold text-white text-lg p-2 whitespace-nowrap max-w-fit text-center">
                                        {recipe.tag}
                                    </h3>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-2xl font-bold">Ingredience: </p>
                                    <p className="text-2xl">{recipe.ingredients}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-2xl font-bold">Postup: </p>
                                    <p className="text-2xl">{recipe.process}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-2xl font-bold">Doba vaření: </p>
                                    <p className="text-2xl">{recipe.minutes}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-2xl font-bold">Porce: </p>
                                    <p className="text-2xl">{recipe.portions}</p>
                                </div>
                                    <div className="flex gap-5">
                                        <button
                                            onClick={() => navigate(`/add/${recipe.id}`)} // Edit recipe
                                            className="cursor-pointer flex items-center gap-2 self-start mt-2 p-2 rounded-xl text-xl"
                                        >
                                            <FaEdit/> Upravit
                                        </button>
                                        <button
                                            onClick={handlePopup} // Call pop-up
                                            className="cursor-pointer flex items-center gap-2 self-start mt-2 p-2 rounded-xl text-xl"
                                        >
                                            <FaTrash/> Smazat
                                        </button>
                                    </div>
                                </div>
                                <div className="max-w-[1200px] max-h-[650px]">
                                    <img
                                        className="rounded-xl max-h-[450px]"
                                        alt="Obrázek"
                                        src={`http://localhost:5000/${recipe.image}`}
                                    />
                                </div>
                        </main>
                    )
                    : <div>Nic se nenašlo</div>
            }
            {popup && recipe && (
              <DeletePopUp
                key="delete-popup"
                onDelete={() => onDelete(recipe.id)} // Delete recipe
                onClose={handlePopup}
              />
            )}
        </div>
    )
}