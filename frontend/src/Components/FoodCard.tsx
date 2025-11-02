import { motion } from "framer-motion";
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
        <motion.div 
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            onClick={handleClick}
            className="p-1 sm:p-2 hover:cursor-pointer bg-[#d9e8d7] rounded-xl shadow-2xl mx-auto">
            <div className="flex flex-col flex-wrap gap-2 m-2 sm:m-3">
                <h1 className="max-w-[250px] text-2xl sm:text-2xl md:text-3xl overflow-hidden font-bold truncate">
                    {recipe.name}
                </h1>
                <h2 className="bg-[#00d382] rounded-md font-bold text-[#feffeb] text-sm 
                sm:text-base md:text-md sm:p-2 p-1 whitespace-nowrap max-w-fit text-center">
                    {recipe.tag}
                </h2>
            </div>
            <div className="flex justify-center items-center max-w-[300px] mx-auto">
                <img
                    className="max-h-[200px] sm:max-h-[250px] md:max-h-[350px] rounded-xl w-full object-cover"
                    alt="Obrázek"
                    src={`http://localhost:5000/${recipe.image}`}
                />
            </div>
        </motion.div>
    )
}