import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
export async function generateDocx(resume) {
    const primaryColor = (resume.customizations?.themeColor || '#2563EB').replace('#', '');
    const children = [];
    // Header - Name & Title
    children.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
            new TextRun({
                text: resume.personal.fullName || 'UNNAMED CANDIDATE',
                bold: true,
                size: 32,
                color: primaryColor,
                font: 'Arial',
            }),
        ],
    }));
    if (resume.personal.jobTitle) {
        children.push(new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new TextRun({
                    text: resume.personal.jobTitle,
                    size: 24,
                    italics: true,
                    color: '555555',
                    font: 'Arial',
                }),
            ],
        }));
    }
    // Contact Row
    const contactParts = [];
    if (resume.personal.email)
        contactParts.push(`Email: ${resume.personal.email}`);
    if (resume.personal.phone)
        contactParts.push(`Phone: ${resume.personal.phone}`);
    if (resume.personal.location)
        contactParts.push(`Location: ${resume.personal.location}`);
    if (resume.personal.linkedin)
        contactParts.push(`LinkedIn: ${resume.personal.linkedin}`);
    if (resume.personal.github)
        contactParts.push(`GitHub: ${resume.personal.github}`);
    if (contactParts.length > 0) {
        children.push(new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new TextRun({
                    text: contactParts.join(' | '),
                    size: 18,
                    color: '666666',
                    font: 'Arial',
                }),
            ],
        }));
    }
    children.push(new Paragraph({ text: '' })); // Spacing
    // Helper for Section Headings
    const addHeading = (title) => {
        children.push(new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
                new TextRun({
                    text: title.toUpperCase(),
                    bold: true,
                    size: 22,
                    color: primaryColor,
                    font: 'Arial',
                }),
            ],
            border: {
                bottom: { color: primaryColor, space: 1, style: BorderStyle.SINGLE, size: 6 },
            },
        }));
    };
    // Professional Summary / Objective
    if (resume.summary || resume.objective) {
        addHeading('Professional Summary');
        children.push(new Paragraph({
            children: [
                new TextRun({
                    text: resume.summary || resume.objective,
                    size: 20,
                    font: 'Arial',
                }),
            ],
        }));
        children.push(new Paragraph({ text: '' }));
    }
    // Education
    if (resume.education && resume.education.length > 0) {
        addHeading('Education');
        resume.education.forEach((edu) => {
            children.push(new Paragraph({
                children: [
                    new TextRun({ text: edu.degree, bold: true, size: 20, font: 'Arial' }),
                    new TextRun({ text: ` — ${edu.institution}`, italics: true, size: 20, font: 'Arial' }),
                    new TextRun({ text: ` (${edu.startDate} - ${edu.isCurrent ? 'Present' : edu.endDate})`, size: 18, color: '666666', font: 'Arial' }),
                ],
            }));
            if (edu.gpa) {
                children.push(new Paragraph({
                    children: [new TextRun({ text: `GPA / Score: ${edu.gpa}`, size: 18, font: 'Arial' })],
                }));
            }
            if (edu.coursework) {
                children.push(new Paragraph({
                    children: [new TextRun({ text: `Relevant Coursework: ${edu.coursework}`, size: 18, italics: true, font: 'Arial' })],
                }));
            }
        });
        children.push(new Paragraph({ text: '' }));
    }
    // Internships & Experience
    if (resume.experience && resume.experience.length > 0) {
        addHeading('Experience & Internships');
        resume.experience.forEach((exp) => {
            children.push(new Paragraph({
                children: [
                    new TextRun({ text: exp.role, bold: true, size: 20, font: 'Arial' }),
                    new TextRun({ text: ` | ${exp.company}`, size: 20, font: 'Arial' }),
                    new TextRun({ text: ` (${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate})`, size: 18, color: '666666', font: 'Arial' }),
                ],
            }));
            if (exp.bullets && exp.bullets.length > 0) {
                exp.bullets.forEach((b) => {
                    if (b.trim()) {
                        children.push(new Paragraph({
                            bullet: { level: 0 },
                            children: [new TextRun({ text: b, size: 19, font: 'Arial' })],
                        }));
                    }
                });
            }
        });
        children.push(new Paragraph({ text: '' }));
    }
    // Projects
    if (resume.projects && resume.projects.length > 0) {
        addHeading('Key Projects');
        resume.projects.forEach((proj) => {
            children.push(new Paragraph({
                children: [
                    new TextRun({ text: proj.title, bold: true, size: 20, font: 'Arial' }),
                    proj.subtitle ? new TextRun({ text: ` (${proj.subtitle})`, italics: true, size: 18, font: 'Arial' }) : new TextRun({ text: '' }),
                ],
            }));
            if (proj.technologies && proj.technologies.length > 0) {
                children.push(new Paragraph({
                    children: [new TextRun({ text: `Tech Stack: ${proj.technologies.join(', ')}`, size: 18, color: '444444', font: 'Arial' })],
                }));
            }
            if (proj.bullets && proj.bullets.length > 0) {
                proj.bullets.forEach((b) => {
                    if (b.trim()) {
                        children.push(new Paragraph({
                            bullet: { level: 0 },
                            children: [new TextRun({ text: b, size: 19, font: 'Arial' })],
                        }));
                    }
                });
            }
        });
        children.push(new Paragraph({ text: '' }));
    }
    // Technical Skills
    if (resume.skills && resume.skills.length > 0) {
        addHeading('Technical Skills');
        resume.skills.forEach((cat) => {
            const skillNames = cat.items.map((i) => i.name).join(', ');
            children.push(new Paragraph({
                children: [
                    new TextRun({ text: `${cat.category}: `, bold: true, size: 20, font: 'Arial' }),
                    new TextRun({ text: skillNames, size: 19, font: 'Arial' }),
                ],
            }));
        });
        children.push(new Paragraph({ text: '' }));
    }
    // Soft Skills & Strengths
    if ((resume.softSkills && resume.softSkills.length > 0) || (resume.strengths && resume.strengths.length > 0)) {
        addHeading('Soft Skills & Strengths');
        const combined = [...(resume.softSkills || []), ...(resume.strengths || [])];
        children.push(new Paragraph({
            children: [new TextRun({ text: combined.join(' • '), size: 19, font: 'Arial' })],
        }));
        children.push(new Paragraph({ text: '' }));
    }
    // Certifications
    if (resume.certifications && resume.certifications.length > 0) {
        addHeading('Certifications & Achievements');
        resume.certifications.forEach((cert) => {
            children.push(new Paragraph({
                children: [
                    new TextRun({ text: cert.name, bold: true, size: 19, font: 'Arial' }),
                    new TextRun({ text: ` - ${cert.issuer} (${cert.issueDate})`, size: 18, color: '555555', font: 'Arial' }),
                ],
            }));
        });
        children.push(new Paragraph({ text: '' }));
    }
    const doc = new Document({
        sections: [
            {
                properties: {},
                children,
            },
        ],
    });
    return await Packer.toBuffer(doc);
}
