import AdminShell from "@/app/AdminShell";
import NoticeForm from "@/components/forms/NoticeForm";

export default function NoticeEditPage({ params }) {
  return (
    <AdminShell>
      <NoticeForm id={params.id} />
    </AdminShell>
  );
}
