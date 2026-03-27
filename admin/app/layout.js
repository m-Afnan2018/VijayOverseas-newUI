import "./globals.css";

export const metadata = {
  title: "Admin Panel — Vijay Overseas",
  description: "Manage products, blogs, notices, and testimonials",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
