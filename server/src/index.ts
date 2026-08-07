import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  saveResume,
  loadResume,
  listResumes,
  deleteResume,
  exportPdf,
  exportDocx,
  importResume,
} from './controllers/resumeController.js';
import { uploadMiddleware } from './controllers/uploadController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static uploads
const uploadsDir = path.resolve(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsDir));

// Resume JSON API Routes
app.post('/api/resume/save', saveResume);
app.get('/api/resume/load/:id', loadResume);
app.get('/api/resume/list', listResumes);
app.delete('/api/resume/:id', deleteResume);

// Export & Import Routes
app.post('/api/resume/export/pdf', exportPdf);
app.post('/api/resume/export/docx', exportDocx);
app.post('/api/resume/import', importResume);

// Photo & Signature File Upload Routes
app.post('/api/photo/upload', uploadMiddleware.single('photo'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, error: 'No photo uploaded' });
    return;
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl, filename: req.file.filename });
});

app.post('/api/signature/upload', uploadMiddleware.single('signature'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, error: 'No signature uploaded' });
    return;
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl, filename: req.file.filename });
});

// Version & Sync Health check
app.get('/api/version', (_req, res) => {
  res.json({
    version: '1.0.0',
    status: 'OK',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 ResumeBuilder Server running on http://localhost:${PORT}`);
});
