# Deployment Guide - GitHub, Vercel, Render

Guide to deploy ResumeCraft Pro to production environments.

---

## 1. Deploy Frontend to Vercel

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Set the **Root Directory** to `client`.
5. Framework Preset: **Vite**.
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Click **Deploy**.

---

## 2. Deploy Backend to Render

1. Sign in to [Render](https://render.com).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Set **Root Directory** to `server`.
5. Environment: **Node**.
6. Build Command: `npm install && npm run build`
7. Start Command: `npm start`
8. Click **Create Web Service**.

---

## 3. Deploy Frontend & Static Documentation to GitHub Pages

To host a static version on GitHub Pages:

1. In `client/vite.config.ts`, set `base: '/<repository-name>/'`.
2. Build the client app:
   ```bash
   cd client
   npm run build
   ```
3. Deploy the contents of `client/dist` to the `gh-pages` branch.
