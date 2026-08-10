import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "X Nail ERP | Client Demo",
  description:
    "Client-demo preview of the X Nail ERP platform: appointments, customers, inventory, franchise and business intelligence in one console.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-ink text-bone antialiased">{children}</body>
    </html>
  );
}
