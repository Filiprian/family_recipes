import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { SignInContext } from "../Context/Context";


export default function Add() {

    const navigate = useNavigate()

    const {id} = useParams()

    const isAdmin = useContext(SignInContext);

    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        tag: "Polévka",
        ingredients: "",
        process: "",
        minutes: "",
        portions: "",
        image: null as File | null,
    })

    // Styling tailwind classes
    const inputStyle = "bg-[#eef3e3] p-1 rounded-xl max-w-60"
    const textAreaStyle = "bg-[#eef3e3] p-1 rounded-xl max-w-120 min-h-35"
    const labelStyle = "text-xl font-bold"

    async function getRecipe() {
        try {
            const res = await fetch(`http://localhost:5000/api/recipes/${id}`)
            const data = await res.json()
            if (data) {
                setFormData({
                    name: data.name,
                    tag: data.tag,
                    ingredients: data.ingredients,
                    process: data.process,
                    minutes: data.minutes,
                    portions: data.portions,
                    image: data.image,
                })
            }
        } catch (e) {
            console.error("Failed while getting a recipe" + e)
        }
    }

    useEffect(() => {
        getRecipe()
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files && files[0]) {
            setFormData({...formData, [name]: files[0]});
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (isAdmin) {
            e.preventDefault();
            if (!formData.name || !formData.tag || !formData.ingredients || !formData.process || !formData.minutes || !formData.portions) {
                setError("Vyplň všechna pole!")
                return;
            }
            if (parseInt(formData.minutes) < 0 || parseInt(formData.portions) < 0) {
                return;
            }

            setError("")
            const dataToSend = new FormData();
            dataToSend.append("name", formData.name);
            dataToSend.append("tag", formData.tag);
            dataToSend.append("ingredients", formData.ingredients);
            dataToSend.append("process", formData.process);
            dataToSend.append("minutes", String(parseInt(formData.minutes) || 0));
            dataToSend.append("portions", String(parseInt(formData.portions) || 0));
            if (formData.image) {
                dataToSend.append("image", formData.image);
            }


            try {
                // Deciding between PUT or POST method
                const url = id ? `http://localhost:5000/api/recipes/${id}` : "http://localhost:5000/api/recipes"
                const method = id ? "PUT" : "POST"
                const response = await fetch(url, {
                    method: method,
                    body: dataToSend
                })
                if (response.ok) {
                    setFormData({
                        name: "",
                        tag: "Polévka",
                        ingredients: "",
                        process: "",
                        minutes: "",
                        portions: "",
                        image: null
                    })
                    navigate("/")
                }
            } catch (e) {
                console.error(e)
                setError("Něco se pokazilo")
            }
        }
        }
        

    return(
        <div className="min-h-screen">
            <header className={"h-5 m-5 bg-[#BFD8BD] rounded-xl"}></header>
            <h1 className="text-5xl font-bold mt-10 mb-10">{id ? "Uprav recept:" : "Přidaj recept:"}</h1>
            <main className="p-2 flex flex-col items-center justify-center align-center gap-1">
                <form onSubmit={handleSubmit} className="flex gap-50">
                    <div className="flex flex-col gap-3">
                        <label className={labelStyle}>Název:</label>
                        <input
                            className={inputStyle}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Rajská..."
                        />
                        <div>
                            <label className={labelStyle}>Typ:</label>
                            <select
                                className="bg-[#eef3e3] text-black p-2 rounded-xl cursor-pointer"
                                name="tag"
                                value={formData.tag}
                                onChange={handleChange}
                            >
                                <option value="Polévka">Polévka</option>
                                <option value="Hlavní chod">Hlavní chod</option>
                                <option value="Dezert">Dezert</option>
                                <option value="Svačinka">Svačinka</option>
                                <option value="Salát">Salát</option>
                            </select>
                        </div>
                        <label className={labelStyle}>Ingredience:</label>
                        <textarea
                            className={textAreaStyle}
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleChange}
                        ></textarea>
                        <label className={labelStyle}>Postup:</label>
                        <textarea
                            className={textAreaStyle}
                            name="process"
                            value={formData.process}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className={labelStyle}>Kolik minut se vaří:</label>
                        <input
                            className={inputStyle}
                            type="number"
                            name="minutes"
                            value={formData.minutes}
                            onChange={handleChange}
                            placeholder="30"
                        />
                        <label className={labelStyle}>Porce:</label>
                        <input
                            className={inputStyle}
                            type="number"
                            name="portions"
                            value={formData.portions}
                            onChange={handleChange}
                            placeholder="4"
                        />
                        <label className={labelStyle}>Obrázek:</label>
                        <input
                            className="bg-[#eef3e3] p-1 rounded-xl max-w-50 cursor-pointer"
                            type="file"
                            name="image"
                            accept="image/jpeg,image/png"
                            onChange={handleFileChange}
                        />
                        <button
                            type="submit"
                            className=" mt-10 self-start bg-black text-white p-2 rounded-xl text-xl">
                            {id ? "Upravit" : "Přidat"}
                        </button>
                    </div>
                </form>
                {error !== "" && <div>{error}</div>}
            </main>
        </div>
    )
}