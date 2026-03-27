import AdminShell from "@/app/AdminShell";
import TestimonialForm from "@/components/forms/TestimonialForm";

export default function TestimonialEditPage({ params }) {
  return (
    <AdminShell>
      <TestimonialForm id={params.id} />
    </AdminShell>
  );
}
