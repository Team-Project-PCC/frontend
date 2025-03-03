import Image from "next/image";
import { FaGoogle } from "react-icons/fa";

export default function Masuk() {
    return (
        <div className="flex h-max-screen">
            {/* Konten Kiri */}
            <div className="w-1/2 flex flex-col justify-center bg-white px-28 py-20">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Selamat Datang Kembali</h1>
                <p className="text-gray-600 mb-6">Masuk ke akun Anda untuk melanjutkan eksplorasi di Museum Gitarupa.</p>

                <label className="text-gray-700 font-medium text-lg">Email</label>
                <input type="email" placeholder="Email" className="w-full p-3 text-sm border border-gray-300 rounded-lg mb-4" />

                <label className="text-gray-700 font-medium text-lg">Password</label>
                <input type="password" placeholder="Password" className="w-full p-3 text-sm border border-gray-300 rounded-lg mb-2" />

                <a href="/lupa-password" className="text-blue-500 text-sm mb-4 self-end">Lupa Password?</a>

                <button className="w-full bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] text-white p-3 rounded-lg font-semibold hover:opacity-80 mb-4">Masuk</button>

                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 p-3 rounded-lg text-gray-700 font-semibold hover:bg-gray-100">
                    <Image
                        src='/images/google.svg'
                        alt='Google Logo'
                        width={100}
                        height={100}
                        className='w-5 h-5'
                    />
                    Masuk dengan Google
                </button>

                <p className="text-gray-600 text-center mt-4 text-lg">Belum punya akun? <a href="/daftar" className="text-blue-500">Daftar di sini</a></p>
            </div>

            {/* Konten Kanan */}
            <div className="w-1/2 flex justify-center items-center">
                <div className="w-[510px] h-auto">
                    <Image
                        src="/images/auth.svg"
                        alt="Museum Gitarupa"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}
