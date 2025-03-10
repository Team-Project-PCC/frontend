import Image from "next/image";

const reviews = [
    {
        id: 1,
        name: "Rahmat H.",
        review:
            "Museum GitaRupa sangat menarik! Koleksi yang unik dan edukatif, terutama sejarah gitar kuno dan lukisan musikalisasi.",
        image: "/images/user1.jpg",
    },
    {
        id: 2,
        name: "Anita S.",
        review:
            "Sebuah pengalaman luar biasa! Saya sangat menikmati bagaimana seni visual dan musik dipadukan dengan indah.",
        image: "/images/user2.jpg",
    },
    {
        id: 3,
        name: "Budi W.",
        review:
            "Tempat yang inspiratif! Cocok untuk pecinta seni dan musik. Acara workshopnya juga sangat bermanfaat.",
        image: "/images/user3.jpg",
    },
];

export default function Review() {
    return (
        <section className="py-16 bg-none">
            <div className="container mx-auto px-8 md:px-10">
                {/* Judul */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-12">
                    Ulasan Pengunjung
                </h2>

                {/* Grid Review */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((user) => (
                        <div
                            key={user.id}
                            className="bg-gradient-to-r from-[#433D60] to-[#211E2E] text-white p-6 rounded-2xl shadow-lg flex flex-col hover:scale-105 transition-transform duration-300"
                        >
                            {/* Profil */}
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16">
                                    <Image
                                        src={user.image}
                                        alt={user.name}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover rounded-full border-2 border-[#C0B7E8]"
                                    />
                                </div>
                                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">{user.name}</h3>
                            </div>

                            {/* Review */}
                            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                                {user.review}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
