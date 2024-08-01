import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const runtime = "experimental-edge";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Nav />
          {children}
          <Footer />
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
