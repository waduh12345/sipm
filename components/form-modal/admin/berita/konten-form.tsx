"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Konten } from "@/types/admin/berita/konten";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getImageUrl } from "@/lib/image-url";

interface FormKontenProps {
  form: Partial<Konten> | undefined;
  setForm: (data: Partial<Konten>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  readonly?: boolean;
  isLoading?: boolean;
}

export default function FormKonten({
  form,
  setForm,
  onCancel,
  onSubmit,
  readonly = false,
  isLoading = false,
}: FormKontenProps) {
  useEffect(() => {
    if (!form) {
      setForm({
        judul: "",
        deskripsi: "",
        penulis: "",
        tanggal: new Date().toISOString().slice(0, 10),
        views: 0,
        status: 1,
      });
    }
  }, [form, setForm]);

  if (!form) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-3xl space-y-4 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {readonly
            ? "Detail Konten"
            : form.id
            ? "Edit Konten"
            : "Tambah Konten"}
        </h2>
        <Button variant="ghost" onClick={onCancel}>
          ✕
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Judul (full width) */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Judul</Label>
          <Input
            value={form.judul || ""}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan judul"
          />
        </div>

        {/* Penulis */}
        <div className="flex flex-col gap-y-1">
          <Label>Penulis</Label>
          <Input
            value={form.penulis || ""}
            onChange={(e) => setForm({ ...form, penulis: e.target.value })}
            readOnly={readonly}
            placeholder="Nama penulis"
          />
        </div>

        {/* Tanggal */}
        <div className="flex flex-col gap-y-1">
          <Label>Tanggal</Label>
          <Input
            type="date"
            value={
              // gunakan yyyy-mm-dd untuk input date
              form.tanggal
                ? new Date(form.tanggal).toISOString().slice(0, 10)
                : ""
            }
            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
            readOnly={readonly}
          />
        </div>

        {/* Views */}
        <div className="flex flex-col gap-y-1">
          <Label>Views</Label>
          <Input
            type="number"
            value={typeof form.views === "number" ? form.views : 0}
            onChange={(e) =>
              setForm({ ...form, views: parseInt(e.target.value || "0", 10) })
            }
            readOnly={readonly}
            min={0}
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-y-1 w-full">
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

        {/* Deskripsi (full width) */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Deskripsi</Label>
          <Textarea
            value={form.deskripsi || ""}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            readOnly={readonly}
            placeholder="Tulis isi/konten berita"
            rows={6}
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
                      File baru dipilih: {(form.image as File).name}
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