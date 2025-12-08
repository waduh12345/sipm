"use client";

import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useModal from "@/hooks/use-modal";

import {
  useGetSliderListQuery,
  useCreateSliderMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} from "@/services/admin/home/slider.service";
import type { Slider } from "@/types/admin/slider";
import FormSlider from "@/components/form-modal/admin/slider-form";
import { getImageUrl } from "@/lib/image-url";

export default function SliderPage() {
  const [form, setForm] = useState<Partial<Slider>>();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [readonly, setReadonly] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, refetch } = useGetSliderListQuery({
    page: currentPage,
    paginate: itemsPerPage,
  });

  const list = useMemo(() => data?.data || [], [data]);
  const lastPage = useMemo(() => data?.page_total || 1, [data]);

  const [createSlider, { isLoading: isCreating }] = useCreateSliderMutation();
  const [updateSlider, { isLoading: isUpdating }] = useUpdateSliderMutation();
  const [deleteSlider] = useDeleteSliderMutation();

  const handleSubmit = async () => {
    try {
      if (!form) return;

      const payload = new FormData();
      if (form.judul) payload.append("judul", form.judul);
      if (form.image instanceof File) payload.append("image", form.image);
      if (typeof form.status === "number")
        payload.append("status", String(form.status));

      if (editingId) {
        await updateSlider({ id: editingId, payload }).unwrap();
        Swal.fire("Sukses", "Slider diperbarui", "success");
      } else {
        await createSlider(payload).unwrap();
        Swal.fire("Sukses", "Slider ditambahkan", "success");
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
      judul: "",
      image: "",
      status: 1,
    });
    setEditingId(null);
    setReadonly(false);
    openModal();
  };

  const handleEdit = (item: Slider) => {
    setForm(item);
    setEditingId(item.id);
    setReadonly(false);
    openModal();
  };

  const handleDetail = (item: Slider) => {
    setForm(item);
    setReadonly(true);
    setEditingId(item.id);
    openModal();
  };

  const handleDelete = async (item: Slider) => {
    const confirm = await Swal.fire({
      title: "Yakin hapus data?",
      text: item.judul,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteSlider(item.id).unwrap();
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
        <h1 className="text-xl font-bold">Slider (Website Home)</h1>
        <Button onClick={handleCreate}>Tambah Data</Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th className="px-4 py-2">Aksi</th>
                <th className="px-4 py-2">Gambar</th>
                <th className="px-4 py-2">Judul</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    Memuat data...
                  </td>
                </tr>
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-4">
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
                        <div className="relative w-24 h-14 rounded overflow-hidden border">
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

                    <td className="px-4 py-2 whitespace-nowrap max-w-[320px]">
                      <div className="font-medium line-clamp-2">
                        {item.judul}
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
          <FormSlider
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