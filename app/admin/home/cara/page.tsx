"use client";

import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useModal from "@/hooks/use-modal";

import {
  useGetCaraListQuery,
  useCreateCaraMutation,
  useUpdateCaraMutation,
  useDeleteCaraMutation,
} from "@/services/admin/home/cara.service";
import type { Cara } from "@/types/admin/cara";
import FormCara from "@/components/form-modal/admin/cara-form";
import { getImageUrl } from "@/lib/image-url";

export default function CaraPage() {
  const [form, setForm] = useState<Partial<Cara>>();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [readonly, setReadonly] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, refetch } = useGetCaraListQuery({
    page: currentPage,
    paginate: itemsPerPage,
  });

  const list = useMemo(() => data?.data || [], [data]);
  const lastPage = useMemo(() => data?.page_total || 1, [data]);

  const [createCara, { isLoading: isCreating }] = useCreateCaraMutation();
  const [updateCara, { isLoading: isUpdating }] = useUpdateCaraMutation();
  const [deleteCara] = useDeleteCaraMutation();

  const handleSubmit = async () => {
    try {
      if (!form) return;

      const payload = new FormData();
      if (form.bahasa) payload.append("bahasa", form.bahasa);
      if (form.judul) payload.append("judul", form.judul);
      if (form.sub_judul) payload.append("sub_judul", form.sub_judul);

      if (form.info_judul_1) payload.append("info_judul_1", form.info_judul_1);
      if (form.info_deskripsi_1)
        payload.append("info_deskripsi_1", form.info_deskripsi_1);
      if (form.info_icon_1) payload.append("info_icon_1", form.info_icon_1);

      if (form.info_judul_2) payload.append("info_judul_2", form.info_judul_2);
      if (form.info_deskripsi_2)
        payload.append("info_deskripsi_2", form.info_deskripsi_2);
      if (form.info_icon_2) payload.append("info_icon_2", form.info_icon_2);

      if (form.info_judul_3) payload.append("info_judul_3", form.info_judul_3);
      if (form.info_deskripsi_3)
        payload.append("info_deskripsi_3", form.info_deskripsi_3);
      if (form.info_icon_3) payload.append("info_icon_3", form.info_icon_3);

      if (form.image instanceof File) payload.append("image", form.image);
      if (typeof form.status === "number")
        payload.append("status", String(form.status));

      if (editingId) {
        await updateCara({ id: editingId, payload }).unwrap();
        Swal.fire("Sukses", "Data Cara diperbarui", "success");
      } else {
        await createCara(payload).unwrap();
        Swal.fire("Sukses", "Data Cara ditambahkan", "success");
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
      sub_judul: "",
      info_judul_1: "",
      info_deskripsi_1: "",
      info_icon_1: "",
      info_judul_2: "",
      info_deskripsi_2: "",
      info_icon_2: "",
      info_judul_3: "",
      info_deskripsi_3: "",
      info_icon_3: "",
      image: "",
      status: 1,
    });
    setEditingId(null);
    setReadonly(false);
    openModal();
  };

  const handleEdit = (item: Cara) => {
    setForm(item);
    setEditingId(item.id);
    setReadonly(false);
    openModal();
  };

  const handleDetail = (item: Cara) => {
    setForm(item);
    setReadonly(true);
    setEditingId(item.id);
    openModal();
  };

  const handleDelete = async (item: Cara) => {
    const confirm = await Swal.fire({
      title: "Yakin hapus data?",
      text: `${item.judul} (${item.bahasa})`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteCara(item.id).unwrap();
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Cara (Website Home)</h1>
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
                <th className="px-4 py-2">Sub Judul</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    Memuat data...
                  </td>
                </tr>
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4">
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
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="font-medium">{item.judul}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-muted-foreground line-clamp-1">
                        {item.sub_judul || "—"}
                      </div>
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
          <FormCara
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