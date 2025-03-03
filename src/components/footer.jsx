import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#211E2E] text-white py-10">
            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">

                {/* Logo & Nama Museum */}
                <div className="flex flex-col items-center md:items-start">
                    <Image src="/images/logo.svg" alt="Museum GitaRupa" width={120} height={60} />
                    <p className="mt-2 text-gray-400">Museum GitaRupa</p>
                </div>

                {/* Lokasi & Jam Operasional */}
                <div>
                    <h3 className="text-lg font-semibold">Lokasi</h3>
                    <p className="text-gray-300">Jl. Seni dan Nada No. 10, Jakarta</p>

                    <h3 className="text-lg font-semibold mt-4">Jam Berkunjung</h3>
                    <p className="text-gray-300">Senin - Minggu: 09.00 - 18.00 WIB</p>
                </div>

                {/* Sosial Media */}
                <div>
                    <h3 className="text-lg font-semibold">Ikuti Kami</h3>
                    <div className="flex justify-center md:justify-start space-x-4 mt-2">
                        <Link href="https://instagram.com" target="_blank">
                            <FaInstagram className="text-2xl text-gray-300 hover:text-white" />
                        </Link>
                        <Link href="https://youtube.com" target="_blank">
                            <FaYoutube className="text-2xl text-gray-300 hover:text-white" />
                        </Link>
                        <Link href="https://tiktok.com" target="_blank">
                            <FaTiktok className="text-2xl text-gray-300 hover:text-white" />
                        </Link>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <div className="mt-8 text-center text-gray-400">
                © {new Date().getFullYear()} Museum GitaRupa. All rights reserved.
            </div>
        </footer>
    );
}
