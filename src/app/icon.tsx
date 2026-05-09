import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const logoPath = path.join(process.cwd(), "public", "icons", "JSS_Logo.png");
const logoDataUrl = `data:image/png;base64,${readFileSync(logoPath).toString("base64")}`;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0a1628 0%, #1e3a8a 60%, #1e40af 100%)",
          borderRadius: 14,
        }}
      >
        {/* logo fits inside the rounded square; native ratio 913:616 ≈ 1.48 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUrl} width={56} height={38} alt="JSS" />
      </div>
    ),
    { ...size },
  );
}
