import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Toaster } from 'react-hot-toast';
import { cn } from '../utils/cn';

export const DashboardLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "var(--toast-bg, #1e293b)",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "13px",
          },
        }}
      />

      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} isOpenMobile={isMobileSidebarOpen} onCloseMobile={() => setIsMobileSidebarOpen(false)} />

      <div className={cn("flex-1 flex flex-col transition-all duration-300 min-h-screen", isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64")}>
        <Navbar onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Breadcrumb />
          <Outlet />
        </main>

        <footer className="py-4 px-6 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-500 dark:text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Perusahaan Indonesia. Semua hak dilindungi.</p>
          <div className="flex items-center space-x-4">
            <a href="#privacy" className="hover:underline">
              Kebijakan Privasi
            </a>
            <a href="#terms" className="hover:underline">
              Syarat & Ketentuan
            </a>
            <a href="#support" className="hover:underline">
              Bantuan HR
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
