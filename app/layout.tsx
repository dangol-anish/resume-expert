import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Resume Expert",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex bg-gradient-to-b from-[#FFE0C6] to-white h-screen justify-center gap-2 `}
      >
        <Sidebar />
        <div className="flex flex-col h-full ">
          <div className="h-full">
            <div className="w-[650px] h-[95%] bg-primary_color justify-self-center bg-gradient-to-b from-white to-[#FFE0C6] border border-p_border rounded-[40px] mt-10">
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
