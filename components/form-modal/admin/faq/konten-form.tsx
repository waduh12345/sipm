"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { FaqKonten } from "@/types/admin/faq/konten";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormFaqKontenProps {
  form: Partial<FaqKonten> | undefined;
  setForm: (data: Partial<FaqKonten>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  readonly?: boolean;
  isLoading?: boolean;
}

export default function FormFaqKonten({
  form,
  setForm,
  onCancel,
  onSubmit,
  readonly = false,
  isLoading = false,
}: FormFaqKontenProps) {
  useEffect(() => {
    if (!form) {
      setForm({
        judul: "",
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
            ? "Detail Konten FAQ"
            : form.id
            ? "Edit Konten FAQ"
            : "Tambah Konten FAQ"}
        </h2>
        <Button variant="ghost" onClick={onCancel}>
          ✕
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Judul (full width) */}
        <div className="flex flex-col gap-y-1 sm:col-span-1">
          <Label>Judul</Label>
          <Input
            value={form.judul || ""}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan judul"
          />
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

        {/* Deskripsi (full width) */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Deskripsi</Label>
          <Textarea
            value={form.deskripsi || ""}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan deskripsi/jawaban FAQ"
            rows={6}
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