import React from 'react';
import { FileText, Github, Heart, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-outfit font-bold text-white text-lg">ResumeCraft Pro</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier AI-assisted resume builder tailored specifically for university freshers, engineers, and entry-level job seekers.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> 100% Privacy - Stored Locally
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">Features</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/builder" className="hover:text-white transition-colors">Multi-Step Builder</Link></li>
              <li><Link to="/templates" className="hover:text-white transition-colors">25+ Premium Templates</Link></li>
              <li><Link to="/builder" className="hover:text-white transition-colors">ATS Score Analyzer</Link></li>
              <li><Link to="/builder" className="hover:text-white transition-colors">AI Content Generator</Link></li>
            </ul>
          </div>

          {/* Formats */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">Export Formats</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-amber-400" /> PDF Document (.pdf)</li>
              <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-blue-400" /> Editable Word (.docx)</li>
              <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-emerald-400" /> JSON Resume Data</li>
              <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-purple-400" /> Single HTML & TXT</li>
            </ul>
          </div>

          {/* Security & Tech */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">Engineering Stack</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Built with React 19, TypeScript, Redux Toolkit, TailwindCSS, Framer Motion, and Node/Express backend.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
            >
              <Github className="w-4 h-4" /> Open Source Code
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} ResumeCraft Pro. Crafted with precision for Freshers worldwide.</p>
          <div className="flex items-center gap-1 text-slate-400">
            Designed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" /> for peak career impact
          </div>
        </div>
      </div>
    </footer>
  );
};
