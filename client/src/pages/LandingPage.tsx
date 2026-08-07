import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Sparkles, FileText, CheckCircle2, Zap, ArrowRight, ShieldCheck, Download, Award, ChevronRight } from 'lucide-react';
import { ALL_TEMPLATES } from '../constants/templatePresets';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Decorative Background Shapes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/20 via-indigo-400/20 to-purple-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-2xl pointer-events-none animate-pulse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-extrabold shadow-sm animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              #1 Resume Builder Engineered for Freshers & Grads
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-outfit text-slate-900 tracking-tight leading-[1.15]">
              Land Your Dream Job With An{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ATS-Optimized Resume
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Build high-converting resumes tailored for top tech firms & Fortune 500s. Packed with 25+ templates, real-time ATS scoring, AI content generators, and 1-click PDF/Word export.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/builder"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                Create My Resume Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/templates"
                className="w-full sm:w-auto px-7 py-4 glass-card hover:bg-white text-slate-700 rounded-2xl font-semibold text-sm border border-slate-200 flex items-center justify-center gap-2 transition-all"
              >
                Explore 25+ Templates
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Free & Stored Locally</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-500" /> No Auth Required</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-500" /> PDF & DOCX Export</span>
            </div>
          </div>

          {/* Animated 3D Preview Frame */}
          <div className="mt-14 relative max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/60">
              <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-inner">
                {/* Browser bar */}
                <div className="px-4 py-3 bg-slate-800/90 flex items-center justify-between border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">resumecraft.ai/builder/live-preview</span>
                  <span className="text-xs font-bold text-emerald-400">ATS Score: 95/100</span>
                </div>
                <div className="p-4 sm:p-8 bg-slate-100/50 flex justify-center">
                  <div className="w-full max-w-2xl bg-white rounded-xl p-6 sm:p-8 shadow-xl text-left border border-slate-200 space-y-4">
                    <div className="border-b-2 border-blue-600 pb-3 flex justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Alex Vance</h3>
                        <p className="text-xs font-semibold text-blue-600">Junior Software Engineer</p>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold h-fit">Ready to Export</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div className="col-span-2 space-y-2">
                        <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Experience</p>
                        <p className="font-semibold text-slate-700">Full Stack Engineering Intern @ TechCorp</p>
                        <p className="text-slate-600 text-[11px]">• Built 12+ React components, reducing page load latency by 28%.</p>
                      </div>
                      <div className="space-y-2 border-l pl-3">
                        <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Skills</p>
                        <div className="flex flex-wrap gap-1">
                          <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 font-semibold text-[10px] rounded">React 19</span>
                          <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 font-semibold text-[10px] rounded">TypeScript</span>
                          <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 font-semibold text-[10px] rounded">Node.js</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold font-outfit text-slate-900">Why ResumeCraft Outperforms The Rest</h2>
            <p className="text-sm text-slate-600 mt-2">Built specifically to pass automated applicant tracking systems and impress hiring managers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-6 h-6 text-blue-600" />,
                title: 'Real-Time ATS Score Engine',
                desc: 'Evaluates bullet metrics, keyword counts, and formatting rules to ensure 90%+ pass rates.',
              },
              {
                icon: <Sparkles className="w-6 h-6 text-purple-600" />,
                title: 'AI Content Assistant',
                desc: 'Generate role-tailored summaries, bullet points, and skills recommendations in one click.',
              },
              {
                icon: <Download className="w-6 h-6 text-emerald-600" />,
                title: 'Multi-Format 1-Click Export',
                desc: 'Export high-resolution PDFs, editable Word (.docx) files, single HTML, or JSON backups.',
              },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{f.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold font-outfit text-slate-900">25+ Professional Templates</h2>
            <p className="text-sm text-slate-600 mt-1">Designed for every fresher career path: tech giants, startups, designers, and academics.</p>
          </div>
          <Link to="/templates" className="mt-4 md:mt-0 text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
            View All 25+ Templates <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {ALL_TEMPLATES.slice(0, 8).map((t) => (
            <div key={t.id} className="group glass-card rounded-2xl p-4 border border-slate-200 hover:shadow-xl transition-all">
              <div
                className="w-full h-44 rounded-xl mb-3 flex items-center justify-center text-white font-bold p-4 text-center shadow-inner relative overflow-hidden"
                style={{ backgroundColor: t.previewColor }}
              >
                <FileText className="w-12 h-12 opacity-40 group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-3 left-3 bg-white/20 backdrop-blur px-2.5 py-0.5 rounded text-[10px] font-semibold text-white">
                  {t.category}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-sm">{t.name}</h3>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{t.description}</p>
              <Link
                to="/builder"
                className="mt-3 block text-center py-2 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold transition-colors"
              >
                Use This Template
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
