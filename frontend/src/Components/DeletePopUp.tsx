import { motion } from "framer-motion"
import { useState } from "react"
import {FaTrash, FaAngleLeft} from "react-icons/fa"

interface DeleteProps {
    onDelete: () => void,
    onClose: () => void,
}

export default function DeletePopup({onClose, onDelete}:DeleteProps) {

    const [isOn, setIsOn] = useState(true)

    // Animation variants
    const showAnimation = {
        hidden: {
            y: -500,
            scale: 0,
            opacity: 0
        },
        show: {
            y: 0,
            scale: 1,
            opacity: 1
        }
    }
    const hideAnimation = {
        hidden: {
            y: 0,
            scale: 1,
            opacity: 1
        },
        show: {
            y: -500,
            scale: 0,
            opacity: 0
        }
    }

    const handleClose = () => {
        setIsOn(false)
        setTimeout(onClose, 300);
    }

    return(
        <motion.div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
            initial={isOn ? showAnimation.hidden : hideAnimation.hidden}
            animate={isOn ? showAnimation.show : hideAnimation.show}>
            <div className="m-auto bg-[#eef3e3] gap-2 flex flex-col items-center rounded-xl max-w-100 min-h-35 translate-y-[-150%]">
                <h1 className="text-center font-bold text-3xl">Opravdu chcete tento recept vymazat?</h1>
                <div className="flex flex-row gap-3">
                    <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        className="flex gap-1 items-center cursor-pointer self-start mt-2 text-white p-2 rounded-xl text-xl"
                        onClick={handleClose}>
                        <FaAngleLeft/>
                        Zanechat
                    </motion.button>
                    <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        className="flex gap-1 items-center cursor-pointer self-start mt-2 text-white p-2 rounded-xl text-xl"
                        onClick={onDelete}>
                        <FaTrash/>
                        Smazat
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}