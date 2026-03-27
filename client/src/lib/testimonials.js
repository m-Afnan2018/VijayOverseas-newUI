const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function getProductTestimonials(productId) {
  const url = `${BASE_URL}/testimonials?isActive=true&product=${productId}&limit=20`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json().catch(() => ({ data: [] }));
  return data.data || [];
}
