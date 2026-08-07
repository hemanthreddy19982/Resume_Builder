import React from 'react';
import { ResumeData } from '@shared/types';

export const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="resume-paper w-full min-h-[1050px] bg-white text-slate-900 p-10 font-serif leading-relaxed text-sm">
      {/* Header */}
      <div className="text-center border-b border-slate-900 pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-slate-900">{data.personal.fullName}</h1>
        {data.personal.jobTitle && <p className="text-sm font-sans tracking-wide text-slate-700 italic mt-1">{data.personal.jobTitle}</p>}
        <p className="text-xs font-sans text-slate-600 mt-2">
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.linkedin, data.personal.github].filter(Boolean).join('  •  ')}
        </p>
      </div>

      {/* Profile / Objective */}
      {(data.summary || data.objective) && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">Objective</h2>
          <p className="text-xs leading-relaxed text-slate-800">{data.summary || data.objective}</p>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start text-xs">
                <div>
                  <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                  <p className="italic text-slate-700">{edu.institution} {edu.location ? `, ${edu.location}` : ''}</p>
                  {edu.gpa && <p className="text-[11px] font-sans">GPA: {edu.gpa}</p>}
                </div>
                <span className="font-sans text-slate-600">{edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{exp.role}</span>
                  <span className="font-sans font-normal">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <p className="italic text-slate-700 mb-1">{exp.company}</p>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside pl-4 space-y-1 text-slate-800">
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
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3">Key Projects</h2>
          <div className="space-y-3 text-xs">
            {data.projects.map((p) => (
              <div key={p.id}>
                <h3 className="font-bold text-slate-900">{p.title}</h3>
                {p.bullets && (
                  <ul className="list-disc list-outside pl-4 space-y-1 text-slate-800 mt-1">
                    {p.bullets.map((b, i) => b.trim() && <li key={i}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">Technical Skills</h2>
          <div className="space-y-1 text-xs">
            {data.skills.map((cat) => (
              <p key={cat.id}>
                <span className="font-bold">{cat.category}: </span>
                {cat.items.map((i) => i.name).join(', ')}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
