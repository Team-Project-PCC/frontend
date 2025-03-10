import Image from "next/image";

const events = [
    {
        id: 1,
        title: "Festival GitaRupa: Harmoni Nada & Warna",
        date: "15 Maret 2025",
        image: "/images/festival.jpg",
    },
    {
        id: 2,
        title: "Workshop Lukisan Musikalisasi",
        date: "27 April 2025",
        image: "/images/workshop.jpg",
    },
];

export default function Event() {
    return (
        <section className="py-16 bg-none">
            <div className="container mx-auto px-8 md:px-10">
                {/* Judul */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-12">
                    Event Terdekat
                </h2>

                {/* Grid Event */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="relative h-56 sm:h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
                        >
                            {/* Background Image */}
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Overlay Konten */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end px-4 md:px-6 py-3 md:py-4">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white mb-1">
                                    {event.title}
                                </h3>
                                <p className="text-sm md:text-base text-gray-300">{event.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
