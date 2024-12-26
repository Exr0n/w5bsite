// /src/routes/wildernessfile/[...rest]/+server.js
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import { error } from '@sveltejs/kit';

export async function GET({ params, setHeaders, url }) {
  const baseDir = path.join(process.cwd(), 'static', 'wilderness');
  const targetPath = path.join(baseDir, params.rest ?? "");

  if (!fs.existsSync(targetPath)) {
    throw error(404, 'Not found');
  }

  const stat = fs.statSync(targetPath);

  // If it's a file, serve it
  if (stat.isFile()) {
    setHeaders({
      'Content-Type': mime.lookup(targetPath) || 'application/octet-stream'
    });
    return new Response(fs.readFileSync(targetPath));
  }

  // Otherwise, it's a directory, so 307 redirect to trigger +page.svelte
  return new Response(null, {
    status: 307,
    headers: { Location: url.pathname.replace(/^\/wildernessfile/, '/wilderness') }
  });
}

export const prerender = true;