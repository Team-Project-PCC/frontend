import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function PaymentUnfinish() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8" style={{ backgroundColor: "#302C42" }}>
            {/* Icon Gagal atau Belum Selesai */}
            <AlertCircle className="text-yellow-400 w-24 h-24 mb-6" />

            {/* Judul */}
            <h1 className="text-3xl font-semibold text-white mb-4">
                Pembayaran Belum Selesai
            </h1>

            {/* Deskripsi */}
            <p className="text-gray-300 text-center max-w-md mb-8">
                Transaksi Anda belum selesai. Silakan cek riwayat tiket Anda untuk melanjutkan proses pembayaran atau melakukan pengecekan ulang.
            </p>

            {/* Tombol Cek Riwayat */}
            <Link href="/profil-saya">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-[#302C42] text-lg font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md">
                    Cek Riwayat Tiket
                </button>
            </Link>
        </div>
    );
}
