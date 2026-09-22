# SpotSync Client Deployment Guide

This guide outlines the environment variables, build steps, start commands, and backend storage dependencies for deploying the **SpotSync Next.js Client**.

---

## 1. Environment Variables

Configure the following environment variable in your frontend hosting provider (e.g., Vercel, Netlify, Render, AWS Amplify):

| Variable | Required | Description | Example / Default |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | **Required in Prod** | Base URL pointing to the deployed Go backend API | `https://spotsync-api.onrender.com` *(Default: `http://localhost:8080`)* |

> [!NOTE]
> `NEXT_PUBLIC_API_URL` is baked into the client bundle at build time by Next.js. All API endpoints and dynamic uploaded media paths (such as profile avatars at `/uploads/*`) use this single configuration value.

---

## 2. Build & Start Commands

### Platform Deployments (Vercel, Netlify, Cloudflare Pages)

- **Framework Preset**: Next.js
- **Root Directory**: `./` (or `SpotSync-Client` if in a monorepo)
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (automatic)
- **Install Command**: `npm install`

### Self-Hosted / Node.js Server (Render, Railway, Docker, VM)

- **Install Dependencies**:
  ```bash
  npm install
  ```

- **Build Production Bundle**:
  ```bash
  npm run build
  ```

- **Start Production Server**:
  ```bash
  npm start
  ```

---

## 3. Uploads & Storage Architecture Note

> [!WARNING]
> **Backend Storage Dependency:**
> Uploaded profile avatars and vehicle images are stored on the backend server's local disk (`/uploads/*`).
>
> On cloud platforms with ephemeral filesystems without persistent disk volumes, uploaded images will reset whenever the backend container restarts or redeploys. To avoid missing avatars in production, ensure the backend is provisioned with persistent volume storage or is configured with an external cloud storage provider (e.g., AWS S3 or Cloudinary).
