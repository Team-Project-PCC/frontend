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
            <div className="container mx-auto px-6">
                {/* Judul */}
                <h2 className="text-3xl font-bold text-center text-white mb-12">
                    Ulasan Pengunjung
                </h2>

                {/* Grid Review */}
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((user) => (
                        <div
                            key={user.id}
                            className="bg-gradient-to-r from-[#433D60] to-[#211E2E] text-white p-6 rounded-lg shadow-lg flex flex-col"
                        >
                            {/* Profil */}
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-10 h-10">
                                    <Image
                                        src={user.image}
                                        alt={user.name}
                                        width={50}
                                        height={50}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold">{user.name}</h3>
                            </div>

                            {/* Review */}
                            <p className="text-gray-300">{user.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
