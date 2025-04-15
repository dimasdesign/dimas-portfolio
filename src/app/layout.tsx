import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';

const gothic = localFont({
  src: './SpecialGothicExpandedOne-Regular.ttf',
  display: 'swap',
  variable: '--font-gothic',
});

const monsterrat = localFont({
  src: './Montserrat-Regular.ttf',
  display: 'swap',
  variable: '--font-monsterrat',
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
        className={`${gothic.variable} ${monsterrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
