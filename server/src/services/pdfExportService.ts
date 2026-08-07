import PDFDocument from 'pdfkit';
import { ResumeData } from '../types/types.js';

export function generatePdfBuffer(resume: ResumeData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: 'A4' });
      const buffers: Buffer[] = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      const primaryColor = resume.customizations?.themeColor || '#2563EB';

      // Header
      doc
        .fillColor(primaryColor)
        .fontSize(24)
        .font('Helvetica-Bold')
        .text(resume.personal.fullName || 'UNNAMED CANDIDATE', { align: 'center' });

      if (resume.personal.jobTitle) {
        doc
          .fillColor('#475569')
          .fontSize(14)
          .font('Helvetica-Oblique')
          .text(resume.personal.jobTitle, { align: 'center' });
      }

      doc.moveDown(0.5);

      // Contact Line
      const contacts = [
        resume.personal.email,
        resume.personal.phone,
        resume.personal.location,
        resume.personal.linkedin,
        resume.personal.github,
      ].filter(Boolean);

      if (contacts.length > 0) {
        doc
          .fillColor('#64748B')
          .fontSize(9)
          .font('Helvetica')
          .text(contacts.join('  |  '), { align: 'center' });
      }

      doc.moveDown(1);

      const addHeading = (title: string) => {
        doc
          .fillColor(primaryColor)
          .fontSize(12)
          .font('Helvetica-Bold')
          .text(title.toUpperCase());
        doc
          .moveTo(40, doc.y)
          .lineTo(550, doc.y)
          .strokeColor(primaryColor)
          .lineWidth(1)
          .stroke();
        doc.moveDown(0.5);
      };

      // Summary / Objective
      if (resume.summary || resume.objective) {
        addHeading('Summary');
        doc
          .fillColor('#334155')
          .fontSize(10)
          .font('Helvetica')
          .text(resume.summary || resume.objective, { align: 'justify' });
        doc.moveDown(1);
      }

      // Education
      if (resume.education && resume.education.length > 0) {
        addHeading('Education');
        resume.education.forEach((edu) => {
          doc
            .fillColor('#0F172A')
            .fontSize(10)
            .font('Helvetica-Bold')
            .text(edu.degree, { continued: true })
            .font('Helvetica-Oblique')
            .fillColor('#475569')
            .text(`  — ${edu.institution}`, { continued: true })
            .font('Helvetica')
            .fillColor('#64748B')
            .text(` (${edu.startDate} - ${edu.isCurrent ? 'Present' : edu.endDate})`, { align: 'right' });

          if (edu.gpa) {
            doc.fontSize(9).fillColor('#334155').text(`GPA / Grade: ${edu.gpa}`);
          }
          if (edu.coursework) {
            doc.fontSize(9).fillColor('#64748B').text(`Coursework: ${edu.coursework}`);
          }
          doc.moveDown(0.5);
        });
        doc.moveDown(0.5);
      }

      // Experience & Internships
      if (resume.experience && resume.experience.length > 0) {
        addHeading('Experience');
        resume.experience.forEach((exp) => {
          doc
            .fillColor('#0F172A')
            .fontSize(10)
            .font('Helvetica-Bold')
            .text(exp.role, { continued: true })
            .fillColor('#2563EB')
            .font('Helvetica')
            .text(` @ ${exp.company}`)
            .fontSize(9)
            .fillColor('#64748B')
            .text(`${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate} | ${exp.location || ''}`);

          if (exp.bullets && exp.bullets.length > 0) {
            exp.bullets.forEach((b) => {
              if (b.trim()) {
                doc.fontSize(9.5).fillColor('#334155').text(`• ${b}`, { indent: 10 });
              }
            });
          }
          doc.moveDown(0.5);
        });
        doc.moveDown(0.5);
      }

      // Projects
      if (resume.projects && resume.projects.length > 0) {
        addHeading('Projects');
        resume.projects.forEach((proj) => {
          doc
            .fillColor('#0F172A')
            .fontSize(10)
            .font('Helvetica-Bold')
            .text(proj.title);
          if (proj.technologies && proj.technologies.length > 0) {
            doc
              .fontSize(8.5)
              .fillColor('#2563EB')
              .font('Helvetica-Oblique')
              .text(`Technologies: ${proj.technologies.join(', ')}`);
          }
          if (proj.bullets && proj.bullets.length > 0) {
            proj.bullets.forEach((b) => {
              if (b.trim()) {
                doc.fontSize(9.5).fillColor('#334155').text(`• ${b}`, { indent: 10 });
              }
            });
          }
          doc.moveDown(0.5);
        });
        doc.moveDown(0.5);
      }

      // Skills
      if (resume.skills && resume.skills.length > 0) {
        addHeading('Technical Skills');
        resume.skills.forEach((cat) => {
          const names = cat.items.map((i) => i.name).join(', ');
          doc
            .fontSize(9.5)
            .fillColor('#0F172A')
            .font('Helvetica-Bold')
            .text(`${cat.category}: `, { continued: true })
            .font('Helvetica')
            .fillColor('#334155')
            .text(names);
        });
        doc.moveDown(1);
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
