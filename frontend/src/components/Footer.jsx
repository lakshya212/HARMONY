import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#070A12] py-8 text-center text-xs text-slate-500 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-emerald-400 p-[1px]">
            <div className="w-full h-full bg-[#0D1322] rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
          <span className="font-extrabold text-sm text-slate-300 font-display">
            HARMONY<span className="text-emerald-400">.</span>
          </span>
          <span className="text-slate-400">· Shared Living & Expense Balancing</span>
        </div>

        <div className="flex items-center space-x-6 text-slate-400">
          <span className="hover:text-slate-200 transition cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-200 transition cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-200 transition cursor-pointer">Status</span>
        </div>

        <div>
          <p className="text-slate-400">
            © 2026 HARMONY Technologies Inc. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
