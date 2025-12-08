"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Hero } from "@/types/admin/hero";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getImageUrl } from "@/lib/image-url";

interface FormHeroProps {
  form: Partial<Hero> | undefined;
  setForm: (data: Partial<Hero>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  readonly?: boolean;
  isLoading?: boolean;
}

export default function FormHero({
  form,
  setForm,
  onCancel,
  onSubmit,
  readonly = false,
  isLoading = false,
}: FormHeroProps) {
  useEffect(() => {
    if (!form) {
      setForm({
        bahasa: "",
        judul: "",
        sub_judul: "",
        tagline: "",
        deskripsi: "",
        button_text_1: "",
        button_text_2: "",
        info_1: "",
        info_2: "",
        info_3: "",
        info_nilai_1: "",
        info_nilai_2: "",
        info_nilai_3: "",
        status: 1,
      });
    }
  }, [form, setForm]);

  if (!form) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-3xl space-y-4 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {readonly ? "Detail Hero" : form.id ? "Edit Hero" : "Tambah Hero"}
        </h2>
        <Button variant="ghost" onClick={onCancel}>
          ✕
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Bahasa */}
        <div className="flex flex-col gap-y-1">
          <Label>Bahasa</Label>
          {readonly ? (
            <Input value={form.bahasa || ""} readOnly />
          ) : (
            <Input
              value={form.bahasa || ""}
              onChange={(e) => setForm({ ...form, bahasa: e.target.value })}
              placeholder="cth: id, en"
            />
          )}
        </div>

        {/* Status */}
        <div className="flex flex-col gap-y-1 w-full sm:col-span-1">
          <Label>Status</Label>
          {readonly ? (
            <Input
              className="w-full"
              value={form.status === 1 ? "Aktif" : "Nonaktif"}
              readOnly
            />
          ) : (
            <Select
              value={(form.status ?? 1).toString()}
              onValueChange={(val) =>
                setForm({ ...form, status: parseInt(val, 10) })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Aktif</SelectItem>
                <SelectItem value="0">Nonaktif</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Judul */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Judul</Label>
          <Input
            value={form.judul || ""}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan judul"
          />
        </div>

        {/* Sub Judul */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Sub Judul</Label>
          <Textarea
            value={form.sub_judul || ""}
            onChange={(e) => setForm({ ...form, sub_judul: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan sub judul"
            rows={3}
          />
        </div>

        {/* Tagline */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Tagline</Label>
          <Input
            value={form.tagline || ""}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan tagline"
          />
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Deskripsi</Label>
          <Textarea
            value={form.deskripsi || ""}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan deskripsi"
            rows={4}
          />
        </div>

        {/* Button text */}
        <div className="flex flex-col gap-y-1">
          <Label>Teks Tombol 1</Label>
          <Input
            value={form.button_text_1 || ""}
            onChange={(e) =>
              setForm({ ...form, button_text_1: e.target.value })
            }
            readOnly={readonly}
            placeholder="Misal: Daftar sekarang"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label>Teks Tombol 2</Label>
          <Input
            value={form.button_text_2 || ""}
            onChange={(e) =>
              setForm({ ...form, button_text_2: e.target.value })
            }
            readOnly={readonly}
            placeholder="Misal: Pelajari lebih lanjut"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-y-1">
          <Label>Info 1</Label>
          <Input
            value={form.info_1 || ""}
            onChange={(e) => setForm({ ...form, info_1: e.target.value })}
            readOnly={readonly}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label>Info 2</Label>
          <Input
            value={form.info_2 || ""}
            onChange={(e) => setForm({ ...form, info_2: e.target.value })}
            readOnly={readonly}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label>Info 3</Label>
          <Input
            value={form.info_3 || ""}
            onChange={(e) => setForm({ ...form, info_3: e.target.value })}
            readOnly={readonly}
          />
        </div>

        {/* Info Nilai */}
        <div className="flex flex-col gap-y-1">
          <Label>Info Nilai 1</Label>
          <Input
            value={form.info_nilai_1 || ""}
            onChange={(e) => setForm({ ...form, info_nilai_1: e.target.value })}
            readOnly={readonly}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label>Info Nilai 2</Label>
          <Input
            value={form.info_nilai_2 || ""}
            onChange={(e) => setForm({ ...form, info_nilai_2: e.target.value })}
            readOnly={readonly}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label>Info Nilai 3</Label>
          <Input
            value={form.info_nilai_3 || ""}
            onChange={(e) => setForm({ ...form, info_nilai_3: e.target.value })}
            readOnly={readonly}
          />
        </div>

        {/* Gambar */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Upload Gambar</Label>
          {readonly ? (
            form.image && typeof form.image === "string" ? (
              <div className="border rounded-lg p-2">
                <Image
                  src={getImageUrl(form.image as string)}
                  alt="Preview"
                  className="h-32 w-auto object-contain mx-auto"
                  width={300}
                  height={128}
                />
              </div>
            ) : (
              <span className="text-sm text-gray-500 p-2 border rounded-lg">
                Tidak ada gambar
              </span>
            )
          ) : (
            <div className="space-y-2">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setForm({ ...form, image: file });
                }}
              />
              {form.image && (
                <div className="border rounded-lg p-2">
                  {typeof form.image === "string" ? (
                    <Image
                      src={getImageUrl(form.image as string)}
                      alt="Current image"
                      className="h-20 w-auto object-contain"
                      width={200}
                      height={80}
                    />
                  ) : (
                    <span className="text-sm text-green-600">
                      File baru dipilih: {form.image.name}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {!readonly && (
        <div className="pt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Batal
          </Button>
          <Button onClick={onSubmit} disabled={isLoading}>
            {isLoading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      )}
    </div>
  );
}