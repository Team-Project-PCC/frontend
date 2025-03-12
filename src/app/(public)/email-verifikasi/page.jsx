"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setToken, setUser } from "@/lib/auth";

export default function EmailVerifikasi() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = searchParams.get("token");
        const userId = searchParams.get("id");

        if (token && userId) {
            setToken(token); // Simpan token
            console.log("Token disimpan:", token);

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
                credentials: "include",
            })
            .then((res) => {
                console.log("Respon status API:", res.status);
                return res.json();
            })
            .then((data) => {
                console.log("Data user diterima:", data);
                if (data) {
                    setUser(data); // Simpan data user
                    router.push("/"); // Redirect ke home
                } else {
                    throw new Error("User tidak ditemukan");
                }
            })
            .catch((error) => {
                console.error("Error saat verifikasi:", error);
                router.push("/masuk"); // Redirect ke login jika gagal
            })
            .finally(() => setLoading(false));
        } else {
            console.error("Token atau ID tidak ditemukan di URL");
            router.push("/masuk"); // Redirect jika token tidak ada
        }
    }, [router, searchParams]);

    return <p>{loading ? "Memverifikasi email..." : "Verifikasi gagal, mengarahkan..."}</p>;
}
