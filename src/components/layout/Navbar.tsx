import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Moon, Sun, User, Settings, LogOut, ChevronDown, Menu } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/employees?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    setShowProfileMenu(false);
    logout();
    navigate("/login");
  };

  // =========================================================
  // AVATAR INITIAL
  // =========================================================

  const getInitials = () => {
    if (!user?.name) return "U";

    return user.name
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((name) => name.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header
      className="
        sticky top-0 z-30
        h-16
        w-full
        shrink-0
        border-b border-slate-200
        bg-white/95
        backdrop-blur
        transition-colors
        dark:border-slate-800
        dark:bg-slate-950/95
      "
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            LEFT SECTION
        ====================================================== */}

        <div className="flex min-w-0 flex-1 items-center gap-3">
          {/* Mobile Menu */}

          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Open sidebar"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-slate-500
              transition-colors
              hover:bg-slate-100
              hover:text-slate-800
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-slate-100
              lg:hidden
            "
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search */}

          <form onSubmit={handleSearchSubmit} className="relative hidden w-full max-w-md sm:block">
            <Search
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="
                h-9
                w-full
                rounded-lg
                border
                border-slate-200
                bg-slate-50
                pl-9
                pr-3
                text-sm
                text-slate-800
                outline-none
                transition-all
                placeholder:text-slate-400
                focus:border-slate-300
                focus:bg-white
                focus:ring-2
                focus:ring-slate-100
                dark:border-slate-800
                dark:bg-slate-900
                dark:text-slate-100
                dark:placeholder:text-slate-500
                dark:focus:border-slate-700
                dark:focus:bg-slate-900
                dark:focus:ring-slate-800
              "
            />
          </form>
        </div>

        {/* =====================================================
            RIGHT SECTION
        ====================================================== */}

        <div className="ml-4 flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* =================================================
              SYSTEM STATUS
          ================================================== */}

          <div
            className="
              hidden
              items-center
              gap-2
              rounded-full
              bg-emerald-50
              px-3
              py-1.5
              text-[11px]
              font-medium
              text-emerald-700
              dark:bg-emerald-950/30
              dark:text-emerald-400
              sm:flex
            "
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            System Active
          </div>

          {/* Divider */}

          <div
            className="
              mx-1
              hidden
              h-6
              w-px
              bg-slate-200
              dark:bg-slate-800
              sm:block
            "
          />

          {/* =================================================
              THEME BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-500
              transition-colors
              hover:bg-slate-100
              hover:text-slate-700
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
          >
            {theme === "dark" ? <Sun className="h-[17px] w-[17px] text-amber-400" /> : <Moon className="h-[17px] w-[17px]" />}
          </button>

          {/* =================================================
              PROFILE
          ================================================== */}

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                p-1
                transition-colors
                hover:bg-slate-100
                dark:hover:bg-slate-800
              "
              aria-label="Open profile menu"
              aria-expanded={showProfileMenu}
            >
              {/* Avatar */}

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-[#6F1733]
                  text-[11px]
                  font-bold
                  text-white
                "
              >
                {getInitials()}
              </div>

              {/* User name */}

              <div className="hidden max-w-[130px] text-left lg:block">
                <p
                  className="
                    truncate
                    text-xs
                    font-semibold
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  {user?.name || "User"}
                </p>

                <p
                  className="
                    truncate
                    text-[10px]
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Payroll Operation
                </p>
              </div>

              <ChevronDown
                className={`
                  hidden
                  h-3.5
                  w-3.5
                  text-slate-400
                  transition-transform
                  lg:block
                  ${showProfileMenu ? "rotate-180" : ""}
                `}
              />
            </button>

            {/* =================================================
                PROFILE DROPDOWN
            ================================================== */}

            {showProfileMenu && (
              <>
                {/* Mobile/Outside overlay */}

                <button type="button" aria-label="Close profile menu" onClick={() => setShowProfileMenu(false)} className="fixed inset-0 z-40 cursor-default" />

                <div
                  className="
                    absolute
                    right-0
                    top-full
                    z-50
                    mt-2
                    w-60
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    shadow-lg
                    dark:border-slate-800
                    dark:bg-slate-900
                  "
                >
                  {/* User Info */}

                  <div
                    className="
                      border-b
                      border-slate-100
                      px-4
                      py-3
                      dark:border-slate-800
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#6F1733]
                          text-xs
                          font-bold
                          text-white
                        "
                      >
                        {getInitials()}
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            truncate
                            text-xs
                            font-semibold
                            text-slate-800
                            dark:text-slate-100
                          "
                        >
                          {user?.name || "User"}
                        </p>

                        <p
                          className="
                            mt-0.5
                            truncate
                            text-[11px]
                            text-slate-500
                            dark:text-slate-400
                          "
                        >
                          {user?.email || "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu */}

                  <div className="p-1.5">
                    <Link
                      to="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        px-3
                        py-2.5
                        text-xs
                        font-medium
                        text-slate-700
                        transition-colors
                        hover:bg-slate-50
                        dark:text-slate-300
                        dark:hover:bg-slate-800
                      "
                    >
                      <User className="h-4 w-4 text-slate-400" />
                      My Profile
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        px-3
                        py-2.5
                        text-xs
                        font-medium
                        text-slate-700
                        transition-colors
                        hover:bg-slate-50
                        dark:text-slate-300
                        dark:hover:bg-slate-800
                      "
                    >
                      <Settings className="h-4 w-4 text-slate-400" />
                      Account Settings
                    </Link>
                  </div>

                  {/* Logout */}

                  <div
                    className="
                      border-t
                      border-slate-100
                      p-1.5
                      dark:border-slate-800
                    "
                  >
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-lg
                        px-3
                        py-2.5
                        text-left
                        text-xs
                        font-medium
                        text-rose-600
                        transition-colors
                        hover:bg-rose-50
                        dark:text-rose-400
                        dark:hover:bg-rose-950/30
                      "
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
