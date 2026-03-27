"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { blogsApi } from "@/lib/api";
import AdminShell from "@/app/AdminShell";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import ConfirmModal from "@/components/ui/Modal";
import { MdAdd } from "react-icons/md";
import listStyles from "@/app/ListPage.module.css";

const COLUMNS = [
  { key: "coverImage", label: "", type: "image" },
  { key: "title", label: "Title" },
  { key: "author", label: "Author" },
  { key: "readTime", label: "Read Time", render: (row) => `${row.readTime || 5} min` },
  { key: "isPublished", label: "Status", render: (row) => <Badge label={row.isPublished ? "published" : "draft"} /> },
  { key: "publishedAt", label: "Published", type: "date" },
];

export default function BlogsPage() {
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
      const res = await blogsApi.list({ page, limit: 10, search });
      setData(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      toast.error("Failed to load blogs");
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
      await blogsApi.delete(deleteTarget._id);
      toast.success("Blog deleted");
      setDeleteTarget(null);
      load();
    } catch {
      toast.error("Failed to delete blog");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminShell>
      <div className={listStyles.header}>
        <div />
        <Link href="/blogs/new" className={listStyles.addBtn}>
          <MdAdd size={16} />
          New Blog Post
        </Link>
      </div>

      <DataTable
        columns={COLUMNS}
        data={data}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        onSearch={handleSearch}
        searchPlaceholder="Search blog posts..."
        editBasePath="/blogs"
        onDelete={setDeleteTarget}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Blog Post"
        description={`Delete "${deleteTarget?.title}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </AdminShell>
  );
}
