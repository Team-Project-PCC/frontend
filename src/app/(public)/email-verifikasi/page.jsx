"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setToken, setUser } from "@/lib/auth";

export default function EmailVerifikasi() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useState(null);

    useEffect(() => {
        setSearchParams(new URLSearchParams(window.location.search));
    }, []);

    useEffect(() => {
        if (!searchParams) return;

        const token = searchParams.get("token");
        const userId = searchParams.get("id");

        if (token && userId) {
            setToken(token);
            console.log("Token disimpan:", token);

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
                credentials: "include",
            })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setUser(data);
                    router.push("/");
                } else {
                    throw new Error("User tidak ditemukan");
                }
            })
            .catch(() => router.push("/masuk"))
            .finally(() => setLoading(false));
        } else {
            console.error("Token atau ID tidak ditemukan di URL");
            router.push("/masuk");
        }
    }, [searchParams, router]);

    return <p>{loading ? "Memverifikasi email..." : "Verifikasi gagal, mengarahkan..."}</p>;
}
