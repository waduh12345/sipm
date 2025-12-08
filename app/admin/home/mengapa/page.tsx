"use client";

import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useModal from "@/hooks/use-modal";

import {
  useGetMengapaListQuery,
  useCreateMengapaMutation,
  useUpdateMengapaMutation,
  useDeleteMengapaMutation,
} from "@/services/admin/home/mengapa.service";
import type { Mengapa } from "@/types/admin/mengapa";
import FormMengapa from "@/components/form-modal/admin/mengapa-form";

export default function MengapaPage() {
  const [form, setForm] = useState<Partial<Mengapa>>();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [readonly, setReadonly] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, refetch } = useGetMengapaListQuery({
    page: currentPage,
    paginate: itemsPerPage,
  });

  const list = useMemo(() => data?.data || [], [data]);
  const lastPage = useMemo(() => data?.page_total || 1, [data]);

  const [createMengapa, { isLoading: isCreating }] = useCreateMengapaMutation();
  const [updateMengapa, { isLoading: isUpdating }] = useUpdateMengapaMutation();
  const [deleteMengapa] = useDeleteMengapaMutation();

  const handleSubmit = async () => {
    try {
      if (!form) return;

      // Payload JSON sesuai DTO (tanpa file)
      const payload = {
        bahasa: form.bahasa ?? "",
        judul: form.judul ?? "",
        sub_judul: form.sub_judul ?? "",
        tagline: form.tagline ?? "",
        info_judul_1: form.info_judul_1 ?? "",
        info_icon_1: form.info_icon_1 ?? "",
        info_deskripsi_1: form.info_deskripsi_1 ?? "",
        info_judul_2: form.info_judul_2 ?? "",
        info_icon_2: form.info_icon_2 ?? "",
        info_deskripsi_2: form.info_deskripsi_2 ?? "",
        info_judul_3: form.info_judul_3 ?? "",
        info_icon_3: form.info_icon_3 ?? "",
        info_deskripsi_3: form.info_deskripsi_3 ?? "",
        status: typeof form.status === "number" ? form.status : 1,
      };

      if (editingId) {
        await updateMengapa({ id: editingId, payload }).unwrap();
        Swal.fire("Sukses", "Mengapa diperbarui", "success");
      } else {
        await createMengapa(payload).unwrap();
        Swal.fire("Sukses", "Mengapa ditambahkan", "success");
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
    setEditingId(null);
    setReadonly(false);
    openModal();
  };

  const handleEdit = (item: Mengapa) => {
    setForm(item);
    setEditingId(item.id);
    setReadonly(false);
    openModal();
  };

  const handleDetail = (item: Mengapa) => {
    setForm(item);
    setReadonly(true);
    setEditingId(item.id);
    openModal();
  };

  const handleDelete = async (item: Mengapa) => {
    const confirm = await Swal.fire({
      title: "Yakin hapus data?",
      text: `${item.judul} (${item.bahasa})`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteMengapa(item.id).unwrap();
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
        <h1 className="text-xl font-bold">Mengapa (Website Home)</h1>
        <Button onClick={handleCreate}>Tambah Data</Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th className="px-4 py-2">Aksi</th>
                <th className="px-4 py-2">Bahasa</th>
                <th className="px-4 py-2">Judul</th>
                <th className="px-4 py-2">Tagline</th>
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

                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.bahasa}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="font-medium">{item.judul}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-muted-foreground line-clamp-1">
                        {item.tagline || "—"}
                      </div>
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
          <FormMengapa
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