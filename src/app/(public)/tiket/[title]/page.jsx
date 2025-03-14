"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/components/LoadingOverlay";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

const translateDay = {
    monday: "Senin",
    tuesday: "Selasa",
    wednesday: "Rabu",
    thursday: "Kamis",
    friday: "Jumat",
    saturday: "Sabtu",
    sunday: "Minggu",
};

const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};

export default function EventDetailPage() {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const eventId = localStorage.getItem("selectedEventId");

        if (!eventId) {
            setError("ID acara tidak ditemukan di local storage.");
            setLoading(false);
            return;
        }

        async function fetchEvent() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`);
                const data = await res.json();

                if (data.status === "success" && data.event) {
                    setEvent(data.event);

                    // Simpan juga title event ke localStorage ketika datanya berhasil diambil
                    localStorage.setItem("selectedEventTitle", data.event.title);
                } else {
                    setError("Acara tidak ditemukan.");
                }
            } catch (err) {
                setError("Gagal memuat data acara. Silakan coba lagi.");
            } finally {
                setLoading(false);
            }
        }

        fetchEvent();
    }, []);

    //  handle klik kategori tiket + simpan quota & id ke localStorage
    const handleCategoryClick = (category, quota, categoryId) => {
        if (event) {
            // Simpan data ke localStorage
            localStorage.setItem("selectedCategory", category);
            localStorage.setItem("selectedCategoryId", categoryId); //  simpan ID kategori tiket
            localStorage.setItem("selectedEventTitle", event.title);
            localStorage.setItem("selectedQuota", quota); //  quota disimpan juga di sini

            const titleSlug = slugify(event.title);
            const categorySlug = slugify(category);

            router.push(`/tiket/${titleSlug}/${categorySlug}`);
        }
    };

    if (loading) return <LoadingOverlay />;
    if (error) return <p className="text-center text-red-400 text-lg font-medium">{error}</p>;
    if (!event) return <p className="text-center text-gray-300 text-lg font-medium">Acara tidak ditemukan.</p>;

    return (
        <div className="min-h-screen bg-[#302C42] text-white py-12 px-6 md:px-28">
            {/* Tombol Kembali */}
            <button
                className="flex items-center text-gray-300 hover:text-white mb-6"
                onClick={() => router.back()}
            >
                <ArrowLeft size={24} className="mr-2" /> Kembali
            </button>

            {/* Section Atas */}
            <div className="py-8 grid md:grid-cols-2 gap-8">
                <div className="flex justify-center">
                    {event.event_images?.length > 0 && (
                        <div className="w-[600px] h-[300px]">
                            <Image
                                src={event.event_images[0].url}
                                alt={event.title}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                    <p className="text-lg text-gray-300 font-medium">{event.description}</p>
                    <p className="text-lg font-semibold mt-4">
                        Status:{" "}
                        <span className={event.status === "closed" ? "text-red-500" : "text-green-500"}>
                            {event.status === "closed" ? "Tutup" : "Tersedia"}
                        </span>
                    </p>
                </div>
            </div>

            {/* Jadwal Acara */}
            <div className="mt-8 bg-[#3B3655] p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">📅 Jadwal Acara</h2>

                {event.event_schedules_recurring?.length > 0 ? (
                    event.event_schedules_recurring.map((recurring) => (
                        <div key={recurring.id} className="mt-4 border-t border-gray-600 pt-4">
                            <p className="font-semibold">
                                Tipe: {recurring.recurring_type === "weekly" ? "Mingguan" : "Bulanan"}
                            </p>

                            {recurring.recurring_type === "weekly" && recurring.schedule_weekly?.length > 0 && (
                                <div className="mt-2">
                                    <p className="font-medium">Dilaksanakan setiap minggu pada:</p>
                                    {recurring.schedule_weekly.map((schedule) => {
                                        const dayName = translateDay[schedule.day.toLowerCase()] || schedule.day;
                                        return (
                                            <div key={schedule.id} className="ml-4 mt-1">
                                                <p>
                                                    🗓️ {dayName} ({schedule.start_time.slice(0, 5)} - {schedule.end_time.slice(0, 5)})
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {recurring.recurring_type === "monthly" && recurring.schedule_monthly?.length > 0 && (
                                <div className="mt-2">
                                    <p className="font-medium">Dilaksanakan setiap bulan pada tanggal:</p>
                                    {recurring.schedule_monthly.map((schedule) => {
                                        const today = new Date();
                                        const formattedDate = new Date(
                                            today.getFullYear(),
                                            today.getMonth(),
                                            schedule.day
                                        ).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        });

                                        return (
                                            <div key={schedule.id} className="ml-4 mt-1">
                                                <p>
                                                    🗓️ {formattedDate} ({schedule.start_time} - {schedule.end_time})
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-300">Jadwal belum tersedia.</p>
                )}
            </div>

            {/* Kategori Tiket */}
            <div className="mt-8 bg-[#3B3655] p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">🎟️ Kategori Tiket</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {event.ticket_categories?.length > 0 ? (
                        event.ticket_categories.map((ticket) => (
                            <div
                                key={ticket.id}
                                className="bg-[#4A4368] p-6 rounded-lg flex flex-col justify-center items-center shadow-md cursor-pointer hover:bg-[#5B5080] transition-all"
                                onClick={() => handleCategoryClick(ticket.category, ticket.quota, ticket.id)}
                            >
                                <p className="text-xl font-bold mb-2">{ticket.category.toUpperCase()}</p>
                                <p className="text-white font-medium">
                                    Rp {parseInt(ticket.price).toLocaleString("id-ID")}
                                </p>
                                <p className="text-white font-medium">{ticket.quota} tiket</p>
                                <p className="text-white font-medium">{ticket.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-300">Tidak ada kategori tiket tersedia.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
