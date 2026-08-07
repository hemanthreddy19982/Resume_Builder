import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateSkills, updateSoftSkills } from '../../redux/resumeSlice';
import { SkillCategory, SkillItem } from '@shared/types';
import { Code, Plus, Trash2, Wrench } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const skills = useAppSelector((state) => state.resume.currentResume.skills || []);
  const softSkills = useAppSelector((state) => state.resume.currentResume.softSkills || []);

  const handleAddCategory = () => {
    const newCategory: SkillCategory = {
      id: 'cat-' + Date.now(),
      category: 'New Skill Category',
      items: [{ id: 'sk-' + Date.now(), name: 'Sample Skill', level: 85 }],
    };
    dispatch(updateSkills([...skills, newCategory]));
  };

  const handleUpdateCatName = (catId: string, category: string) => {
    const updated = skills.map((c) => (c.id === catId ? { ...c, category } : c));
    dispatch(updateSkills(updated));
  };

  const handleAddSkillItem = (catId: string) => {
    const updated = skills.map((c) => {
      if (c.id === catId) {
        return {
          ...c,
          items: [...c.items, { id: 'sk-' + Date.now(), name: '', level: 80 }],
        };
      }
      return c;
    });
    dispatch(updateSkills(updated));
  };

  const handleUpdateSkillItem = (catId: string, skillId: string, field: keyof SkillItem, value: any) => {
    const updated = skills.map((c) => {
      if (c.id === catId) {
        const items = c.items.map((sk) => (sk.id === skillId ? { ...sk, [field]: value } : sk));
        return { ...c, items };
      }
      return c;
    });
    dispatch(updateSkills(updated));
  };

  const handleDeleteSkillItem = (catId: string, skillId: string) => {
    const updated = skills.map((c) => {
      if (c.id === catId) {
        return { ...c, items: c.items.filter((sk) => sk.id !== skillId) };
      }
      return c;
    });
    dispatch(updateSkills(updated));
  };

  const handleDeleteCategory = (catId: string) => {
    dispatch(updateSkills(skills.filter((c) => c.id !== catId)));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Code className="w-5 h-5 text-emerald-600" /> Technical & Soft Skills
          </h2>
          <p className="text-xs text-slate-500 mt-1">Group your programming languages, tools, and personal strengths.</p>
        </div>
        <button
          type="button"
          onClick={handleAddCategory}
          className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Skill Category
        </button>
      </div>

      {/* Categorized Technical Skills */}
      <div className="space-y-6">
        {skills.map((cat) => (
          <div key={cat.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                value={cat.category}
                onChange={(e) => handleUpdateCatName(cat.id, e.target.value)}
                placeholder="Category Name (e.g. Frontend)"
                className="font-bold text-sm text-slate-800 bg-transparent border-b border-slate-300 focus:border-emerald-500 outline-none pb-0.5"
              />
              <button
                type="button"
                onClick={() => handleDeleteCategory(cat.id)}
                className="text-slate-400 hover:text-rose-600 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cat.items.map((sk) => (
                <div key={sk.id} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                  <input
                    type="text"
                    value={sk.name}
                    onChange={(e) => handleUpdateSkillItem(cat.id, sk.id, 'name', e.target.value)}
                    placeholder="Skill Name (e.g. React 19)"
                    className="flex-1 text-xs border-none outline-none font-semibold text-slate-800"
                  />
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={sk.level || 80}
                    onChange={(e) => handleUpdateSkillItem(cat.id, sk.id, 'level', parseInt(e.target.value))}
                    className="w-20 accent-emerald-600 cursor-pointer"
                  />
                  <span className="text-[10px] font-bold text-slate-400 w-7">{sk.level || 80}%</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteSkillItem(cat.id, sk.id)}
                    className="text-slate-300 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleAddSkillItem(cat.id)}
              className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Skill
            </button>
          </div>
        ))}
      </div>

      {/* Soft Skills */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/30">
        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
          <Wrench className="w-4 h-4 text-purple-600" /> Soft Skills & Strengths (comma separated)
        </label>
        <input
          type="text"
          value={(softSkills || []).join(', ')}
          onChange={(e) => dispatch(updateSoftSkills(e.target.value.split(',').map((s) => s.trim())))}
          placeholder="Problem Solving, Communication, Teamwork, Adaptability"
          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>
    </div>
  );
};
