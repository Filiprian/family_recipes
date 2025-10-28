import { useNavigate } from "react-router-dom";

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

export default function FoodCard({ recipe }: { recipe: Recipe }) {

    const navigate = useNavigate()

    // On click navigates you to details page
    const handleClick = () => {
        navigate(`/details/${recipe.id}`)
    }

    return (
        <div 
            onClick={handleClick}
            className="p-2 hover:cursor-pointer shadow-2xl mx-auto rounded-xl">
            <div className="flex flex-col flex-wrap gap-2 m-5 items-start justify-start align-left">
                <h1 className="text-3xl font-bold truncate">
                    {recipe.name}
                </h1>
                <h2 className="rounded-md font-bold text-md p-2 whitespace-nowrap max-w-fit text-center">
                    {recipe.tag}
                </h2>
            </div>
            <div className="flex justify-center items-center max-w-[300px] mx-auto">
                <img
                    className="max-h-[350px] rounded-xl w-full object-cover"
                    alt="Obrázek"
                    src={`http://localhost:5000/${recipe.image}`}
                />
            </div>
        </div>
    )
}