export const dynamic = "force-static";

export function GET() {
  const manifest = {
    name: "Just Soft Solution",
    short_name: "JSS",
    description:
      "Just Soft Solution — software engineering, QA, and big data. Custom software, automation testing, API & security testing, and big data analytics.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#07090f",
    theme_color: "#07090f",
    categories: ["business", "productivity", "developer"],
    lang: "en",
    icons: [
      { src: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any maskable" },
      { src: "/icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml", purpose: "any maskable" },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      "content-type": "application/manifest+json",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
