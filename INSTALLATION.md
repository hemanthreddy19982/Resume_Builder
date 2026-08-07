# Installation Guide - ResumeCraft Pro

Follow these instructions to install and run the ResumeCraft Pro project locally.

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

## Step 1: Install Dependencies

Run the following command in the root directory:

```bash
npm run install:all
```

Alternatively, install manually in each folder:

```bash
cd client
npm install

cd ../server
npm install
```

---

## Step 2: Start Development Servers

### Terminal 1: Client Frontend (Vite)

```bash
cd client
npm run dev
```

The frontend will start at `http://localhost:5173`.

### Terminal 2: Backend Express API

```bash
cd server
npm run dev
```

The Express API backend will start at `http://localhost:5000`.

---

## Step 3: Build for Production

To create production bundles for both frontend and backend:

```bash
# Build Frontend
cd client
npm run build

# Build Backend
cd ../server
npm run build
```
