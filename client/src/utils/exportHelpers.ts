import { ResumeData } from '@shared/types';
import html2pdf from 'html2pdf.js';

export async function exportToPdf(elementId: string, filename: string = 'Resume.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Resume element not found for PDF export.');
  }

  const opt = {
    margin: [0, 0, 0, 0],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  return html2pdf().set(opt).from(element).save();
}

export function exportToJson(resume: ResumeData, filename: string = 'Resume.json'): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportToTxt(resume: ResumeData, filename: string = 'Resume.txt'): void {
  let text = `${resume.personal.fullName.toUpperCase()}\n`;
  if (resume.personal.jobTitle) text += `${resume.personal.jobTitle}\n`;
  text += `Email: ${resume.personal.email} | Phone: ${resume.personal.phone} | Location: ${resume.personal.location}\n`;
  if (resume.personal.linkedin) text += `LinkedIn: ${resume.personal.linkedin}\n`;
  if (resume.personal.github) text += `GitHub: ${resume.personal.github}\n`;
  text += `\n=========================================\n\n`;

  if (resume.summary || resume.objective) {
    text += `SUMMARY / OBJECTIVE\n${resume.summary || resume.objective}\n\n`;
  }

  if (resume.education && resume.education.length > 0) {
    text += `EDUCATION\n`;
    resume.education.forEach((edu) => {
      text += `• ${edu.degree} - ${edu.institution} (${edu.startDate} - ${edu.isCurrent ? 'Present' : edu.endDate})\n`;
      if (edu.gpa) text += `  GPA: ${edu.gpa}\n`;
      if (edu.coursework) text += `  Coursework: ${edu.coursework}\n`;
    });
    text += `\n`;
  }

  if (resume.experience && resume.experience.length > 0) {
    text += `EXPERIENCE\n`;
    resume.experience.forEach((exp) => {
      text += `• ${exp.role} @ ${exp.company} (${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate})\n`;
      exp.bullets?.forEach((b) => {
        text += `  - ${b}\n`;
      });
    });
    text += `\n`;
  }

  if (resume.projects && resume.projects.length > 0) {
    text += `PROJECTS\n`;
    resume.projects.forEach((p) => {
      text += `• ${p.title} [Stack: ${p.technologies?.join(', ')}]\n`;
      p.bullets?.forEach((b) => {
        text += `  - ${b}\n`;
      });
    });
    text += `\n`;
  }

  if (resume.skills && resume.skills.length > 0) {
    text += `SKILLS\n`;
    resume.skills.forEach((cat) => {
      text += `${cat.category}: ${cat.items.map((i) => i.name).join(', ')}\n`;
    });
    text += `\n`;
  }

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function printResume(): void {
  window.print();
}
