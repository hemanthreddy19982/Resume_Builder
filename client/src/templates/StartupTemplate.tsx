import React from 'react';
import { ResumeData } from '@shared/types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export const StartupTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const primaryColor = data.customizations?.themeColor || '#06B6D4';

  return (
    <div className="resume-paper w-full min-h-[1050px] bg-white text-slate-800 p-8 font-sans text-xs leading-relaxed">
      {/* Top Gradient Banner Header */}
      <div
        className="rounded-2xl p-6 text-white mb-6 shadow-md"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, #2563EB)` }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">{data.personal.fullName}</h1>
            {data.personal.jobTitle && <p className="text-sm font-medium opacity-90">{data.personal.jobTitle}</p>}

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] opacity-85 mt-3">
              {data.personal.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {data.personal.email}</span>}
              {data.personal.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {data.personal.phone}</span>}
              {data.personal.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {data.personal.location}</span>}
              {data.personal.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> LinkedIn</span>}
              {data.personal.github && <span className="flex items-center gap-1"><Github className="w-3 h-3" /> GitHub</span>}
            </div>
          </div>
          {data.personal.showPhoto && data.personal.photoUrl && (
            <img src={data.personal.photoUrl} alt="Photo" className="w-20 h-20 rounded-xl object-cover border-2 border-white/40 shadow" />
          )}
        </div>
      </div>

      {/* Summary */}
      {(data.summary || data.objective) && (
        <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="text-slate-700 leading-relaxed italic">{data.summary || data.objective}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-wider mb-3 text-cyan-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Experience & Internships
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="p-3.5 rounded-xl border border-slate-200/80 hover:border-cyan-300 transition-colors">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{exp.role}</span>
                      <span className="text-[11px] font-normal text-slate-500">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-cyan-700 font-medium mb-1.5">{exp.company}</p>
                    {exp.bullets && (
                      <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700">
                        {exp.bullets.map((b, i) => b.trim() && <li key={i}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-wider mb-3 text-cyan-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Key Projects
              </h2>
              <div className="space-y-3">
                {data.projects.map((p) => (
                  <div key={p.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{p.title}</span>
                      {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-cyan-600 hover:underline">Link ↗</a>}
                    </div>
                    {p.bullets && (
                      <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 mt-1">
                        {p.bullets.map((b, i) => b.trim() && <li key={i}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-wider mb-3 text-cyan-700">Technical Skills</h2>
              <div className="space-y-3">
                {data.skills.map((cat) => (
                  <div key={cat.id}>
                    <p className="font-bold text-[10px] uppercase text-slate-400 mb-1">{cat.category}</p>
                    <div className="flex flex-wrap gap-1">
                      {cat.items.map((sk) => (
                        <span key={sk.id} className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 text-[11px] font-semibold">
                          {sk.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-wider mb-3 text-cyan-700">Education</h2>
              <div className="space-y-2">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-slate-900">{edu.degree}</p>
                    <p className="text-slate-600">{edu.institution}</p>
                    <p className="text-slate-400 font-medium">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
