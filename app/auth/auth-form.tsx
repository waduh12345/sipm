"use client";

import { useState, useEffect, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  useRegisterMutation,
  useResendVerificationMutation,
} from "@/services/auth.service";
import Swal from "sweetalert2";
import {
  FaLock,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
  FaUniversity,
  FaMicroscope,
  FaBook,
  FaLightbulb,
  FaHandHoldingHeart,
  FaFileContract,
  FaChalkboardTeacher,
  FaGraduationCap,
} from "react-icons/fa";
import { motion } from "framer-motion";

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

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Pastikan Anda memiliki gambar-gambar ini di folder public/images/
// atau ganti dengan gambar placeholder universitas/penelitian
const carouselImages = [
  "/images/research-1.jpg", // Gambar kegiatan penelitian lab
  "/images/seminar-1.jpg",  // Gambar seminar/pengabdian
  "/images/campus-1.jpg",   // Gambar gedung kampus
];

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

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

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
          router.push("/admin/dashboard");
        } else {
          setError("Gagal masuk. Email atau NIDN/Password salah.");
        }
      } catch (err: unknown) {
        console.error("Login error:", err);
        setError("Login gagal. Cek kembali kredensial Anda.");
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
          title: "Registrasi Berhasil",
          text: "Silakan cek email institusi Anda untuk verifikasi.",
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
            text: "Apakah Anda ingin mengirim ulang email verifikasi?",
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
                text: "Link verifikasi telah dikirim ulang.",
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
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-blue-50 to-white">
      {/* Left Pane - SIPPM Theme with Carousel */}
      <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-blue-900">
        
        {/* Overlay Biru Akademik */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-blue-900/90 via-blue-800/60 to-transparent flex flex-col items-center justify-center p-8 text-white text-center">
          
          {/* Floating Icons - Academic/Research Theme */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Top Left */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-16 text-blue-300/40"
            >
              <FaUniversity size={32} />
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-32 left-8 text-blue-200/30"
            >
              <FaMicroscope size={24} />
            </motion.div>

            {/* Top Right */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-24 right-20 text-blue-300/40"
            >
              <FaBook size={28} />
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-40 right-12 text-blue-200/30"
            >
              <FaLightbulb size={26} />
            </motion.div>

            {/* Bottom Left */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-32 left-12 text-blue-300/40"
            >
              <FaHandHoldingHeart size={30} />
            </motion.div>

            <motion.div
              animate={{ y: [0, 18, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute bottom-20 left-24 text-blue-200/30"
            >
              <FaFileContract size={22} />
            </motion.div>

            {/* Bottom Right */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, -4, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              className="absolute bottom-28 right-16 text-blue-300/40"
            >
              <FaChalkboardTeacher size={28} />
            </motion.div>
          </div>

          {/* Glass Card Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="z-20 p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-blue-200/30 shadow-2xl max-w-lg"
          >
            {/* Logo Area */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white rounded-full shadow-lg">
                    {/* Ganti dengan Image logo kampus jika ada */}
                    <FaUniversity className="text-blue-700 text-3xl" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white tracking-wide">
                    SIPPM
                  </h2>
                  <p className="text-xs text-blue-100 uppercase tracking-widest mt-1">
                    Research & Community Service
                  </p>
                </div>
              </div>
            </div>

            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 mx-auto mb-6 rounded-full"></div>

            <h3 className="text-xl font-semibold text-white mb-2">
                Inovasi untuk Negeri
            </h3>
            <p className="text-sm font-light text-blue-50 leading-relaxed mb-6">
              Platform terintegrasi untuk pengelolaan proposal penelitian, hibah, 
              laporan kemajuan, dan publikasi ilmiah civitas akademika. 
              Mewujudkan tridharma perguruan tinggi yang transparan dan akuntabel.
            </p>

            <div className="flex justify-center gap-6 text-xs text-blue-100 font-medium">
              <div className="flex flex-col items-center gap-1">
                <FaMicroscope className="text-lg" />
                <span>Penelitian</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <FaHandHoldingHeart className="text-lg" />
                <span>Pengabdian</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <FaBook className="text-lg" />
                <span>Publikasi</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Indikator Slide */}
        <div className="absolute bottom-8 z-20 flex gap-2">
          {carouselImages.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-8 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"
                  : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Pane - Form Section */}
      <div className="relative flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-white transition-colors duration-500 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <motion.div
          className="w-full max-w-md space-y-8 relative z-10"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {/* Header Mobile Logo (Only visible on small screens usually, but kept for consistency) */}
          <motion.div variants={variants} className="text-center">
            <div className="lg:hidden flex justify-center mb-4">
               <div className="p-3 bg-blue-50 rounded-full">
                    <FaUniversity className="text-blue-700 text-2xl" />
                </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {isLogin ? "Selamat Datang" : "Registrasi Peneliti"}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {isLogin
                ? "Masuk untuk mengelola proposal dan laporan Anda"
                : "Daftar untuk mengajukan proposal hibah baru"}
            </p>
          </motion.div>

          <motion.form
            variants={variants}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {!isLogin && (
              <>
                <motion.div variants={variants} className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Nama Lengkap & Gelar
                  </Label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                      placeholder="Contoh: Dr. Budi Santoso, M.Kom"
                    />
                  </div>
                </motion.div>
                <motion.div variants={variants} className="space-y-1.5">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Nomor WhatsApp / HP
                  </Label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </motion.div>
              </>
            )}

            <motion.div variants={variants} className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Institusi / Pribadi
              </Label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <Input
                  id="email"
                  type="email"
                  placeholder="dosen@universitas.ac.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                />
              </div>
            </motion.div>

            <motion.div variants={variants} className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            {!isLogin && (
              <motion.div variants={variants} className="space-y-1.5">
                <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
                  Konfirmasi Password
                </Label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    placeholder="••••••••"
                  />
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                variants={variants}
                className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-2"
              >
                <div className="mt-0.5 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                </div>
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </motion.div>
            )}

            <motion.div variants={variants} className="pt-2">
              <Button
                type="submit"
                className="w-full h-11 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md hover:shadow-lg rounded-lg font-semibold text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Memproses...
                  </div>
                ) : (
                  <>
                    {isLogin ? "Masuk" : "Daftar Akun"}
                    <FaArrowRight className="text-sm" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>

           <motion.div
            variants={variants}
            className="text-center text-sm"
          >
            <span className="text-gray-500">
              {isLogin ? "Belum terdaftar sebagai peneliti?" : "Sudah memiliki akun?"}{" "}
            </span>
            <a
              href={isLogin ? "/auth/register" : "/auth/login"}
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              {isLogin ? "Registrasi di sini" : "Login sekarang"}
            </a>
          </motion.div>

          {/* Footer Info */}
          <motion.div variants={variants} className="mt-8 border-t pt-6 text-center">
             <div className="flex justify-center gap-4 text-gray-400 mb-2">
                <FaUniversity className="hover:text-blue-600 transition-colors cursor-pointer" />
                <FaBook className="hover:text-blue-600 transition-colors cursor-pointer" />
                <FaGraduationCap className="hover:text-blue-600 transition-colors cursor-pointer" />
             </div>
             <p className="text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Solocoding. All rights reserved.
             </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}