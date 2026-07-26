# Priyanshu Kumar — Portfolio

MERN Stack Developer portfolio built with React + Vite.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

(Create the empty repo first on github.com — click "New repository", don't
initialize it with a README, then copy the URL it gives you into the
`git remote add origin ...` command above.)

## Deploy on Vercel

1. Go to https://vercel.com and sign in with your GitHub account.
2. Click **Add New → Project**.
3. Select the GitHub repo you just pushed.
4. Vercel auto-detects Vite — leave the defaults:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**. In ~1 minute you'll get a live URL like
   `your-repo.vercel.app`.

After that, every `git push` to `main` auto-redeploys the live site.

## Before deploying — update these placeholders

- `src/Portfolio.jsx` → `SOCIAL_LINKS` (top of file): set your real GitHub,
  LinkedIn, LeetCode URLs, and resume link.
- `PROJECTS` array: set real `github` and `live` URLs for each project.
- `CodingProfile` component: replace `username=octocat` in the GitHub stats
  image URL with your real GitHub username.
- Contact form (`ContactForm`) uses [FormSubmit](https://formsubmit.co) —
  the first real submission will trigger a confirmation email to
  priyanshukumarr444@gmail.com; click the link inside to activate it.
