const fs = require('fs');
const path = require('path');

const PHONE_DISPLAY = "+91 81475 88559";
const PHONE_HREF = "+918147588559";
const EMAIL = "mail@ficoradvisors.in";
const ADDRESS_LINES = [
  "27/3, 002, Satyadhana",
  "Lakshmi Nivasa Apartment, 22nd Main",
  "Revenue Layout, Padmanabha Nagar",
  "Bengaluru 560070"
];
const HOURS = "Mon–Sat, 9:30 AM–6:00 PM IST";

const SERVICES = [
  { id: "01", color: "coral", title: "Audits & Due Diligence", desc: "Secretarial audits, compliance due diligence for mergers, acquisitions and institutional investments, ROC health-checks, search reports, and statutory register verification." },
  { id: "02", color: "violet", title: "Corporate Restructuring", desc: "Mergers, amalgamations, demergers, slump sales, capital reduction, buybacks, and fast-track restructuring under Companies Act 2013 and NCLT procedures." },
  { id: "03", color: "forest", title: "Capital Market Services", desc: "Pre-IPO secretarial readiness, rights issues, preferential allotments, private placement compliance, employee stock option plans (ESOPs), and regulatory disclosures." },
  { id: "04", color: "accent", title: "GST Services", desc: "Comprehensive GST registration, monthly and annual return filings, GST refunds, classification audits, input tax credit reconciliation, and departmental representation." },
  { id: "05", color: "coral", title: "IPR Services", desc: "End-to-end trademark search, registration, copyright filings, response to examination reports, opposition hearings, licensing agreements, and portfolio renewals." },
  { id: "06", color: "violet", title: "Legal Services", desc: "Commercial contract drafting, shareholder agreements (SHA/SSA), board advisory, representation before NCLT, RD, and ROC, and compounding of statutory offenses." },
  { id: "07", color: "forest", title: "Social Security & HR Laws", desc: "EPF, ESI, gratuity and bonus compliance, POSH policy implementation and IC advisory, drafting employment contracts, and compliance with modern labour codes." },
  { id: "08", color: "accent", title: "Start-Up Services", desc: "End-to-end entity incorporation, FEMA & FDI compliance (FC-GPR / FC-TRS filings), RBI reporting, convertible note structuring, and ongoing secretarial retainers." }
];

function getEmblemSvg(cls = "relative w-56 text-primary sm:w-72 lg:w-[22rem]") {
  const lines = Array.from({ length: 24 }).map((_, t) => {
    let n = (t / 24) * Math.PI * 2;
    let r = t % 6 === 0 ? 82 : 89;
    let opacity = t % 6 === 0 ? 0.9 : 0.4;
    return `<line x1="${(120 + Math.cos(n) * 96).toFixed(2)}" y1="${(120 + Math.sin(n) * 96).toFixed(2)}" x2="${(120 + Math.cos(n) * r).toFixed(2)}" y2="${(120 + Math.sin(n) * r).toFixed(2)}" opacity="${opacity}"></line>`;
  }).join('');

  return `<svg viewBox="0 0 240 240" role="img" aria-label="Ficor Advisors emblem" class="${cls}">
    <g fill="none" stroke="currentColor" stroke-width="1">
      <circle cx="120" cy="120" r="112" opacity="0.35"></circle>
      <circle cx="120" cy="120" r="96" stroke-dasharray="900" style="animation:seal-draw 1.6s cubic-bezier(.16,1,.3,1) forwards"></circle>
      <circle cx="120" cy="120" r="64" opacity="0.5" stroke-dasharray="2 6"></circle>
      ${lines}
    </g>
    <text x="120" y="132" text-anchor="middle" fill="currentColor" font-family="var(--font-display)" font-size="56">FA</text>
  </svg>`;
}

