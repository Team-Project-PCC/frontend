"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function RiwayatEventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { slug: eventSlug } = params;

    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedOrderId = localStorage.getItem("selectedOrderId");

        if (!storedOrderId) {
            console.warn("Order ID tidak ditemukan di localStorage");
            setLoading(false);
            return;
        }

        setSelectedOrderId(parseInt(storedOrderId));
    }, []);

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

            const orderDetail = result?.history_order?.find(
                (order) => order.id === selectedOrderId
            );

            if (!orderDetail) {
                console.warn("Order tidak ditemukan.");
                setOrderData(null);
            } else {
                setOrderData(orderDetail);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return <LoadingOverlay/>;

    if (!orderData)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#302C42] text-gray-400 px-4">
                <button
                    className="flex items-center text-gray-300 hover:text-white mb-6"
                    onClick={() => router.back()}
                >
                    <ArrowLeft size={24} className="mr-2" /> Kembali
                </button>
                <p className="text-lg">Riwayat pemesanan tidak ditemukan.</p>
            </div>
        );

    const snapToken = orderData?.payment?.snap_token;

    return (
        <div className="min-h-screen bg-[#302C42] text-gray-100 py-12 px-6 md:px-28 flex flex-col">
            <button
                className="flex items-center text-gray-300 hover:text-white mb-10"
                onClick={() => router.back()}
            >
                <ArrowLeft size={24} className="mr-2" /> Kembali
            </button>

            <div className="flex justify-center items-start">
                <div
                    key={orderData.id}
                    className="w-full max-w-5xl bg-[#3A354D] border border-[#4A4466] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300"
                >
                    {/* Order Info */}
                    <div className="flex justify-between items-center mb-1">
                        <h2 className="text-2xl font-semibold capitalize tracking-wide">
                            {`${eventSlug.replace(/-/g, " ")}`}
                        </h2>
                        <span
                            className={`text-sm font-medium px-4 py-2 rounded-full
                                ${orderData?.payment?.status === "success"
                                    ? "bg-green-700 text-green-300"
                                    : orderData?.payment?.status === "pending"
                                        ? "bg-yellow-700 text-yellow-300"
                                        : "bg-red-700 text-red-300"
                                }`}
                        >
                            {orderData?.payment?.status ?? "unknown"}
                        </span>
                    </div>

                    <p className="text-sm text-gray-400 mb-8">
                        {orderData.created_at
                            ? new Date(orderData.created_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })
                            : "-"}
                    </p>

                    <div className="mb-10">
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Detail Tiket</h3>
                        <div className="space-y-4">
                            {orderData.ticket_order_details && orderData.ticket_order_details.length > 0 ? (
                                orderData.ticket_order_details.map((detail) => (
                                    <div
                                        key={detail.id}
                                        className="py-5 px-8 bg-[#4A4466] rounded-lg"
                                    >
                                        <div className="flex flex-col gap-3 text-md">
                                            <div className="flex">
                                                <div className="min-w-[200px]">Kategori</div>
                                                <div className="font-medium capitalize">: {detail.ticket_category?.category ?? "-"}</div>
                                            </div>
                                            <div className="flex">
                                                <div className="min-w-[200px]">Jumlah</div>
                                                <div className="font-medium">: {detail.quantity ?? 0} tiket</div>
                                            </div>
                                            <div className="flex">
                                                <div className="min-w-[200px] ">Harga Satuan</div>
                                                <div className="font-medium">
                                                    : Rp {detail.price ? parseInt(detail.price).toLocaleString("id-ID") : 0}
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="min-w-[200px]">Subtotal</div>
                                                <div className="font-medium">
                                                    : Rp {detail.subtotal ? parseInt(detail.subtotal).toLocaleString("id-ID") : 0}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm">
                                    Tidak ada detail tiket.
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Detail Pembayaran</h3>
                        <div className="space-y-4">
                            <div className="py-5 px-8 bg-[#4A4466] rounded-lg">
                                <div className="flex flex-col gap-3 text-md">
                                    <div className="flex">
                                        <div className="min-w-[200px]">Metode Pembayaran</div>
                                        <div className="font-medium capitalize">: {orderData.payment?.method ?? "-"}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="min-w-[200px]">Status</div>
                                        <div className="font-medium capitalize">: {orderData.payment?.status ?? "-"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Price */}
                        <div className="mt-6 p-5 rounded-lg text-right">
                            <p className="text-lg font-bold mb-4">
                                Total Harga: Rp{" "}
                                {orderData.total_price
                                    ? parseInt(orderData.total_price).toLocaleString("id-ID")
                                    : 0}
                            </p>

                            {/* Button Bayar Sekarang */}
                            {orderData.payment?.status === "pending" && snapToken && (
                                <a
                                    href={`https://app.sandbox.midtrans.com/snap/v2/vtweb/${snapToken}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white text-center font-semibold px-6 py-3 rounded-lg transition duration-300"
                                >
                                    Bayar Sekarang
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
