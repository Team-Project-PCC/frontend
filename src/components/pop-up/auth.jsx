"use client";

import { useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClose } from "react-icons/ai";

export default function PopupAuth({ message, success, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative w-[80%] md:w-[60%] lg:w-[30%] bg-white rounded-lg p-8 shadow-xl text-center">

                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                    <AiOutlineClose className="w-6 h-6" />
                </button>

                <div className="flex justify-center mb-4 mt-10">
                    {success ? (
                        <AiOutlineCheckCircle className="w-28 h-28 text-green-500" />
                    ) : (
                        <AiOutlineCloseCircle className="w-28 h-28 text-red-500" />
                    )}
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {success ? "Registrasi Berhasil!" : "Registrasi Gagal!"}
                </h2>

                <p className="text-gray-600 mb-4">{message}</p>
            </div>
        </div>
    );
}
