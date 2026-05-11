interface VerificationEmailProps {
  name: string;
  verificationUrl: string;
  websiteUrl?: string;
}

/**
 * Generates the HTML for the email verification email.
 * Designed with a premium neo-brutalist aesthetic — bold, clean, and unmissable.
 */
export function generateVerificationEmail({ name, verificationUrl, websiteUrl }: VerificationEmailProps): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verifikasi Email — NARA.AI</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: #f5f0e8;
      font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    .wrapper {
      max-width: 600px;
      margin: 40px auto;
      padding: 0 16px;
    }

    /* ── Top brand strip ── */
    .brand-strip {
      background: #000;
      color: #fff;
      padding: 14px 32px;
      display: flex;
      align-items: center;
      gap: 12px;
      border: 4px solid #000;
      border-bottom: none;
    }

    .brand-logo {
      width: 36px;
      height: 36px;
      background: #FFD600;
      border: 3px solid #FFD600;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .brand-name {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.05em;
      text-transform: uppercase;
    }

    .brand-tagline {
      margin-left: auto;
      font-size: 10px;
      font-weight: 700;
      color: #FFD600;
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }

    /* ── Hero card ── */
    .card {
      background: #fff;
      border: 4px solid #000;
      box-shadow: 8px 8px 0px 0px rgba(0,0,0,1);
      overflow: hidden;
    }

    .hero {
      background: #000;
      padding: 40px 32px 32px;
      position: relative;
      overflow: hidden;
    }

    /* Grid pattern overlay */
    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,214,0,0.12) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,214,0,0.12) 1px, transparent 1px);
      background-size: 32px 32px;
    }

    .hero-badge {
      display: inline-block;
      background: #FFD600;
      color: #000;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      padding: 4px 12px;
      border: 2px solid #FFD600;
      margin-bottom: 20px;
      position: relative;
    }

    .hero-title {
      color: #fff;
      font-size: 40px;
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.04em;
      text-transform: uppercase;
      position: relative;
      margin-bottom: 8px;
    }

    .hero-title span {
      color: #FFD600;
    }

    .hero-sub {
      color: #71717a;
      font-size: 14px;
      font-weight: 500;
      position: relative;
    }

    /* ── Body content ── */
    .body {
      padding: 32px;
    }

    .greeting {
      font-size: 18px;
      font-weight: 700;
      color: #000;
      margin-bottom: 12px;
    }

    .body-text {
      font-size: 15px;
      color: #3f3f46;
      font-weight: 500;
      line-height: 1.65;
      margin-bottom: 28px;
    }

    /* ── CTA Button ── */
    .cta-wrapper {
      margin: 28px 0;
      text-align: center;
    }

    .cta-btn {
      display: inline-block;
      background: #FFD600;
      color: #000 !important;
      font-size: 16px;
      font-weight: 800;
      letter-spacing: -0.02em;
      text-transform: uppercase;
      text-decoration: none;
      padding: 16px 48px;
      border: 4px solid #000;
      box-shadow: 6px 6px 0px 0px rgba(0,0,0,1);
    }

    /* ── Info cards row ── */
    .info-row {
      display: flex;
      gap: 12px;
      margin: 24px 0;
    }

    .info-card {
      flex: 1;
      background: #f5f0e8;
      border: 3px solid #000;
      padding: 14px 12px;
      text-align: center;
    }

    .info-card-icon {
      font-size: 22px;
      margin-bottom: 6px;
    }

    .info-card-label {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #000;
      display: block;
    }

    .info-card-value {
      font-size: 12px;
      font-weight: 500;
      color: #52525b;
      display: block;
      margin-top: 2px;
    }

    /* ── Raw link fallback ── */
    .link-fallback {
      background: #f4f4f5;
      border: 3px solid #e4e4e7;
      border-left: 5px solid #FFD600;
      padding: 12px 16px;
      margin-top: 20px;
    }

    .link-fallback p {
      font-size: 11px;
      color: #71717a;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 6px;
    }

    .link-fallback a {
      font-size: 12px;
      color: #000;
      word-break: break-all;
      font-family: monospace;
      font-weight: 600;
    }

    /* ── Divider ── */
    .divider {
      border: none;
      border-top: 4px solid #000;
      margin: 24px 0;
    }

    /* ── Footer ── */
    .footer {
      background: #000;
      color: #71717a;
      padding: 20px 32px;
      border: 4px solid #000;
      border-top: none;
      margin-top: 0;
    }

    .footer p {
      font-size: 11px;
      font-weight: 500;
      line-height: 1.6;
    }

    .footer a {
      color: #FFD600;
      text-decoration: none;
    }

    .footer-brand {
      color: #fff;
      font-weight: 800;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: block;
      margin-bottom: 6px;
    }

    @media (max-width: 480px) {
      .hero-title { font-size: 28px; }
      .info-row { flex-direction: column; }
      .cta-btn { padding: 14px 24px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Brand strip -->
    <div class="brand-strip">
      <div class="brand-logo">
        <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
          <rect width="100" height="100" fill="#FFD600"/>
          <rect x="18" y="22" width="13" height="56" fill="black"/>
          <rect x="69" y="22" width="13" height="56" fill="black"/>
          <polygon points="18,22 31,22 69,78 56,78" fill="black"/>
        </svg>
      </div>
      <span class="brand-name">NARA.AI</span>
      <span class="brand-tagline">Interview Simulator</span>
    </div>

    <!-- Main card -->
    <div class="card">

      <!-- Hero section -->
      <div class="hero">
        <div class="hero-badge">✉️ Email Verification</div>
        <h1 class="hero-title">
          Verifikasi<br/>
          <span>Email</span><br/>
          Kamu.
        </h1>
        <p class="hero-sub">Satu langkah lagi menuju sesi interview pertamamu</p>
      </div>

      <!-- Body -->
      <div class="body">
        <p class="greeting">Halo, ${name}! 👋</p>
        <p class="body-text">
          Terima kasih telah mendaftar di <a href="${websiteUrl}" target="_blank">NARA.AI</a>. Untuk mengaktifkan akunmu dan mulai berlatih interview bersama Nara, kamu perlu memverifikasi alamat email ini terlebih dahulu.
        </p>

        <!-- CTA -->
        <div class="cta-wrapper">
          <a href="${verificationUrl}" class="cta-btn" target="_blank">
            ✓ Verifikasi Email Sekarang
          </a>
        </div>

        <!-- Info cards -->
        <div class="info-row">
          <div class="info-card">
            <div class="info-card-icon">⏱️</div>
            <span class="info-card-label">Berlaku</span>
            <span class="info-card-value">24 Jam</span>
          </div>
          <div class="info-card">
            <div class="info-card-icon">🔒</div>
            <span class="info-card-label">Aman</span>
            <span class="info-card-value">Enkripsi SSL</span>
          </div>
          <div class="info-card">
            <div class="info-card-icon">🤖</div>
            <span class="info-card-label">AI Ready</span>
            <span class="info-card-value">Setelah Verifikasi</span>
          </div>
        </div>

        <hr class="divider" />

        <p class="body-text" style="font-size:13px; color: #71717a;">
          Jika kamu tidak merasa mendaftar di NARA.AI, abaikan email ini. Tidak ada tindakan lebih lanjut yang diperlukan.
        </p>

        <!-- Raw link fallback -->
        <div class="link-fallback">
          <p>Jika tombol di atas tidak berfungsi, salin link ini ke browser:</p>
          <a href="${verificationUrl}" target="_blank">${verificationUrl}</a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <span class="footer-brand">NARA.AI — AI Interview Simulator</span>
      <p>
        Email ini dikirim secara otomatis. Mohon jangan membalas email ini.<br/>
      </p>
    </div>

  </div>
</body>
</html>`;
}
