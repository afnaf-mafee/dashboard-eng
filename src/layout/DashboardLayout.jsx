import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import {
  GraduationCap,
  ClipboardCheck,
  WalletCards,
  LogOut,
  Menu,
  X,
  ChartNoAxesCombined,
  Blocks
} from "lucide-react";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    {
      name: "Students",
      path: "/students",
      icon: GraduationCap,
    },
    {
      name: "Attendance",
      path: "attendance",
      icon: ClipboardCheck,
    },
    {
      name: "Fee Collection",
      path: "/fee-collection",
      icon: WalletCards,
    },{
      name: "Result",
      path: "/result",
      icon: ChartNoAxesCombined 
    },{
      name: "Batch",
      path: "/batch",
      icon: Blocks 
    },
  ];

  return (
    <div className="min-h-screen bg-app-bg font-inter text-text-primary">

      {/* =========================
          Background Glow
      ========================= */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-glow-purple/20 blur-3xl" />

        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-glow-fuchsia/20 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-glow-violet/15 blur-3xl" />

      </div>

      {/* =========================
          Mobile Header
      ========================= */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-[72px] items-center justify-between border-b border-border bg-surface-soft px-5 backdrop-blur-xl lg:hidden">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary shadow-lg shadow-brand-primary/25">
          <span className="text-sm font-bold text-white">M</span>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-soft bg-surface-soft text-brand-secondary shadow-sm transition hover:bg-surface"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

      </header>

      {/* =========================
          Mobile Overlay
      ========================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
        />
      )}

      <div className="mx-auto flex min-h-screen max-w-[1600px] p-3 sm:p-4 lg:p-6">

        {/* =========================
            Sidebar
        ========================= */}
        <aside
          className={`
            fixed left-3 top-3 bottom-3 z-50 w-[260px]

            transform rounded-[28px]

            border border-border

            bg-surface-soft

            p-5

            shadow-[0_20px_60px_rgba(91,33,182,0.10)]

            backdrop-blur-2xl

            transition-transform duration-300

            lg:sticky
            lg:top-6
            lg:h-[calc(100vh-48px)]
            lg:translate-x-0

            ${open ? "translate-x-0" : "-translate-x-[120%]"}
          `}
        >

          {/* Logo */}
          <div className="mb-12 flex items-center justify-between">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary shadow-lg shadow-brand-primary/25">
              <span className="text-base font-bold text-white">
                M
              </span>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-text-muted hover:bg-purple-soft hover:text-brand-secondary lg:hidden"
            >
              <X size={20} />
            </button>

          </div>

          {/* Navigation */}
          <nav className="space-y-3">

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `
                    group flex items-center gap-4 rounded-2xl px-4 py-3.5

                    font-urbanist text-[15px] font-semibold

                    transition-all duration-300

                    ${
                      isActive
                        ? "bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-lg shadow-brand-primary/20"
                        : "text-text-secondary hover:bg-surface hover:text-brand-secondary"
                    }
                  `}
                >

                  <Icon
                    size={20}
                    strokeWidth={1.8}
                  />

                  <span>
                    {item.name}
                  </span>

                </NavLink>
              );
            })}

          </nav>

          {/* Logout */}
          <div className="absolute bottom-5 left-5 right-5">

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border-soft bg-surface-soft px-4 py-3 font-urbanist text-sm font-semibold text-brand-secondary transition hover:bg-purple-soft">

              <LogOut size={18} />

              Logout

            </button>

          </div>

        </aside>

        {/* =========================
            Main
        ========================= */}
        <main className="min-w-0 flex-1 pt-[72px] lg:pt-0 lg:pl-6">

          {/* Top Header */}
          <div className="mb-6 hidden items-center justify-end lg:flex">

            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent px-6 py-3 font-urbanist text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition hover:scale-[1.02]">

              <LogOut size={17} />

              Logout

            </button>

          </div>

          {/* Page */}
          <div className=" !font-urbanest min-h-[calc(100vh-48px)] rounded-[28px] border border-border bg-surface-soft p-4 shadow-[0_20px_60px_rgba(91,33,182,0.08)] backdrop-blur-2xl sm:p-6 lg:p-8">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;