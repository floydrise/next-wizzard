import type {Metadata} from "next";
import "./globals.css";
import {Providers} from "@/app/components/providers";

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
        <body
            className={`antialiased`}
        >
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
