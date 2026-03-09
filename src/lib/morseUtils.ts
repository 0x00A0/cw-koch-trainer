/* eslint-disable @typescript-eslint/no-unused-vars */
// Helpers extracted from koch-trainer for lower coupling

export const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
export const randInt = (lo: number, hi: number) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
export const dotMs = (wpm: number) => 1200 / wpm;

/** Tokenize text into morse-playable units: single chars, prosigns like <AR>, or " " */
export const tokenize = (text: string): string[] => {
  const tokens: string[] = [];
  let i = 0;
  while (i < text.length) {
    if (text[i] === " ") {
      tokens.push(" ");
      i++;
    } else if (text[i] === "<") {
      const end = text.indexOf(">", i);
      if (end !== -1) {
        tokens.push(text.slice(i, end + 1));
        i = end + 1;
      } else {
        i++;
      }
    } else {
      tokens.push(text[i]);
      i++;
    }
  }
  return tokens;
};

export const stripBrackets = (s: string) => s.replace(/[<>]/g, "");
export const normTokens = (s: string) => tokenize(s.toUpperCase()).filter(t => t !== " ");

/** Return morse representation for an item. Caller provides MORSE table. */
export const morseOf = (MORSE: Record<string, string>, item: string) => {
  if (MORSE[item]) return MORSE[item];
  return tokenize(item).filter(t => t !== " ").map(t => MORSE[t] ?? "").join("  ");
};
