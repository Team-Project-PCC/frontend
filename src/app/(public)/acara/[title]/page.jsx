"use client";

import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function EventDetailPage() {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const eventId = localStorage.getItem("selectedEventId"); // ✅ Ambil dari localStorage
        if (!eventId) {
            setError("ID acara tidak ditemukan di local storage.");
            setLoading(false);
            return;
        }

        async function fetchEvent() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`);
                const data = await res.json();

                console.log("Data Acara:", data); // Debugging buat cek struktur API

                if (data.status === "success" && data.event) {
                    setEvent(data.event);
                } else {
                    setError("Acara tidak ditemukan.");
                }
            } catch (err) {
                console.error("Terjadi kesalahan saat mengambil data acara:", err);
                setError("Gagal memuat data acara. Silakan coba lagi.");
            } finally {
                setLoading(false);
            }
        }

        fetchEvent();
    }, []);

    if (loading) return <LoadingOverlay />;
    if (error) return <p className="text-center text-red-400 text-lg">{error}</p>;
    if (!event) return <p className="text-center text-gray-300 text-lg">Acara tidak ditemukan.</p>;

    return (
        <div className="min-h-screen bg-[#302C42] text-white py-12 px-6">
            <div className="max-w-3xl mx-auto bg-[#3B3655] p-8 rounded-xl shadow-lg">
                {/* Gambar Acara */}
                {event.event_images?.length > 0 && (
                    <img
                        src={event.event_images[0].url}
                        alt={event.title}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                )}

                {/* Judul & Deskripsi */}
                <h1 className="text-4xl font-bold text-center mb-4">{event.title}</h1>
                <p className="text-gray-300 text-lg text-center">{event.description}</p>

                {/* Status & Tipe */}
                <div className="mt-6 bg-[#4A4368] p-4 rounded-lg shadow-md">
                    <p className="text-lg">
                        <strong>Status:</strong>{" "}
                        <span className={event.status === "closed" ? "text-red-400" : "text-green-400"}>
                            {event.status === "closed" ? "Tutup" : "Buka"}
                        </span>
                    </p>
                    <p className="text-lg">
                        <strong>Tipe Acara:</strong>{" "}
                        {event.type === "recurring" ? "Berkala" : "Sekali"}
                    </p>
                </div>

                {/* Kategori Tiket */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">🎟 Kategori Tiket</h2>
                    {event.ticket_categories?.length > 0 ? (
                        event.ticket_categories.map((ticket) => (
                            <div
                                key={ticket.id}
                                className="bg-[#4A4368] p-4 rounded-lg shadow-md mb-3"
                            >
                                <p><strong>Kategori:</strong> {ticket.category.toUpperCase()}</p>
                                <p><strong>Harga:</strong> Rp {parseInt(ticket.price).toLocaleString("id-ID")}</p>
                                <p><strong>Kuota:</strong> {ticket.quota} tiket</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-300">Tidak ada kategori tiket tersedia.</p>
                    )}
                </div>

                {/* Jadwal Acara */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">📅 Jadwal Acara</h2>
                    {event.event_schedules_recurring?.length > 0 ? (
                        event.event_schedules_recurring.map((schedule) => (
                            <div
                                key={schedule.id}
                                className="bg-[#4A4368] p-4 rounded-lg shadow-md mb-3"
                            >
                                <p>
                                    <strong>Tipe Jadwal:</strong>{" "}
                                    {schedule.recurring_type === "monthly"
                                        ? "Bulanan"
                                        : schedule.recurring_type}
                                </p>

                                {schedule.schedule_monthly?.length > 0 ? (
                                    schedule.schedule_monthly.map((monthly) => {
                                        // ✅ Tambahkan logika buat tanggalnya (opsional)
                                        const day = monthly.day;
                                        const today = new Date();
                                        const year = today.getFullYear();
                                        const month = today.getMonth();
                                        const eventDate = new Date(year, month, day);
                                        const formattedDate = eventDate.toLocaleDateString("id-ID", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        });

                                        return (
                                            <div key={monthly.id} className="mt-2">
                                                <p><strong>Tanggal:</strong> {formattedDate}</p>
                                                <p><strong>Waktu:</strong> {monthly.start_time} - {monthly.end_time}</p>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-gray-300">Jadwal tidak tersedia.</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-300">Jadwal belum tersedia.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
