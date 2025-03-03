import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="bg-none shadow-md p-4 fixed top-0 z-50 w-full backdrop-blur-md bg-opacity-90">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                    <Image src="/images/logo.svg" alt="Logo" width={100} height={50} className="w-20 h-auto" />
                </Link>

                {/* Menu */}
                <ul className="hidden md:flex space-x-6 text-white font-medium">
                    <li><Link href="/">Beranda</Link></li>
                    <li><Link href="/koleksi">Koleksi</Link></li>
                    <li><Link href="/acara">Acara</Link></li>
                    <li><Link href="/tiket">Tiket</Link></li>
                </ul>

                {/* Tombol Masuk & Daftar */}
                <div className="hidden md:flex space-x-4">
                    <Link href="/masuk" className="border border-white px-6 py-2 rounded-full text-white font-medium">Masuk</Link>
                    <Link href="/daftar" className="bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] text-black px-6 py-2 rounded-full">Daftar</Link>
                </div>
            </div>
        </nav>
    );
}