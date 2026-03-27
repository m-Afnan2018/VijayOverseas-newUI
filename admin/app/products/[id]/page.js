import AdminShell from "@/app/AdminShell";
import ProductForm from "@/components/forms/ProductForm";

export default function ProductEditPage({ params }) {
  return (
    <AdminShell>
      <ProductForm id={params.id} />
    </AdminShell>
  );
}
