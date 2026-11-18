import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "KEYSPACE | Find Your Space", description: "Discover homes and property opportunities." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
