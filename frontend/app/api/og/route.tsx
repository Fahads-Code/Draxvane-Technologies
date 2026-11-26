import { ImageResponse } from "next/og";

/* A dedicated share card. Using a generated 1200x630 image instead of letting
   scrapers pick a logo from the page keeps Facebook/LinkedIn previews sharp
   and stops them from choosing the grey filtered header logo. Text comes from
   each page's metadata, so every route gets its own card. */
function cleanText(value: string | null, fallback: string, max: number) {
  if (!value) return fallback;
  const cleaned = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  return cleaned ? cleaned.slice(0, max) : fallback;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const headline = cleanText(searchParams.get("title"), "One Agency.", 64);
  const subline = cleanText(searchParams.get("subtitle"), "Every digital need.", 64);
  const kicker = cleanText(
    searchParams.get("kicker"),
    "YOUR ALL-IN-ONE DIGITAL TEAM",
    64,
  );

  const headlineSize = headline.length > 30 ? 52 : 68;
  const sublineSize = subline.length > 30 ? 44 : 56;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#f4f8ff",
          background: "linear-gradient(135deg, #07142b 0%, #0b1b33 55%, #091731 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 620,
            height: 620,
            borderRadius: 310,
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.55) 0%, rgba(37, 99, 235, 0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -120,
            width: 620,
            height: 620,
            borderRadius: 310,
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(124, 58, 237, 0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 62,
              height: 62,
              borderRadius: 16,
              background: "linear-gradient(140deg, #2563eb 0%, #7c3aed 100%)",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            D
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>DRAXVANE</div>
            <div style={{ fontSize: 17, color: "#b4c3dc", letterSpacing: 3 }}>TECHNOLOGIES</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 24, color: "#93c5fd", letterSpacing: 1 }}>{kicker}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              fontSize: headlineSize,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            <span>{headline}</span>
            <span
              style={{
                fontSize: sublineSize,
                background: "linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {subline}
            </span>
          </div>
          <div style={{ fontSize: 24, color: "#b4c3dc" }}>
            Websites · Apps · Design · Games · AI · Automation · Data
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(191, 210, 240, 0.2)",
            paddingTop: 24,
            fontSize: 20,
            color: "#b4c3dc",
          }}
        >
          <span>draxvane.com</span>
          <span>hello@draxvane.com</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
