"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { setToken, setUser } from "../../../lib/auth"; // Import fungsi auth
import PopupAuth from "../../../components/pop-up/auth";
import LoadingOverlay from "../../../components/LoadingOverlay";

export default function Masuk() {
    const router = useRouter();

    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState({ show: false, message: "", success: false });
    const [showPassword, setShowPassword] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
    
        console.log("Data yang dikirim:", form);
    
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
    
            const data = await response.json();
            console.log("Response API:", data);
    
            if (data.status === "success") {
                setToken(data.token); // Simpan token ke cookies
                setUser(data.user); // Simpan user ke cookies

                setPopup({ show: true, message: "Login berhasil!", success: true });
            } else {
                setPopup({ show: true, message: "Login gagal, periksa kembali email dan password.", success: false });
            }
        } catch (error) {
            console.error("Error:", error);
            setPopup({ show: true, message: "Terjadi kesalahan. Coba lagi nanti.", success: false });
        } finally {
            setLoading(false);
        }
    };    

    const handlePopupClose = () => {
        setPopup({ ...popup, show: false });
    
        if (popup.success) {
            window.location.href = "/";
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen relative px-6 lg:px-0">
            {loading && <LoadingOverlay />}
            {popup.show && <PopupAuth message={popup.message} success={popup.success} onClose={handlePopupClose} />}

            {/* Form Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-4 md:px-16 lg:px-28 py-12 md:py-20">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 text-center lg:text-left">Selamat Datang Kembali</h1>
                <p className="text-sm md:text-base text-gray-600 mb-6 text-center lg:text-left">Masuk untuk melanjutkan eksplorasi di Museum Gitarupa.</p>

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <label className="text-gray-700 font-medium text-sm md:text-lg">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 text-sm md:text-base border border-gray-300 rounded-lg mb-4"
                        onChange={handleChange}
                    />

                    {/* Password */}
                    <label className="text-gray-700 font-medium text-sm md:text-lg">Password</label>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="w-full p-3 text-sm md:text-base border border-gray-300 rounded-lg pr-10"
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                        </button>
                    </div>

                    <a href="/lupa-password" className="text-blue-500 text-sm mb-4 self-end block">Lupa Password?</a>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] text-white p-3 rounded-lg font-semibold text-sm md:text-lg hover:opacity-80 mb-4">
                        Masuk
                    </button>
                </form>

                {/* Login dengan Google */}
                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 p-3 rounded-lg text-gray-700 font-semibold hover:bg-gray-100">
                    <Image src='/images/google.svg' alt='Google Logo' width={100} height={100} className='w-5 h-5' />
                    Masuk dengan Google
                </button>

                <p className="text-gray-600 text-center mt-4 text-sm md:text-lg">
                    Belum punya akun? <a href="/daftar" className="text-blue-500">Daftar di sini</a>
                </p>
            </div>

            {/* Image Section (Hidden di Mobile) */}
            <div className="hidden lg:flex w-1/2 justify-center items-center">
                <div className="w-[400px] xl:w-[510px] h-auto">
                    <Image src="/images/auth.svg" alt="Museum Gitarupa" width={100} height={100} className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}
