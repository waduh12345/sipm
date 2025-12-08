"use client";

import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useModal from "@/hooks/use-modal";

import {
  useGetHubungiInformationListQuery,
  useCreateHubungiInformationMutation,
  useUpdateHubungiInformationMutation,
  useDeleteHubungiInformationMutation,
} from "@/services/admin/hubungi-kami/information.service";
import type { Information } from "@/types/admin/hubungi-kami/information";
import FormHubungiInformation from "@/components/form-modal/admin/hubungi-kami/information-form";

export default function HubungiInformationPage() {
  const [form, setForm] = useState<Partial<Information>>();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [readonly, setReadonly] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, refetch } = useGetHubungiInformationListQuery({
    page: currentPage,
    paginate: itemsPerPage,
  });

  const list = useMemo(() => data?.data || [], [data]);
  const lastPage = useMemo(() => data?.page_total || 1, [data]);

  const [createInformation, { isLoading: isCreating }] =
    useCreateHubungiInformationMutation();
  const [updateInformation, { isLoading: isUpdating }] =
    useUpdateHubungiInformationMutation();
  const [deleteInformation] = useDeleteHubungiInformationMutation();

  const handleSubmit = async () => {
    try {
      if (!form) return;

      // DTO tanpa file → kirim JSON
      const payload = {
        bahasa: form.bahasa ?? "",
        judul: form.judul ?? "",
        sub_judul: form.sub_judul ?? "",
        deskripsi: form.deskripsi ?? "",

        icon_1: form.icon_1 ?? "",
        judul_1: form.judul_1 ?? "",
        deskripsi_1: form.deskripsi_1 ?? "",

        icon_2: form.icon_2 ?? "",
        judul_2: form.judul_2 ?? "",
        deskripsi_2: form.deskripsi_2 ?? "",

        icon_3: form.icon_3 ?? "",
        judul_3: form.judul_3 ?? "",
        deskripsi_3: form.deskripsi_3 ?? "",

        text_button: form.text_button ?? "",
        link_button: form.link_button ?? "",

        kontak_icon_1: form.kontak_icon_1 ?? "",
        kontak_judul_1: form.kontak_judul_1 ?? "",
        kontak_isi_1: form.kontak_isi_1 ?? "",
        kontak_keterangan_1: form.kontak_keterangan_1 ?? "",

        kontak_icon_2: form.kontak_icon_2 ?? "",
        kontak_judul_2: form.kontak_judul_2 ?? "",
        kontak_isi_2: form.kontak_isi_2 ?? "",
        kontak_keterangan_2: form.kontak_keterangan_2 ?? "",

        kontak_icon_3: form.kontak_icon_3 ?? "",
        kontak_judul_3: form.kontak_judul_3 ?? "",
        kontak_isi_3: form.kontak_isi_3 ?? "",
        kontak_keterangan_3: form.kontak_keterangan_3 ?? "",

        status: typeof form.status === "number" ? form.status : 1,
      };

      if (editingId) {
        await updateInformation({ id: editingId, payload }).unwrap();
        Swal.fire("Sukses", "Information Hubungi Kami diperbarui", "success");
      } else {
        await createInformation(payload).unwrap();
        Swal.fire("Sukses", "Information Hubungi Kami ditambahkan", "success");
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
    setEditingId(null);
    setReadonly(false);
    openModal();
  };

  const handleEdit = (item: Information) => {
    setForm(item);
    setEditingId(item.id);
    setReadonly(false);
    openModal();
  };

  const handleDetail = (item: Information) => {
    setForm(item);
    setReadonly(true);
    setEditingId(item.id);
    openModal();
  };

  const handleDelete = async (item: Information) => {
    const confirm = await Swal.fire({
      title: "Yakin hapus data?",
      text: `${item.judul} (${item.bahasa})`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteInformation(item.id).unwrap();
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
        <h1 className="text-xl font-bold">
          Information (Halaman Hubungi Kami)
        </h1>
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
                <th className="px-4 py-2">Sub Judul</th>
                <th className="px-4 py-2">Deskripsi</th>
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

                    <td className="px-4 py-2 whitespace-nowrap max-w-[280px]">
                      <div className="font-medium line-clamp-2">
                        {item.judul}
                      </div>
                    </td>

                    <td className="px-4 py-2 whitespace-nowrap max-w-[260px]">
                      <div className="text-muted-foreground line-clamp-1">
                        {item.sub_judul || "—"}
                      </div>
                    </td>

                    <td className="px-4 py-2 max-w-[420px]">
                      <div className="text-muted-foreground line-clamp-2">
                        {toText(item.deskripsi)}
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
          <FormHubungiInformation
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