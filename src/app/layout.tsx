import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/utils/context/AuthContext";
import { LinkProvider } from "@/utils/context/LinkContext";
import { ImageUploadProvider } from "@/utils/ImageUploadContext";
import { ToastContainer } from 'react-toastify';

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "Devlinks - Share Your Developer Profiles",
  description: "Devlinks is an app to manage and share your developer profiles and links in one place. Easily add, edit, and share your GitHub, LinkedIn, Twitter, and other profiles with the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={instrumentSans.className}>
        <ToastContainer/>
        <ImageUploadProvider>
          <AuthProvider>
            <LinkProvider>
              {children}
            </LinkProvider>
          </AuthProvider>
        </ImageUploadProvider>

      </body>
    </html>


  );
}
