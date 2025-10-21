import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";


export default function Details() {

    const params = useParams<{ id: string }>();

    // Test sample
    const [recipe, setRecipe] = useState({
        id: "1",
        name: "Rajská",
        tag: "Hlavní chod",
        ingredients: "Rajská",
        process: "Vař",
        minutes: "30",
        portions: "2",
        image: null,
    })

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
                                            className="cursor-pointer flex items-center gap-2 self-start mt-2 p-2 rounded-xl text-xl"
                                        >
                                            <FaEdit/> Upravit
                                        </button>
                                        <button
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
                                        src="#"
                                    />
                                </div>
                        </main>
                    )
                    : <div>Nic se nenašlo</div>
            }
        </div>
    )
}