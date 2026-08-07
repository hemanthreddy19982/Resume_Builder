import React from 'react';
import { ResumeData } from '@shared/types';

export const ATSTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="resume-paper w-full min-h-[1050px] bg-white text-black p-8 font-sans leading-normal text-xs selection:bg-gray-200">
      {/* Name and Contact Information */}
      <div className="text-center mb-4 pb-2 border-b border-black">
        <h1 className="text-xl font-bold uppercase tracking-wider">{data.personal.fullName}</h1>
        {data.personal.jobTitle && <p className="text-sm font-semibold">{data.personal.jobTitle}</p>}
        <p className="mt-1">
          {[
            data.personal.email,
            data.personal.phone,
            data.personal.location,
            data.personal.linkedin,
            data.personal.github,
          ]
            .filter(Boolean)
            .join(' | ')}
        </p>
      </div>

      {/* Summary */}
      {(data.summary || data.objective) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-1">SUMMARY</h2>
          <p className="leading-relaxed">{data.summary || data.objective}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-2">EXPERIENCE</h2>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold">
                  <span>{exp.role} - {exp.company}</span>
                  <span>{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.bullets && (
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    {exp.bullets.map((b, idx) => b.trim() && <li key={idx}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-2">EDUCATION</h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <p className="font-bold">{edu.degree}</p>
                  <p>{edu.institution} {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
                </div>
                <p className="font-bold">{edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-2">PROJECTS</h2>
          <div className="space-y-2">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <p className="font-bold">{proj.title} {proj.technologies ? `(${proj.technologies.join(', ')})` : ''}</p>
                {proj.bullets && (
                  <ul className="list-disc list-inside mt-0.5 space-y-0.5">
                    {proj.bullets.map((b, idx) => b.trim() && <li key={idx}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-1">TECHNICAL SKILLS</h2>
          <div className="space-y-1">
            {data.skills.map((cat) => (
              <p key={cat.id}>
                <span className="font-bold">{cat.category}: </span>
                {cat.items.map((item) => item.name).join(', ')}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
