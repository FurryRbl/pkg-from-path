/**
 * Automatically detects which package a given path belongs to.
 *
 * @param {string} inputPath - The path to resolve.
 *
 * @throws {TypeError} If the input path is not a string.
 * @throws {Error} If the input path is not an absolute path.
 *
 * @returns {object | null} The resolved package path, or null if not found.
 */
declare function resolvePackagePath(inputPath: string): object | null;

export default resolvePackagePath;
