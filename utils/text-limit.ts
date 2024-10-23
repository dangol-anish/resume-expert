export function TextLimit(
    text: string | undefined | null,
    length: number
  ): string | undefined {
    if (!text) return text || undefined;
    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  }