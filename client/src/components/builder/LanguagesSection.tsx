import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateLanguages, updateHobbies, updateStrengths } from '../../redux/resumeSlice';
import { LanguageItem } from '@shared/types';
import { Languages, Heart, Zap, Plus, Trash2 } from 'lucide-react';

export const LanguagesSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector((state) => state.resume.currentResume.languages || []);
  const hobbies = useAppSelector((state) => state.resume.currentResume.hobbies || []);
  const strengths = useAppSelector((state) => state.resume.currentResume.strengths || []);

  const handleAddLanguage = () => {
    const newLang: LanguageItem = {
      id: 'lang-' + Date.now(),
      language: 'English',
      proficiency: 'Fluent',
    };
    dispatch(updateLanguages([...languages, newLang]));
  };

  const handleUpdateLanguage = (id: string, field: keyof LanguageItem, value: any) => {
    const updated = languages.map((l) => (l.id === id ? { ...l, [field]: value } : l));
    dispatch(updateLanguages(updated));
  };

  const handleDeleteLanguage = (id: string) => {
    dispatch(updateLanguages(languages.filter((l) => l.id !== id)));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Languages */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Languages className="w-5 h-5 text-blue-600" /> Languages Spoken
          </h2>
          <button
            type="button"
            onClick={handleAddLanguage}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Language
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {languages.map((lang) => (
            <div key={lang.id} className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center gap-2">
              <input
                type="text"
                value={lang.language}
                onChange={(e) => handleUpdateLanguage(lang.id, 'language', e.target.value)}
                placeholder="Language Name"
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-xl font-semibold outline-none"
              />
              <select
                value={lang.proficiency}
                onChange={(e) => handleUpdateLanguage(lang.id, 'proficiency', e.target.value)}
                className="px-2 py-1.5 text-xs border border-slate-300 rounded-xl bg-white outline-none"
              >
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
              <button type="button" onClick={() => handleDeleteLanguage(lang.id)} className="text-slate-400 hover:text-rose-600 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Hobbies */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-rose-500" /> Hobbies & Interests (comma separated)
        </label>
        <input
          type="text"
          value={(hobbies || []).join(', ')}
          onChange={(e) => dispatch(updateHobbies(e.target.value.split(',').map((h) => h.trim())))}
          placeholder="Competitive Programming, Open Source Contributing, Chess, Photography"
          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
        />
      </div>

      {/* Key Strengths */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500" /> Key Strengths (comma separated)
        </label>
        <input
          type="text"
          value={(strengths || []).join(', ')}
          onChange={(e) => dispatch(updateStrengths(e.target.value.split(',').map((s) => s.trim())))}
          placeholder="Rapid Learner, Analytical Thinking, Clean Code Advocate"
          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
        />
      </div>
    </div>
  );
};
