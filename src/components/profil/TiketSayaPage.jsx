"use client";

const tiketDummy = [
    {
        id: 1,
        nama: "Konser Musik Tradisional",
        jumlah: 2,
        tanggal: "01 Januari 2025",
        status: "Selesai",
    },
    {
        id: 2,
        nama: "Pameran Lukisan Musikalisasi",
        jumlah: 1,
        tanggal: "15 Februari 2025",
        status: "Belum Digunakan",
    },
];

export default function TiketSayaPage() {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Tiket Saya</h2>
            <div className="space-y-4">
                {tiketDummy.map((tiket) => (
                    <div
                        key={tiket.id}
                        className="border p-4 rounded-md bg-white shadow-md flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-lg font-semibold">{tiket.nama}</h3>
                            <p className="text-sm text-gray-600">Jumlah: {tiket.jumlah}</p>
                            <p className="text-sm text-gray-600">
                                Tanggal Pembelian: {tiket.tanggal}
                            </p>
                        </div>
                        <div>
                            <span
                                className={`px-4 py-2 rounded-full text-sm font-medium ${tiket.status === "Selesai"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-yellow-100 text-yellow-600"
                                    }`}
                            >
                                {tiket.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
