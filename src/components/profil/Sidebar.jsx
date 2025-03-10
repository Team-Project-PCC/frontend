"use client";

export default function Sidebar({ activeTab, setActiveTab }) {
    const baseButtonClass =
        "w-full text-left p-2 text-white transition-all duration-200";

    const activeButtonClass =
        "bg-transparent border-l-4 border-white text-lg font-semibold";

    return (
        <div className="w-full md:w-1/4 bg-none p-4">
            <button
                onClick={() => setActiveTab("profile")}
                className={`${baseButtonClass} ${activeTab === "profile" ? activeButtonClass : ""
                    }`}
            >
                Profil Saya
            </button>

            <button
                onClick={() => setActiveTab("password")}
                className={`${baseButtonClass} ${activeTab === "password" ? activeButtonClass : ""
                    }`}
            >
                Ganti Password
            </button>

            <button
                onClick={() => setActiveTab("tickets")}
                className={`${baseButtonClass} ${activeTab === "tickets" ? activeButtonClass : ""
                    }`}
            >
                Tiket Saya
            </button>
        </div>
    );
}
