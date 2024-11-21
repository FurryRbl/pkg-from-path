import fs from 'fs';
import path from 'path';

/**
 * @typedef {object} Result
 * @property {string} packageName - Package name
 * @property {string} packageVersion - Package version
 * @property {string} relativePath - The file path in the package generated according to the given path and the path where the package is located
 * @property {string} packageJsonPath - Path to the package.json file
 */

/**
 * Parse the returned object
 * @param {string} originalPath - The original path to resolve.
 * @param {string} packagePath - The path to the package.json file.
 * @returns {Result} The resolved package information.
 */
function resolve(originalPath, packagePath) {
	/** @type {Result} */
	const result = {};

	/** @type {import('type-fest').PackageJson} */
	const packageJSON = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

	// Package Information
	result.packageName = packageJSON.name;
	result.packageVersion = packageJSON.version;
	result.relativePath = path.relative(path.dirname(packagePath), originalPath);

	result.packageJsonPath = packagePath;

	return result;
}

/**
 * Automatically detects which package a given path belongs to.
 * @param {string} inputPath - The path to resolve.
 * @throws {TypeError} If the input path is not a string.
 * @throws {Error} If the input path is not an absolute path.
 * @returns {Result | null} The resolved package path, or null if not found.
 */
function resolvePackagePath(inputPath) {
	// Check if the input type is a string
	if (typeof inputPath !== 'string') {
		throw new TypeError('The passed path must be a string');
	}

	// Ensure the input path is an absolute path
	if (!path.isAbsolute(inputPath)) {
		throw new Error(`The passed path: ${inputPath} is not an absolute path`);
	}

	let currentPath = inputPath;

	// If the input is a file path, move up one level
	if (fs.lstatSync(currentPath).isFile()) {
		currentPath = path.dirname(currentPath);
	}

	// First check: see if the current path contains a package.json
	const packagePath = path.join(currentPath, 'package.json');
	if (fs.existsSync(packagePath) && fs.lstatSync(packagePath).isFile()) {
		return resolve(inputPath, packagePath);
	}

	// Recursively search upwards for package.json, until the root directory
	while (path.parse(currentPath).root !== currentPath) {
		currentPath = path.dirname(currentPath);

		// Check the current path for package.json each time
		const packagePath = path.join(currentPath, 'package.json');
		if (fs.existsSync(packagePath) && fs.lstatSync(packagePath).isFile()) {
			return resolve(inputPath, packagePath);
		}
	}

	// If no package.json is found, return null
	return null;
}

export default resolvePackagePath;
