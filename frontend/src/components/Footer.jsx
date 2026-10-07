import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1">
        <p className="font-medium text-slate-700">
          HARMONY — Roommate Conflict Resolution & Shared Living Management System
        </p>
        <p>
          BCA 5th Semester Minor Project (<span className="font-semibold text-blue-600">BCA-508</span>) | School of IT, IMS Noida | Affiliated with CCS University, Meerut
        </p>
        <p className="text-slate-400">
          Designed for ₹0 Free-Tier Academic Cloud Deployment (React + Vite, Express.js REST API, PostgreSQL)
        </p>
      </div>
    </footer>
  );
}
