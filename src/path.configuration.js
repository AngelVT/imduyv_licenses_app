import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { STORAGE_DIR } from './configuration/environment.configuration.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const __dirstorage = STORAGE_DIR;