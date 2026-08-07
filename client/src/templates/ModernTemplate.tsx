import React from 'react';
import { ResumeData } from '@shared/types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award } from 'lucide-react';
import { QRCodeWidget } from '../components/common/QRCodeWidget';

export const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const primaryColor = data.customizations?.themeColor || '#2563EB';
  const showIcons = data.customizations?.showIcons ?? true;

  return (
    <div
      className="resume-paper w-full min-h-[1050px] bg-white text-slate-800 p-8 sm:p-10 font-sans leading-relaxed text-sm"
      style={{ fontFamily: data.customizations?.fontFamily || 'Inter, sans-serif' }}
    >
      {/* Header Section */}
      <div className="border-b-2 pb-6 mb-6 flex justify-between items-start gap-6" style={{ borderColor: primaryColor }}>
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{data.personal.fullName}</h1>
          {data.personal.jobTitle && (
            <p className="text-lg font-semibold tracking-wide" style={{ color: primaryColor }}>
              {data.personal.jobTitle}
            </p>
          )}

          {/* Contact Bar */}
          <div className="flex flex-wrap gap-y-1.5 gap-x-4 text-xs text-slate-600 pt-2">
            {data.personal.email && (
              <span className="flex items-center gap-1">
                {showIcons && <Mail className="w-3.5 h-3.5 text-slate-400" />} {data.personal.email}
              </span>
            )}
            {data.personal.phone && (
              <span className="flex items-center gap-1">
                {showIcons && <Phone className="w-3.5 h-3.5 text-slate-400" />} {data.personal.phone}
              </span>
            )}
            {data.personal.location && (
              <span className="flex items-center gap-1">
                {showIcons && <MapPin className="w-3.5 h-3.5 text-slate-400" />} {data.personal.location}
              </span>
            )}
            {data.personal.website && (
              <span className="flex items-center gap-1">
                {showIcons && <Globe className="w-3.5 h-3.5 text-slate-400" />} {data.personal.website}
              </span>
            )}
            {data.personal.linkedin && (
              <span className="flex items-center gap-1">
                {showIcons && <Linkedin className="w-3.5 h-3.5 text-slate-400" />} {data.personal.linkedin}
              </span>
            )}
            {data.personal.github && (
              <span className="flex items-center gap-1">
                {showIcons && <Github className="w-3.5 h-3.5 text-slate-400" />} {data.personal.github}
              </span>
            )}
          </div>
        </div>

        {/* Photo & QR Code */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {data.personal.showPhoto && data.personal.photoUrl && (
            <img
              src={data.personal.photoUrl}
              alt={data.personal.fullName}
              className="w-24 h-24 rounded-2xl object-cover shadow-sm border border-slate-200"
            />
          )}
          {data.personal.showQrCode && data.personal.qrCodeUrl && (
            <QRCodeWidget value={data.personal.qrCodeUrl} size={68} />
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left 2 Columns: Summary, Experience, Projects */}
        <div className="md:col-span-2 space-y-6">
          {/* Summary */}
          {(data.summary || data.objective) && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
                Professional Profile
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                {data.summary || data.objective}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
                Internships & Work Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: `${primaryColor}40` }}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-800 text-sm">{exp.role}</h3>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-600 mb-1">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
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
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
                Key Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="p-3.5 rounded-xl bg-slate-50/60 border border-slate-100">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-800 text-xs">{proj.title}</h3>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11px] font-semibold hover:underline" style={{ color: primaryColor }}>
                          Live Demo ↗
                        </a>
                      )}
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {proj.technologies.map((tech, idx) => (
                          <span key={idx} className="px-2 py-0.5 text-[10px] font-medium bg-white text-slate-600 rounded border border-slate-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {proj.bullets && proj.bullets.length > 0 && (
                      <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
                        {proj.bullets.map((b, i) => b.trim() && <li key={i}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Column: Education, Skills, Certifications, Languages */}
        <div className="space-y-6">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <h3 className="font-bold text-slate-800 text-xs">{edu.degree}</h3>
                    <p className="text-xs text-slate-600">{edu.institution}</p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {edu.startDate} - {edu.isCurrent ? 'Present' : edu.endDate}
                    </p>
                    {edu.gpa && <p className="text-[11px] font-semibold text-slate-700">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
                Skills & Technologies
              </h2>
              <div className="space-y-3">
                {data.skills.map((cat) => (
                  <div key={cat.id}>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{cat.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((sk) => (
                        <span key={sk.id} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                          {sk.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
                Certifications
              </h2>
              <div className="space-y-2.5">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-slate-800 text-xs leading-snug">{cert.name}</h3>
                      <p className="text-[11px] text-slate-500">{cert.issuer} • {cert.issueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
                Languages
              </h2>
              <div className="flex flex-wrap gap-2 text-xs">
                {data.languages.map((lang) => (
                  <span key={lang.id} className="font-medium text-slate-700">
                    {lang.language} <span className="text-slate-400 text-[11px]">({lang.proficiency})</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Declaration & Signature Footer */}
      {data.declaration && (data.declaration.text || data.declaration.signatureUrl) && (
        <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
          <div>
            {data.declaration.text && <p className="max-w-md italic">{data.declaration.text}</p>}
            <p className="mt-1 font-medium">{data.declaration.place && `Place: ${data.declaration.place}`} {data.declaration.date && ` | Date: ${data.declaration.date}`}</p>
          </div>
          {data.declaration.showSignature && data.declaration.signatureUrl && (
            <div className="text-right">
              <img src={data.declaration.signatureUrl} alt="Signature" className="h-10 max-w-[140px] object-contain ml-auto" />
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-1">Authorized Signature</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
