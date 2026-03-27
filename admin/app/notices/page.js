"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { noticesApi } from "@/lib/api";
import AdminShell from "@/app/AdminShell";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import ConfirmModal from "@/components/ui/Modal";
import { MdAdd } from "react-icons/md";
import listStyles from "@/app/ListPage.module.css";

const COLUMNS = [
  { key: "title", label: "Title" },
  { key: "type", label: "Type", render: (row) => <Badge label={row.type} /> },
  { key: "isActive", label: "Status", render: (row) => <Badge label={row.isActive ? "active" : "inactive"} /> },
  { key: "createdAt", label: "Created", type: "date" },
];

export default function NoticesPage() {
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
      const res = await noticesApi.list({ page, limit: 10, search });
      setData(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      toast.error("Failed to load notices");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await noticesApi.delete(deleteTarget._id);
      toast.success("Notice deleted");
      setDeleteTarget(null);
      load();
    } catch {
      toast.error("Failed to delete notice");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminShell>
      <div className={listStyles.header}>
        <div />
        <Link href="/notices/new" className={listStyles.addBtn}>
          <MdAdd size={16} />
          New Notice
        </Link>
      </div>

      <DataTable
        columns={COLUMNS}
        data={data}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        onSearch={handleSearch}
        searchPlaceholder="Search notices..."
        editBasePath="/notices"
        onDelete={setDeleteTarget}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Notice"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </AdminShell>
  );
}
