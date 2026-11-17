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

const CSS_INLINE = fs.readFileSync(path.join(__dirname, 'assets', 'styles.css'), 'utf8');
const JS_INLINE = fs.readFileSync(path.join(__dirname, 'assets', 'site.js'), 'utf8');
const LOGO_SRC = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, 'assets', 'logo.jpg')).toString('base64');

const SERVICES = [
  {
    id: "01",
    color: "coral",
    title: "Audits & Due Diligence",
    desc: "Our audits and due diligence reviews give a clear picture of a company's compliance health. They help boards, investors and acquirers find risks early and act on them with confidence.",
    scope: [
      "Secretarial Audit under Section 204 of the Companies Act, 2013",
      "Annual Secretarial Compliance Reports for listed entities",
      "Internal and compliance audits under corporate, FEMA and labour laws",
      "Legal and secretarial due diligence for investment, merger and acquisition transactions",
      "ROC search and status reports for lenders and investors",
      "Review of statutory registers, minutes and records",
      "FEMA/RBI compliance health checks for foreign-invested companies",
      "Labour law and HR compliance audits"
    ]
  },
  {
    id: "02",
    color: "violet",
    title: "Corporate Restructuring",
    desc: "We design and carry out restructuring that meets a business's strategic, tax and regulatory goals. That covers the whole process, from structuring and documentation through to approvals from NCLT and the regulators.",
    scope: [
      "Mergers, amalgamations and demergers under Sections 230–232",
      "Fast-track mergers under Section 233",
      "Cross-border mergers and inbound or outbound restructuring",
      "Reduction of share capital under Section 66",
      "Buy-back of securities under Section 68",
      "Conversions: private to public company, company to LLP, firm to company, and similar",
      "Slump sales and business transfers",
      "Group reorganisation and holding-subsidiary structuring",
      "Voluntary strike-off and closure of entities"
    ]
  },
  {
    id: "03",
    color: "forest",
    title: "Capital Market Services",
    desc: "We guide companies through raising capital and staying listed. Our work covers the SEBI framework, from IPO readiness to ongoing compliance as a listed entity.",
    scope: [
      "IPO readiness and SME IPO advisory (BSE SME / NSE Emerge)",
      "Compliance under SEBI (LODR) Regulations",
      "SEBI (PIT) Regulations: insider trading policies, structured digital database (SDD) and trading window",
      "SEBI (SAST) Regulations: takeover disclosures and open offers",
      "Rights issues, preferential allotments and qualified institutional placements (QIPs)",
      "Private placements under Section 42",
      "ESOP and SBEB scheme design and implementation",
      "Delisting and reclassification of promoters",
      "Liaison with stock exchanges, depositories and the RTA"
    ]
  },
  {
    id: "04",
    color: "accent",
    title: "GST Services",
    desc: "Our GST support runs from registration to litigation. It keeps businesses compliant and their input tax credit protected, and helps them prepare for notices from the department.",
    scope: [
      "GST registration, amendment and cancellation",
      "Monthly, quarterly and annual returns (GSTR-1, GSTR-3B, GSTR-9, GSTR-9C)",
      "Input tax credit reconciliation with GSTR-2B",
      "E-invoicing and e-way bill compliance",
      "GST refunds (exports, inverted duty structure)",
      "Replies to notices, scrutiny and audit proceedings",
      "Appeals and representation before GST authorities",
      "GST health checks and transaction advisory"
    ]
  },
  {
    id: "05",
    color: "coral",
    title: "IPR Services",
    desc: "We help businesses secure, manage and enforce their intellectual property, so that their brands, creative works and innovations remain protected business assets.",
    scope: [
      "Trademark search, filing and registration",
      "Replies to examination reports and attendance at hearings",
      "Trademark opposition and rectification proceedings",
      "Renewal, assignment and recordal of trademarks",
      "Copyright registration (literary, artistic, software and similar works)",
      "Design registration",
      "Patent filing in coordination with patent agents",
      "IP licensing, assignment and franchise agreements",
      "IP portfolio management and watch services"
    ]
  },
  {
    id: "06",
    color: "violet",
    title: "Legal Services",
    desc: "We represent clients before tribunals and regulators and draft the documents their business relies on. Our corporate law advice is precise and practical.",
    scope: [
      "NCLT matters: oppression and mismanagement (Sections 241–242), compromise and arrangement, and restoration of struck-off companies",
      "Compounding of offences (Section 441) and adjudication proceedings",
      "Matters under the Insolvency and Bankruptcy Code",
      "Representation before the ROC, Regional Director, RBI and other authorities",
      "Drafting shareholders', joint venture, share subscription and founders' agreements",
      "NDAs, service agreements and commercial contracts",
      "Legal opinions on corporate, FEMA and regulatory matters",
      "Support in arbitration and dispute resolution"
    ]
  },
  {
    id: "07",
    color: "forest",
    title: "Social Security & HR Laws",
    desc: "We help employers meet their obligations under India's labour codes and social security laws. That reduces risk and supports fair, compliant workplaces.",
    scope: [
      "EPF and ESIC registration, monthly returns and compliance",
      "Professional Tax registration and filings",
      "Shops & Establishments registration and renewals",
      "Advisory on the new Labour Codes (Wages, Social Security, Industrial Relations, Occupational Safety)",
      "Gratuity, bonus and minimum wages compliance",
      "Contract labour registration and licensing",
      "POSH policy, Internal Committee setup and annual reports",
      "HR policy drafting, standing orders and employee handbooks",
      "Labour inspections and replies to notices"
    ]
  },
  {
    id: "08",
    color: "accent",
    title: "Start-Up Services",
    desc: "We support founders from idea to investment. We help them choose the right structure, build compliance into the company from the start and raise funds with confidence.",
    scope: [
      "Choice of business entity and incorporation (company, LLP, OPC)",
      "DPIIT Start-up India recognition and Section 80-IAC tax exemption",
      "MSME Udyam registration",
      "Founders' agreements and ESOP structuring",
      "Fund-raising support: equity, CCPS, CCDs and convertible notes",
      "FEMA compliance for foreign investment (FC-GPR, FC-TRS, annual FLA return)",
      "Trademark protection for brand and product names",
      "Virtual Company Secretary and annual compliance management",
      "Investor due diligence readiness and data room support"
    ]
  }
];

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
      <img src="${LOGO_SRC}" alt="FICOR Advisors LLP" class="h-10 sm:h-12 w-auto object-contain mix-blend-multiply rounded-sm"/>
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
          <img src="${LOGO_SRC}" alt="FICOR Advisors LLP Logo" class="h-12 w-auto object-contain bg-ivory rounded p-1 shadow-sm"/>
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
  <link rel="icon" type="image/jpeg" href="${LOGO_SRC}"/>
  <link rel="shortcut icon" href="${LOGO_SRC}"/>
  <link rel="apple-touch-icon" href="${LOGO_SRC}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"/>
  <style>
${CSS_INLINE}
  </style>
  <link rel="stylesheet" href="${relPath}assets/styles.css"/>
</head>
<body class="bg-background text-foreground antialiased selection:bg-coral selection:text-ivory">
  <div class="flex min-h-screen flex-col">
    ${getHeader(activePage, relPath)}
    <main class="flex-1">
      ${content}
    </main>
    ${getFooter(relPath)}
  </div>
  <script>
${JS_INLINE}
  </script>
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
  LOGO_SRC,
  getHeader,
  getFooter,
  getStatsHtml,
  wrapHtml
};
