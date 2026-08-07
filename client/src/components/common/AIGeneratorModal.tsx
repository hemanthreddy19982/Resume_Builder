import React, { useState } from 'react';
import { Sparkles, Check, Copy, X } from 'lucide-react';
import { AI_SUGGESTIONS, AIJobDomain } from '../../constants/aiSuggestions';
import { useAppDispatch } from '../../hooks/redux';
import { updateObjectiveSummary, updateSkills } from '../../redux/resumeSlice';

interface AIGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIGeneratorModal: React.FC<AIGeneratorModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const [selectedDomain, setSelectedDomain] = useState<AIJobDomain>(AI_SUGGESTIONS[0]);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApplySummary = (summaryText: string) => {
    dispatch(updateObjectiveSummary({ summary: summaryText }));
    onClose();
  };

  const handleApplyObjective = (objText: string) => {
    dispatch(updateObjectiveSummary({ objective: objText }));
    onClose();
  };

  const handleApplySkills = () => {
    const categories = selectedDomain.recommendedSkills.map((group, idx) => ({
      id: `ai-cat-${idx}-${Date.now()}`,
      category: group.category,
      items: group.skills.map((sName, sIdx) => ({
        id: `ai-sk-${idx}-${sIdx}-${Date.now()}`,
        name: sName,
        level: 85,
      })),
    }));
    dispatch(updateSkills(categories));
    onClose();
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-100">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-none">Smart AI Resume Assistant</h3>
              <p className="text-xs text-blue-100 mt-1">Rule-based professional summaries, skills & keywords generator</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Domain Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Target Job Role</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {AI_SUGGESTIONS.map((item) => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => setSelectedDomain(item)}
                  className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all ${
                    selectedDomain.role === item.role
                      ? 'border-blue-600 bg-blue-50/80 text-blue-700 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <span className="block font-bold">{item.role}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{item.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Summaries */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
              Recommended Summaries
              <span className="text-xs font-normal text-slate-400">Click to apply to resume</span>
            </h4>
            <div className="space-y-3">
              {selectedDomain.summaries.map((sumText, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/20 transition-all group relative"
                >
                  <p className="text-sm text-slate-700 leading-relaxed pr-24">{sumText}</p>
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(sumText, `sum-${i}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      title="Copy"
                    >
                      {copiedIndex === `sum-${i}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplySummary(sumText)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1 shadow-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Objectives */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-3">Recommended Objectives</h4>
            <div className="space-y-3">
              {selectedDomain.objectives.map((objText, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/20 transition-all flex items-center justify-between gap-4"
                >
                  <p className="text-sm text-slate-700 leading-relaxed">{objText}</p>
                  <button
                    type="button"
                    onClick={() => handleApplyObjective(objText)}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors flex-shrink-0"
                  >
                    Apply Objective
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Groups & Action Verbs */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-slate-800">Suggested Skills</h4>
                <button
                  type="button"
                  onClick={handleApplySkills}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  Insert All
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedDomain.recommendedSkills.flatMap((g) => g.skills).map((skill) => (
                  <span key={skill} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-800 mb-3">High-Impact Action Verbs</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDomain.actionVerbs.map((verb) => (
                  <span key={verb} className="px-2.5 py-1 bg-blue-100/70 text-blue-800 rounded-lg text-xs font-medium">
                    {verb}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-slate-600 hover:bg-slate-200/60 rounded-xl text-sm font-semibold transition-colors"
          >
            Close Assistant
          </button>
        </div>
      </div>
    </div>
  );
};
