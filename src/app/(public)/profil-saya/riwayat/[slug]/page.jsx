"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";

const RiwayatEventDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const { eventName: eventSlug } = params; // Bisa dipakai buat title

    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Ambil orderId dari localStorage saat pertama load
    useEffect(() => {
        const storedOrderId = localStorage.getItem("selectedOrderId");

        if (!storedOrderId) {
            console.warn("Order ID tidak ditemukan di localStorage");
            setLoading(false);
            return;
        }

        setSelectedOrderId(parseInt(storedOrderId)); // simpan ke state
    }, []);

    // Fetch history order berdasarkan ID
    useEffect(() => {
        if (!selectedOrderId) return;

        fetchHistory();
    }, [selectedOrderId]);

    const fetchHistory = async () => {
        try {
            setLoading(true);

            const token = getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Gagal mengambil data riwayat");
            }

            const result = await res.json();

            const orderDetail = result.history_order.find(
                (order) => order.id === selectedOrderId
            );

            if (!orderDetail) {
                console.warn("Order tidak ditemukan.");
                setOrderData([]);
            } else {
                setOrderData([orderDetail]); // tetap array supaya map jalan
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return <p className="text-center mt-10">Loading...</p>;

    if (orderData.length === 0)
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
                <p>Riwayat pemesanan tidak ditemukan.</p>
                <button
                    onClick={() => router.back()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                >
                    <ArrowLeft size={18} /> Kembali
                </button>
            </div>
        );

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-blue-500 hover:underline"
                >
                    <ArrowLeft className="mr-1" size={18} /> Kembali
                </button>
                <h1 className="text-2xl font-semibold capitalize">
                    {`Riwayat Event ${eventSlug.replace(/-/g, " ")}`}
                </h1>
            </div>

            {orderData.map((order) => (
                <div
                    key={order.id}
                    className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm hover:shadow transition duration-300"
                >
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-medium">Order #{order.id}</h2>
                        <span
                            className={`text-sm px-2 py-1 rounded ${order.payment.status === "success"
                                    ? "bg-green-100 text-green-600"
                                    : order.payment.status === "pending"
                                        ? "bg-yellow-100 text-yellow-600"
                                        : "bg-red-100 text-red-600"
                                }`}
                        >
                            {order.payment.status}
                        </span>
                    </div>

                    <p className="text-sm text-gray-600">
                        Tanggal Order: {new Date(order.created_at).toLocaleDateString()}
                    </p>

                    <div className="mt-4">
                        <h3 className="font-medium">Detail Tiket:</h3>
                        {order.ticket_order_details.map((detail) => (
                            <div
                                key={detail.id}
                                className="mt-2 p-3 bg-gray-50 rounded"
                            >
                                <p>
                                    <span className="font-medium">Kategori:</span>{" "}
                                    {detail.ticket_category.category}
                                </p>
                                <p>
                                    <span className="font-medium">Jumlah:</span>{" "}
                                    {detail.quantity}
                                </p>
                                <p>
                                    <span className="font-medium">Harga Satuan:</span> Rp{" "}
                                    {parseInt(detail.price).toLocaleString("id-ID")}
                                </p>
                                <p>
                                    <span className="font-medium">Subtotal:</span> Rp{" "}
                                    {parseInt(detail.subtotal).toLocaleString("id-ID")}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 border-t pt-2 text-right">
                        <p className="font-semibold">
                            Total Harga: Rp{" "}
                            {parseInt(order.total_price).toLocaleString("id-ID")}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RiwayatEventDetailPage;