function getHeader(activePage = "home", relPath = "") {
  const navItems = [
    { id: "home", label: "Home", href: `${relPath}index.html` },
    { id: "about", label: "About", href: `${relPath}about.html` },
    { id: "services", label: "Services", href: `${relPath}services.html` },
    { id: "articles", label: "Articles", href: `${relPath}articles.html` },
    { id: "contact", label: "Contact", href: `${relPath}contact.html` }
  ];

  const desktopLinks = navItems.map(item => {
    const isActive = item.id === activePage;
    return `<a href="${item.href}" class="relative py-1 text-sm ${isActive ? 'text-foreground font-medium' : 'text-foreground/75 hover:text-foreground'} transition-colors">
      ${item.label}
      <span aria-hidden="true" class="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0'}"></span>
    </a>`;
  }).join('');

  const mobileLinks = navItems.map(item => {
    const isActive = item.id === activePage;
    return `<li><a href="${item.href}" class="block py-3.5 font-display text-xl ${isActive ? 'text-accent' : ''}">${item.label}</a></li>`;
  }).join('');

  return `<header class="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
  <div class="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:h-20">
    <a class="group flex items-center gap-3 py-1" href="${relPath}index.html">
      <img src="${relPath}assets/logo.jpg" alt="FICOR Advisors LLP" class="h-10 sm:h-12 w-auto object-contain mix-blend-multiply rounded-sm"/>
      <div class="flex flex-col">
        <span class="font-display text-base tracking-tight sm:text-xl font-semibold text-foreground leading-tight">FICOR Advisors</span>
        <span class="eyebrow hidden text-muted-foreground sm:inline text-[10px]">Governance, Simplified</span>
      </div>
    </a>
    <nav aria-label="Primary" class="hidden items-center gap-8 lg:flex">
      ${desktopLinks}
      <a href="${relPath}book-call.html" class="rounded-md bg-gradient-to-r from-primary to-violet px-5 py-2.5 text-xs font-medium tracking-wide text-primary-foreground uppercase shadow-sm transition-opacity hover:opacity-90">
        Book a call
      </a>
    </nav>
    <button type="button" id="mobile-menu-btn" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu" class="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden">
      <span class="h-px w-6 bg-foreground transition-transform duration-300 menu-bar-1"></span>
      <span class="h-px w-6 bg-foreground transition-transform duration-300 menu-bar-2"></span>
    </button>
  </div>
  <div id="mobile-nav" hidden class="border-t border-border bg-background lg:hidden">
    <nav aria-label="Mobile" class="mx-auto max-w-[1240px] px-5 py-4 sm:px-8">
      <ul class="divide-y divide-border">
        ${mobileLinks}
      </ul>
      <a href="${relPath}book-call.html" class="mt-4 block rounded-md bg-gradient-to-r from-primary to-violet px-5 py-3 text-center text-xs tracking-wide text-primary-foreground uppercase font-medium">
        Book a call
      </a>
    </nav>
  </div>
</header>`;
}

