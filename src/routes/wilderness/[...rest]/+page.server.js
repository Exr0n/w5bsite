// /src/routes/wilderness/[...rest]/+page.server.js
import fs from 'fs';
import path from 'path';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params }) {
  const baseDir = path.join(process.cwd(), 'static', 'wilderness');
  const targetPath = path.join(baseDir, params.rest);

  // 404 if the target doesn't exist
  if (!fs.existsSync(targetPath)) {
    throw error(404, 'Not found');
  }

  // If it's a file, redirect to /wildernessfile/...rest
  const stat = fs.statSync(targetPath);
  if (!stat.isDirectory()) {
    throw redirect(307, `/wildernessfile/${params.rest}`);
  } else {
    // Return files for your +page.svelte
    const files = fs.readdirSync(targetPath);
    const stats = files.map(file => fs.statSync(targetPath + '/' + file).isDirectory());
    const zip = (a, b) => a.map((x, i) => [x, b[i]]);
    return { files: zip(files, stats) };
  }
}