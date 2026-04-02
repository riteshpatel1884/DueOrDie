import { ThemeProvider } from "./theme/Themecontext";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "DueOrDie",
  description: "Track your study goals. Feel the pressure. Get it done.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main style={{ minHeight: "calc(100vh - 60px)" }}>{children}</main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
