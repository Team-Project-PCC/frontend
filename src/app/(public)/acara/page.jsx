"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Acara() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
                const data = await response.json();

                if (data.status === "success") {
                    const formattedEvents = data.events.map(event => {
                        // Ambil schedule pertama
                        const firstScheduleRecurring = event.event_schedules_recurring[0];
                        const scheduleMonthly = firstScheduleRecurring?.schedule_monthly[0];

                        // Konversi day -> tanggal dalam bulan sekarang (atau sesuai kebutuhan)
                        let dateString = "TBA";
                        if (scheduleMonthly) {
                            const today = new Date();
                            const year = today.getFullYear();
                            const month = today.getMonth(); // 0-index (0 = Januari)

                            // Pastikan day ada, dan valid
                            const day = scheduleMonthly.day;
                            const eventDate = new Date(year, month, day);

                            // Format ke YYYY-MM-DD supaya cocok buat filter tanggal
                            const formattedDate = eventDate.toISOString().split("T")[0];
                            dateString = formattedDate;
                        }

                        return {
                            id: event.id,
                            title: event.title,
                            date: dateString,
                            time: scheduleMonthly
                                ? `${scheduleMonthly.start_time} - ${scheduleMonthly.end_time}`
                                : "TBA",
                            image:
                                event.event_images.length > 0
                                    ? event.event_images[0].url
                                    : "/images/default.jpg",
                        };
                    });

                    setEvents(formattedEvents);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    const handleClick = (event) => {
        localStorage.setItem("selectedEventId", event.id);
        router.push(`/acara/${encodeURIComponent(event.title)}`);
    };

    // Filter search + tanggal
    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
        const matchesDate = date === "" || event.date === date;
        return matchesSearch && matchesDate;
    });

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

                {/* Loading State */}
                {loading && <LoadingOverlay />}

                {/* Daftar Acara */}
                <div className="grid md:grid-cols-3 gap-6 mt-16">
                    {!loading && filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
                                onClick={() => handleClick(event)}
                            >
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    width={400}
                                    height={250}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
                                    <h3 className="text-lg font-semibold">{event.title}</h3>
                                    <p className="text-gray-300">
                                        {event.date !== "TBA" ? event.date : "Tanggal belum tersedia"} | {event.time}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        !loading && <p className="text-center text-gray-400">Tidak ada acara yang ditemukan.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
