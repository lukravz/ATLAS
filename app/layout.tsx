import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "ATLAS — Agricultura inteligente", description: "Água e energia no momento certo. Protótipo de manejo inteligente para o campo.", icons: {icon:"/favicon.svg"} };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR"><body>{children}</body></html>}
