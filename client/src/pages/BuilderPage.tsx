import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  undo,
  redo,
  setActiveStep,
  setZoomLevel,
  setDevicePreviewMode,
  setTemplateId,
  saveCurrentResumeToList,
} from '../redux/resumeSlice';
import { Navbar } from '../components/common/Navbar';
import { ATSScoreWidget } from '../components/builder/ATSScoreWidget';
import { PersonalSection } from '../components/builder/PersonalSection';
import { ObjectiveSection } from '../components/builder/ObjectiveSection';
import { EducationSection } from '../components/builder/EducationSection';
import { ExperienceSection } from '../components/builder/ExperienceSection';
import { ProjectsSection } from '../components/builder/ProjectsSection';
import { SkillsSection } from '../components/builder/SkillsSection';
import { CertificationsSection } from '../components/builder/CertificationsSection';
import { LanguagesSection } from '../components/builder/LanguagesSection';
import { ReferencesDeclarationSection } from '../components/builder/ReferencesDeclarationSection';
import { CustomizationPanel } from '../components/builder/CustomizationPanel';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { ALL_TEMPLATES } from '../constants/templatePresets';
import { exportToPdf, exportToJson, exportToTxt, printResume } from '../utils/exportHelpers';
import { api } from '../services/api';
import {
  User,
  AlignLeft,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Code,
  Award,
  Languages as LangIcon,
  FileCheck,
  Palette,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Monitor,
  Tablet,
  Smartphone,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';

const STEPS = [
  { id: 0, label: 'Personal', icon: User },
  { id: 1, label: 'Summary', icon: AlignLeft },
  { id: 2, label: 'Education', icon: GraduationCap },
  { id: 3, label: 'Experience', icon: Briefcase },
  { id: 4, label: 'Projects', icon: FolderGit2 },
  { id: 5, label: 'Skills', icon: Code },
  { id: 6, label: 'Certifications', icon: Award },
  { id: 7, label: 'Languages', icon: LangIcon },
  { id: 8, label: 'Declaration', icon: FileCheck },
  { id: 9, label: 'Customization', icon: Palette },
];

export const BuilderPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentResume, activeStep, pastHistory, futureHistory, zoomLevel, devicePreviewMode, lastSavedAt } =
    useAppSelector((state) => state.resume);

  const [exporting, setExporting] = useState<boolean>(false);

  const handleNextStep = () => {
    if (activeStep < STEPS.length - 1) {
      dispatch(setActiveStep(activeStep + 1));
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      dispatch(setActiveStep(activeStep - 1));
    }
  };

  const handleDownloadPdf = async () => {
    try {
      setExporting(true);
      await exportToPdf('resume-preview-document', `${currentResume.title || 'Resume'}.pdf`);
      dispatch(saveCurrentResumeToList());
    } catch (err) {
      console.warn('Client PDF export fallback to backend', err);
      try {
        await api.exportPdf(currentResume);
      } catch (backendErr) {
        alert('Failed to generate PDF document.');
      }
    } finally {
      setExporting(false);
    }
  };

  const handleDownloadDocx = async () => {
    try {
      setExporting(true);
      await api.exportDocx(currentResume);
    } catch {
      alert('Failed to generate DOCX document.');
    } finally {
      setExporting(false);
    }
  };

  const renderActiveStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <PersonalSection />;
      case 1:
        return <ObjectiveSection />;
      case 2:
        return <EducationSection />;
      case 3:
        return <ExperienceSection />;
      case 4:
        return <ProjectsSection />;
      case 5:
        return <SkillsSection />;
      case 6:
        return <CertificationsSection />;
      case 7:
        return <LanguagesSection />;
      case 8:
        return <ReferencesDeclarationSection />;
      case 9:
        return <CustomizationPanel />;
      default:
        return <PersonalSection />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      {/* Top Action & Undo/Redo Controls Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Step Indicator & Undo/Redo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border-r border-slate-200 pr-3">
              <button
                disabled={pastHistory.length === 0}
                onClick={() => dispatch(undo())}
                className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 transition-colors"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                disabled={futureHistory.length === 0}
                onClick={() => dispatch(redo())}
                className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 transition-colors"
                title="Redo (Ctrl+Y)"
              >
                <Redo2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={currentResume.templateId || 'modern-clean'}
                onChange={(e) => dispatch(setTemplateId(e.target.value))}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white font-bold text-slate-800 outline-none"
              >
                {ALL_TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.category})
                  </option>
                ))}
              </select>
              <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
                Saved {lastSavedAt}
              </span>
            </div>
          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={exporting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
            <button
              onClick={handleDownloadDocx}
              disabled={exporting}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors hidden sm:flex items-center gap-1.5"
            >
              DOCX
            </button>
            <button
              onClick={() => exportToJson(currentResume, `${currentResume.title}.json`)}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors hidden sm:flex items-center gap-1.5"
            >
              JSON
            </button>
            <button
              onClick={printResume}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              title="Print Resume"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Builder Split Workspace */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Multi-Step Navigation & Editor Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <ATSScoreWidget />

          {/* Step Pill Navigation */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1 overflow-x-auto">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isCurrent = activeStep === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => dispatch(setActiveStep(s.id))}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 flex-shrink-0 transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Step Form Container */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm min-h-[500px]">
            {renderActiveStepComponent()}

            {/* Next / Previous Controls */}
            <div className="pt-6 border-t border-slate-200 mt-8 flex justify-between items-center">
              <button
                disabled={activeStep === 0}
                onClick={handlePrevStep}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                disabled={activeStep === STEPS.length - 1}
                onClick={handleNextStep}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-md shadow-blue-600/20 transition-all"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Preview Workspace (7 cols) */}
        <div className="lg:col-span-7 sticky top-36 space-y-3">
          {/* Zoom & Device Mode Bar */}
          <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">Live Preview</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
                Auto-Updates
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => dispatch(setDevicePreviewMode('desktop'))}
                  className={`p-1.5 rounded-lg transition-colors ${
                    devicePreviewMode === 'desktop' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-400'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => dispatch(setDevicePreviewMode('tablet'))}
                  className={`p-1.5 rounded-lg transition-colors ${
                    devicePreviewMode === 'tablet' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-400'
                  }`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => dispatch(setDevicePreviewMode('mobile'))}
                  className={`p-1.5 rounded-lg transition-colors ${
                    devicePreviewMode === 'mobile' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-400'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-1 border-l pl-3">
                <button
                  onClick={() => dispatch(setZoomLevel(zoomLevel - 10))}
                  className="p-1 text-slate-500 hover:text-slate-800"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono font-bold w-10 text-center">{zoomLevel}%</span>
                <button
                  onClick={() => dispatch(setZoomLevel(zoomLevel + 10))}
                  className="p-1 text-slate-500 hover:text-slate-800"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Live Render Canvas Wrapper */}
          <div className="bg-slate-200/80 p-4 sm:p-8 rounded-3xl overflow-auto max-h-[82vh] flex justify-center border border-slate-300/80 shadow-inner">
            <div
              id="resume-preview-document"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease-out',
                width: devicePreviewMode === 'mobile' ? '380px' : devicePreviewMode === 'tablet' ? '600px' : '794px',
              }}
              className="bg-white shadow-2xl rounded-sm transition-all"
            >
              <TemplateRenderer data={currentResume} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
