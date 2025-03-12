"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../../components/profil/Sidebar";
import ProfilePage from "../../../components/profil/ProfilePage";
import ChangePasswordPage from "../../../components/profil/ChangePasswordPage";
import TiketSayaPage from "../../../components/profil/TiketSayaPage";
import { getToken } from "../../../lib/auth";

export default function ProfilSaya() {
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState({
        photo: "",
        username: "",
        email: "",
    });

    const [password, setPassword] = useState({ old: "", new: "" });

    //  Fetch Profile saat page load
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = getToken();
                console.log("Token:", token); // Debugging token

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                console.log("Fetch profile response:", data);

                if (data.status === "success" && data.user) {
                    const user = data.user;

                    setProfile({
                        photo: user.url_avatar || "/images/user2.jpg",
                        username: user.name,
                        email: user.email,
                    });
                } else {
                    console.error("Gagal ambil data user, data kosong atau status bukan success:", data);

                    // Fallback default user
                    setProfile({
                        photo: "/images/user2.jpg",
                        username: "Guest",
                        email: "guest@example.com",
                    });
                }
            } catch (error) {
                console.error("Terjadi error fetch profile:", error);
            }
        };

        fetchProfile();
    }, []);

    //  Handle perubahan input text profil
    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    //  Handle perubahan input password
    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    //  Handle simpan profil (POST ke API /update_profile)
    const handleSaveProfile = async () => {
        try {
            const token = getToken();
            console.log("Token untuk update:", token); // Debug token lagi kalau perlu

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update_profile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: profile.username,
                    email: profile.email,
                }),
            });

            const result = await res.json();
            console.log("Update profile response:", result);

            if (res.ok && result.status === "success") {
                const updatedUser = result.data;

                setProfile({
                    photo: updatedUser.url_avatar || "/images/user2.jpg",
                    username: updatedUser.name,
                    email: updatedUser.email,
                });

                alert(result.message || "Profil berhasil diperbarui!");
                setIsEditing(false);
            } else {
                alert("Gagal memperbarui profil!");
                console.error("Error response:", result);
            }
        } catch (error) {
            console.error("Error saat menyimpan profil:", error);
        }
    };

    //  Handle ubah foto lokal (preview)
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const photoURL = URL.createObjectURL(file);
            setProfile({ ...profile, photo: photoURL });

            // Kalau mau upload avatar ke server, tambahin upload logic di sini
        }
    };

    return (
        <div className="flex gap-6 py-16 px-6">
            <div className="container mx-auto flex gap-10 flex-col md:flex-row">
                {/* Sidebar */}
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Konten */}
                <div className="w-full md:w-3/4 bg-white shadow-md p-6 rounded-md">
                    {activeTab === "profile" && (
                        <ProfilePage
                            profile={profile}
                            isEditing={isEditing}
                            onChange={handleProfileChange}
                            onSave={handleSaveProfile}
                            onEdit={() => setIsEditing(true)}
                            onChangePhoto={handlePhotoChange}
                        />
                    )}

                    {activeTab === "password" && (
                        <ChangePasswordPage
                            password={password}
                            onChange={handlePasswordChange}
                        />
                    )}

                    {activeTab === "tickets" && <TiketSayaPage />}
                </div>
            </div>
        </div>
    );
}
