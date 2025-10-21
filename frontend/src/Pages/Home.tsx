import { useEffect, useState } from "react"
import FoodCard from "../Components/FoodCard"

export default function Home() {

    // Test sample
    const [recipes, setRecipes] = useState([{
        id: "1",
        name: "Rajská",
        tag: "Hlavní chod",
        ingredients: "Rajská",
        process: "Vař",
        minutes: 30,
        portions: 2,
        image: null,
    }])

    const [tag, setTag] = useState("Vše")
    const [search, setSearch] = useState("")

    return (
        <div className="min-h-screen">
            <header className="flex gap-20 justify-center bg-gray-500 text-white rounded-xl p-5">
                <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Řízky" className="p-2 rounded-xl text-black bg-white"/>
                <select onChange={(e) => setTag(e.target.value)} id="type" className="bg-white text-black p-2 rounded-xl cursor-pointer">
                    <option className="cursor-pointer">Vše</option>
                    <option className="cursor-pointer">Polévka</option>
                    <option className="cursor-pointer">Hlavní chod</option>
                    <option className="cursor-pointer">Dezert</option>
                    <option className="cursor-pointer">Svačinka</option>
                </select>
            </header>
            <h1 className="text-5xl font-bold mt-10 mb-10">Rodinné recepty:</h1>
            <main className="grid grid-cols-4 gap-5">
                {
                    recipes
                        ? recipes
                            .filter(recipe => recipe.name.toLowerCase().startsWith(search.toLowerCase()) && (tag === recipe.tag || tag === "Vše"))
                            .map(recipe => <FoodCard key={recipe.id} recipe={recipe}/>)
                        : <div>Nic se nenašlo...</div>
                }
            </main>
        </div>
    )
}