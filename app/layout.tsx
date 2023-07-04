import "./globals.css";
import { Figtree } from "next/font/google";

import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone", // Tab display name
  description: "Music service application generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          {/* !! UserProvider must be inside SupabaseProvider */}
          <UserProvider>
            <ModalProvider />
            <div className="flex h-full">
              <Sidebar />
              <main className="flex-1 h-full overflow-y-auto py-2">
                {children}
              </main>
            </div>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
