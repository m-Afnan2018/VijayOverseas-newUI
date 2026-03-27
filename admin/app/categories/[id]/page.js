import AdminShell from "@/app/AdminShell";
import CategoryForm from "@/components/forms/CategoryForm";

export default function CategoryEditPage({ params }) {
  return (
    <AdminShell>
      <CategoryForm id={params.id} />
    </AdminShell>
  );
}
