import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { evaluateATS } from '../../utils/atsEvaluator';
import { Gauge, CheckCircle2, AlertTriangle, AlertCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';

export const ATSScoreWidget: React.FC = () => {
  const resume = useAppSelector((state) => state.resume.currentResume);
  const atsResult = evaluateATS(resume);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border font-extrabold text-base ${getScoreColor(atsResult.score)}`}>
            {atsResult.score}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-800 text-sm">ATS Optimization Score</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700">
                {atsResult.completeness}% Complete
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {atsResult.score >= 80 ? 'Excellent! Highly competitive for ATS screeners.' : 'Add key metrics & bullet points to boost your score.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-xs font-semibold hidden sm:inline">{atsResult.wordCount} words</span>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      {/* Expanded Breakdown */}
      {isExpanded && (
        <div className="p-4 bg-slate-50/70 border-t border-slate-200 space-y-4 animate-in fade-in duration-200 text-xs">
          {/* Completeness Bar */}
          <div>
            <div className="flex justify-between font-bold text-slate-700 mb-1">
              <span>Overall Resume Completeness</span>
              <span>{atsResult.completeness}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-500" style={{ width: `${atsResult.completeness}%` }} />
            </div>
          </div>

          {/* Section Score Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(atsResult.sectionScores).map(([section, sScore]) => (
              <div key={section} className="p-2.5 rounded-xl bg-white border border-slate-200 text-center">
                <span className="block font-bold text-[10px] text-slate-400 uppercase tracking-wider">{section}</span>
                <span className="font-extrabold text-sm text-slate-800">{sScore}%</span>
              </div>
            ))}
          </div>

          {/* Feedback List */}
          {atsResult.feedback.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-700">Actionable Feedback</h4>
              {atsResult.feedback.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
                  {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />}
                  {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />}
                  {item.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />}
                  {item.type === 'info' && <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />}
                  <div>
                    <span className="font-bold text-slate-800">{item.category}: </span>
                    <span className="text-slate-600">{item.message}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
