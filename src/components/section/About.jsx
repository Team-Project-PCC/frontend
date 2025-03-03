import Image from "next/image";

export default function About() {
    return (
        <div className="bg-[#1D1B3F] text-white py-36 px-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                {/* Bagian Teks */}
                <div className="w-full md:w-3/5">
                    <h2 className="text-4xl font-bold mb-4">Sejarah Museum Gita Rupa</h2>
                    <p className="text-base text-gray-300 leading-relaxed text-justify">
                        Berdiri sejak tahun 1985, <span className="text-[#C0B7E8] font-semibold">Museum Gita Rupa </span>
                        adalah saksi bisu perjalanan gitar dari zaman klasik hingga era modern.
                        Tempat ini lahir dari kecintaan musisi legendaris terhadap seni suara (gita)
                        dan keindahan visual (rupa), menyatukan dua dunia dalam harmoni yang sempurna.
                        Dengan koleksi lebih dari 500 gitar bersejarah, museum ini tidak hanya menampilkan alat musik,
                        tetapi juga kisah di baliknya. Setiap senar, lekukan, dan nada memiliki cerita,
                        membawa kita dalam perjalanan musik yang tak terlupakan.
                    </p>
                </div>

                {/* Bagian Gambar */}
                <div className="w-full md:w-2/5">
                    <div className="w-[430px] h-72">
                        <Image
                            src="/images/sejarah.jpg"
                            alt="Museum Gita Rupa"
                            width={500}
                            height={500}
                            className="rounded-2xl shadow-lg w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
