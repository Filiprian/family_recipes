import { useEffect, useState } from "react"
import FoodCard from "../Components/FoodCard"

type Recipe = {
  id: string;
  name: string;
  tag: string;
  ingredients: string;
  process: string;
  minutes: number;
  portions: number;
  image: string | null;
};

export default function Home() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [tag, setTag] = useState("Vše")
    const [search, setSearch] = useState("")

    // GET all recipes
    async function getRecipes() {
        try {
            const response = await fetch("http://localhost:5000/api/recipes")
            const data = await response.json()
            if (data && data.length > 0) {
                setRecipes(data)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getRecipes()
    }, []);

    return (
        <div className="min-h-screen">
            <header className="flex gap-20 justify-center bg-[#BFD8BD] text-white rounded-xl p-5">
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
            <main className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-5">
                {
                    recipes && recipes.length > 0
                        ? recipes
                            .filter(recipe => recipe.name.toLowerCase().startsWith(search.toLowerCase()) && (tag === recipe.tag || tag === "Vše"))
                            .map(recipe => <FoodCard key={recipe.id} recipe={recipe}/>)
                        : <div className="text-2xl font-bold">Nic se nenašlo...</div>
                }
            </main>
        </div>
    )
}