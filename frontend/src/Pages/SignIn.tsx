import { motion } from "framer-motion";
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

    const showAnimation = {
        hidden: {
            y: -50,
            opacity: 0
        },
        active: {
            y: 0,
            opacity: 1
        }
    }


    return (
        <main className="min-h-screen">
            <div className="mt-20 m-auto p-3 bg-[#d9e8d7] rounded-xl max-w-85 flex flex-col gap-3 items-center justify-center">
                <h1 className="text-3xl font-bold">Přihlásit se jako...</h1>
                <div className="gap-4 flex">
                    <motion.button
                        whileTap={{scale: 0.9}}
                        whileHover={{scale: 1.1}}
                        className=" bg-black text-white p-2 rounded-xl text-2xl"
                        onClick={() => setPopUp(true)}>
                        Admin
                    </motion.button>
                    <motion.button
                        whileTap={{scale: 0.9}}
                        whileHover={{scale: 1.1}}
                        className=" bg-black text-white p-2 rounded-xl text-2xl"
                        onClick={onGuest}>
                        Host
                    </motion.button>
                </div>
            </div>


            {popUp && 
                <motion.div 
                    initial={showAnimation.hidden}
                    animate={showAnimation.active}
                    className="mt-20 bg-[#d9e8d7] m-auto gap-5 pt-8 pb-8 flex flex-col items-center rounded-xl max-w-100">
                    <h1 className="font-bold text-4xl">Zadej kód:</h1>
                    {error && <h2 className="text-red-600 text-2xl">Špatný kód!</h2>}
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
                        <input className="p-1 bg-[#eef3e3] rounded-xl" type="password" placeholder="1234...." required value={inputValue} onChange={(e)=> setInputValue(e.target.value)}/>
                        <motion.button
                            whileTap={{scale: 0.9}}
                            whileHover={{scale: 1.1}}
                            className="cursor-pointer text-white bg-black rounded-xl text-xl p-2 hover:bg-gray-500 active:bg-white active:outline active:text-black"
                            type="submit"> 
                            Potvrdit
                        </motion.button>
                    </form>
                </motion.div>
            }
            
        </main>
    )
}