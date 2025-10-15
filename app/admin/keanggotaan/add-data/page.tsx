"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import {
  useGetAnggotaByIdQuery,
  useCreateAnggotaMutation,
  useUpdateAnggotaMutation,
} from "@/services/admin/anggota.service";
import type { Anggota } from "@/types/admin/anggota";
import AnggotaForm from "@/components/form-modal/admin/anggota-form";

type Mode = "add" | "edit" | "detail";

// ✅ Tambah tipe state biar aman dan tetap strongly-typed
export type AdminAnggotaFormState = Partial<Anggota> & {
  password?: string;
  password_confirmation?: string;
  // file upload (opsional — hanya terkirim kalau dipilih)
  upload_ktp?: File | null;
  upload_foto?: File | null;
  postal_code?: string | null;
};

export default function AnggotaAddEditPage() {
  return (
    <Suspense fallback={<div className="p-6">Memuat formulir…</div>}>
      <AnggotaAddEditPageInner />
    </Suspense>
  );
}

function AnggotaAddEditPageInner() {
  const router = useRouter();
  const sp = useSearchParams();

  const mode: Mode = (sp.get("mode") as Mode) || "add";
  const idParam = sp.get("id");
  const id = idParam ? Number(idParam) : undefined;

  const isDetail = mode === "detail";
  const isEdit = mode === "edit";
  const isAdd = mode === "add";

  const { data: detailData, isFetching } = useGetAnggotaByIdQuery(id!, {
    skip: !(isEdit || isDetail) || !id,
  });
  const [createAnggota, { isLoading: isCreating }] = useCreateAnggotaMutation();
  const [updateAnggota, { isLoading: isUpdating }] = useUpdateAnggotaMutation();

  const [form, setForm] = useState<AdminAnggotaFormState>({});

  useEffect(() => {
    if ((isEdit || isDetail) && detailData) {
      setForm({
        ...detailData,
        password: "",
        password_confirmation: "",
        // file opsional; biarkan kosong agar tidak mengirim saat edit
        upload_ktp: null,
        upload_foto: null,
        postal_code: detailData.postal_code ?? "",
      });
    }
  }, [detailData, isEdit, isDetail]);

  const readonly = isDetail;
  const isLoading = isCreating || isUpdating || isFetching;

  const handleSubmit = async () => {
    try {
      if (!form.name || !form.email || !form.phone || !form.ktp)
        throw new Error("Nama, Email, Telepon, dan KTP wajib diisi");

      if (isAdd) {
        if (!form.password || form.password.trim().length < 8)
          throw new Error("Password minimal 8 karakter");
        if (form.password !== form.password_confirmation)
          throw new Error("Konfirmasi password tidak cocok");
      }

      const fd = new FormData();

      fd.append("name", form.name as string);
      fd.append("email", form.email as string);
      fd.append("phone", form.phone as string);
      fd.append("address", form.address ?? "");
      fd.append("gender", form.gender as string);
      fd.append("birth_date", form.birth_date ?? "");
      fd.append("birth_place", form.birth_place ?? "");
      fd.append("ktp", form.ktp ?? "");
      if (form.postal_code) fd.append("postal_code", String(form.postal_code));

      if (form.province_id !== undefined && form.province_id !== null) fd.append("province_id", String(form.province_id));
      if (form.regency_id !== undefined && form.regency_id !== null) fd.append("regency_id", String(form.regency_id));
      if (form.district_id !== undefined && form.district_id !== null) fd.append("district_id", String(form.district_id));
      if (form.village_id !== undefined && form.village_id !== null) fd.append("village_id", String(form.village_id));

      if (form.rt !== undefined && form.rt !== null)
        fd.append("rt", String(form.rt));
      if (form.rw !== undefined && form.rw !== null)
        fd.append("rw", String(form.rw));
      console.log(form);

      fd.append("level_id", form.level_id?.toString() ?? "");

      if (form.religion) fd.append("religion", form.religion);
      if (form.marital_status) fd.append("marital_status", form.marital_status);
      if (form.occupation) fd.append("occupation", form.occupation);
      if (form.last_education) fd.append("last_education", form.last_education);
      if (form.phone_home) fd.append("phone_home", form.phone_home);
      if (form.phone_office) fd.append("phone_office", form.phone_office);
      if (form.phone_faksimili)
        fd.append("phone_faksimili", form.phone_faksimili);
      if (form.facebook) fd.append("facebook", form.facebook);
      if (form.instagram) fd.append("instagram", form.instagram);
      if (form.twitter) fd.append("twitter", form.twitter);
      if (form.whatsapp) fd.append("whatsapp", form.whatsapp);
      if (form.tiktok) fd.append("tiktok", form.tiktok);
      if (form.path) fd.append("path", form.path);

      // ✅ Kirim file hanya kalau dipilih
      if (form.upload_ktp instanceof File)
        fd.append("upload_ktp", form.upload_ktp);
      if (form.upload_foto instanceof File)
        fd.append("upload_foto", form.upload_foto);

      if (isAdd && form.password && form.password_confirmation) {
        fd.append("password", form.password);
        fd.append("password_confirmation", form.password_confirmation);
      }

      if (isEdit) fd.append("_method", "PUT");

      if (isEdit && id) {
        await updateAnggota({ id, payload: fd }).unwrap();
        await Swal.fire("Sukses", "Anggota diperbarui", "success");
      } else {
        await createAnggota(fd).unwrap();
        await Swal.fire("Sukses", "Anggota ditambahkan", "success");
      }
      router.push("/admin/keanggotaan");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan";
      await Swal.fire("Gagal", msg, "error");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      {isFetching && (isEdit || isDetail) ? (
        <div className="text-center p-10">Memuat data anggota...</div>
      ) : (
        <AnggotaForm
          form={form}
          setForm={setForm}
          onCancel={() => router.back()}
          onSubmit={handleSubmit}
          readonly={readonly}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}