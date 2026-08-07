import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ResumeData } from '../types/types.js';
import { generatePdfBuffer } from '../services/pdfExportService.js';
import { generateDocx } from '../services/docxExportService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonDir = path.resolve(__dirname, '../../json');
if (!fs.existsSync(jsonDir)) {
  fs.mkdirSync(jsonDir, { recursive: true });
}

// POST /api/resume/save
export async function saveResume(req: Request, res: Response): Promise<void> {
  try {
    const resume: ResumeData = req.body;
    if (!resume || !resume.id) {
      res.status(400).json({ success: false, error: 'Invalid resume data or missing ID' });
      return;
    }

    resume.updatedAt = new Date().toISOString();
    const filePath = path.join(jsonDir, `${resume.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(resume, null, 2), 'utf-8');

    res.json({ success: true, message: 'Resume saved successfully', data: resume });
  } catch (error: any) {
    console.error('Error saving resume:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to save resume' });
  }
}

// GET /api/resume/load/:id
export async function loadResume(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const filePath = path.join(jsonDir, `${id}.json`);

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ success: false, error: 'Resume not found' });
      return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const resume = JSON.parse(content);
    res.json({ success: true, data: resume });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to load resume' });
  }
}

// GET /api/resume/list
export async function listResumes(_req: Request, res: Response): Promise<void> {
  try {
    const files = fs.readdirSync(jsonDir).filter((f) => f.endsWith('.json'));
    const resumes: ResumeData[] = files.map((file) => {
      const content = fs.readFileSync(path.join(jsonDir, file), 'utf-8');
      return JSON.parse(content);
    });

    res.json({ success: true, data: resumes });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to list resumes' });
  }
}

// DELETE /api/resume/:id
export async function deleteResume(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const filePath = path.join(jsonDir, `${id}.json`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    res.json({ success: true, message: 'Resume deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to delete resume' });
  }
}

// POST /api/resume/export/pdf
export async function exportPdf(req: Request, res: Response): Promise<void> {
  try {
    const resume: ResumeData = req.body;
    const buffer = await generatePdfBuffer(resume);

    const filename = `${(resume.personal?.fullName || 'Resume').replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (error: any) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to generate PDF' });
  }
}

// POST /api/resume/export/docx
export async function exportDocx(req: Request, res: Response): Promise<void> {
  try {
    const resume: ResumeData = req.body;
    const buffer = await generateDocx(resume);

    const filename = `${(resume.personal?.fullName || 'Resume').replace(/[^a-zA-Z0-9]/g, '_')}_Resume.docx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (error: any) {
    console.error('Error generating DOCX:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to generate DOCX' });
  }
}

// POST /api/resume/import
export async function importResume(req: Request, res: Response): Promise<void> {
  try {
    const resume: ResumeData = req.body;
    if (!resume || !resume.personal) {
      res.status(400).json({ success: false, error: 'Invalid JSON resume file' });
      return;
    }
    resume.id = resume.id || 'resume-' + Date.now();
    resume.createdAt = resume.createdAt || new Date().toISOString();
    resume.updatedAt = new Date().toISOString();

    const filePath = path.join(jsonDir, `${resume.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(resume, null, 2), 'utf-8');

    res.json({ success: true, message: 'Resume imported and saved', data: resume });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to import resume' });
  }
}
