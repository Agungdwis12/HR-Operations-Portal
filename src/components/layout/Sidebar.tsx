import React from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { LayoutDashboard, FileText, Wallet, Settings, User, LogOut, ChevronLeft, ChevronRight } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/cn";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse, isOpenMobile, onCloseMobile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role || "Admin";

  // =========================================================
  // MAIN DASHBOARD MENU
  // =========================================================

  const allNavItems = [
    {
      name: "Kinerja Layanan Divisi",
      path: "/dashboard/payroll",
      icon: LayoutDashboard,
      roles: ["Admin", "HR Manager", "Department Head", "Employee"],
    },
    {
      name: "Detail BAPP",
      path: "/dashboard/bapp",
      icon: FileText,
      roles: ["Admin", "HR Manager", "Department Head", "Employee"],
    },
    {
      name: "Realisasi, Target & Cost Payroll",
      path: "/dashboard/cost",
      icon: Wallet,
      roles: ["Admin", "HR Manager", "Department Head", "Employee"],
    },
  ];

  const navItems = allNavItems.filter((item) => item.roles.includes(role));

  // =========================================================
  // SECONDARY MENU
  // =========================================================

  const secondaryNav = [
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  // =========================================================
  // SIDEBAR CONTENT
  // =========================================================

  const sidebarContent = (
    <div className="flex h-full select-none flex-col bg-white text-slate-700 transition-colors dark:bg-slate-950 dark:text-slate-200">
      {/* =====================================================
          BRAND
      ====================================================== */}

      <div className={cn("relative flex h-[72px] shrink-0 items-center border-b border-slate-200 dark:border-slate-800", isCollapsed && !isOpenMobile ? "justify-center" : "justify-between px-5")}>
        <NavLink to="/dashboard/payroll" onClick={onCloseMobile} className="flex items-center">
          {isCollapsed && !isOpenMobile ? (
            /* COLLAPSED BRAND */

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6F1733]">
              <span className="text-xl font-bold text-white">i</span>
            </div>
          ) : (
            /* EXPANDED BRAND */

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6F1733]">
                <span className="text-xl font-bold text-white">i</span>
              </div>

              <div className="leading-none">
                <div className="text-[19px] font-bold tracking-tight text-slate-800 dark:text-slate-100">infomedia</div>

                <div className="mt-1 text-[7px] font-medium tracking-wide text-slate-400 dark:text-slate-500">Your Digital CX Partner</div>
              </div>
            </div>
          )}
        </NavLink>

        {/* =====================================================
            COLLAPSE BUTTON
        ====================================================== */}

        <button
          type="button"
          onClick={onToggleCollapse}
          className={cn(
            "hidden h-7 w-7 items-center justify-center rounded-md transition-colors lg:flex",

            isCollapsed && !isOpenMobile
              ? "absolute -right-3 top-1/2 z-10 -translate-y-1/2 border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-[#6F1733] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-[#D98AA3]"
              : "text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200",
          )}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <div className="custom-scrollbar flex-1 overflow-y-auto px-3 py-5">
        {/* =====================================================
            MAIN MENU
        ====================================================== */}

        <div>
          {(!isCollapsed || isOpenMobile) && <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Dashboard</div>}

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  title={isCollapsed && !isOpenMobile ? item.name : undefined}
                  className={({ isActive }) =>
                    cn(
                      "group relative flex items-center rounded-lg transition-all duration-200",

                      isCollapsed && !isOpenMobile ? "h-11 justify-center" : "min-h-11 px-3 py-2",

                      /*
                       * ACTIVE MENU
                       *
                       * LIGHT  = black background + white text
                       * DARK   = white background + black text
                       */

                      isActive ? "bg-black text-white shadow-sm dark:bg-white dark:text-black" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* =================================================
                          ACTIVE INDICATOR
                      ================================================== */}

                      {isActive && <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-[#D98AA3]" />}

                      {/* =================================================
                          ICON + TEXT
                      ================================================== */}

                      <div className={cn("flex min-w-0 items-center", isCollapsed && !isOpenMobile ? "justify-center" : "gap-3")}>
                        {/* ICON */}

                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0",

                            isActive ? "text-white dark:text-black" : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300",
                          )}
                        />

                        {/* TEXT */}

                        {(!isCollapsed || isOpenMobile) && <span className={cn("min-w-0 text-[13px] leading-[18px]", isActive ? "font-semibold" : "font-medium")}>{item.name}</span>}
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* =====================================================
            SECONDARY MENU
        ====================================================== */}

        <div className="mt-7 border-t border-slate-100 pt-5 dark:border-slate-800">
          {(!isCollapsed || isOpenMobile) && <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Lainnya</div>}

          <nav className="space-y-1">
            {secondaryNav.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  title={isCollapsed && !isOpenMobile ? item.name : undefined}
                  className={({ isActive }) =>
                    cn(
                      "group relative flex items-center rounded-lg transition-all duration-200",

                      isCollapsed && !isOpenMobile ? "h-11 justify-center" : "min-h-10 gap-3 px-3 py-2",

                      /*
                       * ACTIVE MENU
                       *
                       * LIGHT  = black
                       * DARK   = white
                       */

                      isActive ? "bg-black text-white shadow-sm dark:bg-white dark:text-black" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* ACTIVE INDICATOR */}

                      {isActive && <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-[#D98AA3]" />}

                      {/* ICON */}

                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0",

                          isActive ? "text-white dark:text-black" : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300",
                        )}
                      />

                      {/* TEXT */}

                      {(!isCollapsed || isOpenMobile) && <span className={cn("text-[13px] leading-[18px]", isActive ? "font-semibold" : "font-medium")}>{item.name}</span>}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* =====================================================
          USER FOOTER
      ====================================================== */}

      <div className="shrink-0 border-t border-slate-200 p-3 dark:border-slate-800">
        <div
          className={cn(
            "flex items-center rounded-lg bg-slate-50 dark:bg-slate-900",

            isCollapsed && !isOpenMobile ? "justify-center p-2" : "gap-3 px-2.5 py-2",
          )}
        >
          {/* =================================================
              AVATAR
          ================================================== */}

          <div className="relative shrink-0">
            <img src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} alt="" className="h-8 w-8 rounded-full bg-slate-200 object-cover dark:bg-slate-700" />

            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900" />
          </div>

          {/* =================================================
              USER INFO
          ================================================== */}

          {(!isCollapsed || isOpenMobile) && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">{user?.name || "Admin"}</p>
            </div>
          )}

          {/* =================================================
              LOGOUT
          ================================================== */}

          {(!isCollapsed || isOpenMobile) && (
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // ===========================================================
  // RETURN
  // ===========================================================

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}

      <aside
        className={cn(
          "fixed bottom-0 left-0 top-0 z-40 hidden border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 lg:block",

          // Expanded = 256px
          // Collapsed = 80px

          isCollapsed ? "w-20" : "w-64",
        )}
      >
        {sidebarContent}
      </aside>

      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}

      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}

          <div onClick={onCloseMobile} className="fixed inset-0 bg-black/40 backdrop-blur-[1px] dark:bg-black/60" />

          {/* Drawer */}

          <aside className="fixed bottom-0 left-0 top-0 z-10 w-72 border-r border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">{sidebarContent}</aside>
        </div>
      )}
    </>
  );
};
