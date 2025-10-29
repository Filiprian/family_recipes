import {useState} from "react";

interface SignInProps {
    onAdmin: () => void,
    onGuest: () => void,
}

export default function SignIn({onAdmin, onGuest}: SignInProps) {

    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState(false)
    const [popUp, setPopUp] = useState(false)

    const secretCode = import.meta.env.VITE_SECRET_CODE

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(false)

        if (inputValue == secretCode) {
            onAdmin()
        } else {
            setError(true)
        }
    }


    return (
        <main className="min-h-screen m-auto">
            <div className="p-3 outline outline-black rounded-xl max-w-85 flex flex-col items-center justify-center">
                <h1 className="text-3xl">Přihlásit se jako...</h1>
                <button
                    className="cursor-pointer flex items-center gap-2 mt-2 p-2 rounded-xl text-xl"
                    onClick={() => setPopUp(true)}>
                    Admin
                </button>
                <button
                    className="cursor-pointer flex items-center gap-2 mt-2 p-2 rounded-xl text-xl"
                    onClick={onGuest}>
                    Host
                </button>
            </div>


            {popUp && 
                <div className="m-auto gap-5 flex flex-col items-center rounded-xl max-w-100 min-h-screen">
                    <h1 className="font-bold text-4xl">Zadej kód:</h1>
                    {error && <h2 className="text-red-600 text-2xl">Špatný kód!</h2>}
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
                        <input className="p-1 bg-gray-300 rounded-xl" type="password" placeholder="1234...." required value={inputValue} onChange={(e)=> setInputValue(e.target.value)}/>
                        <button
                            className="cursor-pointer flex items-center gap-2 mt-2 p-2 rounded-xl text-xl"
                            type="submit"> 
                            Potvrdit
                        </button>
                    </form>
                </div>
            }
            
        </main>
    )
}