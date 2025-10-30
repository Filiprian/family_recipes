import {FaTrash, FaAngleLeft} from "react-icons/fa"

interface DeleteProps {
    onDelete: () => void,
    onClose: () => void,
}

export default function DeletePopup({onClose, onDelete}:DeleteProps) {

    return(
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="m-auto bg-[#eef3e3] gap-2 flex flex-col items-center rounded-xl max-w-100 min-h-35 translate-y-[-150%]">
                <h1 className="text-center font-bold text-3xl">Opravdu chcete tento recept vymazat?</h1>
                <div className="flex flex-row gap-3">
                    <button
                        className="flex gap-1 items-center cursor-pointer self-start mt-2 text-white p-2 rounded-xl text-xl"
                        onClick={onClose}>
                        <FaAngleLeft/>
                        Zanechat
                    </button>
                    <button
                        className="flex gap-1 items-center cursor-pointer self-start mt-2 text-white p-2 rounded-xl text-xl"
                        onClick={onDelete}>
                        <FaTrash/>
                        Smazat
                    </button>
                </div>
            </div>
        </div>
    )
}