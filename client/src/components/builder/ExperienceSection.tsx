import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateExperience } from '../../redux/resumeSlice';
import { ExperienceItem } from '@shared/types';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const experience = useAppSelector((state) => state.resume.currentResume.experience || []);

  const handleAdd = () => {
    const newItem: ExperienceItem = {
      id: 'exp-' + Date.now(),
      company: 'Tech Company',
      role: 'Software Intern',
      location: 'San Francisco, CA',
      startDate: 'Jun 2024',
      endDate: 'Sep 2024',
      isCurrent: false,
      description: '',
      bullets: ['Developed features for main customer web dashboard using React.'],
    };
    dispatch(updateExperience([...experience, newItem]));
  };

  const handleUpdate = (id: string, field: keyof ExperienceItem, value: any) => {
    const updated = experience.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    dispatch(updateExperience(updated));
  };

  const handleBulletChange = (expId: string, bIndex: number, text: string) => {
    const updated = experience.map((exp) => {
      if (exp.id === expId) {
        const newBullets = [...(exp.bullets || [])];
        newBullets[bIndex] = text;
        return { ...exp, bullets: newBullets };
      }
      return exp;
    });
    dispatch(updateExperience(updated));
  };

  const handleAddBullet = (expId: string) => {
    const updated = experience.map((exp) => {
      if (exp.id === expId) {
        return { ...exp, bullets: [...(exp.bullets || []), ''] };
      }
      return exp;
    });
    dispatch(updateExperience(updated));
  };

  const handleDeleteBullet = (expId: string, bIndex: number) => {
    const updated = experience.map((exp) => {
      if (exp.id === expId) {
        const newBullets = (exp.bullets || []).filter((_, idx) => idx !== bIndex);
        return { ...exp, bullets: newBullets };
      }
      return exp;
    });
    dispatch(updateExperience(updated));
  };

  const handleDelete = (id: string) => {
    dispatch(updateExperience(experience.filter((item) => item.id !== id)));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" /> Internships & Experience
          </h2>
          <p className="text-xs text-slate-500 mt-1">Add internships, part-time software roles, or campus positions.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {experience.map((exp, idx) => (
          <div key={exp.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 relative">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Experience #{idx + 1}</span>
              <button
                type="button"
                onClick={() => handleDelete(exp.id)}
                className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization *</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                  placeholder="TechCorp"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Designation *</label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => handleUpdate(exp.id, 'role', e.target.value)}
                  placeholder="Software Engineering Intern"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)}
                  placeholder="Jun 2024"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)}
                  placeholder="Sep 2024"
                  disabled={exp.isCurrent}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-100"
                />
              </div>
            </div>

            {/* Bullets List */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Key Accomplishments & Bullet Points</label>
              <div className="space-y-2">
                {(exp.bullets || []).map((b, bIdx) => (
                  <div key={bIdx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={b}
                      onChange={(e) => handleBulletChange(exp.id, bIdx, e.target.value)}
                      placeholder="Integrated REST API endpoints reducing latency by 20%..."
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteBullet(exp.id, bIdx)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddBullet(exp.id)}
                  className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 mt-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Bullet Point
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
