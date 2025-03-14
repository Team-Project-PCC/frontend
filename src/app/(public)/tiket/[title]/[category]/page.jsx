"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getToken } from "@/lib/auth";

export default function KategoriTiket() {
    const router = useRouter();

    const [eventTitle, setEventTitle] = useState("");
    const [ticketCategory, setTicketCategory] = useState("");
    const [ticketPrice, setTicketPrice] = useState(0);
    const [ticketCount, setTicketCount] = useState(1);
    const [voucherCode, setVoucherCode] = useState("");
    const [maxQuota, setMaxQuota] = useState(1);

    const [eventId, setEventId] = useState(null);
    const [ticketCategoryId, setTicketCategoryId] = useState(null);

    const [recurringType, setRecurringType] = useState(""); // daily / weekly
    const [recurringDays, setRecurringDays] = useState([]); // ['Monday', 'Wednesday']
    const [selectedDate, setSelectedDate] = useState("");

    // Fungsi konversi nama hari Inggris ke Indonesia
    const dayNameToIndonesian = (englishDay) => {
        const days = {
            sunday: "Minggu",
            monday: "Senin",
            tuesday: "Selasa",
            wednesday: "Rabu",
            thursday: "Kamis",
            friday: "Jumat",
            saturday: "Sabtu",
        };
        return days[englishDay] || englishDay;
    };

    // Untuk membandingkan nama hari, kita gunakan Bahasa Inggris seperti di recurringDays awal
    useEffect(() => {
        const storedEventTitle = localStorage.getItem("selectedEventTitle");
        const storedCategory = localStorage.getItem("selectedCategory");
        const storedQuota = localStorage.getItem("selectedQuota");
        const storedEventId = localStorage.getItem("selectedEventId");
        const storedCategoryId = localStorage.getItem("selectedCategoryId");
        const storedPrice = localStorage.getItem("selectedPrice");

        const storedRecurringType = localStorage.getItem("selectedRecurringType");
        const storedRecurringDays = localStorage.getItem("selectedWeeklyDays"); // JSON string: ["Monday", "Wednesday"]

        if (storedEventTitle) setEventTitle(storedEventTitle);
        if (storedCategory) setTicketCategory(storedCategory);

        if (storedQuota) {
            const quota = parseInt(storedQuota, 10);
            setMaxQuota(quota > 0 ? quota : 1);
        }

        if (storedEventId) setEventId(parseInt(storedEventId, 10));
        if (storedCategoryId) setTicketCategoryId(parseInt(storedCategoryId, 10));
        if (storedPrice) setTicketPrice(parseFloat(storedPrice));

        if (storedRecurringType) setRecurringType(storedRecurringType);
        if (storedRecurringDays) setRecurringDays(JSON.parse(storedRecurringDays));
    }, []);

    const handleTicketCountChange = (e) => {
        const value = Number(e.target.value);

        if (value > maxQuota) {
            alert(`Jumlah tiket tidak boleh melebihi kuota (${maxQuota})`);
            setTicketCount(maxQuota);
        } else if (value < 1) {
            setTicketCount(1);
        } else {
            setTicketCount(value);
        }
    };

    const handleDateChange = (e) => {
        const date = e.target.value;

        if (!date) {
            setSelectedDate("");
            return;
        }

        const selected = new Date(date);
        const dayNameEnglish = selected.toLocaleDateString("en-US", { weekday: "long" });
        const dayNameIndonesian = dayNameToIndonesian(dayNameEnglish);

        console.log("Dipilih (EN):", dayNameEnglish);
        console.log("Dipilih (ID):", dayNameIndonesian);

        if (recurringType === "weekly" && !recurringDays.includes(dayNameEnglish.toLowerCase())) {
            const allowedDaysIndo = recurringDays.map(day => dayNameToIndonesian(day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()));
            alert(`Hanya bisa memilih di hari: ${allowedDaysIndo.join(", ")}`);
            setSelectedDate("");
            return;
        }        

        setSelectedDate(date);
    };

    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = getToken();

        if (!token) {
            alert("Anda harus login terlebih dahulu!");
            return;
        }

        if (!eventId || !ticketCategoryId) {
            alert("Data event atau kategori tiket tidak ditemukan.");
            return;
        }

        if (!selectedDate) {
            alert("Pilih tanggal terlebih dahulu.");
            return;
        }

        const bodyData = {
            event_id: eventId,
            tickets: [
                {
                    ticket_category_id: ticketCategoryId,
                    quantity: ticketCount,
                },
            ],
            date: selectedDate,
            payment_method: "cashless",
        };

        if (voucherCode && voucherCode.trim() !== "") {
            bodyData.promotion_code = voucherCode.trim();
        }

        console.log("Body Data yang Dikirim:", JSON.stringify(bodyData, null, 2));
        console.log("Authorization Token:", token);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ticket`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(bodyData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Gagal melakukan pemesanan tiket");
            }

            const snapToken = result?.order?.payment?.snap_token;

            if (!snapToken) {
                alert("Kode voucher tidak dapat digunakan atau pembayaran tidak tersedia.");
                return;
            }

            window.location.href = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${snapToken}`;

        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    const handleBack = () => {
        router.back();
    };

    const totalHarga = ticketPrice * ticketCount;

    const recurringDaysIndo = recurringDays.map(day => dayNameToIndonesian(day));

    return (
        <section className="relative py-12 px-6 md:px-28 text-white bg-gradient-to-b from-[#433D60] to-[#211E2E] min-h-screen">
            <button
                className="flex items-center text-gray-300 hover:text-white mb-6"
                onClick={handleBack}
            >
                <ArrowLeft size={24} className="mr-2" /> Kembali
            </button>

            <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center">Form Pembelian Tiket</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg font-semibold mb-2">Nama Event</label>
                        <input
                            type="text"
                            value={eventTitle}
                            readOnly
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-500 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Kategori Tiket</label>
                        <input
                            type="text"
                            value={ticketCategory}
                            readOnly
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-500 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Harga per Tiket</label>
                        <input
                            type="text"
                            value={`Rp ${ticketPrice.toLocaleString("id-ID")}`}
                            readOnly
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-500 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Jumlah Tiket</label>
                        <input
                            type="number"
                            min={1}
                            max={maxQuota}
                            value={ticketCount}
                            onChange={handleTicketCountChange}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                        <p className="text-sm text-gray-400 mt-1">
                            Maksimum pembelian {maxQuota} tiket.
                        </p>
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Total Harga</label>
                        <input
                            type="text"
                            value={`Rp ${totalHarga.toLocaleString("id-ID")}`}
                            readOnly
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-500 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2 flex justify-between items-center">
                            Pilih Tanggal Event
                            {recurringType === "weekly" && recurringDaysIndo.length > 0 && (
                                <span className="text-sm text-gray-400">
                                    Hanya bisa memilih hari {recurringDaysIndo.join(", ")}
                                </span>
                            )}
                        </label>

                        <input
                            type="date"
                            min={getMinDate()}
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Kode Voucher (Opsional)</label>
                        <input
                            type="text"
                            value={voucherCode}
                            onChange={(e) => setVoucherCode(e.target.value)}
                            placeholder="Masukkan kode voucher jika ada"
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-lg font-semibold transition-all"
                    >
                        Beli Tiket
                    </button>
                </form>
            </div>
        </section>
    );
}
