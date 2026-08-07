import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  setResumeData,
  createNewResume,
  deleteResumeFromList,
  duplicateResume,
  renameResumeInList,
} from '../redux/resumeSlice';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import {
  FileText,
  Plus,
  Search,
  Copy,
  Trash2,
  Edit2,
  Upload,
  Sparkles,
  Download,
  Gauge,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';
import { exportToJson } from '../utils/exportHelpers';
import { evaluateATS } from '../utils/atsEvaluator';
import { ALL_TEMPLATES } from '../constants/templatePresets';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { resumesList, currentResume } = useAppSelector((state) => state.resume);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('modern-clean');

  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameText, setRenameText] = useState<string>('');

  const filteredResumes = resumesList.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenResume = (resume: any) => {
    dispatch(setResumeData(resume));
    navigate('/builder');
  };

  const handleCreateNew = () => {
    if (!newTitle.trim()) return;
    dispatch(createNewResume({ title: newTitle, templateId: selectedTemplateId }));
    setIsCreateModalOpen(false);
    setNewTitle('');
    navigate('/builder');
  };

  const handleRenameSubmit = () => {
    if (renameId && renameText.trim()) {
      dispatch(renameResumeInList({ id: renameId, title: renameText }));
      setRenameId(null);
    }
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.personal) {
            dispatch(setResumeData(parsed));
            navigate('/builder');
          } else {
            alert('Invalid JSON Resume file.');
          }
        } catch {
          alert('Failed to parse JSON file.');
        }
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Stats Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-blue-600 uppercase tracking-wider mb-1">
              <UserCheck className="w-4 h-4" /> Guest User Workspace
            </div>
            <h1 className="text-2xl font-bold font-outfit text-slate-900">My Resumes Dashboard</h1>
            <p className="text-xs text-slate-500 mt-1">
              All your resumes are stored persistently in browser storage & synced locally.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <label className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-blue-600" /> Import JSON Resume
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" /> Create New Resume
            </button>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900">{resumesList.length}</span>
              <p className="text-xs font-medium text-slate-500">Resumes Created</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Gauge className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900">
                {evaluateATS(currentResume).score}%
              </span>
              <p className="text-xs font-medium text-slate-500">Current Resume ATS Score</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900">25+</span>
              <p className="text-xs font-medium text-slate-500">Available Templates</p>
            </div>
          </div>
        </div>

        {/* Search & Resumes Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-800">Saved Resumes ({filteredResumes.length})</h2>
            <div className="relative w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search resumes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((res) => {
              const ats = evaluateATS(res);
              return (
                <div
                  key={res.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ATS Score: {ats.score}%
                      </span>
                    </div>

                    <div>
                      {renameId === res.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={renameText}
                            onChange={(e) => setRenameText(e.target.value)}
                            className="px-2 py-1 text-xs border border-slate-300 rounded outline-none w-full"
                          />
                          <button
                            onClick={handleRenameSubmit}
                            className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                          {res.title}
                        </h3>
                      )}
                      <p className="text-xs text-slate-500 mt-0.5">
                        Template: <span className="font-semibold text-slate-700">{res.templateId || 'Modern Clean'}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Updated {new Date(res.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
                    <button
                      onClick={() => handleOpenResume(res)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      Edit Resume
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        title="Rename"
                        onClick={() => {
                          setRenameId(res.id);
                          setRenameText(res.title);
                        }}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        title="Duplicate"
                        onClick={() => dispatch(duplicateResume(res.id))}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        title="Export JSON"
                        onClick={() => exportToJson(res, `${res.title}.json`)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      {resumesList.length > 1 && (
                        <button
                          title="Delete"
                          onClick={() => dispatch(deleteResumeFromList(res.id))}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Create New Resume Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-100 space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Create New Resume</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Resume Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Software Developer 2025"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Choose Initial Template</label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => setSelectedTemplateId(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl bg-white outline-none"
                >
                  {ALL_TEMPLATES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNew}
                disabled={!newTitle.trim()}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold disabled:opacity-50"
              >
                Start Building
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
