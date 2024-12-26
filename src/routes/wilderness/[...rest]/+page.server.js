// wilderness/[...rest]/+page.server.js
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import { error } from '@sveltejs/kit';

export async function load({ params, setHeaders }) {
  const baseDir = path.join(process.cwd(), 'static', 'wilderness');
  const targetPath = path.join(baseDir, (params.rest ?? ""));

  if (!fs.existsSync(targetPath)) {
    throw error(404, 'Not found');
  }

  const stat = fs.statSync(targetPath);

  // Serve file if path is a file
  if (stat.isFile()) {
    const file = fs.readFileSync(targetPath);
    setHeaders({ 'Content-Type': mime.lookup(targetPath) || 'application/octet-stream' });
    return new Response(file);
  }

  // Otherwise, assume it's a directory and list its contents
  const files = fs.readdirSync(targetPath);
  return { targetPath, files };
}