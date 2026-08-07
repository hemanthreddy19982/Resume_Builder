import React from 'react';
import { ResumeData } from '@shared/types';

export const GoogleTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="resume-paper w-full min-h-[1050px] bg-white text-slate-900 p-8 sm:p-10 font-sans leading-relaxed text-xs">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{data.personal.fullName}</h1>
        {data.personal.jobTitle && <p className="text-sm font-medium text-blue-600 mt-0.5">{data.personal.jobTitle}</p>}
        <p className="text-slate-600 mt-1.5 text-[11px]">
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.linkedin, data.personal.github]
            .filter(Boolean)
            .join('  |  ')}
        </p>
      </div>

      {/* Summary */}
      {(data.summary || data.objective) && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b-2 border-blue-600 pb-0.5 mb-2">
            Summary
          </h2>
          <p className="text-slate-800 leading-normal">{data.summary || data.objective}</p>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b-2 border-blue-600 pb-0.5 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900">{edu.institution}</span>
                  <span className="text-slate-700"> — {edu.degree}</span>
                  {edu.gpa && <span className="text-slate-500 font-medium"> (GPA: {edu.gpa})</span>}
                </div>
                <span className="text-[11px] font-semibold text-slate-500">{edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b-2 border-blue-600 pb-0.5 mb-2">
            Experience & Internships
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{exp.role} <span className="font-normal text-blue-600">@ {exp.company}</span></span>
                  <span className="text-[11px] font-normal text-slate-500">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.bullets && (
                  <ul className="list-disc list-outside pl-4 space-y-1 text-slate-800 mt-1">
                    {exp.bullets.map((b, i) => b.trim() && <li key={i}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b-2 border-blue-600 pb-0.5 mb-2">
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((p) => (
              <div key={p.id}>
                <div className="flex justify-between font-bold">
                  <span>{p.title} {p.technologies ? <span className="font-normal text-slate-500">[{p.technologies.join(', ')}]</span> : ''}</span>
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:underline text-[11px]">Link ↗</a>}
                </div>
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
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b-2 border-blue-600 pb-0.5 mb-2">
            Technical Skills
          </h2>
          <div className="space-y-1">
            {data.skills.map((cat) => (
              <p key={cat.id}>
                <span className="font-bold text-slate-800">{cat.category}: </span>
                <span className="text-slate-700">{cat.items.map((i) => i.name).join(', ')}</span>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
