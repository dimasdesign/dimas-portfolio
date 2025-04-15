import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';

const gothic = localFont({
  src: './SpecialGothicExpandedOne-Regular.ttf',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Dimas Design",
  description: "My portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gothic.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
