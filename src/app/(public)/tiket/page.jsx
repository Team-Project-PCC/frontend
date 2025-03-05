"use client";

import { useState } from "react";

const tickets = [
    { id: 1, name: "Tiket Reguler", price: 50000, category: "Umum" },
    { id: 2, name: "Tiket Pelajar", price: 40000, category: "Pelajar/Mahasiswa" },
    { id: 3, name: "Tiket Keluarga", price: 150000, category: "Paket 4 Orang" },
];

export default function Tiket() {
    return (
        <section className="py-16 px-6">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl font-bold text-center mb-10 text-white">Tiket Museum Gita Rupa</h2>

                <div className="grid md:grid-cols-3 gap-16">
                    {tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="px-4 py-20 rounded-3xl shadow-lg text-center"
                            style={{
                                background: "radial-gradient(circle, #433D60, #211E2E)",
                                color: "white",
                            }}
                        >
                            <h3 className="text-xl font-semibold">{ticket.name}</h3>
                            <p className="mt-2">{ticket.category}</p>
                            <p className="text-lg font-bold mt-4">
                                Rp {ticket.price.toLocaleString("id-ID")}
                            </p>
                            <button
                                className="mt-4 px-4 py-2 rounded-lg"
                                style={{
                                    background: "linear-gradient(to right, #8176AF, #C0B7E8)",
                                    color: "#343045",
                                    fontWeight: "bold",
                                }}
                            >
                                Beli Tiket
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
