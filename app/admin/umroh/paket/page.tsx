"use client";

import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useModal from "@/hooks/use-modal";

import {
  useGetUmrohPaketListQuery,
  useCreateUmrohPaketMutation,
  useUpdateUmrohPaketMutation,
  useDeleteUmrohPaketMutation,
} from "@/services/admin/umroh/paket.service";
import type { Paket } from "@/types/admin/umroh/paket";
import FormPaketUmroh from "@/components/form-modal/admin/umroh/paket-form";
import { getImageUrl } from "@/lib/image-url";

export default function UmrohPaketPage() {
  const [form, setForm] = useState<Partial<Paket>>();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [readonly, setReadonly] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, refetch } = useGetUmrohPaketListQuery({
    page: currentPage,
    paginate: itemsPerPage,
  });

  const list = useMemo(() => data?.data || [], [data]);
  const lastPage = useMemo(() => data?.page_total || 1, [data]);

  const [createPaket, { isLoading: isCreating }] =
    useCreateUmrohPaketMutation();
  const [updatePaket, { isLoading: isUpdating }] =
    useUpdateUmrohPaketMutation();
  const [deletePaket] = useDeleteUmrohPaketMutation();

  const handleSubmit = async () => {
    try {
      if (!form) return;

      const fd = new FormData();
      if (form.kategori_id) fd.append("kategori_id", form.kategori_id ? String(form.kategori_id) : "");
      if (form.bahasa) fd.append("bahasa", form.bahasa);
      if (form.judul) fd.append("judul", form.judul);
      if (form.harga) fd.append("harga", String(form.harga));
      if (form.detail_judul_1) fd.append("detail_judul_1", form.detail_judul_1);
      if (form.detail_sub_judul_1) fd.append("detail_sub_judul_1", form.detail_sub_judul_1);
      if (form.detail_deskripsi_1) fd.append("detail_deskripsi_1", form.detail_deskripsi_1);
      if (form.detail_judul_2) fd.append("detail_judul_2", form.detail_judul_2);
      if (form.detail_sub_judul_2) fd.append("detail_sub_judul_2", form.detail_sub_judul_2);
      if (form.detail_deskripsi_2) fd.append("detail_deskripsi_2", form.detail_deskripsi_2);
      if (form.detail_judul_3) fd.append("detail_judul_3", form.detail_judul_3);
      if (form.detail_sub_judul_3) fd.append("detail_sub_judul_3", form.detail_sub_judul_3);
      if (form.detail_deskripsi_3) fd.append("detail_deskripsi_3", form.detail_deskripsi_3);
      if (form.detail_judul_4) fd.append("detail_judul_4", form.detail_judul_4);
      if (form.detail_sub_judul_4) fd.append("detail_sub_judul_4", form.detail_sub_judul_4);
      if (form.detail_deskripsi_4) fd.append("detail_deskripsi_4", form.detail_deskripsi_4);
      // Hanya tambahkan file jika ada dan merupakan instance File
      if (form.image instanceof File) fd.append("image", form.image);
      if (form.image_2 instanceof File) fd.append("image_2", form.image_2);
      if (form.image_3 instanceof File) fd.append("image_3", form.image_3);
      if (typeof form.status === "number")
        fd.append("status", String(form.status));

      if (editingId) {
        await updatePaket({ id: editingId, payload: fd }).unwrap();
        Swal.fire("Sukses", "Paket umroh diperbarui", "success");
      } else {
        await createPaket(fd).unwrap();
        Swal.fire("Sukses", "Paket umroh ditambahkan", "success");
      }

      setForm(undefined);
      setEditingId(null);
      await refetch();
      closeModal();
    } catch (error) {
      console.error(error);
      Swal.fire("Gagal", "Gagal menyimpan data", "error");
    }
  };

  const handleCreate = () => {
    setForm({
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
      image: "",
      image_2: "",
      image_3: "",
      status: 1,
    });
    setEditingId(null);
    setReadonly(false);
    openModal();
  };

  const handleEdit = (item: Paket) => {
    setForm(item);
    setEditingId(item.id);
    setReadonly(false);
    openModal();
  };

  const handleDetail = (item: Paket) => {
    setForm(item);
    setReadonly(true);
    setEditingId(item.id);
    openModal();
  };

  const handleDelete = async (item: Paket) => {
    const confirm = await Swal.fire({
      title: "Yakin hapus data?",
      text: item.judul,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    });

    if (confirm.isConfirmed) {
      try {
        await deletePaket(item.id).unwrap();
        await refetch();
        Swal.fire("Berhasil", "Data dihapus", "success");
      } catch (error) {
        Swal.fire("Gagal", "Gagal menghapus data", "error");
        console.error(error);
      }
    }
  };

  const statusBadge = (status: number) =>
    status === 1 ? (
      <Badge className="bg-emerald-600 hover:bg-emerald-700">Aktif</Badge>
    ) : (
      <Badge variant="secondary">Nonaktif</Badge>
    );

  const toText = (v?: string | null) => (v || "").replace(/\s+/g, " ").trim();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Paket Umroh</h1>
        <Button onClick={handleCreate}>Tambah Data</Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th className="px-4 py-2">Aksi</th>
                <th className="px-4 py-2">Gambar</th>
                <th className="px-4 py-2">Bahasa</th>
                <th className="px-4 py-2">Judul</th>
                <th className="px-4 py-2">Harga</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center p-4">
                    Memuat data...
                  </td>
                </tr>
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-4">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                list.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleDetail(item)}>
                          Detail
                        </Button>
                        <Button size="sm" onClick={() => handleEdit(item)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(item)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </td>

                    <td className="px-4 py-2">
                      {typeof item.image === "string" && item.image ? (
                        <div className="relative w-16 h-10 rounded overflow-hidden border">
                          <Image
                            src={getImageUrl(item.image)}
                            alt={item.judul}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <Badge variant="secondary">–</Badge>
                      )}
                    </td> 

                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.bahasa}
                    </td>

                    <td className="px-4 py-2 whitespace-nowrap max-w-[320px]">
                      <div className="font-medium line-clamp-2">
                        {item.judul}
                      </div>
                    </td>

                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.harga ? item.harga : "–"}
                    </td>

                    <td className="px-4 py-2">{statusBadge(item.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>

        <div className="p-4 flex items-center justify-between bg-muted">
          <div className="text-sm">
            Halaman <strong>{currentPage}</strong> dari{" "}
            <strong>{lastPage}</strong>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              disabled={currentPage >= lastPage}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Berikutnya
            </Button>
          </div>
        </div>
      </Card>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <FormPaketUmroh
            form={form}
            setForm={(f) => setForm({ ...(form || {}), ...f })}
            onCancel={() => {
              setForm(undefined);
              setEditingId(null);
              setReadonly(false);
              closeModal();
            }}
            onSubmit={handleSubmit}
            readonly={readonly}
            isLoading={isCreating || isUpdating}
          />
        </div>
      )}
    </div>
  );
}