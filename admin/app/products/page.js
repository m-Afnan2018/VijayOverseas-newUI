"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { productsApi } from "@/lib/api";
import AdminShell from "@/app/AdminShell";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import ConfirmModal from "@/components/ui/Modal";
import { MdAdd } from "react-icons/md";
import listStyles from "@/app/ListPage.module.css";

const COLUMNS = [
  { key: "images", label: "", render: (row) => {
    const src = row.images?.[0];
    if (!src) return <div style={{ width: 40, height: 40, borderRadius: 8, background: "var(--bg-body)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: 16 }}>📦</div>;
    const url = src.startsWith("http") ? src : `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1").replace("/api/v1", "")}${src}`;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover", border: "1px solid var(--border-color)" }} />;
  }},
  { key: "name", label: "Product" },
  { key: "category.name", label: "Category" },
  { key: "state", label: "State" },
  { key: "productType", label: "Type" },
  { key: "status", label: "Status", render: (row) => <Badge label={row.status} /> },
  { key: "isFeatured", label: "Featured", render: (row) => row.isFeatured ? <Badge label="Featured" variant="primary" /> : null },
];

export default function ProductsPage() {
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
      const res = await productsApi.list({ page, limit: 10, search });
      setData(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      toast.error("Failed to load products");
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
      await productsApi.delete(deleteTarget._id);
      toast.success("Product deleted");
      setDeleteTarget(null);
      load();
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminShell>
      <div className={listStyles.header}>
        <div />
        <Link href="/products/new" className={listStyles.addBtn}>
          <MdAdd size={16} />
          New Product
        </Link>
      </div>

      <DataTable
        columns={COLUMNS}
        data={data}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        onSearch={handleSearch}
        searchPlaceholder="Search products..."
        editBasePath="/products"
        onDelete={setDeleteTarget}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Product"
        description={`Delete "${deleteTarget?.name}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </AdminShell>
  );
}
