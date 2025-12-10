"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Tambahkan ini
// ...import lainnya

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/v1");
    }, [router]);

    // Optional: return null agar tidak render apapun
    return null;
}
