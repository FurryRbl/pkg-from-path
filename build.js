/* eslint-disable n/no-process-exit */

import fs from 'node:fs';
import chalk from 'chalk';
import swc from '@swc/core';
import path from 'node:path';
import { sync as rimrafSync } from 'rimraf';

(async () => {
	try {
		const outPath = path.resolve(import.meta.dirname, './dist');
		const filePath = path.resolve(import.meta.dirname, './src/main.js');

		if (fs.existsSync(outPath)) {
			rimrafSync(outPath);
		}
		fs.mkdirSync(outPath);

		Promise.all([
			swc
				.transformFile(filePath, {
					isModule: true,
					sourceMaps: false,
					module: {
						type: 'commonjs',
					},
				})
				.then(output => {
					fs.writeFileSync(path.resolve(outPath, 'index.cjs'), output.code, 'utf-8');
					console.log(chalk.blueBright('cjs build success!'));
				}),
			swc
				.transformFile(filePath, {
					isModule: true,
					sourceMaps: false,
					module: {
						type: 'es6',
					},
				})
				.then(output => {
					fs.writeFileSync(path.resolve(outPath, 'index.mjs'), output.code, 'utf-8');
					console.log(chalk.blueBright('esm build success!'));
				}),
			fs.promises
				.copyFile(path.resolve(filePath, '../main.d.ts'), path.resolve(outPath, 'index.d.ts'))
				.then(() => {
					console.log(chalk.blueBright('dts build success!'));
				}),
		]);
	} catch (error) {
		console.error(chalk.red(`build failed with error:\n`), error.stack || error);
		process.exit(1);
	}
})();
