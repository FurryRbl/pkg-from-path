/* eslint-disable n/no-process-exit */

import fs from 'node:fs';
import chalk from 'chalk';
import url from 'node:url';
import path from 'node:path';
import { rollup } from 'rollup';
import * as rimraf from 'rimraf';
import child_process from 'node:child_process';
import nodeResolve from '@rollup/plugin-node-resolve';

(async () => {
	try {
		const outPath = path.resolve(import.meta.dirname, './dist');
		const filePath = path.resolve(import.meta.dirname, './src/main.js');

		if (fs.existsSync(outPath)) {
			rimraf.sync(outPath);
		}
		fs.mkdirSync(outPath);

		Promise.all([
			rollup({
				input: filePath,
				output: {
					format: 'cjs',
					sourcemap: false,
					file: path.resolve(outPath, 'main.cjs'), // 输出路径
				},
				plugins: [nodeResolve()],
			}).then(async bundle => {
				await bundle.write({
					format: 'cjs',
					sourcemap: false,
					file: path.resolve(outPath, 'main.cjs'),
				});

				await bundle.close();

				console.log(chalk.blueBright('cjs build success!'));
			}),
			fs.promises.copyFile(filePath, path.resolve(outPath, 'main.mjs')).then(() => {
				console.log(chalk.blueBright('esm build success!'));
			}),
			new Promise((resolve, reject) => {
				/** @type {import('node:child_process').ChildProcess} */
				const child = child_process.spawn('node', [
					url.fileURLToPath(import.meta.resolve('typescript/lib/tsc.js')),
					'--emitDeclarationOnly',
				]);

				child.stdout.on('data', data => process.stdout.write(data)); // 标准输出
				child.stderr.on('data', data => process.stderr.write(data)); // 错误输出
				child.on('close', code => resolve(code));
				child.on('error', error => reject(error.message, error.stack));
			}).then(() => {
				console.log(chalk.blueBright('dts build success!'));
			}),
		]);
	} catch (error) {
		console.error(chalk.red(`build failed with error:\n`), error.stack || error);
		process.exit(1);
	}
})();
