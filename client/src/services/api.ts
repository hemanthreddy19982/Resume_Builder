import axios from 'axios';
import { ResumeData } from '@shared/types';

const API_BASE = '/api';

export const api = {
  // Save resume to server
  saveResume: async (resume: ResumeData) => {
    const res = await axios.post(`${API_BASE}/resume/save`, resume);
    return res.data;
  },

  // Load resume from server
  loadResume: async (id: string) => {
    const res = await axios.get(`${API_BASE}/resume/load/${id}`);
    return res.data;
  },

  // List all resumes on server
  listResumes: async () => {
    const res = await axios.get(`${API_BASE}/resume/list`);
    return res.data;
  },

  // Delete resume on server
  deleteResume: async (id: string) => {
    const res = await axios.delete(`${API_BASE}/resume/${id}`);
    return res.data;
  },

  // Export PDF from backend fallback
  exportPdf: async (resume: ResumeData) => {
    const response = await axios.post(`${API_BASE}/resume/export/pdf`, resume, {
      responseType: 'blob',
    });
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(resume.personal?.fullName || 'Resume').replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
  },

  // Export DOCX from backend
  exportDocx: async (resume: ResumeData) => {
    const response = await axios.post(`${API_BASE}/resume/export/docx`, resume, {
      responseType: 'blob',
    });
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(resume.personal?.fullName || 'Resume').replace(/[^a-zA-Z0-9]/g, '_')}_Resume.docx`;
    link.click();
    window.URL.revokeObjectURL(url);
  },

  // Upload Photo File
  uploadPhoto: async (file: File) => {
    const formData = new FormData();
    formData.append('photo', file);
    const res = await axios.post(`${API_BASE}/photo/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  // Upload Signature File
  uploadSignature: async (file: File) => {
    const formData = new FormData();
    formData.append('signature', file);
    const res = await axios.post(`${API_BASE}/signature/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};
