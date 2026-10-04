import { MAGIC_WORD } from "@/lib/siteConfig";

/** Case-insensitive, ignores surrounding spaces. */
export function checkMagicWord(input: string): boolean {
  return input.trim().toLowerCase() === MAGIC_WORD.toLowerCase();
}
