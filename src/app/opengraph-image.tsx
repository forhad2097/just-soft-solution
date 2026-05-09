import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";

export const alt = "Just Soft Solution — We Turn Any Business Into Business Automation";
export const size = { width: 1200, height: 1200 };
export const contentType = "image/png";

const logoPath = path.join(process.cwd(), "public", "icons", "JSS_Logo.png");
const logoDataUrl = `data:image/png;base64,${readFileSync(logoPath).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at 30% 25%, #1e3a8a 0%, #0f172a 55%, #020617 100%)",
          color: "#f8fafc",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        {/* aurora glows */}
        <div
          style={{
            position: "absolute",
            top: -300,
            left: -200,
            width: 1000,
            height: 1000,
            background:
              "radial-gradient(closest-side, rgba(6,182,212,0.55), transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -350,
            right: -250,
            width: 1100,
            height: 1100,
            background:
              "radial-gradient(closest-side, rgba(59,130,246,0.45), transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(2,6,23,0.6) 100%)",
            display: "flex",
          }}
        />

        {/* logo — natural ratio 913:616 ≈ 1.48; render at 720 wide, ~485 tall */}
        <div
          style={{
            display: "flex",
            filter:
              "drop-shadow(0 0 60px rgba(6,182,212,0.5)) drop-shadow(0 0 120px rgba(59,130,246,0.4))",
            zIndex: 1,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoDataUrl} width={720} height={485} alt="JSS" />
        </div>

        {/* wordmark */}
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: "-0.025em",
            zIndex: 1,
          }}
        >
          Just Soft Solution
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 14,
            fontSize: 22,
            color: "#94a3b8",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          Business Automation Partner
        </div>

        {/* url stamp */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            display: "flex",
            fontSize: 20,
            color: "#06b6d4",
            fontWeight: 600,
            letterSpacing: "0.04em",
            zIndex: 1,
          }}
        >
          jss.aiosolibe.cloud
        </div>
      </div>
    ),
    { ...size },
  );
}
