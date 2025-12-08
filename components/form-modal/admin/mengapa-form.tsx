"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Mengapa } from "@/types/admin/mengapa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormMengapaProps {
  form: Partial<Mengapa> | undefined;
  setForm: (data: Partial<Mengapa>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  readonly?: boolean;
  isLoading?: boolean;
}

export default function FormMengapa({
  form,
  setForm,
  onCancel,
  onSubmit,
  readonly = false,
  isLoading = false,
}: FormMengapaProps) {
  useEffect(() => {
    if (!form) {
      setForm({
        bahasa: "",
        judul: "",
        sub_judul: "",
        tagline: "",
        info_judul_1: "",
        info_icon_1: "",
        info_deskripsi_1: "",
        info_judul_2: "",
        info_icon_2: "",
        info_deskripsi_2: "",
        info_judul_3: "",
        info_icon_3: "",
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
            ? "Detail Mengapa"
            : form.id
            ? "Edit Mengapa"
            : "Tambah Mengapa"}
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

        {/* Info 1 */}
        <div className="flex flex-col gap-y-1">
          <Label>Info Judul 1</Label>
          <Input
            value={form.info_judul_1 || ""}
            onChange={(e) => setForm({ ...form, info_judul_1: e.target.value })}
            readOnly={readonly}
            placeholder="Judul poin 1"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label>Info Icon 1</Label>
          <Input
            value={form.info_icon_1 || ""}
            onChange={(e) => setForm({ ...form, info_icon_1: e.target.value })}
            readOnly={readonly}
            placeholder="Nama/URL icon 1"
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
            placeholder="Deskripsi poin 1"
            rows={3}
          />
        </div>

        {/* Info 2 */}
        <div className="flex flex-col gap-y-1">
          <Label>Info Judul 2</Label>
          <Input
            value={form.info_judul_2 || ""}
            onChange={(e) => setForm({ ...form, info_judul_2: e.target.value })}
            readOnly={readonly}
            placeholder="Judul poin 2"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label>Info Icon 2</Label>
          <Input
            value={form.info_icon_2 || ""}
            onChange={(e) => setForm({ ...form, info_icon_2: e.target.value })}
            readOnly={readonly}
            placeholder="Nama/URL icon 2"
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
            placeholder="Deskripsi poin 2"
            rows={3}
          />
        </div>

        {/* Info 3 */}
        <div className="flex flex-col gap-y-1">
          <Label>Info Judul 3</Label>
          <Input
            value={form.info_judul_3 || ""}
            onChange={(e) => setForm({ ...form, info_judul_3: e.target.value })}
            readOnly={readonly}
            placeholder="Judul poin 3"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label>Info Icon 3</Label>
          <Input
            value={form.info_icon_3 || ""}
            onChange={(e) => setForm({ ...form, info_icon_3: e.target.value })}
            readOnly={readonly}
            placeholder="Nama/URL icon 3"
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
            placeholder="Deskripsi poin 3"
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