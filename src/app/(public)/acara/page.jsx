"use client";

import { useState } from "react";
import Image from "next/image";

const events = [
    {
        id: 1,
        title: "Pameran Gitar Nusantara",
        date: "15-04-2025",
        time: "10:00 - 17:00",
        image: "/images/festival.jpg",
    },
    {
        id: 2,
        title: "Lukisan Musik Tradisional",
        date: "20-05-2025",
        time: "09:00 - 18:00",
        image: "/images/festival.jpg",
    },
    {
        id: 3,
        title: "Workshop Pembuatan Alat Musik",
        date: "10-06-2025",
        time: "13:00 - 16:00",
        image: "/images/workshop.jpg",
    },
];

export default function Acara() {
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase()) &&
        (date === "" || event.date === date)
    );

    return (
        <section className="py-16 px-6 bg-gray-900 text-white">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10">Acara Museum</h2>

                {/* Pencarian & Filter Tanggal */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Cari acara..."
                        className="p-3 w-full md:w-4/5 rounded-lg text-black"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <input
                        type="date"
                        className="p-3 w-full md:w-1/4 rounded-lg text-black"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                {/* Daftar Acara */}
                <div className="grid md:grid-cols-3 gap-6 mt-16">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div key={event.id} className="relative rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    width={400}
                                    height={250}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
                                    <h3 className="text-lg font-semibold">{event.title}</h3>
                                    <p className="text-gray-300">{event.date} | {event.time}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400">Tidak ada acara yang ditemukan.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
