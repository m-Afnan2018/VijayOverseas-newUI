"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { testimonialsApi } from "@/lib/api";
import AdminShell from "@/app/AdminShell";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import ConfirmModal from "@/components/ui/Modal";
import { MdAdd, MdStar } from "react-icons/md";
import listStyles from "@/app/ListPage.module.css";

const COLUMNS = [
  { key: "avatar", label: "", type: "image" },
  { key: "name", label: "Name" },
  { key: "product.name", label: "Product", render: (row) => row.product?.name
    ? <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{row.product.name}</span>
    : <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>General</span>
  },
  { key: "designation", label: "Designation" },
  { key: "rating", label: "Rating", render: (row) => (
    <span style={{ display: "flex", alignItems: "center", gap: 3, color: "#f59e0b" }}>
      {Array.from({ length: row.rating }, (_, i) => <MdStar key={i} size={14} />)}
    </span>
  )},
  { key: "isActive", label: "Status", render: (row) => <Badge label={row.isActive ? "active" : "inactive"} /> },
];

export default function TestimonialsPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await testimonialsApi.list({ page, limit: 10, search });
      setData(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  const handleSearch = (val) => { setSearch(val); setPage(1); };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await testimonialsApi.delete(deleteTarget._id);
      toast.success("Testimonial deleted");
      setDeleteTarget(null);
      load();
    } catch {
      toast.error("Failed to delete testimonial");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminShell>
      <div className={listStyles.header}>
        <div />
        <Link href="/testimonials/new" className={listStyles.addBtn}>
          <MdAdd size={16} />
          New Testimonial
        </Link>
      </div>

      <DataTable
        columns={COLUMNS}
        data={data}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        onSearch={handleSearch}
        searchPlaceholder="Search testimonials..."
        editBasePath="/testimonials"
        onDelete={setDeleteTarget}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Testimonial"
        description={`Delete testimonial from "${deleteTarget?.name}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </AdminShell>
  );
}
