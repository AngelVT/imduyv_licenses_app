import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from './config.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const __dirstorage = config.STORAGE_DIR;