// app/routes/colorUtils.ts
export function hexToHsb(hex: string): { hue: number; saturation: number; brightness: number } | null {
  const clean = hex.replace(/^#/, '');
  if (!/^[0-9A-Fa-f]{6}$/.test(clean)) return null;
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    delta = max - min;

  let h = 0;
  if (delta) {
    if (max === r)      h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else                h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const brightness = max;
  const saturation = max ? delta / max : 0;
  return { hue: h, saturation, brightness };
}

export function hsbToHex({ hue, saturation, brightness }: { hue: number; saturation: number; brightness: number }) {
  const c = brightness * saturation;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = brightness - c;
  let [r1, g1, b1] = [0, 0, 0];

  if (hue < 60)      [r1, g1, b1] = [c, x, 0];
  else if (hue < 120)[r1, g1, b1] = [x, c, 0];
  else if (hue < 180)[r1, g1, b1] = [0, c, x];
  else if (hue < 240)[r1, g1, b1] = [0, x, c];
  else if (hue < 300)[r1, g1, b1] = [x, 0, c];
  else               [r1, g1, b1] = [c, 0, x];

  const toHex = (v: number) =>
    Math.round((v + m) * 255).toString(16).padStart(2, '0');

  return `#${toHex(r1)}${toHex(g1)}${toHex(b1)}`;
}
