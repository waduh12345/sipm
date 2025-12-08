"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Tentang } from "@/types/admin/profile/tentang";
import { getImageUrl } from "@/lib/image-url";

interface FormTentangProps {
  form: Partial<Tentang> | undefined;
  setForm: (data: Partial<Tentang>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  readonly?: boolean;
  isLoading?: boolean;
}

export default function FormTentang({
  form,
  setForm,
  onCancel,
  onSubmit,
  readonly = false,
  isLoading = false,
}: FormTentangProps) {
  useEffect(() => {
    if (!form) {
      setForm({
        bahasa: "",
        judul: "",
        deskripsi: "",
        info_judul_1: "",
        info_deskripsi_1: "",
        info_judul_2: "",
        info_deskripsi_2: "",
        info_judul_3: "",
        info_deskripsi_3: "",
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
            ? "Detail Tentang"
            : form.id
            ? "Edit Tentang"
            : "Tambah Tentang"}
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
        <div className="flex flex-col gap-y-1">
          <Label>Status</Label>
          {readonly ? (
            <Input value={form.status === 1 ? "Aktif" : "Nonaktif"} readOnly />
          ) : (
            <Select
              value={(form.status ?? 1).toString()}
              onValueChange={(val) =>
                setForm({ ...form, status: parseInt(val, 10) })
              }
            >
              <SelectTrigger>
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

        {/* Deskripsi */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Deskripsi</Label>
          <Textarea
            value={form.deskripsi || ""}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan deskripsi"
            rows={5}
          />
        </div>

        {/* Info 1 */}
        <div className="flex flex-col gap-y-1 col-span-2">
          <Label>Info Judul 1</Label>
          <Input
            value={form.info_judul_1 || ""}
            onChange={(e) => setForm({ ...form, info_judul_1: e.target.value })}
            readOnly={readonly}
            placeholder="Judul poin 1 (opsional)"
          />
        </div>
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Info Deskripsi 1</Label>
          <Textarea
            value={form.info_deskripsi_1 || ""}
            onChange={(e) =>
              setForm({ ...form, info_deskripsi_1: e.target.value })
            }
            readOnly={readonly}
            placeholder="Deskripsi poin 1 (opsional)"
            rows={3}
          />
        </div>

        {/* Info 2 */}
        <div className="flex flex-col gap-y-1 col-span-2">
          <Label>Info Judul 2</Label>
          <Input
            value={form.info_judul_2 || ""}
            onChange={(e) => setForm({ ...form, info_judul_2: e.target.value })}
            readOnly={readonly}
            placeholder="Judul poin 2 (opsional)"
          />
        </div>
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Info Deskripsi 2</Label>
          <Textarea
            value={form.info_deskripsi_2 || ""}
            onChange={(e) =>
              setForm({ ...form, info_deskripsi_2: e.target.value })
            }
            readOnly={readonly}
            placeholder="Deskripsi poin 2 (opsional)"
            rows={3}
          />
        </div>

        {/* Info 3 */}
        <div className="flex flex-col gap-y-1 col-span-2">
          <Label>Info Judul 3</Label>
          <Input
            value={form.info_judul_3 || ""}
            onChange={(e) => setForm({ ...form, info_judul_3: e.target.value })}
            readOnly={readonly}
            placeholder="Judul poin 3 (opsional)"
          />
        </div>
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Info Deskripsi 3</Label>
          <Textarea
            value={form.info_deskripsi_3 || ""}
            onChange={(e) =>
              setForm({ ...form, info_deskripsi_3: e.target.value })
            }
            readOnly={readonly}
            placeholder="Deskripsi poin 3 (opsional)"
            rows={3}
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
                      className="h-20 w-auto object-contain mx-auto"
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