import React from 'react';
import { ResumeData } from '@shared/types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const primaryColor = data.customizations?.themeColor || '#7C3AED';

  return (
    <div className="resume-paper w-full min-h-[1050px] bg-white text-slate-800 font-sans text-xs flex">
      {/* Left Sidebar (Dark Accent) */}
      <div className="w-1/3 p-6 text-white space-y-6 flex-shrink-0" style={{ backgroundColor: primaryColor }}>
        {data.personal.showPhoto && data.personal.photoUrl && (
          <img src={data.personal.photoUrl} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-white/20 mx-auto shadow-lg" />
        )}

        <div>
          <h1 className="text-xl font-extrabold text-center tracking-tight">{data.personal.fullName}</h1>
          {data.personal.jobTitle && <p className="text-xs text-center opacity-85 mt-1 font-medium">{data.personal.jobTitle}</p>}
        </div>

        {/* Contact info */}
        <div className="space-y-2 pt-2 border-t border-white/20 text-[11px] opacity-90">
          {data.personal.email && <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> <span className="truncate">{data.personal.email}</span></div>}
          {data.personal.phone && <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> <span>{data.personal.phone}</span></div>}
          {data.personal.location && <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> <span>{data.personal.location}</span></div>}
          {data.personal.linkedin && <div className="flex items-center gap-2"><Linkedin className="w-3.5 h-3.5" /> <span className="truncate">LinkedIn</span></div>}
          {data.personal.github && <div className="flex items-center gap-2"><Github className="w-3.5 h-3.5" /> <span className="truncate">GitHub</span></div>}
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-white/20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">Skills</h2>
            {data.skills.map((cat) => (
              <div key={cat.id}>
                <p className="text-[10px] uppercase font-bold text-white/70">{cat.category}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cat.items.map((sk) => (
                    <span key={sk.id} className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold text-white">
                      {sk.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="pt-2 border-t border-white/20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Languages</h2>
            {data.languages.map((l) => (
              <p key={l.id} className="text-[11px] opacity-90">{l.language} ({l.proficiency})</p>
            ))}
          </div>
        )}
      </div>

      {/* Right Content Column */}
      <div className="w-2/3 p-8 space-y-6">
        {/* Profile */}
        {(data.summary || data.objective) && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-700 border-b pb-1 mb-2">About Me</h2>
            <p className="text-slate-700 leading-relaxed">{data.summary || data.objective}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-700 border-b pb-2 mb-3">Work Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{exp.role}</span>
                    <span className="text-[11px] font-normal text-slate-500">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-purple-700 font-medium text-[11px] mb-1">{exp.company}</p>
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-700 border-b pb-2 mb-3">Featured Projects</h2>
            <div className="space-y-3">
              {data.projects.map((p) => (
                <div key={p.id}>
                  <h3 className="font-bold text-slate-900">{p.title}</h3>
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

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-700 border-b pb-2 mb-2">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <p className="font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-slate-600">{edu.institution}</p>
                </div>
                <p className="text-slate-500 font-medium">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
