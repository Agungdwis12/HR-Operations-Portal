import React from "react";
import { Wallet, Target, TrendingUp, Receipt, Building2, Clock3, ChevronRight } from "lucide-react";

const CostDashboard: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50">
      {/* =====================================================
          PAGE CONTAINER
      ====================================================== */}
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        {/* =====================================================
            BREADCRUMB
        ====================================================== */}
        <div className="mb-5 flex items-center gap-2 text-sm text-slate-400">
          <span>Dashboard</span>

          <ChevronRight className="h-4 w-4" />

          <span className="font-medium text-slate-600">Realisasi, Target &amp; Cost Payroll</span>
        </div>

        {/* =====================================================
            HERO / PAGE HEADER
        ====================================================== */}
        <section className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br  from-[#2a1a93] via-[#2a1a93] to-[#2a1a93] px-6 py-7 text-white shadow-sm sm:px-8">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/5" />

          <div className="pointer-events-none absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT CONTENT */}
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                <Wallet className="h-3.5 w-3.5" />
                Payroll Operation Dashboard
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Realisasi, Target &amp; Cost Payroll</h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-[15px]">Monitoring realisasi payroll, pencapaian target, dan cost payroll untuk membantu melihat kondisi biaya payroll secara lebih terstruktur.</p>
            </div>

            {/* RIGHT ICON */}
            <div className="hidden shrink-0 lg:block">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <Wallet className="h-12 w-12 text-white/90" />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            DASHBOARD SECTION
        ====================================================== */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* ===================================================
              DASHBOARD HEADER
          ==================================================== */}
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* TITLE */}
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />

                  <h2 className="text-sm font-semibold text-slate-800">Realisasi, Target &amp; Cost Payroll</h2>
                </div>

                <p className="mt-1 text-xs text-slate-400">Gunakan filter pada dashboard untuk melihat realisasi, target, dan cost payroll sesuai periode atau unit.</p>
              </div>

              {/* STATUS */}
              <div className="flex w-fit items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                <Clock3 className="h-3.5 w-3.5" />
                Data Dashboard
              </div>
            </div>
          </div>

          {/* ===================================================
              LOOKER STUDIO
          ==================================================== */}
          <div className="w-full bg-white">
            <iframe
              src="https://datastudio.google.com/embed/reporting/a1a450cd-df69-4f07-986e-5d8f9618a6cd/page/od89F"
              title="Realisasi, Target & Cost Payroll"
              className="block w-full border-0"
              style={{
                height: "450px",
              }}
              allowFullScreen
            />
          </div>
        </section>

        {/* =====================================================
            FOOTNOTE
        ====================================================== */}
        <div className="mt-4 flex items-center justify-between px-1">
          <p className="text-[11px] text-slate-400">Realisasi, Target &amp; Cost Payroll · Payroll Operation</p>

          <p className="text-[11px] text-slate-400">Interactive Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default CostDashboard;
