export function getImageUrl(filename?: string) {
  if (!filename) return "";

  const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.nharrasyidtravel.com";

  // encode supaya spasi -> %20
  const encoded = encodeURIComponent(filename);

  return `${BASE}/media/${encoded}`;
}