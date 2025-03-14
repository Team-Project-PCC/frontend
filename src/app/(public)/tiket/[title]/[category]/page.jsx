"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getToken } from "@/lib/auth";

export default function KategoriTiket() {
    const router = useRouter();

    const [eventTitle, setEventTitle] = useState("");
    const [ticketCategory, setTicketCategory] = useState("");
    const [ticketCount, setTicketCount] = useState(1);
    const [voucherCode, setVoucherCode] = useState("");
    const [maxQuota, setMaxQuota] = useState(1);

    const [eventId, setEventId] = useState(null);
    const [ticketCategoryId, setTicketCategoryId] = useState(null);

    useEffect(() => {
        const storedEventTitle = localStorage.getItem("selectedEventTitle");
        const storedCategory = localStorage.getItem("selectedCategory");
        const storedQuota = localStorage.getItem("selectedQuota");
        const storedEventId = localStorage.getItem("selectedEventId");
        const storedCategoryId = localStorage.getItem("selectedCategoryId");

        if (storedEventTitle) setEventTitle(storedEventTitle);
        if (storedCategory) setTicketCategory(storedCategory);

        if (storedQuota) {
            const quota = parseInt(storedQuota, 10);
            setMaxQuota(quota > 0 ? quota : 1);
        }

        if (storedEventId) setEventId(parseInt(storedEventId, 10));
        if (storedCategoryId) setTicketCategoryId(parseInt(storedCategoryId, 10));
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = getToken(); // Ambil token dari cookies

        if (!token) {
            alert("Anda harus login terlebih dahulu!");
            return;
        }

        if (!eventId || !ticketCategoryId) {
            alert("Data event atau kategori tiket tidak ditemukan.");
            return;
        }

        // Format body sesuai dengan kebutuhan baru
        const bodyData = {
            event_id: eventId,
            tickets: [
                {
                    ticket_category_id: ticketCategoryId,
                    quantity: ticketCount,
                },
            ],
            payment_method: "cashless", // Atur sesuai kebutuhan
            promotion_code: voucherCode !== "" ? voucherCode : null,
        };

        console.log("Body Data yang Dikirim:", JSON.stringify(bodyData, null, 2));
        console.log("Authorization Token:", token);

        try {
            // 1. Kirim data order tiket ke backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ticket`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Gagal melakukan pemesanan tiket");
            }

            const result = await response.json();
            console.log("Order Success:", result);

            // 2. Ambil snap_token dari response payment
            const snapToken = result?.order?.payment?.snap_token;
            if (!snapToken) {
                throw new Error("Snap token tidak ditemukan!");
            }

            // 3. Redirect ke Midtrans Snap URL
            window.location.href = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${snapToken}`;
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    const handleBack = () => {
        router.back();
    };

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
