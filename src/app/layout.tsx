// app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

export const metadata = {
  title: "3x3 Grid App",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
