import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateEducation } from '../../redux/resumeSlice';
import { EducationItem } from '@shared/types';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const education = useAppSelector((state) => state.resume.currentResume.education || []);

  const handleAdd = () => {
    const newItem: EducationItem = {
      id: 'edu-' + Date.now(),
      degree: 'B.S. in Computer Science',
      institution: 'State University',
      location: '',
      startDate: '2021',
      endDate: '2025',
      isCurrent: false,
      gpa: '3.8 / 4.0',
      coursework: '',
    };
    dispatch(updateEducation([...education, newItem]));
  };

  const handleUpdate = (id: string, field: keyof EducationItem, value: any) => {
    const updated = education.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    dispatch(updateEducation(updated));
  };

  const handleDelete = (id: string) => {
    dispatch(updateEducation(education.filter((item) => item.id !== id)));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" /> Education
          </h2>
          <p className="text-xs text-slate-500 mt-1">List your degrees, college name, GPA, and relevant coursework.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      <div className="space-y-4">
        {education.map((item, idx) => (
          <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 relative group">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Education #{idx + 1}</span>
              {education.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Degree / Qualification *</label>
                <input
                  type="text"
                  value={item.degree}
                  onChange={(e) => handleUpdate(item.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Technology in CS"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">College / Institution *</label>
                <input
                  type="text"
                  value={item.institution}
                  onChange={(e) => handleUpdate(item.id, 'institution', e.target.value)}
                  placeholder="University of California"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Start Year</label>
                <input
                  type="text"
                  value={item.startDate}
                  onChange={(e) => handleUpdate(item.id, 'startDate', e.target.value)}
                  placeholder="2021"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">End Year / Expected</label>
                <input
                  type="text"
                  value={item.endDate}
                  onChange={(e) => handleUpdate(item.id, 'endDate', e.target.value)}
                  placeholder="2025"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GPA / Score (Optional)</label>
                <input
                  type="text"
                  value={item.gpa}
                  onChange={(e) => handleUpdate(item.id, 'gpa', e.target.value)}
                  placeholder="3.8 / 4.0 or 8.5 CGPA"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Relevant Coursework</label>
                <input
                  type="text"
                  value={item.coursework}
                  onChange={(e) => handleUpdate(item.id, 'coursework', e.target.value)}
                  placeholder="Data Structures, Cloud Computing"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
