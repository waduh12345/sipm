"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn, Scale } from "lucide-react"; // Mengganti Sparkles dengan Scale jika ada, atau menggunakan Lock
import Swal from "sweetalert2";

import { useAuthLoginMutation } from "@/services/customize/auth.service";
// Font sniglet dihapus penggunaannya agar terlihat lebih profesional (default font)
import { fredoka } from "@/lib/fonts";

interface ApiError {
  data?: {
    message?: string;
  };
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [authLogin, { isLoading }] = useAuthLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMsg("Silakan isi email dan kata sandi Anda.");
      return;
    }

    try {
      // 1. Request Login
      const response = await authLogin(formData).unwrap();

      if (response.success && response.data) {
        // ✅ SIMPAN TOKEN (Sync)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "code_client",
          "$2b$10$/pdGKqOqU7wOJUheZ07.H.AqTam8PZv5oLDtdxB5zT.25h3x491vy"
        );

        console.log("✅ Token saved manually in Login Page");

        await Swal.fire({
          icon: "success",
          title: "Berhasil Masuk",
          text: "Selamat datang kembali.",
          confirmButtonColor: "#5D9CEC", // Warna Biru tombol 'Let's Talk'
          timer: 1500,
          showConfirmButton: false,
          backdrop: `rgba(30, 58, 138, 0.2)`, // Backdrop Navy transparan
        });

        // 2. Redirect setelah token tersimpan
        const callbackUrl = searchParams.get("callbackUrl");
        if (callbackUrl) {
          router.push(decodeURIComponent(callbackUrl));
        } else {
          router.push("/customize/client");
        }
      }
    } catch (err: unknown) {
      console.error("Login error:", err);
      const apiErr = err as ApiError;
      setErrorMsg(
        apiErr?.data?.message || "Gagal masuk. Periksa kembali kredensial Anda."
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F9FA] relative">
      {/* Background Decorative - Navy Section at Bottom like the footer */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[#1e3a8a] z-0"></div>

      {/* --- Kartu Login Corporate Style --- */}
      <div className="relative z-10 bg-white p-10 rounded-lg shadow-xl w-full max-w-md mx-4 border-t-4 border-[#C5A059]">
        {/* Header Kartu */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-[#F0F4F8] p-4 rounded-full mb-4 shadow-sm">
            {/* Menggunakan Lock sebagai icon standar keamanan/legal */}
            <Lock className="w-8 h-8 text-[#1e3a8a]" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1e3a8a] tracking-wide">
            CLIENT LOGIN
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Masuk untuk mengakses layanan hukum Anda
          </p>
        </div>

        {/* Alert Error */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-center gap-3">
            <span className="font-bold">Error:</span> {errorMsg}
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Email */}
          <div className="relative group">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#5D9CEC] transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-[#5D9CEC] focus:ring-1 focus:ring-[#5D9CEC] transition-all text-gray-800 placeholder-gray-400 text-sm"
                required
              />
            </div>
          </div>

          {/* Input Password */}
          <div className="relative group">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#5D9CEC] transition-colors">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-[#5D9CEC] focus:ring-1 focus:ring-[#5D9CEC] transition-all text-gray-800 placeholder-gray-400 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#5D9CEC] transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Link Lupa Password & Submit */}
          <div className="flex flex-col gap-4 pt-2">
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-xs text-[#1e3a8a] hover:text-[#5D9CEC] hover:underline transition-colors font-semibold"
              >
                Lupa Kata Sandi?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5D9CEC] hover:bg-[#4A8BDB] text-white font-semibold text-sm py-3 px-4 rounded-full uppercase tracking-widest shadow-md hover:shadow-lg transform active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Link Register */}
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-gray-500 text-sm">
            Belum memiliki akun?{" "}
            <Link
              href="/register"
              className="text-[#1e3a8a] font-bold hover:text-[#C5A059] transition-colors"
            >
              Daftar Disini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-gray-50 animate-pulse" />}
    >
      <LoginContent />
    </Suspense>
  );
}