"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setToken } from "../../../lib/auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import PopupAuth from "../../../components/pop-up/auth";
import LoadingOverlay from "../../../components/LoadingOverlay";

export default function Daftar() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [popup, setPopup] = useState({ show: false, message: "", success: false });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const validateField = (name, value) => {
        let error = "";

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = "Format email tidak valid.";
            }
        }

        if (name === "password") {
            if (value.length < 8) {
                error = "Password harus minimal 8 karakter.";
            }
        }

        if (name === "password_confirmation") {
            if (value !== form.password) {
                error = "Konfirmasi password tidak cocok.";
            }
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleBlur = (e) => {
        validateField(e.target.name, e.target.value);
    };

    const validateForm = () => {
        let newErrors = {};
        validateField("email", form.email);
        validateField("password", form.password);
        validateField("password_confirmation", form.password_confirmation);

        if (Object.values(newErrors).some((err) => err !== "")) {
            setErrors(newErrors);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (data.success) {
                setToken(data.token);
                setPopup({ show: true, message: "Registrasi berhasil! Silakan cek email Anda untuk verifikasi.", success: true });
            } else {
                if (data.errors) {
                    setErrors(data.errors);
                    const errorMessages = Object.values(data.errors).flat().join(", ");
                    setPopup({ show: true, message: errorMessages, success: false });
                } else {
                    setPopup({ show: true, message: "Registrasi gagal, silakan coba lagi.", success: false });
                }
            }
        } catch (error) {
            setPopup({ show: true, message: "Terjadi kesalahan. Coba lagi nanti.", success: false });
        } finally {
            setLoading(false);
        }
    };

    const handlePopupClose = () => {
        setPopup({ ...popup, show: false });
    
        if (popup.success) {
            router.push("/"); // Jika sukses, pindah ke halaman utama
        }
    };    

    return (
        <div className="flex flex-col lg:flex-row h-screen relative px-6 lg:px-0">
            {loading && <LoadingOverlay />} 

            {popup.show && <PopupAuth message={popup.message} success={popup.success} onClose={handlePopupClose} />}

            <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-4 md:px-16 lg:px-28 py-12 md:py-20">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 text-center lg:text-left">Selamat Datang di Museum Gitarupa</h1>
                <p className="text-sm md:text-base text-gray-600 mb-6 text-center lg:text-left">
                    Jelajahi sejarah dan keindahan seni gitar di Museum Gitarupa. Daftar sekarang untuk pengalaman terbaik.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <label className="text-gray-700 font-medium text-sm md:text-lg">Username</label>
                    <input type="text" name="name" placeholder="Username" className="w-full p-3 text-sm md:text-base border border-gray-300 rounded-lg mb-2" onChange={handleChange} />

                    {/* Email */}
                    <label className="text-gray-700 font-medium text-sm md:text-lg">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        className="w-full p-3 text-sm md:text-base border border-gray-300 rounded-lg mb-2"
                        onChange={handleChange} 
                        onBlur={handleBlur}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    {/* Password */}
                    <label className="text-gray-700 font-medium text-sm md:text-lg">Password</label>
                    <div className="relative mb-2">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            placeholder="Password" 
                            className="w-full p-3 text-sm md:text-base border border-gray-300 rounded-lg mb-2"
                            onChange={handleChange} 
                            onBlur={handleBlur}
                        />
                        <button type="button" className="absolute right-3 top-3" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <AiFillEyeInvisible className="w-5 h-5 text-gray-500" /> : <AiFillEye className="w-5 h-5 text-gray-500" />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                    {/* Konfirmasi Password */}
                    <label className="text-gray-700 font-medium text-sm md:text-lg">Konfirmasi Password</label>
                    <div className="relative mb-2">
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            name="password_confirmation" 
                            placeholder="Konfirmasi Password" 
                            className="w-full p-3 text-sm md:text-base border border-gray-300 rounded-lg mb-2"
                            onChange={handleChange} 
                            onBlur={handleBlur}
                        />
                        <button type="button" className="absolute right-3 top-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <AiFillEyeInvisible className="w-5 h-5 text-gray-500" /> : <AiFillEye className="w-5 h-5 text-gray-500" />}
                        </button>
                    </div>
                    {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}

                    {/* Submit */}
                    <button type="submit" className="w-full bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] text-white p-3 rounded-lg font-semibold text-sm md:text-lg hover:opacity-80">Daftar</button>
                </form>

                <p className="text-gray-600 text-center mt-4 text-sm md:text-lg">Sudah punya akun? <a href="/masuk" className="text-blue-500">Masuk di sini</a></p>
            </div>

            {/* Image Section (Hidden di Mobile) */}
            <div className="hidden lg:flex w-1/2 justify-center items-center">
                <div className="w-[400px] xl:w-[570px] h-auto">
                    <Image src="/images/auth.svg" alt="Museum Gitarupa" width={100} height={100} className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}
