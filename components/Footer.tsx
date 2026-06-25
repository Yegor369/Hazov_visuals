import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(245,245,245,0.06)", padding: "36px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px)", display: "flex", flexDirection: "column", gap: 16 }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <Image src="/assets/logo.png" alt="HAZOV VISUALS" width={120} height={30} style={{ objectFit: "contain", opacity: 0.55 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a href="https://t.me/hazov_visuals_bot" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A90", textDecoration: "none" }}>
              @hazov_visuals
            </a>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#8A8A90" }}>© 2025</span>
          </div>
        </div>

        {/* Реквизиты и политика */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>
            Хазов Егор Евгеньевич · Самозанятый · ИНН 420215034451 · г. Москва
          </p>
          <Link href="/privacy"
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em", textDecoration: "none" }}>
            Политика конфиденциальности
          </Link>
        </div>

      </div>
    </footer>
  );
}
