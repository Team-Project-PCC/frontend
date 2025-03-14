import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8" style={{ backgroundColor: "#302C42" }}>
            {/* Icon Berhasil */}
            <CheckCircle className="text-green-400 w-24 h-24 mb-6" />

            {/* Judul */}
            <h1 className="text-3xl font-semibold text-white mb-4">
                Pembayaran Berhasil!
            </h1>

            {/* Deskripsi */}
            <p className="text-gray-300 text-center max-w-md mb-8">
                Terima kasih! Pembayaran Anda telah berhasil dikonfirmasi.
                Silakan cek riwayat tiket Anda untuk detail lebih lanjut.
            </p>

            {/* Tombol Cek Riwayat */}
            <Link href="/profil-saya">
                <button className="bg-green-400 hover:bg-green-500 text-[#302C42] text-lg font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md">
                    Cek Riwayat Tiket
                </button>
            </Link>
        </div>
    );
}
