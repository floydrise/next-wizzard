import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import {SessionProvider} from "next-auth/react";

export const metadata: Metadata = {
  title: "Wizards",
  description: "Fight enemies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers><SessionProvider>{children}</SessionProvider></Providers>
      </body>
    </html>
  );
}
