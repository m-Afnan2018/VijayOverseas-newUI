import AdminShell from "@/app/AdminShell";
import BlogForm from "@/components/forms/BlogForm";

export default function BlogEditPage({ params }) {
  return (
    <AdminShell>
      <BlogForm id={params.id} />
    </AdminShell>
  );
}
