"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Paket } from "@/types/admin/umroh/paket";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getImageUrl } from "@/lib/image-url";

interface FormPaketUmrohProps {
  form: Partial<Paket> | undefined;
  setForm: (data: Partial<Paket>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  readonly?: boolean;
  isLoading?: boolean;
}

export default function FormPaketUmroh({
  form,
  setForm,
  onCancel,
  onSubmit,
  readonly = false,
  isLoading = false,
}: FormPaketUmrohProps) {
  useEffect(() => {
    if (!form) {
      setForm({
        kategori_id: undefined,
        bahasa: "",
        judul: "",
        harga: "",
        detail_judul_1: "",
        detail_sub_judul_1: "",
        detail_deskripsi_1: "",
        detail_judul_2: "",
        detail_sub_judul_2: "",
        detail_deskripsi_2: "",
        detail_judul_3: "",
        detail_sub_judul_3: "",
        detail_deskripsi_3: "",
        detail_judul_4: "",
        detail_sub_judul_4: "",
        detail_deskripsi_4: "",
        status: 1,
      });
    }
  }, [form, setForm]);

  if (!form) return null;

  const ImageReadonly = ({ src }: { src?: string | null }) =>
    src ? (
      <div className="border rounded-lg p-2">
        <Image
          src={getImageUrl(src)}
          alt="Preview"
          className="h-28 w-auto object-contain mx-auto"
          width={300}
          height={112}
        />
      </div>
    ) : (
      <span className="text-sm text-gray-500 p-2 border rounded-lg">
        Tidak ada gambar
      </span>
    );

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-4xl space-y-4 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {readonly
            ? "Detail Paket Umroh"
            : form.id
            ? "Edit Paket Umroh"
            : "Tambah Paket Umroh"}
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

        {/* Kategori */}
        <div className="flex flex-col gap-y-1">
          <Label>ID Kategori</Label>
          <Input
            type="number"
            value={typeof form.kategori_id === "number" ? form.kategori_id : ""}
            onChange={(e) =>
              setForm({ ...form, kategori_id: parseInt(e.target.value, 10) })
            }
            readOnly={readonly}
            placeholder="Masukkan ID Kategori"
            min={1}
          />
        </div>

        {/* Harga */}
        <div className="flex flex-col gap-y-1">
          <Label>Harga</Label>
          <Input
            value={form.harga || ""}
            onChange={(e) => setForm({ ...form, harga: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan harga"
          />
        </div>

        {/* Detail Judul 1 */}
        <div className="flex flex-col gap-y-1">
          <Label>Detail Judul 1</Label>
          <Input
            value={form.detail_judul_1 || ""}
            onChange={(e) => setForm({ ...form, detail_judul_1: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan detail judul 1"
          />
        </div>

        {/* Detail Sub Judul 1 */}
        <div className="flex flex-col gap-y-1">
          <Label>Detail Sub Judul 1</Label>
          <Input
            value={form.detail_sub_judul_1 || ""}
            onChange={(e) =>
              setForm({ ...form, detail_sub_judul_1: e.target.value })
            }
            readOnly={readonly}
            placeholder="Masukkan detail sub judul 1"
          />
        </div>

        {/* Detail Deskripsi 1 */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Detail Deskripsi 1</Label>
          <Textarea
            value={form.detail_deskripsi_1 || ""}
            onChange={(e) =>
              setForm({ ...form, detail_deskripsi_1: e.target.value })
            }
            readOnly={readonly}
            placeholder="Masukkan detail deskripsi 1"
            rows={3}
          />
        </div>

        {/* Detail Judul 2 */}
        <div className="flex flex-col gap-y-1">
          <Label>Detail Judul 2</Label>
          <Input
            value={form.detail_judul_2 || ""}
            onChange={(e) => setForm({ ...form, detail_judul_2: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan detail judul 2"
          />
        </div>

        {/* Detail Sub Judul 2 */}
        <div className="flex flex-col gap-y-1">
          <Label>Detail Sub Judul 2</Label>
          <Input
            value={form.detail_sub_judul_2 || ""}
            onChange={(e) =>
              setForm({ ...form, detail_sub_judul_2: e.target.value })
            }
            readOnly={readonly}
            placeholder="Masukkan detail sub judul 2"
          />
        </div>

        {/* Detail Deskripsi 2 */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Detail Deskripsi 2</Label>
          <Textarea
            value={form.detail_deskripsi_2 || ""}
            onChange={(e) =>
              setForm({ ...form, detail_deskripsi_2: e.target.value })
            }
            readOnly={readonly}
            placeholder="Masukkan detail deskripsi 2"
            rows={3}
          />
        </div>

        {/* Detail Judul 3 */}
        <div className="flex flex-col gap-y-1">
          <Label>Detail Judul 3</Label>
          <Input
            value={form.detail_judul_3 || ""}
            onChange={(e) => setForm({ ...form, detail_judul_3: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan detail judul 3"
          />
        </div>

        {/* Detail Sub Judul 3 */}
        <div className="flex flex-col gap-y-1">
          <Label>Detail Sub Judul 3</Label>
          <Input
            value={form.detail_sub_judul_3 || ""}
            onChange={(e) =>
              setForm({ ...form, detail_sub_judul_3: e.target.value })
            }
            readOnly={readonly}
            placeholder="Masukkan detail sub judul 3"
          />
        </div>

        {/* Detail Deskripsi 3 */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Detail Deskripsi 3</Label>
          <Textarea
            value={form.detail_deskripsi_3 || ""}
            onChange={(e) =>
              setForm({ ...form, detail_deskripsi_3: e.target.value })
            }
            readOnly={readonly}
            placeholder="Masukkan detail deskripsi 3"
            rows={3}
          />
        </div>

        {/* Detail Judul 4 */}
        <div className="flex flex-col gap-y-1">
          <Label>Detail Judul 4</Label>
          <Input
            value={form.detail_judul_4 || ""}
            onChange={(e) => setForm({ ...form, detail_judul_4: e.target.value })}
            readOnly={readonly}
            placeholder="Masukkan detail judul 4"
          />
        </div>

        {/* Detail Sub Judul 4 */}
        <div className="flex flex-col gap-y-1">
          <Label>Detail Sub Judul 4</Label>
          <Input
            value={form.detail_sub_judul_4 || ""}
            onChange={(e) =>
              setForm({ ...form, detail_sub_judul_4: e.target.value })
            }
            readOnly={readonly}
            placeholder="Masukkan detail sub judul 4"
          />
        </div>

        {/* Detail Deskripsi 4 */}
        <div className="flex flex-col gap-y-1 sm:col-span-2">
          <Label>Detail Deskripsi 4</Label>
          <Textarea
            value={form.detail_deskripsi_4 || ""}
            onChange={(e) =>
              setForm({ ...form, detail_deskripsi_4: e.target.value })
            }
            readOnly={readonly}
            placeholder="Masukkan detail deskripsi 4"
            rows={3}
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

        {/* Bahasa */}
        <div className="flex flex-col gap-y-1 w-full">
          <Label>Bahasa</Label>
          {readonly ? (
            <Input
              className="w-full"
              value={form.bahasa || ""}
              readOnly
            />
          ) : (
            <Input
              className="w-full"
              value={form.bahasa || ""}
              onChange={(e) =>
                setForm({ ...form, bahasa: e.target.value })
              }
              placeholder="Masukkan bahasa"
            />
          )}
        </div>

        {/* Deskrips
        {/* Gambar 1-6 */}
        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Gambar 1 */}
          <div className="flex flex-col gap-y-1">
            <Label>Gambar 1</Label>
            {readonly ? (
              <ImageReadonly
                src={typeof form.image === "string" ? form.image : null}
              />
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
                {form.image && typeof form.image !== "string" && (
                  <span className="text-sm text-green-600">
                    File baru dipilih: {(form.image as File).name}
                  </span>
                )}
                {typeof form.image === "string" && (
                  <ImageReadonly src={form.image} />
                )}
              </div>
            )}
          </div>

          {/* Gambar 2 */}
          <div className="flex flex-col gap-y-1">
            <Label>Gambar 2</Label>
            {readonly ? (
              <ImageReadonly
                src={typeof form.image_2 === "string" ? form.image_2 : null}
              />
            ) : (
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setForm({ ...form, image_2: file });
                  }}
                />
                {form.image_2 && typeof form.image_2 !== "string" && (
                  <span className="text-sm text-green-600">
                    File baru dipilih: {(form.image_2 as File).name}
                  </span>
                )}
                {typeof form.image_2 === "string" && (
                  <ImageReadonly src={form.image_2} />
                )}
              </div>
            )}
          </div>

          {/* Gambar 3 */}
          <div className="flex flex-col gap-y-1">
            <Label>Gambar 3</Label>
            {readonly ? (
              <ImageReadonly
                src={typeof form.image_3 === "string" ? form.image_3 : null}
              />
            ) : (
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setForm({ ...form, image_3: file });
                  }}
                />
                {form.image_3 && typeof form.image_3 !== "string" && (
                  <span className="text-sm text-green-600">
                    File baru dipilih: {(form.image_3 as File).name}
                  </span>
                )}
                {typeof form.image_3 === "string" && (
                  <ImageReadonly src={form.image_3} />
                )}
              </div>
            )}
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