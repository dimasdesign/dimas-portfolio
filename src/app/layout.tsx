import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${gothic.variable} ${monsterrat.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
