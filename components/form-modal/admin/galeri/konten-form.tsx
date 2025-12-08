"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Konten } from "@/types/admin/galeri/konten";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getImageUrl } from "@/lib/image-url";

interface FormKontenGaleriProps {
  form: Partial<Konten> | undefined;
  setForm: (data: Partial<Konten>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  readonly?: boolean;
  isLoading?: boolean;
}

export default function FormKontenGaleri({
  form,
  setForm,
  onCancel,
  onSubmit,
  readonly = false,
  isLoading = false,
}: FormKontenGaleriProps) {
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
            ? "Detail Konten Galeri"
            : form.id
            ? "Edit Konten Galeri"
            : "Tambah Konten Galeri"}
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
            placeholder="Tulis deskripsi/isi galeri"
            rows={6}
          />
        </div>

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

          {/* Gambar 4 */}
          <div className="flex flex-col gap-y-1">
            <Label>Gambar 4</Label>
            {readonly ? (
              <ImageReadonly
                src={typeof form.image_4 === "string" ? form.image_4 : null}
              />
            ) : (
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setForm({ ...form, image_4: file });
                  }}
                />
                {form.image_4 && typeof form.image_4 !== "string" && (
                  <span className="text-sm text-green-600">
                    File baru dipilih: {(form.image_4 as File).name}
                  </span>
                )}
                {typeof form.image_4 === "string" && (
                  <ImageReadonly src={form.image_4} />
                )}
              </div>
            )}
          </div>

          {/* Gambar 5 */}
          <div className="flex flex-col gap-y-1">
            <Label>Gambar 5</Label>
            {readonly ? (
              <ImageReadonly
                src={typeof form.image_5 === "string" ? form.image_5 : null}
              />
            ) : (
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setForm({ ...form, image_5: file });
                  }}
                />
                {form.image_5 && typeof form.image_5 !== "string" && (
                  <span className="text-sm text-green-600">
                    File baru dipilih: {(form.image_5 as File).name}
                  </span>
                )}
                {typeof form.image_5 === "string" && (
                  <ImageReadonly src={form.image_5} />
                )}
              </div>
            )}
          </div>

          {/* Gambar 6 */}
          <div className="flex flex-col gap-y-1">
            <Label>Gambar 6</Label>
            {readonly ? (
              <ImageReadonly
                src={typeof form.image_6 === "string" ? form.image_6 : null}
              />
            ) : (
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setForm({ ...form, image_6: file });
                  }}
                />
                {form.image_6 && typeof form.image_6 !== "string" && (
                  <span className="text-sm text-green-600">
                    File baru dipilih: {(form.image_6 as File).name}
                  </span>
                )}
                {typeof form.image_6 === "string" && (
                  <ImageReadonly src={form.image_6} />
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