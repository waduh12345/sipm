"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Cta } from "@/types/admin/cta";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormCtaProps {
  form: Partial<Cta> | undefined;
  setForm: (data: Partial<Cta>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  readonly?: boolean;
  isLoading?: boolean;
}

export default function FormCta({
  form,
  setForm,
  onCancel,
  onSubmit,
  readonly = false,
  isLoading = false,
}: FormCtaProps) {
  useEffect(() => {
    if (!form) {
      setForm({
        bahasa: "",
        judul: "",
        deskripsi: "",
        button_1: "",
        button_2: "",
        info_judul_1: "",
        info_deskripsi_1: "",
        info_judul_2: "",
        info_deskripsi_2: "",
        info_judul_3: "",
        info_deskripsi_3: "",
        info_judul_4: "",
        info_deskripsi_4: "",
        status: 1,
      });
    }
  }, [form, setForm]);

  if (!form) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-3xl space-y-4 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {readonly ? "Detail CTA" : form.id ? "Edit CTA" : "Tambah CTA"}
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
            value={form.button_1 || ""}
            onChange={(e) => setForm({ ...form, button_1: e.target.value })}
            readOnly={readonly}
            placeholder="Misal: Daftar sekarang"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label>Teks Tombol 2</Label>
          <Input
            value={form.button_2 || ""}
            onChange={(e) => setForm({ ...form, button_2: e.target.value })}
            readOnly={readonly}
            placeholder="Misal: Pelajari lebih lanjut"
          />
        </div>

        {/* Info Blocks */}
        <div className="flex flex-col gap-y-1">
          <Label>Info Judul 1</Label>
          <Input
            value={form.info_judul_1 || ""}
            onChange={(e) => setForm({ ...form, info_judul_1: e.target.value })}
            readOnly={readonly}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label>Info Judul 2</Label>
          <Input
            value={form.info_judul_2 || ""}
            onChange={(e) => setForm({ ...form, info_judul_2: e.target.value })}
            readOnly={readonly}
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
            rows={3}
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
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <Label>Info Judul 3</Label>
          <Input
            value={form.info_judul_3 || ""}
            onChange={(e) => setForm({ ...form, info_judul_3: e.target.value })}
            readOnly={readonly}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label>Info Judul 4</Label>
          <Input
            value={form.info_judul_4 || ""}
            onChange={(e) => setForm({ ...form, info_judul_4: e.target.value })}
            readOnly={readonly}
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
            rows={3}
          />
        </div>
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Info Deskripsi 4</Label>
          <Textarea
            value={form.info_deskripsi_4 || ""}
            onChange={(e) =>
              setForm({ ...form, info_deskripsi_4: e.target.value })
            }
            readOnly={readonly}
            rows={3}
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