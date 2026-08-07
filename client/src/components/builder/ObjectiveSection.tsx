import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateObjectiveSummary } from '../../redux/resumeSlice';
import { Sparkles, AlignLeft } from 'lucide-react';
import { AIGeneratorModal } from '../common/AIGeneratorModal';

export const ObjectiveSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { summary, objective } = useAppSelector((state) => state.resume.currentResume);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-start border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <AlignLeft className="w-5 h-5 text-indigo-600" /> Summary & Career Objective
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Write a compelling summary highlighting your strengths, academic projects, and career goal.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAIModalOpen(true)}
          className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:opacity-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" /> AI Assistant
        </button>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Professional Summary (Recommended for freshers with internship/project experience)
        </label>
        <textarea
          rows={4}
          value={summary || ''}
          onChange={(e) => dispatch(updateObjectiveSummary({ summary: e.target.value }))}
          placeholder="Passionate Full Stack Developer graduate with expertise in React, Node.js, and TypeScript..."
          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>Target length: 30 - 60 words</span>
          <span>{summary ? summary.trim().split(/\s+/).filter(Boolean).length : 0} words</span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Career Objective (Optional - for entry level freshers seeking first job)
        </label>
        <textarea
          rows={3}
          value={objective || ''}
          onChange={(e) => dispatch(updateObjectiveSummary({ objective: e.target.value }))}
          placeholder="Seeking a Junior Software Developer role to apply technical problem-solving skills..."
          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <AIGeneratorModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </div>
  );
};
