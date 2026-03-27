"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { MdSearch, MdEdit, MdDelete, MdImage } from "react-icons/md";
import styles from "./DataTable.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

function buildImageUrl(src) {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  const base = API_URL.replace("/api/v1", "");
  return `${base}${src}`;
}

export default function DataTable({
  columns,
  data,
  loading,
  pagination,
  onPageChange,
  onSearch,
  searchPlaceholder = "Search...",
  editBasePath,
  onDelete,
  extraActions,
  toolbar,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearchChange = useCallback(
    (e) => {
      const val = e.target.value;
      setSearchValue(val);
      if (searchTimeout) clearTimeout(searchTimeout);
      const t = setTimeout(() => {
        onSearch && onSearch(val);
      }, 350);
      setSearchTimeout(t);
    },
    [onSearch, searchTimeout]
  );

  const renderCell = (row, col) => {
    if (col.render) return col.render(row);

    const value = col.key.split(".").reduce((obj, k) => obj?.[k], row);

    if (col.type === "image") {
      const url = buildImageUrl(value);
      return url ? (
        <img src={url} alt="" className={styles.thumbnail} />
      ) : (
        <div className={styles.thumbnailPlaceholder}>
          <MdImage />
        </div>
      );
    }

    if (col.type === "date") {
      return value ? new Date(value).toLocaleDateString("en-IN") : "—";
    }

    if (value === null || value === undefined || value === "") return "—";
    return String(value);
  };

  const totalPages = pagination?.pages || 1;
  const currentPage = pagination?.page || 1;

  const pageNumbers = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => {
      if (totalPages <= 5) return i + 1;
      if (currentPage <= 3) return i + 1;
      if (currentPage >= totalPages - 2) return totalPages - 4 + i;
      return currentPage - 2 + i;
    }
  );

  return (
    <div className={styles.wrapper}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <MdSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        <div className={styles.toolbarActions}>{toolbar}</div>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <div>Loading...</div>
          </div>
        ) : !data || data.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            <div className={styles.emptyText}>No records found</div>
            <div className={styles.emptySubtext}>
              Try adjusting your search or add a new record.
            </div>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
                {(editBasePath || onDelete || extraActions) && (
                  <th>Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row._id}>
                  {columns.map((col) => (
                    <td key={col.key}>{renderCell(row, col)}</td>
                  ))}
                  {(editBasePath || onDelete || extraActions) && (
                    <td>
                      <div className={styles.actions}>
                        {editBasePath && (
                          <Link
                            href={`${editBasePath}/${row._id}`}
                            className={styles.actionBtn}
                            title="Edit"
                          >
                            <MdEdit />
                          </Link>
                        )}
                        {onDelete && (
                          <button
                            className={`${styles.actionBtn} ${styles.danger}`}
                            title="Delete"
                            onClick={() => onDelete(row)}
                          >
                            <MdDelete />
                          </button>
                        )}
                        {extraActions && extraActions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing {(currentPage - 1) * pagination.limit + 1}–
            {Math.min(currentPage * pagination.limit, pagination.total)} of{" "}
            {pagination.total}
          </div>
          <div className={styles.paginationButtons}>
            <button
              className={styles.pageBtn}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            {pageNumbers.map((n) => (
              <button
                key={n}
                className={`${styles.pageBtn} ${n === currentPage ? styles.activePage : ""}`}
                onClick={() => onPageChange(n)}
              >
                {n}
              </button>
            ))}
            <button
              className={styles.pageBtn}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
