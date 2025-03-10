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
      "Sebuah naskah sastra Jawa Kuno abad ke-14 yang berisi pujian terhadap Kerajaan Majapahit.",
    image: "/images/naskah.jpg",
  },
];

export default function Collection() {
  return (
    <section className="py-16 bg-none">
      <div className="container mx-auto px-8 md:px-10">
        {/* Judul */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-12">
          Koleksi Unggulan
        </h2>

        {/* Grid Koleksi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-b from-[#433D60] to-[#211E2E] shadow-lg rounded-lg overflow-hidden text-white transition-transform hover:scale-105"
            >
              <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-lg md:text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Lainnya */}
        <div className="mt-10 md:mt-12 text-center">
          <button className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] text-black font-semibold text-sm md:text-base hover:opacity-90 transition">
            Lihat Lainnya
          </button>
        </div>
      </div>
    </section>
  );
}
