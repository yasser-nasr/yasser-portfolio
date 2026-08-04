import { ImageResponse } from "next/og";

export const alt =
  "Yasser Nasr — Graphic & Multimedia Designer | Brand & Digital Designer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1D1D1B",
          color: "#F2F0EA",
          padding: "72px 80px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#B8B8B2",
            fontSize: 22,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              display: "flex",
              marginRight: 18,
              background: "#F2F0EA",
            }}
          />
          Portfolio / Visual Communication
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            Yasser Nasr
          </div>
          <div
            style={{
              width: 96,
              height: 3,
              display: "flex",
              marginTop: 34,
              marginBottom: 32,
              background: "#B8B8B2",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#F2F0EA",
              fontSize: 34,
              lineHeight: 1.35,
            }}
          >
            <span>Graphic &amp; Multimedia Designer</span>
            <span style={{ color: "#B8B8B2" }}>Brand &amp; Digital Designer</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid #3A3A37",
            color: "#B8B8B2",
            fontSize: 22,
            letterSpacing: 1,
          }}
        >
          <span>yassernasr.com</span>
          <span>Egypt / GCC</span>
        </div>
      </div>
    ),
    size,
  );
}
