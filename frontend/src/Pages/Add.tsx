import { useState } from "react"


export default function Add() {

    const [formData, setFormData] = useState({
        name: "",
        tag: "Polévka",
        ingredients: "",
        process: "",
        minutes: "",
        portions: "",
        image: null as File | null,
    })

    const inputStyle = "bg-gray-300 p-1 rounded-xl max-w-60"
    const textAreaStyle = "bg-gray-300 p-1 rounded-xl max-w-120 min-h-35"
    const labelStyle = "text-xl font-bold"

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.tag || !formData.ingredients || !formData.process || !formData.minutes || !formData.portions) {
            return;
        }
    }

    return(
        <div className="min-h-screen">
            <h1 className="text-5xl font-bold mt-10 mb-10">Přidat recept:</h1>
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
                                className="bg-gray-300 text-black p-2 rounded-xl cursor-pointer"
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
                            className="bg-white p-1 rounded-xl max-w-50 cursor-pointer"
                            type="file"
                            name="image"
                            accept="image/jpeg,image/png"
                        />
                        <button
                            type="submit"
                            className=" mt-10 self-start p-2 rounded-xl text-xl">
                            Přidat recept
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}