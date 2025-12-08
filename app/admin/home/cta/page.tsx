"use client";

import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useModal from "@/hooks/use-modal";

import {
  useGetCtaListQuery,
  useCreateCtaMutation,
  useUpdateCtaMutation,
  useDeleteCtaMutation,
} from "@/services/admin/home/cta.service";
import type { Cta } from "@/types/admin/cta";
import FormCta from "@/components/form-modal/admin/cta-form";

export default function CtaPage() {
  const [form, setForm] = useState<Partial<Cta>>();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [readonly, setReadonly] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, refetch } = useGetCtaListQuery({
    page: currentPage,
    paginate: itemsPerPage,
  });

  const list = useMemo(() => data?.data || [], [data]);
  const lastPage = useMemo(() => data?.page_total || 1, [data]);

  const [createCta, { isLoading: isCreating }] = useCreateCtaMutation();
  const [updateCta, { isLoading: isUpdating }] = useUpdateCtaMutation();
  const [deleteCta] = useDeleteCtaMutation();

  const handleSubmit = async () => {
    try {
      if (!form) return;

      // Payload JSON sesuai DTO (tanpa file)
      const payload = {
        bahasa: form.bahasa ?? "",
        judul: form.judul ?? "",
        deskripsi: form.deskripsi ?? "",
        button_1: form.button_1 ?? "",
        button_2: form.button_2 ?? "",
        info_judul_1: form.info_judul_1 ?? "",
        info_deskripsi_1: form.info_deskripsi_1 ?? "",
        info_judul_2: form.info_judul_2 ?? "",
        info_deskripsi_2: form.info_deskripsi_2 ?? "",
        info_judul_3: form.info_judul_3 ?? "",
        info_deskripsi_3: form.info_deskripsi_3 ?? "",
        info_judul_4: form.info_judul_4 ?? "",
        info_deskripsi_4: form.info_deskripsi_4 ?? "",
        status: typeof form.status === "number" ? form.status : 1,
      };

      if (editingId) {
        await updateCta({ id: editingId, payload }).unwrap();
        Swal.fire("Sukses", "CTA diperbarui", "success");
      } else {
        await createCta(payload).unwrap();
        Swal.fire("Sukses", "CTA ditambahkan", "success");
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
    setEditingId(null);
    setReadonly(false);
    openModal();
  };

  const handleEdit = (item: Cta) => {
    setForm(item);
    setEditingId(item.id);
    setReadonly(false);
    openModal();
  };

  const handleDetail = (item: Cta) => {
    setForm(item);
    setReadonly(true);
    setEditingId(item.id);
    openModal();
  };

  const handleDelete = async (item: Cta) => {
    const confirm = await Swal.fire({
      title: "Yakin hapus data?",
      text: `${item.judul} (${item.bahasa})`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteCta(item.id).unwrap();
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
        <h1 className="text-xl font-bold">CTA (Website Home)</h1>
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
                <th className="px-4 py-2">Deskripsi</th>
                <th className="px-4 py-2">Button 1</th>
                <th className="px-4 py-2">Button 2</th>
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
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.bahasa}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="font-medium">{item.judul}</div>
                    </td>
                    <td className="px-4 py-2 max-w-[380px]">
                      <div className="text-muted-foreground line-clamp-2">
                        {item.deskripsi || "—"}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.button_1 || "—"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.button_2 || "—"}
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
          <FormCta
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