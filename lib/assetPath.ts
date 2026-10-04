/** Prefixes a /public path with the GitHub Pages base path (empty locally). */
export function assetPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
