import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const logoPath = path.join(process.cwd(), "public", "icons", "JSS_Logo.png");
const logoDataUrl = `data:image/png;base64,${readFileSync(logoPath).toString("base64")}`;

export default function AppleIcon() {
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -30,
            left: -30,
            width: 160,
            height: 160,
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 70%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUrl} width={160} height={108} alt="JSS" />
      </div>
    ),
    { ...size },
  );
}
