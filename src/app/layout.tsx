// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });
const AuthGuard = dynamic(() => import("@/components/AuthGuard"), {
  ssr: false,
});
export const metadata: Metadata = {
  title: "Funky Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* AuthGuard sẽ tự kiểm tra và chỉ bảo vệ những trang không phải login */}
        <AuthGuard>
          {children}
        </AuthGuard>

        {/* ToastContainer cho react-toastify */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}
