# ResumeCraft Pro - SaaS Resume Builder for Freshers

A complete, production-ready, ultra-modern Resume Builder application engineered specifically for university freshers, engineers, and entry-level job seekers.

![ResumeCraft Pro](client/public/favicon.svg)

---

## Key Features

- **25+ Premium Templates**: Modern, Classic, Executive, Corporate, Minimal, ATS Master, Google Tech, Microsoft Azure, Amazon Leadership, Startup Dynamo, Creative Portfolio, Elegant, Simple, Designer, Developer, Engineer, Data Analyst, Business, Medical, Academic, Ocean Blue, Emerald Green, Royal Purple, Dark Slate, Luxury Gold.
- **Rule-Based AI Assistant**: One-click professional summary, career objective, and job-domain skill suggestion generator.
- **Real-Time ATS Score Engine**: Evaluates bullet metrics, keyword counts, word limits, and formatting rules to ensure 90%+ pass rates.
- **Multi-Format Export**: PDF (Client & Server side), Editable Word (.docx), JSON, TXT, and Print-ready view.
- **Interactive Tools**: Canvas Photo Cropper, Digital Signature Pad (Draw & Upload), QR Code generator, Zoom controls, Mobile/Tablet preview.
- **No Database Needed**: Persistent Browser LocalStorage + Server JSON file storage (`server/json/*.json`).

---

## Tech Stack

### Frontend
- **Framework**: React 19, TypeScript, Vite
- **Styling**: TailwindCSS, Glassmorphism, CSS Variables
- **State Management**: Redux Toolkit (with LocalStorage sync & Undo/Redo history stack)
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PDF & Export**: `html2pdf.js`, `jspdf`, `html2canvas`, `docx`, `qrcode.react`

### Backend
- **Runtime**: Node.js + Express.js
- **File & Storage**: Node `fs/promises`, `multer` for photo & signature uploads
- **Doc Exporters**: `pdfkit`, `docx`
- **Storage**: JSON file repository in `server/json/`

---

## Quick Start

```bash
# 1. Install dependencies for both client and server
npm run install:all

# 2. Run frontend dev server (http://localhost:5173)
npm run dev:client

# 3. Run backend Express API server (http://localhost:5000)
npm run dev:server
```

---

## Project Structure

```
ResumeBuilder/
├── client/                     # React 19 + TypeScript + Vite + TailwindCSS
│   ├── src/
│   │   ├── components/         # Section editors, Modals, Cropper, SignaturePad, QR Code, ATS Widget
│   │   ├── pages/              # Landing, Dashboard, Builder, Templates, Settings
│   │   ├── templates/          # 25+ Resume Templates & Master Renderer
│   │   ├── redux/              # Redux store & slice with undo/redo & local storage sync
│   │   ├── utils/              # ATS Evaluator, Exporters, Validators
│   │   ├── constants/          # Presets, AI suggestions, initial data
│   │   └── styles/             # Global CSS & Tailwind directives
├── server/                     # Node.js + Express + Multer + PDFKit + docx
│   ├── src/
│   │   ├── controllers/        # Resume & Upload controllers
│   │   ├── services/           # PDF & DOCX export services
│   │   └── index.ts            # Server entry point
│   ├── json/                   # JSON resume storage repository
│   └── uploads/                # Uploaded photos & signatures
└── shared/                     # Shared TypeScript interface definitions
```
