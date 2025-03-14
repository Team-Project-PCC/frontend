"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; // Next.js 13+

export default function Hero() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/tiket");
    };

    return (
        <div className="relative bg-[url('/images/museum-hero.png')] bg-cover bg-center h-[500px] md:h-[650px] flex items-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative z-10 flex w-full h-full flex-col md:flex-row">
                {/* Konten Kiri (Image Hero) */}
                <div className="hidden lg:flex w-1/2 justify-center items-center">
                    <Image
                        src="/images/hero.png"
                        alt="Museum Gitarupa"
                        width={550}
                        height={550}
                        className="w-[400px] h-auto xl:w-[480px]"
                    />
                </div>

                {/* Konten Kanan */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-24 text-white text-center lg:text-left">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
                        Jelajahi <span className="text-[#C0B7E8]">Harmoni Musik</span> &amp; <span className="text-[#C0B7E8]">Keindahan Visual</span> di Gitarupa
                    </h1>

                    <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-6 leading-relaxed">
                        Rasakan pengalaman mendalam melihat koleksi gitar legendaris yang telah
                        menginspirasi musisi dari seluruh dunia. Saksikan keindahan dan sejarah yang tersimpan di setiap senarnya.
                    </p>

                    <div className="flex justify-center lg:justify-start">
                        <button
                            onClick={handleClick}
                            className="bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] text-[#343045] px-6 md:px-8 py-3 rounded-full font-semibold text-sm md:text-base lg:text-lg shadow-lg hover:opacity-80 transition w-max"
                        >
                            🎟️ Dapatkan Tiket Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
