"use client";

import { useState } from "react";
import Image from "next/image";

const collections = [
    {
        id: 1,
        title: "Angklung",
        category: "Gita",
        description: "Alat musik tradisional Jawa Barat yang terbuat dari bambu.",
        image: "/images/angklung.jpg",
    },
    {
        id: 2,
        title: "Sasando",
        category: "Gita",
        description: "Instrumen musik berdawai khas Nusa Tenggara Timur.",
        image: "/images/sasando.jpg",
    },
    {
        id: 3,
        title: "Lukisan Raden Saleh",
        category: "Rupa",
        description: "Karya maestro Raden Saleh yang menggambarkan peristiwa sejarah.",
        image: "/images/lukisan.jpg",
    },
    {
        id: 4,
        title: "Wayang Beber",
        category: "Rupa",
        description: "Seni bercerita menggunakan gulungan lukisan wayang dari Jawa.",
        image: "/images/wayang.jpg",
    },
];

export default function Koleksi() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const filteredCollections = collections.filter((item) =>
        (category === "All" || item.category === category) &&
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-8">Koleksi Museum</h2>

                {/* Pencarian & Kategori */}
                <div className="flex flex-col md:flex-row gap-5 mb-8">
                    <input
                        type="text"
                        placeholder="Cari koleksi..."
                        className="py-2 px-4 rounded-md text-black w-full md:w-4/5"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="py-2 px-4 rounded-md text-black mt-4 md:mt-0"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="All">Semua</option>
                        <option value="Gita">Instrumen Musik</option>
                        <option value="Rupa">Lukisan & Seni</option>
                    </select>
                </div>

                {/* Daftar Koleksi */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCollections.map((item) => (
                        <div key={item.id} className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={400}
                                height={250}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-center">{item.title}</h3>
                                <p className="text-gray-300 mt-2 text-center">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
