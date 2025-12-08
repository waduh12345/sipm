"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Information } from "@/types/admin/hubungi-kami/information";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormHubungiInformationProps {
  form: Partial<Information> | undefined;
  setForm: (data: Partial<Information>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  readonly?: boolean;
  isLoading?: boolean;
}

export default function FormHubungiInformation({
  form,
  setForm,
  onCancel,
  onSubmit,
  readonly = false,
  isLoading = false,
}: FormHubungiInformationProps) {
  useEffect(() => {
    if (!form) {
      setForm({
        bahasa: "",
        judul: "",
        sub_judul: "",
        deskripsi: "",

        icon_1: "",
        judul_1: "",
        deskripsi_1: "",

        icon_2: "",
        judul_2: "",
        deskripsi_2: "",

        icon_3: "",
        judul_3: "",
        deskripsi_3: "",

        text_button: "",
        link_button: "",

        kontak_icon_1: "",
        kontak_judul_1: "",
        kontak_isi_1: "",
        kontak_keterangan_1: "",

        kontak_icon_2: "",
        kontak_judul_2: "",
        kontak_isi_2: "",
        kontak_keterangan_2: "",

        kontak_icon_3: "",
        kontak_judul_3: "",
        kontak_isi_3: "",
        kontak_keterangan_3: "",

        status: 1,
      });
    }
  }, [form, setForm]);

  if (!form) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-4xl space-y-4 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {readonly
            ? "Detail Information"
            : form.id
            ? "Edit Information"
            : "Tambah Information"}
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
          <Input
            value={form.sub_judul || ""}
            onChange={(e) => setForm({ ...form, sub_judul: e.target.value })}
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

        {/* ====== Section Info 1 ====== */}
        <div className="sm:col-span-2 mt-2">
          <div className="text-sm font-semibold mb-2">Info Section 1</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-y-1">
              <Label>Icon 1</Label>
              <Input
                value={form.icon_1 || ""}
                onChange={(e) => setForm({ ...form, icon_1: e.target.value })}
                readOnly={readonly}
                placeholder="Nama/URL icon 1"
              />
            </div>
            <div className="flex flex-col gap-y-1 sm:col-span-2">
              <Label>Judul 1</Label>
              <Input
                value={form.judul_1 || ""}
                onChange={(e) => setForm({ ...form, judul_1: e.target.value })}
                readOnly={readonly}
                placeholder="Judul 1"
              />
            </div>
            <div className="flex flex-col gap-y-1 sm:col-span-3">
              <Label>Deskripsi 1</Label>
              <Textarea
                value={form.deskripsi_1 || ""}
                onChange={(e) =>
                  setForm({ ...form, deskripsi_1: e.target.value })
                }
                readOnly={readonly}
                rows={3}
                placeholder="Deskripsi 1"
              />
            </div>
          </div>
        </div>

        {/* ====== Section Info 2 ====== */}
        <div className="sm:col-span-2">
          <div className="text-sm font-semibold mb-2">Info Section 2</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-y-1">
              <Label>Icon 2</Label>
              <Input
                value={form.icon_2 || ""}
                onChange={(e) => setForm({ ...form, icon_2: e.target.value })}
                readOnly={readonly}
                placeholder="Nama/URL icon 2"
              />
            </div>
            <div className="flex flex-col gap-y-1 sm:col-span-2">
              <Label>Judul 2</Label>
              <Input
                value={form.judul_2 || ""}
                onChange={(e) => setForm({ ...form, judul_2: e.target.value })}
                readOnly={readonly}
                placeholder="Judul 2"
              />
            </div>
            <div className="flex flex-col gap-y-1 sm:col-span-3">
              <Label>Deskripsi 2</Label>
              <Textarea
                value={form.deskripsi_2 || ""}
                onChange={(e) =>
                  setForm({ ...form, deskripsi_2: e.target.value })
                }
                readOnly={readonly}
                rows={3}
                placeholder="Deskripsi 2"
              />
            </div>
          </div>
        </div>

        {/* ====== Section Info 3 ====== */}
        <div className="sm:col-span-2">
          <div className="text-sm font-semibold mb-2">Info Section 3</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-y-1">
              <Label>Icon 3</Label>
              <Input
                value={form.icon_3 || ""}
                onChange={(e) => setForm({ ...form, icon_3: e.target.value })}
                readOnly={readonly}
                placeholder="Nama/URL icon 3"
              />
            </div>
            <div className="flex flex-col gap-y-1 sm:col-span-2">
              <Label>Judul 3</Label>
              <Input
                value={form.judul_3 || ""}
                onChange={(e) => setForm({ ...form, judul_3: e.target.value })}
                readOnly={readonly}
                placeholder="Judul 3"
              />
            </div>
            <div className="flex flex-col gap-y-1 sm:col-span-3">
              <Label>Deskripsi 3</Label>
              <Textarea
                value={form.deskripsi_3 || ""}
                onChange={(e) =>
                  setForm({ ...form, deskripsi_3: e.target.value })
                }
                readOnly={readonly}
                rows={3}
                placeholder="Deskripsi 3"
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="sm:col-span-2">
          <div className="text-sm font-semibold mb-2">Button</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-y-1">
              <Label>Text Button</Label>
              <Input
                value={form.text_button || ""}
                onChange={(e) =>
                  setForm({ ...form, text_button: e.target.value })
                }
                readOnly={readonly}
                placeholder="Teks tombol"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <Label>Link Button</Label>
              <Input
                value={form.link_button || ""}
                onChange={(e) =>
                  setForm({ ...form, link_button: e.target.value })
                }
                readOnly={readonly}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Kontak 1 */}
        <div className="sm:col-span-2">
          <div className="text-sm font-semibold mb-2">Kontak 1</div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="flex flex-col gap-y-1">
              <Label>Icon</Label>
              <Input
                value={form.kontak_icon_1 || ""}
                onChange={(e) =>
                  setForm({ ...form, kontak_icon_1: e.target.value })
                }
                readOnly={readonly}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <Label>Judul</Label>
              <Input
                value={form.kontak_judul_1 || ""}
                onChange={(e) =>
                  setForm({ ...form, kontak_judul_1: e.target.value })
                }
                readOnly={readonly}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <Label>Isi</Label>
              <Input
                value={form.kontak_isi_1 || ""}
                onChange={(e) =>
                  setForm({ ...form, kontak_isi_1: e.target.value })
                }
                readOnly={readonly}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <Label>Keterangan</Label>
              <Input
                value={form.kontak_keterangan_1 || ""}
                onChange={(e) =>
                  setForm({ ...form, kontak_keterangan_1: e.target.value })
                }
                readOnly={readonly}
              />
            </div>
          </div>
        </div>

        {/* Kontak 2 */}
        <div className="sm:col-span-2">
          <div className="text-sm font-semibold mb-2">Kontak 2</div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="flex flex-col gap-y-1">
              <Label>Icon</Label>
              <Input
                value={form.kontak_icon_2 || ""}
                onChange={(e) =>
                  setForm({ ...form, kontak_icon_2: e.target.value })
                }
                readOnly={readonly}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <Label>Judul</Label>
              <Input
                value={form.kontak_judul_2 || ""}
                onChange={(e) =>
                  setForm({ ...form, kontak_judul_2: e.target.value })
                }
                readOnly={readonly}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <Label>Isi</Label>
              <Input
                value={form.kontak_isi_2 || ""}
                onChange={(e) =>
                  setForm({ ...form, kontak_isi_2: e.target.value })
                }
                readOnly={readonly}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <Label>Keterangan</Label>
              <Input
                value={form.kontak_keterangan_2 || ""}
                onChange={(e) =>
                  setForm({ ...form, kontak_keterangan_2: e.target.value })
                }
                readOnly={readonly}
              />
            </div>
          </div>
        </div>

        {/* Kontak 3 */}
        <div className="sm:col-span-2">
          <div className="text-sm font-semibold mb-2">Kontak 3</div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="flex flex-col gap-y-1">
              <Label>Icon</Label>
              <Input
                value={form.kontak_icon_3 || ""}
                onChange={(e) =>
                  setForm({ ...form, kontak_icon_3: e.target.value })
                }
                readOnly={readonly}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <Label>Judul</Label>
              <Input
                value={form.kontak_judul_3 || ""}
                onChange={(e) =>
                  setForm({ ...form, kontak_judul_3: e.target.value })
                }
                readOnly={readonly}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <Label>Isi</Label>
              <Input
                value={form.kontak_isi_3 || ""}
                onChange={(e) =>
                  setForm({ ...form, kontak_isi_3: e.target.value })
                }
                readOnly={readonly}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <Label>Keterangan</Label>
              <Input
                value={form.kontak_keterangan_3 || ""}
                onChange={(e) =>
                  setForm({ ...form, kontak_keterangan_3: e.target.value })
                }
                readOnly={readonly}
              />
            </div>
          </div>
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