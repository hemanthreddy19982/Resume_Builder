import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Settings, ShieldCheck, Database, HardDrive, Trash2, RefreshCw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setResumeData } from '../redux/resumeSlice';
import { initialResumeData } from '../constants/initialResumeData';

export const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentResume = useAppSelector((state) => state.resume.currentResume);

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset your resume data back to default sample content?')) {
      localStorage.clear();
      dispatch(setResumeData(initialResumeData));
      alert('Local storage data reset successfully.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-extrabold font-outfit text-slate-900 flex items-center gap-2">
            <Settings className="w-7 h-7 text-blue-600" /> Application Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage guest storage, local JSON persistence, and server API sync.</p>
        </div>

        <div className="space-y-6">
          {/* Privacy & Storage Info */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Browser LocalStorage Guarantee</h3>
                <p className="text-xs text-slate-500">No database required. All resume drafts are stored safely in your browser.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Resume ID</span>
                <span className="text-xs font-mono font-bold text-slate-800">{currentResume.id}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Backend Storage Path</span>
                <span className="text-xs font-mono font-bold text-slate-800">server/json/*.json</span>
              </div>
            </div>
          </div>

          {/* Reset Options */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Reset Local Storage</h3>
                <p className="text-xs text-slate-500">Clear cached browser data and restore original sample resume values.</p>
              </div>
            </div>

            <button
              onClick={handleResetData}
              className="px-4 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors border border-rose-200"
            >
              <RefreshCw className="w-4 h-4" /> Reset All Local Data
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
