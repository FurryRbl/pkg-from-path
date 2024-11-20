import url from 'node:url';
import resolvePackagePath from 'pkg-from-path';

const path = url.fileURLToPath(import.meta.resolve('@eslint/js/src/configs/eslint-recommended.js'));

console.log(`Input Path: ${path}`);

const result = resolvePackagePath(path);

console.log(`Output: ${JSON.stringify(result, null, 4)}`);
