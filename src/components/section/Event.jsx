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
            <div className="container mx-auto px-6">
                {/* Judul */}
                <h2 className="text-3xl font-bold text-center text-white mb-12">
                    Event Terdekat
                </h2>

                {/* Grid Event */}
                <div className="grid md:grid-cols-2 gap-8">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="relative h-64 rounded-lg overflow-hidden shadow-lg"
                        >
                            {/* Background Image */}
                            <Image
                                src={event.image}
                                alt={event.title}
                                layout="fill"
                                objectFit="cover"
                                className="absolute inset-0"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 justify-end flex flex-col px-6 py-4">
                                <h3 className="text-2xl font-semibold text-white">
                                    {event.title}
                                </h3>
                                <p className="text-lg text-gray-300">{event.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