function getFooter(relPath = "") {
  return `<footer class="mt-24 bg-navy text-ivory">
  <div aria-hidden="true" class="h-1.5 bg-gradient-to-r from-coral via-brass to-violet"></div>
  <div class="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
    <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <img src="${relPath}assets/logo.jpg" alt="FICOR Advisors LLP Logo" class="h-12 w-auto object-contain bg-ivory rounded p-1 shadow-sm"/>
          <div>
            <p class="font-display text-xl text-ivory font-medium">FICOR Advisors</p>
            <p class="eyebrow text-brass text-[10px]">Governance, Simplified</p>
          </div>
        </div>
        <p class="mt-4 text-sm leading-relaxed text-ivory/70">
          Every filing, register and resolution — kept in good order. A Bengaluru-based corporate secretarial and compliance practice, advising since 2012.
        </p>
      </div>
      <div>
        <p class="eyebrow text-brass">Practice areas</p>
        <ul class="mt-5 space-y-2.5 text-sm text-ivory/75">
          ${SERVICES.slice(0, 5).map(s => `<li><a href="${relPath}services.html#service-${s.id}" class="hover:text-brass transition-colors">${s.title}</a></li>`).join('')}
          <li><a href="${relPath}services.html" class="text-brass hover:underline">+ All 8 practice areas</a></li>
        </ul>
      </div>
      <div>
        <p class="eyebrow text-brass">Quick links</p>
        <ul class="mt-5 space-y-2.5 text-sm text-ivory/75">
          <li><a href="${relPath}index.html" class="hover:text-brass transition-colors">Home</a></li>
          <li><a href="${relPath}about.html" class="hover:text-brass transition-colors">About the practice</a></li>
          <li><a href="${relPath}services.html" class="hover:text-brass transition-colors">Services directory</a></li>
          <li><a href="${relPath}articles.html" class="hover:text-brass transition-colors">Regulatory intelligence</a></li>
          <li><a href="${relPath}contact.html" class="hover:text-brass transition-colors">Contact office</a></li>
          <li><a href="${relPath}book-call.html" class="text-brass font-medium hover:underline">Book a call</a></li>
        </ul>
      </div>
      <div>
        <p class="eyebrow text-brass">Reach the practice</p>
        <ul class="mt-5 space-y-2.5 text-sm text-ivory/75">
          <li><a href="mailto:${EMAIL}" class="hover:text-brass transition-colors">${EMAIL}</a></li>
          <li><a href="tel:${PHONE_HREF}" class="hover:text-brass font-medium transition-colors">${PHONE_DISPLAY}</a></li>
        </ul>
        <address class="mt-5 text-sm leading-relaxed text-ivory/60 not-italic">
          Ficor Advisors<br/>
          ${ADDRESS_LINES.join('<br/>')}<br/>
          <span class="mt-2 block text-xs text-ivory/50">${HOURS}</span>
        </address>
      </div>
    </div>
    <div class="mt-14 flex flex-col items-start justify-between gap-6 border-t border-ivory/15 pt-8 text-xs text-ivory/55 sm:flex-row sm:items-center">
      <p>© 2012–2026 FICOR Advisors LLP. All rights reserved.</p>
      <div class="flex flex-wrap gap-5 font-mono text-xs">
        <span class="text-brass">360° Compliance Support</span>
        <span>•</span>
        <span>Peer Reviewed Practice</span>
        <span>•</span>
        <span>Bengaluru, India</span>
      </div>
    </div>
  </div>
</footer>`;
}

function getStatsHtml() {
  return `<dl class="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
    <div class="rounded-lg border border-border bg-card p-5 shadow-sm" style="border-top-color:var(--coral); border-top-width:3px;">
      <dt class="font-display text-2xl font-normal">2012</dt>
      <dd class="eyebrow mt-1.5 text-muted-foreground">Advising since</dd>
    </div>
    <div class="rounded-lg border border-border bg-card p-5 shadow-sm" style="border-top-color:var(--violet); border-top-width:3px;">
      <dt class="font-display text-2xl font-normal">360°</dt>
      <dd class="eyebrow mt-1.5 text-muted-foreground">COMPLIANCE SUPPORT</dd>
    </div>
    <div class="rounded-lg border border-border bg-card p-5 shadow-sm" style="border-top-color:var(--forest); border-top-width:3px;">
      <dt class="font-display text-2xl font-normal">Pan-India</dt>
      <dd class="eyebrow mt-1.5 text-muted-foreground">Client coverage</dd>
    </div>
  </dl>`;
}

function wrapHtml(title, description, content, activePage = "home", relPath = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${title}</title>
  <meta name="description" content="${description}"/>
  <meta name="author" content="FICOR Advisors LLP"/>
  <meta property="og:site_name" content="Ficor Advisors"/>
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${description}"/>
  <link rel="icon" type="image/svg+xml" href="${relPath}favicon.svg"/>
  <link rel="icon" type="image/jpeg" href="${relPath}assets/logo.jpg?v=3"/>
  <link rel="shortcut icon" href="${relPath}favicon.ico?v=3"/>
  <link rel="apple-touch-icon" href="${relPath}assets/logo.jpg?v=3"/>
  <link rel="stylesheet" href="${relPath}assets/styles.css"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"/>
</head>
<body class="bg-background text-foreground antialiased selection:bg-coral selection:text-ivory">
  <div class="flex min-h-screen flex-col">
    ${getHeader(activePage, relPath)}
    <main class="flex-1">
      ${content}
    </main>
    ${getFooter(relPath)}
  </div>
  <script src="${relPath}assets/site.js"></script>
</body>
</html>`;
}

module.exports = {
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
  ADDRESS_LINES,
  HOURS,
  SERVICES,
  getEmblemSvg,
  getHeader,
  getFooter,
  getStatsHtml,
  wrapHtml
};
