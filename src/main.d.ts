/**
 * Automatically detects which package a given path belongs to.
 *
 * @param {string} inputPath - The path to resolve.
 *
 * @throws {TypeError} If the input path is not a string.
 * @throws {Error} If the input path is not an absolute path.
 *
 * @returns {string | null} The resolved package path, or null if not found.
 */
declare function resolvePackagePath(inputPath: string): string | null;

export default resolvePackagePath;
