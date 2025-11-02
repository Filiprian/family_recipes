import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { SignInContext } from "../Context/Context";
import DeletePopUp from "../Components/DeletePopUp";
import { motion } from "framer-motion";

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
    const [ingredients, setIngredients] = useState<string[]>([]);

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

    // Better formating of ingredience
    useEffect(() => {
      if (recipe?.ingredients) {
        const inputString = recipe.ingredients;
        const result = inputString.split(",").map(item => item.trim());
        setIngredients(result);
      }
}, [recipe]);

    return (
        <div className="relative min-h-screen">
            {
                recipe 
                    ? (
                        <>
                            <header className="h-5 z-10 m-5 bg-[#BFD8BD] rounded-xl"></header>
                            <main className="flex gap-5 xl:gap-50 md:gap-10 outline-black min-h-[50vh] flex-col xl:flex-row">
                                <div className="p-5 flex flex-col max-w-275 gap-2">
                                    <div className="flex gap-3">
                                        <h1 className="sm:text-4xl text-3xl font-bold">{recipe.name}</h1>
                                        <h3 className="bg-[#00d382] rounded-md font-bold text-[#feffeb] text-sm sm:text-base md:text-lg sm:p-2 p-1 whitespace-nowrap max-w-fit text-center">
                                        {recipe.tag}
                                        </h3>
                                    </div>
                                    <div className="flex gap-2">
                                    <ul className="list-disc text-2xl font-bold">Ingredience:
                                        {
                                            ingredients && ingredients.map(item => (
                                                <li className="font-light ml-12" key={item}>{item}</li>
                                            ))
                                        }
                                    </ul>
                                    </div>
                                    <div className="flex sm:flex-row flex-col gap-2">
                                        <p className="text-2xl font-bold">Postup: </p>
                                        <p className="text-2xl max-w-150">{recipe.process}</p>
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
                                            <motion.button
                                                whileTap={{scale: 0.9}}
                                                whileHover={{scale: 1.1}}
                                                onClick={() => navigate(`/add/${recipe.id}`)} // Edit recipe
                                                className="cursor-pointer flex items-center gap-2 self-start mt-2 text-white bg-red-500 p-2 rounded-xl text-xl"
                                            >
                                                <FaEdit/> Upravit
                                            </motion.button>
                                            <motion.button
                                                whileTap={{scale: 0.9}}
                                                whileHover={{scale: 1.1}}
                                                onClick={handlePopup} // Call pop-up
                                                className="cursor-pointer flex items-center gap-2 self-start mt-2 text-white bg-red-500 p-2 rounded-xl text-xl"
                                            >
                                                <FaTrash/> Smazat
                                            </motion.button>
                                        </div>
                                    </div>
                                    <div className=" max-w-[1200px] max-h-[650px]">
                                        <img
                                            className="rounded-xl max-h-[300px] sm:max-h-[350px] md:max-h-[450px]"
                                            alt="Obrázek"
                                            src={`http://localhost:5000/${recipe.image}`}
                                        />
                                    </div>
                            </main>
                        </>
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