"use client";

import { useState } from "react";

export default function Akun() {
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        photo: "https://via.placeholder.com/150",
        username: "johndoe",
        email: "johndoe@example.com",
        phone: "081234567890",
    });
    const [password, setPassword] = useState({ old: "", new: "" });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsEditing(false);
        alert("Profil berhasil diperbarui!");
    };

    return (
        <div className="flex gap-6 py-16 px-6">
            <div className="container mx-auto flex gap-10">
                {/* Sidebar Kiri */}
                <div className="w-1/4 bg-white shadow-md p-4 rounded-md">
                    <div className="flex flex-col items-center">
                        <img src={profile.photo} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
                        <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                    </div>
                    <hr className="my-4" />
                    <button onClick={() => setActiveTab("profile")} className={`w-full text-left p-2 ${activeTab === "profile" ? "bg-gray-200" : ""}`}>Profil Saya</button>
                    <button onClick={() => setActiveTab("password")} className={`w-full text-left p-2 ${activeTab === "password" ? "bg-gray-200" : ""}`}>Ganti Password</button>
                </div>

                {/* Konten Kanan */}
                <div className="w-3/4 bg-white shadow-md p-6 rounded-md">
                    {activeTab === "profile" && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Profil Saya</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={profile.username}
                                        onChange={handleChange}
                                        className="border p-2 w-full"
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="block">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        className="border p-2 w-full"
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="block">No Handphone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        className="border p-2 w-full"
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                {isEditing ? (
                                    <button onClick={handleSave} className="bg-green-500 text-white px-6 py-2 rounded">Simpan</button>
                                ) : (
                                    <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-6 py-2 rounded">Edit</button>
                                )}
                            </div>
                        </div>
                    )}
                    {activeTab === "password" && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Ganti Password</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block">Password Lama</label>
                                    <input
                                        type="password"
                                        name="old"
                                        value={password.old}
                                        onChange={handlePasswordChange}
                                        className="border p-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block">Password Baru</label>
                                    <input
                                        type="password"
                                        name="new"
                                        value={password.new}
                                        onChange={handlePasswordChange}
                                        className="border p-2 w-full"
                                    />
                                </div>
                            </div>
                            <button className="bg-red-500 text-white px-6 py-2 rounded mt-6">Ubah Password</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
