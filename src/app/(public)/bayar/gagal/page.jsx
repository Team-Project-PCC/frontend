import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentFailed() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8" style={{ backgroundColor: "#302C42" }}>
            {/* Icon Gagal */}
            <XCircle className="text-red-400 w-24 h-24 mb-6" />

            {/* Judul */}
            <h1 className="text-3xl font-semibold text-white mb-4">
                Pembayaran Gagal!
            </h1>

            {/* Deskripsi */}
            <p className="text-gray-300 text-center max-w-md mb-8">
                Maaf, pembayaran Anda tidak berhasil. Silakan cek riwayat tiket Anda untuk detail lebih lanjut
            </p>

            {/* Tombol Coba Lagi */}
            <div>
                <Link href="/profil-saya">
                    <button className="bg-gray-100 hover:bg-gray-300 text-[#302C42] text-lg font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md">
                        Cek Riwayat
                    </button>
                </Link>
            </div>
        </div>
    );
}
