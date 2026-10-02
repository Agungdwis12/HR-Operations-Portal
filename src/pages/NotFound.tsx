import React from "react";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900 dark:text-white">404</h1>

        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Page not found</p>

        <Link to="/dashboard/payroll" className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};
