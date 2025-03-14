"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoadingOverlay from "@/components/LoadingOverlay";

// ⬇️ Tambahkan translateDay di sini!
const translateDay = {
    monday: "Senin",
    tuesday: "Selasa",
    wednesday: "Rabu",
    thursday: "Kamis",
    friday: "Jumat",
    saturday: "Sabtu",
    sunday: "Minggu",
};

export default function Acara() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
                const data = await response.json();

                if (data.status === "success") {
                    const formattedEvents = data.events.map(event => {
                        const today = new Date();
                        let eventDate = "Tidak ada jadwal";

                        const recurringSchedules = event.event_schedules_recurring;

                        if (recurringSchedules && recurringSchedules.length > 0) {
                            const recurring = recurringSchedules[0];
                            const { recurring_type } = recurring;

                            // ⬇️ Weekly schedule pakai translateDay
                            if (recurring_type === "weekly" && recurring.schedule_weekly.length > 0) {
                                const days = recurring.schedule_weekly.map(schedule => {
                                    const dayName = translateDay[schedule.day.toLowerCase()] || schedule.day;
                                    const timeRange = `${schedule.start_time.slice(0, 5)} - ${schedule.end_time.slice(0, 5)}`;
                                    return `${dayName} (${timeRange})`;
                                });

                                eventDate = days.join(", ");
                            }

                            // Monthly schedule
                            else if (recurring_type === "monthly" && recurring.schedule_monthly.length > 0) {
                                const day = recurring.schedule_monthly[0].day;
                                const monthYear = today.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
                                eventDate = `${day} ${monthYear}`;
                            }

                            // Yearly schedule
                            else if (recurring_type === "yearly" && recurring.schedule_yearly.length > 0) {
                                const date = recurring.schedule_yearly[0].date;
                                const formattedDate = new Date(date).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                });
                                eventDate = formattedDate;
                            }
                        }

                        return {
                            id: event.id,
                            title: event.title,
                            status: event.status === "open" ? "Tersedia" : "Sold Out",
                            image: event.event_images?.length > 0 ? event.event_images[0].url : "/images/default.jpg",
                            date: eventDate,
                        };
                    });

                    setEvents(formattedEvents);

                    if (formattedEvents.length > 0 && !localStorage.getItem("selectedEventId")) {
                        localStorage.setItem("selectedEventId", formattedEvents[0].id);
                    }

                } else {
                    console.error("Data status not success:", data.message);
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
        const slugTitle = event.title.toLowerCase().replace(/\s+/g, '-');
        localStorage.setItem("selectedEventId", event.id);
        router.push(`/acara/${encodeURIComponent(slugTitle)}`);
    };    

    const filteredEvents = events.filter(event => {
        const matchesFilter = filter === "" || event.status.toLowerCase() === filter;
        const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <section className="py-16 px-6 bg-gray-900 text-white min-h-screen">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10">Acara Museum</h2>

                {/* Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Cari acara..."
                        className="p-3 w-full md:w-4/5 rounded-lg text-black"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="p-3 w-full md:w-2/5 rounded-lg text-black"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="">Semua</option>
                        <option value="tersedia">Tersedia</option>
                        <option value="sold out">Sold Out</option>
                    </select>
                </div>

                {/* Loading */}
                {loading && <LoadingOverlay />}

                {/* Events */}
                <div className="grid md:grid-cols-3 gap-6 mt-16">
                    {!loading && filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform transform hover:scale-105"
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
                                    <p className="text-gray-300">{event.status} | {event.date}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        !loading && (
                            <p className="text-center text-gray-400 col-span-3">
                                Tidak ada acara yang ditemukan.
                            </p>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
