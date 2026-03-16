import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Madera & Forma — Taller de Carpintería Artesanal",
  description:
    "Sillas artesanales creadas con pasión, diseño contemporáneo y maderas nobles seleccionadas a mano. Taller de carpintería artesanal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
