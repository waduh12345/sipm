"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CarouselAuth } from "@/components/ui/carousel-auth";
import {
  useRegisterMutation,
  useResendVerificationMutation,
} from "@/services/auth.service";
import Swal from "sweetalert2";

type AuthFormProps = {
  mode: "login" | "register";
};

type RegisterError = {
  status: number;
  data?: {
    message?: string;
    [key: string]: unknown;
  };
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isLogin = mode === "login";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [register] = useRegisterMutation();
  const [resendVerification] = useResendVerificationMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (isLogin) {
      try {
        const signInRes = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (signInRes?.ok) {
          router.push("/admin/home");
        } else {
          setError("Gagal masuk. Email atau password salah.");
        }
      } catch (err: unknown) {
        console.error("Login error:", err);
        setError("Login gagal. Cek kembali email dan password.");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Handle Register
      if (password !== passwordConfirmation) {
        setError("Konfirmasi password tidak cocok.");
        setIsLoading(false);
        return;
      }

      try {
        await register({
          name,
          email,
          phone,
          password,
          password_confirmation: passwordConfirmation,
        }).unwrap();

        await Swal.fire({
          title: "Pendaftaran berhasil",
          text: "Silakan cek email kamu untuk verifikasi sebelum login.",
          icon: "success",
        });

        router.push("/auth/login");
      } catch (err) {
        const error = err as RegisterError;
        console.error("Register error:", error);
        const message =
          error?.data?.message || "Pendaftaran gagal. Cek kembali data Anda.";

        const showResend = message.toLowerCase().includes("belum verifikasi");

        if (showResend) {
          const result = await Swal.fire({
            title: "Email belum diverifikasi",
            text: "Apakah kamu ingin mengirim ulang email verifikasi?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Kirim Ulang",
            cancelButtonText: "Batal",
          });

          if (result.isConfirmed) {
            try {
              await resendVerification({ email }).unwrap();
              await Swal.fire({
                title: "Terkirim!",
                text: "Email verifikasi berhasil dikirim ulang.",
                icon: "success",
              });
            } catch {
              await Swal.fire({
                title: "Gagal",
                text: "Gagal mengirim ulang email verifikasi.",
                icon: "error",
              });
            }
          }
        }

        setError(message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-5 bg-[#414042] text-white">
      <div className="flex items-center justify-center px-6 py-12 col-span-2">
        <div className="w-full max-w-md space-y-6 bg-white rounded-lg p-8 shadow-xl">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-[#414042]">
              {isLogin ? "Masuk ke Akun Anda" : "Buat Akun Baru"}
            </h1>
            <p className="text-sm text-gray-600">
              {isLogin
                ? "Masukkan email dan password Anda untuk melanjutkan"
                : "Lengkapi form di bawah ini untuk mendaftar dan mulai perjalanan Anda"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#414042]">Nama Lengkap</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-gray-300 focus:border-[#eaaf15] focus:ring-[#eaaf15]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#414042]">No. HP</Label>
                  <Input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border-gray-300 focus:border-[#eaaf15] focus:ring-[#eaaf15]"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#414042]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="emailanda@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-[#414042] border-gray-300 focus:border-[#eaaf15] focus:ring-[#eaaf15]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#414042]">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-[#414042] border-gray-300 focus:border-[#eaaf15] focus:ring-[#eaaf15]"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="password_confirmation" className="text-[#414042]">
                  Konfirmasi Password
                </Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                  className="border-gray-300 focus:border-[#eaaf15] focus:ring-[#eaaf15]"
                />
              </div>
            )}

            {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-[#eaaf15] hover:bg-[#d49d13] text-white py-2 px-4 rounded-md font-semibold transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Memuat..." : isLogin ? "Masuk" : "Daftar Sekarang"}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              {isLogin
                ? "Masuk menggunakan akun yang sudah dibuatkan oleh SuperAdmin"
                : "Setelah mendaftar, akun Anda akan aktif secara otomatis"}
            </p>
          </form>
        </div>
      </div>

      <div className="hidden lg:block bg-[#2d2c2e] relative col-span-3">
        <CarouselAuth />
      </div>
    </div>
  );
}