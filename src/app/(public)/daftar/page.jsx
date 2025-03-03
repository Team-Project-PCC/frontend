import Image from "next/image";

export default function Daftar() {
    return (
        <div className="flex h-screen">
            {/* Konten Kiri */}
            <div className="w-1/2 flex flex-col justify-center bg-white px-28 py-20">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Selamat Datang di Museum Gitarupa</h1>
                <p className="text-gray-600 mb-6">Jelajahi sejarah dan keindahan seni gitar di Museum Gitarupa. Daftar sekarang untuk pengalaman terbaik.</p>

                <label className="text-gray-700 font-medium text-lg">Username</label>
                <input type="text" placeholder="Username" className="w-full p-3 text-sm border border-gray-300 rounded-lg mb-4" />

                <label className="text-gray-700 font-medium text-lg">Email</label>
                <input type="email" placeholder="Email" className="w-full p-3 text-sm border border-gray-300 rounded-lg mb-4" />

                <label className="text-gray-700 font-medium text-lg">Password</label>
                <input type="password" placeholder="Password" className="w-full p-3 text-sm border border-gray-300 rounded-lg mb-4" />

                <label className="text-gray-700 font-medium text-lg">Konfirmasi Password</label>
                <input type="password" placeholder="Konfirmasi Password" className="w-full p-3 text-sm border border-gray-300 rounded-lg mb-4" />

                <button className="w-full bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] text-white p-3 rounded-lg font-semibold hover:opacity-80">Daftar</button>

                <p className="text-gray-600 text-center mt-4 text-lg">Sudah punya akun? <a href="/masuk" className="text-blue-500">Masuk di sini</a></p>
            </div>

            {/* Konten Kanan */}
            <div className="w-1/2 flex justify-center items-center">
                <div className="w-[570px] h-auto">
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
