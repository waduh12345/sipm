"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Informasi } from "@/types/admin/umroh/informasi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormUmrohInformasiProps {
  form: Partial<Informasi> | undefined;
  setForm: (data: Partial<Informasi>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  readonly?: boolean;
  isLoading?: boolean;
}

export default function FormUmrohInformasi({
  form,
  setForm,
  onCancel,
  onSubmit,
  readonly = false,
  isLoading = false,
}: FormUmrohInformasiProps) {
  useEffect(() => {
    if (!form) {
      setForm({
        bahasa: "",
        judul: "",
        icon: "",
        deskripsi: "",
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
            ? "Detail Informasi Umroh Kami"
            : form.id
            ? "Edit Informasi Umroh Kami"
            : "Tambah Informasi Umroh Kami"}
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

        {/* Icon */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Icon</Label>
          <Input
            value={form.icon || ""}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan sub judul"
          />
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Deskripsi</Label>
          <Textarea
            value={form.deskripsi || ""}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan deskripsi (opsional)"
            rows={4}
          />
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