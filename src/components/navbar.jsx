"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getToken, getUser, removeToken, removeUser } from "../lib/auth";
import { useRouter } from "next/navigation";
import { FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi"; // Tambahkan FiMenu dan FiX

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        const userData = getUser();

        if (token && userData) {
            setUser(userData);
        }
    }, []);

    const handleLogout = () => {
        removeToken();
        removeUser();
        setUser(null);
        router.push("/");
    };

    return (
        <nav className="bg-none shadow-md p-4 fixed top-0 z-50 w-full backdrop-blur-md bg-opacity-90">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src="/images/logo.svg"
                        alt="Logo"
                        width={80}
                        height={40}
                        className="w-16 h-auto md:w-20"
                    />
                </Link>

                {/* Hamburger Icon (Mobile) */}
                <button
                    className="text-white text-2xl md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 text-white font-medium text-base">
                    <li><Link href="/">Beranda</Link></li>
                    <li><Link href="/koleksi">Koleksi</Link></li>
                    <li><Link href="/acara">Acara</Link></li>
                    <li><Link href="/tiket">Tiket</Link></li>
                </ul>

                {/* Desktop Auth Buttons */}
                {user ? (
                    <div className="relative hidden md:flex items-center">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] text-white text-sm font-medium hover:opacity-90 transition"
                        >
                            <Image
                                src={user.url_avatar || "/images/default-avatar.png"}
                                alt="Avatar"
                                width={28}
                                height={28}
                                className="w-7 h-7 rounded-full border border-white"
                            />
                            <span>{user.name}</span>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute top-12 right-0 w-48 bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] shadow-lg rounded-lg py-2">
                                <Link
                                    href="/profil"
                                    className="flex items-center px-4 py-2 text-white hover:bg-[#8176AF] transition text-sm"
                                >
                                    <FiUser className="mr-2" /> Profil Saya
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-2 text-red-800 hover:bg-[#8176AF] transition text-sm"
                                >
                                    <FiLogOut className="mr-2" /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="hidden md:flex space-x-4">
                        <Link
                            href="/masuk"
                            className="border border-white px-4 py-2 rounded-full text-white text-sm font-medium"
                        >
                            Masuk
                        </Link>
                        <Link
                            href="/daftar"
                            className="bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] text-black px-4 py-2 rounded-full text-sm"
                        >
                            Daftar
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden mt-4 px-4 space-y-4 bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] rounded-lg py-4 text-white text-sm font-medium transition-all duration-300">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2">Beranda</Link>
                    <Link href="/koleksi" onClick={() => setMobileMenuOpen(false)} className="block py-2">Koleksi</Link>
                    <Link href="/acara" onClick={() => setMobileMenuOpen(false)} className="block py-2">Acara</Link>
                    <Link href="/tiket" onClick={() => setMobileMenuOpen(false)} className="block py-2">Tiket</Link>

                    {user ? (
                        <>
                            <Link
                                href="/profil"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center py-2"
                            >
                                <FiUser className="mr-2" /> Profil Saya
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMobileMenuOpen(false);
                                }}
                                className="flex items-center w-full py-2 text-red-800"
                            >
                                <FiLogOut className="mr-2" /> Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            <Link
                                href="/masuk"
                                onClick={() => setMobileMenuOpen(false)}
                                className="border border-white px-4 py-2 rounded-full text-white text-center"
                            >
                                Masuk
                            </Link>
                            <Link
                                href="/daftar"
                                onClick={() => setMobileMenuOpen(false)}
                                className="bg-white text-black px-4 py-2 rounded-full text-center"
                            >
                                Daftar
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
