import Image from "next/image";

const collections = [
  {
    id: 1,
    title: "Sasando: Kecapi dari Rote",
    description:
      "Alat musik petik khas Rote, NTT, yang terbuat dari daun lontar dan dikenal dengan suaranya yang harmonis.",
    image: "/images/sasando.jpg",
  },
  {
    id: 2,
    title: "Lukisan Perburuan Banteng - Raden Saleh",
    description:
      "Karya maestro Raden Saleh yang menggambarkan perburuan banteng sebagai simbol perjuangan dan keberanian.",
    image: "/images/lukisan.jpg",
  },
  {
    id: 3,
    title: "Naskah Kuno Kakawin Nagarakretagama",
    description:
      "Sebuah naskah sastra Jawa Kuno abad ke-14 yang berisi pujian terhadap Kerajaan Majapahit, mencerminkan keindahan gita dan rupa.",
    image: "/images/naskah.jpg",
  },
];

export default function Collection() {
  return (
    <section className="py-16 bg-none">
      <div className="container mx-auto px-6">
        {/* Judul */}
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Koleksi Unggulan
        </h2>

        {/* Grid Koleksi */}
        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-b from-[#433D60] to-[#211E2E] shadow-lg rounded-lg overflow-hidden text-white"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={250}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Lainnya */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] text-black font-semibold hover:opacity-90 transition">
            Lihat Lainnya
          </button>
        </div>
      </div>
    </section>
  );
}
