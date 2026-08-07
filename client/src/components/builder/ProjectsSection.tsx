import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateProjects } from '../../redux/resumeSlice';
import { ProjectItem } from '@shared/types';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.resume.currentResume.projects || []);

  const handleAdd = () => {
    const newItem: ProjectItem = {
      id: 'proj-' + Date.now(),
      title: 'Full Stack App',
      subtitle: 'Real-time Web Platform',
      technologies: ['React', 'Node.js', 'TailwindCSS'],
      link: 'https://example.com',
      githubLink: 'https://github.com/user/repo',
      startDate: '2025',
      endDate: '2025',
      bullets: ['Built sub-100ms real-time sync with WebSockets.'],
    };
    dispatch(updateProjects([...projects, newItem]));
  };

  const handleUpdate = (id: string, field: keyof ProjectItem, value: any) => {
    const updated = projects.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    dispatch(updateProjects(updated));
  };

  const handleTechChange = (id: string, techString: string) => {
    const techArray = techString.split(',').map((t) => t.trim()).filter(Boolean);
    handleUpdate(id, 'technologies', techArray);
  };

  const handleDelete = (id: string) => {
    dispatch(updateProjects(projects.filter((item) => item.id !== id)));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-cyan-600" /> Key Projects
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Showcase capstone projects, hackathons, and personal software builds.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((proj, idx) => (
          <div key={proj.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 relative">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Project #{idx + 1}</span>
              <button
                type="button"
                onClick={() => handleDelete(proj.id)}
                className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => handleUpdate(proj.id, 'title', e.target.value)}
                  placeholder="DevSync Platform"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={(proj.technologies || []).join(', ')}
                  onChange={(e) => handleTechChange(proj.id, e.target.value)}
                  placeholder="React, TypeScript, Express, MongoDB"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Live Demo Link</label>
                <input
                  type="text"
                  value={proj.link}
                  onChange={(e) => handleUpdate(proj.id, 'link', e.target.value)}
                  placeholder="https://project-demo.com"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Repo Link</label>
                <input
                  type="text"
                  value={proj.githubLink}
                  onChange={(e) => handleUpdate(proj.id, 'githubLink', e.target.value)}
                  placeholder="https://github.com/user/repo"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Highlights & Key Accomplishments</label>
              <textarea
                rows={3}
                value={(proj.bullets || []).join('\n')}
                onChange={(e) => handleUpdate(proj.id, 'bullets', e.target.value.split('\n'))}
                placeholder="• Built REST APIs processing 10k requests daily&#10;• Implemented JWT authentication"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
