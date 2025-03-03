import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative bg-[url('/images/museum-hero.png')] bg-cover bg-center h-[650px] flex items-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative z-10 flex w-full h-full">
                {/* Konten Kiri */}
                <div className="w-1/2 flex justify-center items-center">
                    <Image
                        src="/images/hero.png"
                        alt="Museum Gitarupa"
                        width={550}
                        height={550}
                        className="w-[480px] h-auto"
                    />
                </div>

                {/* Konten Kanan */}
                <div className="w-1/2 flex flex-col justify-center px-16 text-white">
                    <h1 className="text-4xl font-extrabold mb-4 leading-tight">
                        Jelajahi <span className="text-[#C0B7E8]">Harmoni Musik</span> & <span className="text-[#C0B7E8]">Keindahan Visual</span> di Gitarupa
                    </h1>
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                        Rasakan pengalaman mendalam melihat koleksi gitar legendaris yang telah
                        menginspirasi musisi dari seluruh dunia. Saksikan keindahan dan sejarah yang tersimpan di setiap senarnya.
                    </p>

                    <button className="bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] text-[#343045] px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:opacity-80 transition w-max">
                        🎟️ Dapatkan Tiket Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
}
