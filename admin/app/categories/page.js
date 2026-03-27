"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { categoriesApi } from "@/lib/api";
import AdminShell from "@/app/AdminShell";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import ConfirmModal from "@/components/ui/Modal";
import { MdAdd } from "react-icons/md";
import listStyles from "@/app/ListPage.module.css";

const COLUMNS = [
  { key: "image", label: "", type: "image" },
  { key: "name", label: "Name" },
  { key: "slug", label: "Slug" },
  { key: "order", label: "Order" },
  { key: "isActive", label: "Status", render: (row) => <Badge label={row.isActive ? "active" : "inactive"} /> },
];

export default function CategoriesPage() {
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
      const res = await categoriesApi.list({ page, limit: 10, search });
      setData(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      toast.error("Failed to load categories");
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
      await categoriesApi.delete(deleteTarget._id);
      toast.success("Category deleted");
      setDeleteTarget(null);
      load();
    } catch {
      toast.error("Failed to delete category");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminShell>
      <div className={listStyles.header}>
        <div />
        <Link href="/categories/new" className={listStyles.addBtn}>
          <MdAdd size={16} />
          New Category
        </Link>
      </div>

      <DataTable
        columns={COLUMNS}
        data={data}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        onSearch={handleSearch}
        searchPlaceholder="Search categories..."
        editBasePath="/categories"
        onDelete={setDeleteTarget}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Category"
        description={`Delete "${deleteTarget?.name}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </AdminShell>
  );
}
