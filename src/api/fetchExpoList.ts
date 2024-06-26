import path from 'path';
import { ExpoDto } from './types';
import { promises as fs, readFileSync } from 'fs';

export async function fetchExpoList() {
  const expoPath = path.join(process.cwd(), 'public', 'expo.json');
  const file = readFileSync(expoPath, 'utf-8');

  const result = (await new Response(file).json()) as ExpoDto[];

  return result.map((item, i) => {
    if (i === 0) {
      item.prevId = null;
    }

    if (i > 0) {
      item.prevId = result[i - 1].id;
    }

    if (i === result.length - 1) {
      item.nextId = null;
    }

    if (i < result.length - 1) {
      item.nextId = result[i + 1].id;
    }

    return item;
  });
}
