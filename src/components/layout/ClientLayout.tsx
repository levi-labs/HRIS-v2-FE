"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { Bounce, ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const disabledMenu = ["/auth/login", "/auth/register"];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {disabledMenu.includes(pathname) ? (
        <main>{children}</main>
      ) : (
        <>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
          <div className="flex h-screen bg-slate-200">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Navbar onToggleSidebar={() => setSidebarOpen(true)} />
              <main className="flex-1 overflow-y-auto p-4">{children}</main>
            </div>
          </div>
          <ReactQueryDevtools
            initialIsOpen={false}
          />
        </>
      )}
    </>
  );
}
