"use client"; // ⬅️ WAJIB kalau di App Router dan pakai useRouter dari next/navigation

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import LoadingOverlay from "../LoadingOverlay";
import { useRouter } from "next/navigation"; // ⬅️ dari next/navigation (App Router)

export default function TiketSayaPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter(); // ⬅️ pakai useRouter dari next/navigation

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);

            const token = getToken();

            if (!token) {
                setError("Token tidak ditemukan. Silakan login ulang.");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Gagal mengambil data profile");
                }

                const response = await res.json();

                const userOrders = response?.history_order || [];
                setOrders(userOrders);
            } catch (err) {
                console.error(err);
                setError(err.message || "Terjadi kesalahan");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleOrderClick = (eventName, orderId) => {
        // Simpan ID order di localStorage
        localStorage.setItem("selectedOrderId", orderId);
    
        // Bikin slug buat URL
        const slug = eventName.toLowerCase().replace(/\s+/g, "-");
    
        // Navigasi pakai slug
        router.push(`/profil-saya/riwayat/${slug}`);
    };    

    if (loading) {
        return <LoadingOverlay />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Tiket Saya</h2>

            <div className="space-y-4">
                {orders.length === 0 ? (
                    <p className="text-gray-500">Belum ada riwayat pemesanan tiket.</p>
                ) : (
                    orders.map((order) => {
                        const { label, className } = getStatus(order);
                        const eventName = getEventName(order.event_id);

                        return (
                            <div
                                key={order.id}
                                className="border p-4 rounded-md bg-white shadow-md flex justify-between items-center cursor-pointer hover:bg-gray-50"
                                onClick={() => handleOrderClick(eventName, order.id)} // ⬅️ trigger navigasi
                            >
                                <div>
                                    <h3 className="text-lg font-semibold">{eventName}</h3>
                                    <p className="text-sm text-gray-600">
                                        {formatDate(order.date)}
                                    </p>
                                </div>

                                <div>
                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${className}`}
                                    >
                                        {label}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

// Helper Functions
const getEventName = (eventId) => {
    switch (eventId) {
        case 1:
            return "Konser Musik Tradisional";
        case 4:
            return "Festival Budaya";
        default:
            return "Event Lainnya";
    }
};

const getStatus = (order) => {
    const isPastEvent = new Date(order.date) < new Date();
    const paymentStatus = order.payment?.status;

    if (paymentStatus === "pending") {
        return {
            label: "Belum Dibayar",
            className: "bg-yellow-100 text-yellow-600",
        };
    }

    if (paymentStatus === "success" && !isPastEvent) {
        return {
            label: "Sudah Dibayar",
            className: "bg-blue-100 text-blue-600",
        };
    }

    if (paymentStatus === "success" && isPastEvent) {
        return {
            label: "Selesai",
            className: "bg-green-100 text-green-600",
        };
    }

    return {
        label: "Gagal",
        className: "bg-gray-100 text-gray-600",
    };
};

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}
