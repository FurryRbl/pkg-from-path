import url from 'node:url';
import resolvePackagePath from './src/main.js';

const path = url.fileURLToPath(import.meta.resolve('@eslint/js/src/configs/eslint-recommended.js'));

console.log(`Input Path: ${path}`);
console.log(`Output: ${resolvePackagePath(path)}`);
