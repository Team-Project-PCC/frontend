"use client";

import { useState } from "react";

export default function DetailTiket() {
    const ticket = {
        name: "Tiket Reguler",
        price: 50000,
        category: "Umum",
        description: "Tiket reguler untuk masuk ke Museum Gita Rupa. Berlaku untuk satu orang.",
        facilities: [
            "Akses ke seluruh area pameran",
            "Pemandu digital melalui aplikasi",
            "Diskon 10% di toko suvenir",
            "Gratis satu botol air mineral",
        ],
    };

    const [selectedDate, setSelectedDate] = useState("");
    const [ticketCount, setTicketCount] = useState(0);
    const [voucherCode, setVoucherCode] = useState("");

    const handlePurchase = () => {
        alert(`Tiket ${ticketCount} untuk ${selectedDate} telah dibeli! Kode Voucher: ${voucherCode}`);
    };

    return (
        <section className="py-16 px-6 text-white bg-gradient-to-b from-[#433D60] to-[#211E2E] min-h-screen">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
                {/* KONTEN KIRI */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">{ticket.name}</h2>
                    <p className="text-lg">{ticket.category}</p>
                    <p className="text-lg">{ticket.description}</p>
                    <p className="text-2xl font-bold text-red-300">
                        Rp {ticket.price.toLocaleString("id-ID")}
                    </p>

                    <div>
                        <h3 className="text-xl font-semibold">Fasilitas yang Didapat:</h3>
                        <ul className="list-disc list-inside text-lg text-gray-300 mt-2 space-y-1">
                            {ticket.facilities.map((facility, index) => (
                                <li key={index}>{facility}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* KONTEN KANAN */}
                <div className="space-y-6 bg-gray-800 p-6 rounded-lg">
                    <div>
                        <label className="block text-lg font-semibold">Pilih Tanggal:</label>
                        <input
                            type="date"
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>

                    {selectedDate && (
                        <div>
                            <label className="block text-lg font-semibold">Jumlah Tiket:</label>
                            <input
                                type="number"
                                min="1"
                                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                value={ticketCount}
                                onChange={(e) => setTicketCount(Number(e.target.value))}
                            />
                        </div>
                    )}

                    {ticketCount > 0 && (
                        <div>
                            <label className="block text-lg font-semibold">Kode Voucher (Opsional):</label>
                            <input
                                type="text"
                                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                                placeholder="Masukkan kode voucher jika ada"
                            />
                        </div>
                    )}

                    {ticketCount > 0 && (
                        <button
                            className="w-full px-6 py-3 rounded-lg text-lg font-bold"
                            style={{
                                background: "linear-gradient(to right, #8176AF, #C0B7E8)",
                                color: "#343045",
                            }}
                            onClick={handlePurchase}
                        >
                            Beli Tiket
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
