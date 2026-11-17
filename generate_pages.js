const fs = require('fs');
const path = require('path');
const {
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
  ADDRESS_LINES,
  HOURS,
  SERVICES,
  getEmblemSvg,
  getStatsHtml,
  LOGO_SRC,
  wrapHtml
} = require('./site_template');

// ==========================================
// 1. HOME PAGE CONTENT
// ==========================================
function getHomeContent(relPath = "") {
  return `<section class="relative overflow-hidden border-b border-border">
  <div aria-hidden="true" class="rule-grid absolute inset-0 opacity-40"></div>
  <div aria-hidden="true" class="pointer-events-none absolute inset-0">
    <div class="absolute -top-28 -right-20 h-96 w-96 rounded-full bg-coral/20 blur-3xl"></div>
    <div class="absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-violet/20 blur-3xl"></div>
    <div class="absolute right-1/4 -bottom-24 h-72 w-72 rounded-full bg-forest/20 blur-3xl"></div>
  </div>
  <div class="relative mx-auto grid max-w-[1240px] gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-32">
    <div>
      <div class="reveal">
        <p class="eyebrow flex items-center gap-3 text-muted-foreground">
          <span aria-hidden="true" class="h-px w-8 bg-accent"></span>Governance, Simplified
        </p>
      </div>
      <div class="reveal" style="transition-delay:80ms">
        <h1 class="mt-7 text-4xl leading-[1.06] sm:text-5xl lg:text-[4.1rem] font-normal">
          Every filing, register and resolution — kept in good order.
        </h1>
      </div>
      <div class="reveal" style="transition-delay:160ms">
        <p class="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Ficor Advisors handles the secretarial, legal and compliance work that keeps a company in good standing — audits and due diligence, corporate restructuring, capital market services, GST, IPR, and start-up compliance, all under one roof.
        </p>
      </div>
      <div class="reveal" style="transition-delay:240ms">
        <div class="mt-10 flex flex-wrap gap-3">
          <a href="${relPath}book-call.html" class="rounded-md bg-gradient-to-r from-primary to-violet px-7 py-3.5 text-xs font-medium tracking-wider text-primary-foreground uppercase shadow-md transition-opacity hover:opacity-90">
            Book a consultation
          </a>
          <a href="${relPath}services.html" class="rounded-md border-2 border-primary/30 px-7 py-3.5 text-xs font-medium tracking-wider text-primary uppercase transition-colors hover:border-coral hover:text-accent-foreground">
            View services
          </a>
        </div>
      </div>
      <div class="reveal" style="transition-delay:320ms">
        ${getStatsHtml()}
      </div>
    </div>
    <div class="reveal justify-self-center" style="transition-delay:200ms">
      <div class="relative p-6 sm:p-8 bg-card rounded-2xl border border-border/70 shadow-md flex flex-col items-center">
        <div aria-hidden="true" class="absolute inset-0 -m-5 sm:-m-7 border border-border/40 rounded-3xl pointer-events-none"></div>
        <img src="${LOGO_SRC}" alt="FICOR Advisors LLP Official Emblem" class="w-56 sm:w-64 lg:w-72 h-auto object-contain mix-blend-multiply"/>
        <div class="relative mt-6 w-full space-y-2" aria-hidden="true">
          <div class="h-px origin-left bg-border" style="width:100%"></div>
          <div class="h-px origin-left bg-border" style="width:86%"></div>
          <div class="h-px origin-left bg-border" style="width:72%"></div>
          <div class="h-px origin-left bg-border" style="width:58%"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
  <div class="reveal max-w-3xl">
    <p class="eyebrow flex items-center gap-3 text-muted-foreground">
      <span aria-hidden="true" class="h-px w-8 bg-accent"></span>Compliance Index
    </p>
    <h2 class="mt-5 text-3xl leading-[1.1] sm:text-4xl lg:text-5xl font-normal">
      Eight practice areas, one register.
    </h2>
    <p class="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
      Select an area to open the full service directory and review advisory scopes.
    </p>
  </div>
  <ul class="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
    ${SERVICES.map((s, idx) => `
    <li class="reveal bg-background" style="transition-delay:${idx * 50}ms">
      <a href="${relPath}services.html#service-${s.id}" class="group flex h-full flex-col justify-between gap-10 p-6 transition-colors hover:bg-secondary lg:p-7">
        <div class="flex items-start justify-between">
          <span class="font-mono text-xs font-medium" style="color:var(--${s.color})">${s.id}</span>
          <span aria-hidden="true" class="h-2 w-2 rounded-full transition-transform group-hover:scale-125" style="background-color:var(--${s.color})"></span>
        </div>
        <div>
          <h3 class="text-xl leading-snug font-normal">${s.title}</h3>
          <p class="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">${s.desc}</p>
          <span class="mt-4 block h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full" style="background-color:var(--${s.color})"></span>
          <span class="eyebrow mt-4 block text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">Review ${s.scope ? s.scope.length : 8} scopes →</span>
        </div>
      </a>
    </li>`).join('')}
  </ul>
</section>

<section class="relative overflow-hidden border-y border-border bg-navy text-ivory">
  <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy via-primary/70 to-violet/60"></div>
  <div aria-hidden="true" class="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-coral/25 blur-3xl"></div>
  <div class="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-20">
    <div class="reveal">
      <p class="eyebrow text-brass">YOUR NEXT MOVE</p>
      <h2 class="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl font-normal">
        Raising capital, restructuring, protecting your brand? Plan it with us.
      </h2>
      <p class="mt-3 text-sm text-ivory/80 max-w-lg">
        Direct telephone consultation available Monday to Saturday: <a href="tel:${PHONE_HREF}" class="text-brass underline">${PHONE_DISPLAY}</a>
      </p>
    </div>
    <div class="reveal" style="transition-delay:100ms">
      <a href="${relPath}book-call.html" class="inline-flex rounded-md bg-brass px-8 py-4 text-xs font-semibold tracking-wider text-navy uppercase shadow-lg transition-opacity hover:opacity-85">
        Start the Conversation
      </a>
    </div>
  </div>
</section>`;
}

// ==========================================
// 2. ABOUT PAGE CONTENT
// ==========================================
function getAboutContent(relPath = "") {
  return `<section class="border-b border-border">
  <div class="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
    <div class="reveal">
      <p class="eyebrow flex items-center gap-3 text-muted-foreground">
        <span aria-hidden="true" class="h-px w-8 bg-accent"></span>Firm Profile · About Us
      </p>
      <h1 class="mt-6 max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-[3.6rem] font-normal">
        FICOR Advisors LLP
      </h1>
      <p class="mt-4 text-xl font-display text-accent">
        Corporate Law, Regulatory Compliance & Governance with Confidence.
      </p>
      <div class="mt-7 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
        <p>
          FICOR Advisors LLP is a professional advisory firm in Bengaluru. We help businesses handle corporate law, regulatory compliance and governance with confidence.
        </p>
        <p>
          Our team of corporate law, compliance and regulatory professionals serves start-ups, SMEs, foreign-owned subsidiaries, producer companies and growing enterprises across India. Our work covers the full life of a business: incorporation and fund-raising, everyday compliance, restructuring, disputes and exit.
        </p>
        <p>
          We believe compliance should support growth, not hold it back. So we combine strong technical knowledge with practical, business-focused advice, delivered with integrity and on time.
        </p>
      </div>
    </div>
    <div class="reveal" style="transition-delay:120ms">
      ${getStatsHtml()}
    </div>
  </div>
</section>

<!-- WHAT SETS US APART -->
<section class="border-b border-border bg-secondary/30">
  <div class="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
    <div class="reveal max-w-3xl">
      <p class="eyebrow flex items-center gap-3 text-muted-foreground">
        <span aria-hidden="true" class="h-px w-8 bg-coral"></span>Distinctive Value
      </p>
      <h2 class="mt-5 text-3xl leading-[1.1] sm:text-4xl lg:text-5xl font-normal">
        What Sets Us Apart
      </h2>
      <p class="mt-4 text-base text-muted-foreground max-w-2xl">
        Built on partner accessibility, multidisciplinary reach, and deep institutional familiarity across statutory authorities.
      </p>
    </div>
    <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div class="reveal bg-card p-7 rounded-xl border border-border shadow-sm flex flex-col justify-between" style="transition-delay:0ms">
        <div>
          <span class="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-secondary text-coral">01 · Multidisciplinary</span>
          <h3 class="mt-4 text-xl font-normal text-foreground">One-stop advisory</h3>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
            Corporate law, FEMA, GST, IPR, labour laws and tribunal matters under one roof.
          </p>
        </div>
      </div>
      <div class="reveal bg-card p-7 rounded-xl border border-border shadow-sm flex flex-col justify-between" style="transition-delay:80ms">
        <div>
          <span class="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-secondary text-violet">02 · Leadership</span>
          <h3 class="mt-4 text-xl font-normal text-foreground">Partner-level involvement</h3>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
            Qualified professionals personally supervise every engagement, ensuring senior-level oversight.
          </p>
        </div>
      </div>
      <div class="reveal bg-card p-7 rounded-xl border border-border shadow-sm flex flex-col justify-between" style="transition-delay:160ms">
        <div>
          <span class="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-secondary text-forest">03 · Representation</span>
          <h3 class="mt-4 text-xl font-normal text-foreground">Regulatory depth</h3>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
            Hands-on experience before the ROC, Regional Director, NCLT, RBI and other statutory authorities.
          </p>
        </div>
      </div>
      <div class="reveal bg-card p-7 rounded-xl border border-border shadow-sm flex flex-col justify-between" style="transition-delay:240ms">
        <div>
          <span class="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-secondary text-accent">04 · Foresight</span>
          <h3 class="mt-4 text-xl font-normal text-foreground">Proactive compliance</h3>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
            Client-specific calendars and early alerts, so deadlines are never missed and penalties are prevented.
          </p>
        </div>
      </div>
      <div class="reveal bg-card p-7 rounded-xl border border-border shadow-sm flex flex-col justify-between sm:col-span-2 lg:col-span-2" style="transition-delay:320ms">
        <div>
          <span class="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-secondary text-coral">05 · Partnership</span>
          <h3 class="mt-4 text-xl font-normal text-foreground">Long-term relationships</h3>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
            We grow with our clients, from first filing to fund-raise and beyond, serving as a trusted legal and compliance partner.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- OUR APPROACH -->
<section class="border-b border-border">
  <div class="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
    <div class="reveal max-w-3xl">
      <p class="eyebrow flex items-center gap-3 text-muted-foreground">
        <span aria-hidden="true" class="h-px w-8 bg-accent"></span>Our Approach
      </p>
      <h2 class="mt-5 text-3xl leading-[1.1] sm:text-4xl lg:text-5xl font-normal">
        How the work is carried out.
      </h2>
      <p class="mt-4 text-base sm:text-lg text-foreground/90 font-display">
        Every engagement follows the same discipline: understand first, execute with precision, and stay accountable until the matter is closed.
      </p>
    </div>
    <div class="mt-14 grid gap-px border border-border bg-border lg:grid-cols-3">
      <div class="reveal bg-background p-8 sm:p-10" style="transition-delay:70ms">
        <div aria-hidden="true" class="mb-5 h-1 w-12 rounded-full" style="background-color:var(--coral)"></div>
        <p class="font-mono text-xs font-semibold" style="color:var(--coral)">Commitment 1</p>
        <h4 class="mt-3 text-xl font-normal text-foreground">Understand Before We Advise</h4>
        <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
          Before we advise, we study the client's business, ownership structure, compliance history and objectives. We review existing records, identify gaps and risks, and agree on a clear scope, timeline and fee before work begins.
        </p>
      </div>
      <div class="reveal bg-background p-8 sm:p-10" style="transition-delay:140ms">
        <div aria-hidden="true" class="mb-5 h-1 w-12 rounded-full" style="background-color:var(--violet)"></div>
        <p class="font-mono text-xs font-semibold" style="color:var(--violet)">Commitment 2</p>
        <h4 class="mt-3 text-xl font-normal text-foreground">Precision in Execution</h4>
        <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
          Every filing, document and opinion is prepared against a defined checklist and reviewed by a qualified professional before it leaves the firm. We follow a maker-checker process, keep complete working papers, and make sure everything we sign can withstand regulatory scrutiny.
        </p>
      </div>
      <div class="reveal bg-background p-8 sm:p-10" style="transition-delay:210ms">
        <div aria-hidden="true" class="mb-5 h-1 w-12 rounded-full" style="background-color:var(--forest)"></div>
        <p class="font-mono text-xs font-semibold" style="color:var(--forest)">Commitment 3</p>
        <h4 class="mt-3 text-xl font-normal text-foreground">Proactive and Accountable</h4>
        <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
          We track due dates through a client-specific compliance calendar and alert clients well ahead of deadlines. Clients get regular status updates, a single point of contact and prompt responses, and we stay with every matter until it is fully closed.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- STANDING: VISION, MISSION, PRINCIPLE -->
<section class="border-b border-border bg-secondary/20">
  <div class="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
    <div class="reveal max-w-3xl">
      <p class="eyebrow flex items-center gap-3 text-muted-foreground">
        <span aria-hidden="true" class="h-px w-8 bg-accent"></span>Standing
      </p>
      <h2 class="mt-5 text-3xl leading-[1.1] sm:text-4xl lg:text-5xl font-normal">
        Vision, mission and principle.
      </h2>
    </div>
    <div class="mt-12 border-t border-border">
      <!-- 01 VISION -->
      <div class="reveal" style="transition-delay:0ms">
        <div id="vision" class="grid gap-5 border-b border-border py-10 lg:grid-cols-[200px_1fr] lg:gap-12">
          <div class="flex items-baseline gap-4">
            <span class="font-mono text-xs font-medium" style="color:var(--coral)">01</span>
            <h3 class="text-2xl font-normal">Vision</h3>
          </div>
          <div class="space-y-3">
            <p class="text-xl sm:text-2xl font-display leading-snug text-foreground">
              Compliance made simple. Governance made strong. Growth made possible.
            </p>
          </div>
        </div>
      </div>

      <!-- 02 MISSION -->
      <div class="reveal" style="transition-delay:80ms">
        <div id="mission" class="grid gap-5 border-b border-border py-10 lg:grid-cols-[200px_1fr] lg:gap-12">
          <div class="flex items-baseline gap-4">
            <span class="font-mono text-xs font-medium" style="color:var(--violet)">02</span>
            <h3 class="text-2xl font-normal">Mission</h3>
          </div>
          <div class="space-y-3">
            <p class="text-base sm:text-lg leading-relaxed text-foreground/90 font-normal">
              At FICOR Advisors LLP, we simplify the regulatory journey for startups, SMEs, foreign-owned companies and growing enterprises. We give precise, ethical and practical advice across corporate law, FEMA, NCLT matters, intellectual property and labour compliance, so our clients can focus on building their business while we protect its foundation.
            </p>
          </div>
        </div>
      </div>

      <!-- 03 PRINCIPLE STATEMENT -->
      <div class="reveal" style="transition-delay:160ms">
        <div id="principle" class="grid gap-5 border-b border-border py-10 lg:grid-cols-[200px_1fr] lg:gap-12">
          <div class="flex items-baseline gap-4">
            <span class="font-mono text-xs font-medium" style="color:var(--forest)">03</span>
            <h3 class="text-2xl font-normal">Principle</h3>
          </div>
          <div class="space-y-3">
            <p class="text-base sm:text-lg leading-relaxed text-foreground/90 font-normal">
              We act with integrity, advise with precision, protect client confidence, anticipate before we react, and keep learning, so our clients can grow with certainty.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- GROWTH TIMELINE -->
<section class="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
  <div class="reveal max-w-3xl">
    <p class="eyebrow flex items-center gap-3 text-muted-foreground">
      <span aria-hidden="true" class="h-px w-8 bg-accent"></span>Growth timeline
    </p>
    <h2 class="mt-5 text-3xl leading-[1.1] sm:text-4xl lg:text-5xl font-normal">
      A practice built one register at a time.
    </h2>
  </div>
  <ol class="relative mt-14 border-l border-border pl-8 sm:pl-12 space-y-12">
    <li class="reveal relative" style="transition-delay:0ms">
      <span aria-hidden="true" class="absolute top-2 -left-[calc(2rem+4.5px)] h-2.5 w-2.5 rounded-full ring-4 ring-background sm:-left-[calc(3rem+4.5px)]" style="background-color:var(--coral)"></span>
      <p class="font-display text-3xl sm:text-4xl">2012</p>
      <p class="eyebrow mt-1 text-muted-foreground">Advising since</p>
      <p class="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Established in Bengaluru as a dedicated corporate secretarial advisory practice focused on corporate governance and statutory filings.
      </p>
    </li>
    <li class="reveal relative" style="transition-delay:100ms">
      <span aria-hidden="true" class="absolute top-2 -left-[calc(2rem+4.5px)] h-2.5 w-2.5 rounded-full ring-4 ring-background sm:-left-[calc(3rem+4.5px)]" style="background-color:var(--violet)"></span>
      <p class="font-display text-3xl sm:text-4xl">2015</p>
      <p class="eyebrow mt-1 text-muted-foreground">Pan-India Reach</p>
      <p class="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Expanded practice coverage across India, managing secretarial audits, corporate restructuring, and comprehensive regulatory compliance for emerging businesses.
      </p>
    </li>
    <li class="reveal relative" style="transition-delay:180ms">
      <span aria-hidden="true" class="absolute top-2 -left-[calc(2rem+4.5px)] h-2.5 w-2.5 rounded-full ring-4 ring-background sm:-left-[calc(3rem+4.5px)]" style="background-color:var(--forest)"></span>
      <p class="font-display text-3xl sm:text-4xl">Present</p>
      <p class="eyebrow mt-1 text-muted-foreground">360° Compliance Support</p>
      <p class="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Comprehensive institutional practice delivering full-spectrum advisory across Corporate Law, FEMA, NCLT, IPR, GST, and Labour compliance.
      </p>
    </li>
  </ol>
  <div class="reveal mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-8" style="transition-delay:0ms">
    <span class="font-mono text-xs text-muted-foreground">360° COMPLIANCE SUPPORT</span>
    <span class="font-mono text-xs text-muted-foreground">•</span>
    <span class="font-mono text-xs text-muted-foreground">PEER REVIEWED PRACTICE</span>
    <span class="font-mono text-xs text-muted-foreground">•</span>
    <span class="font-mono text-xs text-muted-foreground">BENGALURU HEADQUARTERED</span>
  </div>
  <div class="reveal mt-14 rounded-lg bg-gradient-to-r from-navy via-primary to-violet p-8 text-ivory sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" style="transition-delay:80ms">
    <div>
      <p class="eyebrow text-brass">YOUR NEXT MOVE</p>
      <h3 class="mt-2 text-2xl sm:text-3xl font-display font-normal">Raising capital, restructuring, protecting your brand? Plan it with us.</h3>
      <p class="mt-2 text-sm text-ivory/80">Direct desk helpline: <a href="tel:${PHONE_HREF}" class="text-brass underline font-medium">${PHONE_DISPLAY}</a></p>
    </div>
    <a href="${relPath}book-call.html" class="inline-flex shrink-0 rounded-md bg-brass px-7 py-3.5 text-xs font-semibold tracking-wider text-navy uppercase shadow-md transition-opacity hover:opacity-90">
      Start the Conversation
    </a>
  </div>
</section>`;
}

// ==========================================
// 3. SERVICES PAGE CONTENT
// ==========================================
function getServicesContent(relPath = "") {
  return `<div class="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
  <div class="reveal">
    <p class="eyebrow flex items-center gap-3 text-muted-foreground">
      <span aria-hidden="true" class="h-px w-8 bg-accent"></span>Service directory
    </p>
    <h1 class="mt-6 max-w-3xl text-4xl leading-[1.08] sm:text-5xl font-normal">
      Secretarial, legal and compliance work — all under one roof.
    </h1>
    <p class="mt-4 max-w-2xl text-base text-muted-foreground">
      Explore our eight core practice areas delivering end-to-end 360° compliance support for Indian companies, foreign subsidiaries, and growing enterprises.
    </p>
  </div>
  <div class="mt-16 services-layout-grid">
    <nav aria-label="Service index" class="lg:sticky lg:top-28 lg:self-start">
      <div class="flex items-center justify-between border-b border-border pb-3">
        <p class="eyebrow text-muted-foreground">Practice Index</p>
      </div>
      <ul class="mt-4 space-y-1">
        ${SERVICES.map((s, idx) => `
        <li>
          <button type="button" data-service-index="${s.id}" class="group flex w-full items-baseline gap-3 rounded-md px-2.5 py-2 text-left text-sm transition-colors cursor-pointer ${idx === 0 ? 'bg-secondary font-medium text-foreground' : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'}">
            <span class="font-mono text-xs font-medium" style="color:var(--${s.color})">${s.id}</span>
            <span class="group-hover:translate-x-0.5 transition-transform">${s.title}</span>
          </button>
        </li>`).join('')}
      </ul>
    </nav>
    <div class="border-t border-border">
      <div class="flex items-center justify-between py-3 border-b border-border/60 text-xs text-muted-foreground">
        <span class="font-mono uppercase tracking-wider">All 8 Practice Areas</span>
        <div class="flex items-center gap-3 font-mono">
          <button type="button" id="expand-all-services" class="hover:text-accent transition-colors cursor-pointer underline underline-offset-4">Expand all</button>
          <span class="text-border">/</span>
          <button type="button" id="collapse-all-services" class="hover:text-accent transition-colors cursor-pointer underline underline-offset-4">Collapse all</button>
        </div>
      </div>
      ${SERVICES.map((s, idx) => `
      <div class="reveal" style="transition-delay:${idx * 40}ms">
        <section id="service-${s.id}" class="border-b border-border scroll-mt-28">
          <h2>
            <button type="button" data-service-toggle="${s.id}" aria-expanded="${idx === 0 ? 'true' : 'false'}" aria-controls="panel-${s.id}" class="group flex w-full items-center justify-between gap-6 py-7 text-left cursor-pointer">
              <span class="flex items-baseline gap-5">
                <span class="font-mono text-xs font-medium" style="color:var(--${s.color})">${s.id}</span>
                <span class="font-display text-2xl leading-snug sm:text-[1.75rem] font-normal group-hover:text-accent transition-colors">${s.title}</span>
              </span>
              <span aria-hidden="true" class="service-expand-icon relative h-3 w-3 shrink-0 transition-transform duration-300 ${idx === 0 ? 'rotate-45' : ''}" style="color:var(--${s.color})">
                <span class="absolute top-1/2 left-0 h-0.5 w-3 rounded-full bg-current"></span>
                <span class="absolute top-0 left-1/2 h-3 w-0.5 rounded-full bg-current"></span>
              </span>
            </button>
          </h2>
          <div id="panel-${s.id}" data-service-panel="${s.id}" ${idx !== 0 ? 'hidden' : ''} class="max-w-2xl pb-8 lg:max-w-3xl space-y-6">
            <div>
              <p class="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full" style="background-color:var(--${s.color})"></span>
                Description
              </p>
              <p class="text-base leading-relaxed text-foreground/90 font-normal">
                ${s.desc}
              </p>
            </div>
            <div>
              <p class="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full" style="background-color:var(--${s.color})"></span>
                Scope of Services
              </p>
              <ul class="grid gap-2.5 sm:grid-cols-2 text-sm text-foreground/85 bg-secondary/35 p-4 sm:p-5 rounded-lg border border-border/50">
                ${(s.scope || []).map(item => `
                <li class="flex items-start gap-2.5">
                  <span class="mt-1 shrink-0 font-bold leading-none text-base" style="color:var(--${s.color})">•</span>
                  <span class="leading-snug">${item}</span>
                </li>`).join('')}
              </ul>
            </div>
            <div class="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-border/40">
              <a href="${relPath}book-call.html" class="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-accent uppercase hover:underline">
                Consult on ${s.title} →
              </a>
              <span class="font-mono text-xs text-muted-foreground">${(s.scope || []).length} key scopes covered</span>
            </div>
          </div>
        </section>
      </div>`).join('')}
    </div>
  </div>
  <div class="reveal relative mt-20 flex flex-col gap-6 overflow-hidden rounded-lg bg-gradient-to-r from-navy via-primary to-violet p-8 text-ivory shadow-lg sm:flex-row sm:items-center sm:justify-between lg:p-10" style="transition-delay:0ms">
    <div aria-hidden="true" class="pointer-events-none absolute -top-16 -right-10 h-48 w-48 rounded-full bg-coral/30 blur-3xl"></div>
    <div>
      <p class="eyebrow text-brass">YOUR NEXT MOVE</p>
      <h2 class="mt-2 relative max-w-xl font-display text-2xl sm:text-3xl leading-snug">Raising capital, restructuring, protecting your brand? Plan it with us.</h2>
      <p class="mt-2 text-sm text-ivory/80">Call our desk directly at <a href="tel:${PHONE_HREF}" class="underline font-medium text-brass">${PHONE_DISPLAY}</a></p>
    </div>
    <a href="${relPath}book-call.html" class="relative inline-flex shrink-0 rounded-md bg-brass px-7 py-3.5 text-xs tracking-wider text-navy uppercase shadow transition-opacity hover:opacity-85 font-semibold">
      Start the Conversation
    </a>
  </div>
</div>`;
}

// ==========================================
// 4. ARTICLES PAGE CONTENT
// ==========================================
function getArticlesContent(relPath = "") {
  return `<div class="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
  <div class="reveal">
    <p class="eyebrow flex items-center gap-3 text-muted-foreground">
      <span aria-hidden="true" class="h-px w-8 bg-accent"></span>Insights / Regulatory intelligence
    </p>
    <h1 class="mt-6 max-w-3xl text-4xl leading-[1.08] sm:text-5xl font-normal">
      Bulletins from the register.
    </h1>
    <p class="mt-4 text-base text-muted-foreground max-w-2xl">
      Timely legal, secretarial and compliance advisories tracking key notifications from MCA, RBI, SEBI, and regulatory boards.
    </p>
  </div>
  <div class="reveal mt-14" style="transition-delay:100ms">
    <article class="grid gap-8 border border-border bg-card p-8 lg:grid-cols-[1fr_0.8fr] lg:p-12 shadow-sm">
      <div>
        <p class="eyebrow text-accent">Featured Regulatory Bulletin</p>
        <h2 class="mt-5 text-3xl leading-tight sm:text-4xl font-normal">
          Annual Secretarial Compliance & Regulatory Filings Checklist
        </h2>
        <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
          A concise overview of statutory obligations for private limited companies, LLPs, and foreign-owned enterprises: Annual general meetings, statutory register maintenance, ROC MGT-7 and AOC-4 filings, DIN KYC verification, and MSME returns.
        </p>
        <div class="mt-6 flex items-center gap-4">
          <span class="rounded bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground">Corporate Governance</span>
          <span class="font-mono text-xs text-muted-foreground">FICOR Practice Bulletin</span>
        </div>
      </div>
      <div class="rounded border border-border/80 bg-secondary/30 p-6 flex flex-col justify-between">
        <div>
          <p class="eyebrow text-muted-foreground">Regulatory Notice Desk</p>
          <p class="mt-3 text-sm text-foreground/80 leading-relaxed">
            Need clarity on active regulatory circulars or an upcoming filing deadline? Direct your query to our compliance desk.
          </p>
        </div>
        <div class="mt-6">
          <a href="${relPath}book-call.html" class="inline-flex rounded bg-primary px-5 py-2.5 text-xs font-medium tracking-wider text-primary-foreground uppercase hover:bg-forest transition-colors">
            Consult on Compliance
          </a>
        </div>
      </div>
    </article>
  </div>
  <div class="reveal mt-14" style="transition-delay:160ms">
    <p class="eyebrow border-b border-border pb-3 text-muted-foreground">Key Practice Areas Covered</p>
    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded border border-border p-5 bg-card">
        <h4 class="font-medium text-foreground">Corporate Law & MCA</h4>
        <p class="mt-2 text-xs text-muted-foreground">Companies Act 2013 rules, board resolutions, annual filings, and compounding.</p>
      </div>
      <div class="rounded border border-border p-5 bg-card">
        <h4 class="font-medium text-foreground">FEMA & RBI Guidelines</h4>
        <p class="mt-2 text-xs text-muted-foreground">FDI regulations, FC-GPR/FC-TRS submissions, single master form, and external borrowing.</p>
      </div>
      <div class="rounded border border-border p-5 bg-card">
        <h4 class="font-medium text-foreground">NCLT Matters</h4>
        <p class="mt-2 text-xs text-muted-foreground">Corporate restructuring, scheme approvals, revival petitions, and member disputes.</p>
      </div>
      <div class="rounded border border-border p-5 bg-card">
        <h4 class="font-medium text-foreground">IP & Labour Compliance</h4>
        <p class="mt-2 text-xs text-muted-foreground">Trademark registration, copyright filings, EPF/ESI statutory returns, and POSH alignment.</p>
      </div>
    </div>
  </div>
  <div class="reveal mt-14 rounded-lg bg-gradient-to-r from-navy via-primary to-violet p-8 text-ivory sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
    <div>
      <p class="eyebrow text-brass">YOUR NEXT MOVE</p>
      <h3 class="mt-2 text-2xl sm:text-3xl font-display font-normal">Raising capital, restructuring, protecting your brand? Plan it with us.</h3>
      <p class="mt-2 text-sm text-ivory/80">Call our desk directly at <a href="tel:${PHONE_HREF}" class="text-brass underline font-medium">${PHONE_DISPLAY}</a></p>
    </div>
    <a href="${relPath}book-call.html" class="inline-flex shrink-0 rounded-md bg-brass px-7 py-3.5 text-xs font-semibold tracking-wider text-navy uppercase shadow-md transition-opacity hover:opacity-90">
      Start the Conversation
    </a>
  </div>
</div>`;
}

// ==========================================
// 5. CONTACT PAGE CONTENT (General Inquiries & Office)
// ==========================================
function getContactContent(relPath = "") {
  return `<div class="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
  <div class="reveal">
    <p class="eyebrow flex items-center gap-3 text-muted-foreground">
      <span aria-hidden="true" class="h-px w-8 bg-accent"></span>Contact Us
    </p>
    <h1 class="mt-6 max-w-3xl text-4xl leading-[1.08] sm:text-5xl font-normal">
      Get in touch with Ficor Advisors.
    </h1>
    <p class="mt-4 max-w-2xl text-base text-muted-foreground">
      Whether you need corporate filings, FEMA guidance, secretarial audits, or general inquiries, reach out to our team in Bengaluru.
    </p>
  </div>
  <div class="mt-16 contact-layout-grid">
    <div class="reveal" style="transition-delay:80ms">
      <!-- SUCCESS NOTICE -->
      <div id="contact-success" class="hidden border border-border bg-secondary/60 p-8 lg:p-10 rounded-xl space-y-5">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full bg-forest/15 px-3 py-1 font-mono text-xs text-forest font-medium">
            <span class="h-2 w-2 rounded-full bg-forest animate-pulse"></span>
            Enquiry Dispatched
          </div>
          <h3 class="mt-4 font-display text-2xl font-normal text-foreground">Thank you, <span id="contact-client-name"></span>.</h3>
          <p class="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Your inquiry has been compiled and routed directly to <strong class="text-foreground">${EMAIL}</strong> under reference <span id="contact-ref-code" class="font-mono font-medium text-foreground"></span>.
          </p>
        </div>

        <div class="p-4 rounded-lg bg-background/85 border border-border/70 space-y-3">
          <p class="text-xs text-muted-foreground">
            If your default email client did not open automatically, click below to send it with one click:
          </p>
          <div class="flex flex-wrap gap-3">
            <a id="contact-mailto-btn" href="mailto:${EMAIL}" class="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-semibold tracking-wider text-primary-foreground uppercase shadow transition-opacity hover:opacity-90">
              Open in Email App / Send to ${EMAIL} ✉️
            </a>
            <a id="contact-whatsapp-btn" href="https://wa.me/918147588559" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-md border border-input bg-card px-5 py-2.5 text-xs font-semibold tracking-wider text-foreground uppercase hover:bg-secondary transition-colors">
              Send via WhatsApp 💬
            </a>
          </div>
        </div>

        <div class="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 text-xs text-muted-foreground">
          <span>Need immediate assistance? Call <a href="tel:${PHONE_HREF}" class="underline text-foreground font-medium">${PHONE_DISPLAY}</a></span>
          <button type="button" id="reset-contact-btn" class="underline hover:text-foreground font-mono cursor-pointer">
            Send another enquiry
          </button>
        </div>
      </div>

      <!-- FORM -->
      <form id="contact-form" novalidate class="space-y-6">
        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <label for="name" class="eyebrow block text-muted-foreground">Name *</label>
            <div class="mt-2.5">
              <input id="name" name="name" autocomplete="name" required class="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" placeholder="Your full name"/>
            </div>
            <p id="name-error" class="hidden mt-2 text-xs text-destructive"></p>
          </div>
          <div>
            <label for="email" class="eyebrow block text-muted-foreground">Email *</label>
            <div class="mt-2.5">
              <input id="email" name="email" type="email" autocomplete="email" required class="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" placeholder="name@company.com"/>
            </div>
            <p id="email-error" class="hidden mt-2 text-xs text-destructive"></p>
          </div>
          <div>
            <label for="phone" class="eyebrow block text-muted-foreground">Phone</label>
            <div class="mt-2.5">
              <input id="phone" name="phone" type="tel" autocomplete="tel" class="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" placeholder="e.g. +91 81475 88559"/>
            </div>
          </div>
          <div>
            <label for="topic" class="eyebrow block text-muted-foreground">Area of enquiry</label>
            <div class="mt-2.5">
              <select id="topic" name="topic" class="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent">
                <option value="">Select an area…</option>
                ${SERVICES.map(s => `<option value="${s.title}">${s.title}</option>`).join('')}
                <option value="General enquiry">General corporate enquiry</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <label for="message" class="eyebrow block text-muted-foreground">Message *</label>
          <div class="mt-2.5">
            <textarea id="message" name="message" rows="6" required class="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent resize-y" placeholder="Describe your corporate secretarial, filing or compliance requirements..."></textarea>
          </div>
          <p id="message-error" class="hidden mt-2 text-xs text-destructive"></p>
        </div>
        <p class="font-mono text-xs leading-relaxed text-muted-foreground">
          FICOR Advisors LLP safeguards all client submissions under strict professional confidentiality.
        </p>
        <div>
          <button type="submit" class="bg-primary px-8 py-4 text-xs tracking-wider text-primary-foreground uppercase transition-colors hover:bg-forest disabled:opacity-60 font-semibold rounded shadow-sm cursor-pointer">
            Send enquiry to ${EMAIL}
          </button>
          <p class="mt-2 text-xs text-muted-foreground">
            Submitting routes your enquiry directly to ${EMAIL} with an instant verification reference.
          </p>
        </div>
      </form>
    </div>

    <!-- CONTACT DETAILS SIDEBAR -->
    <div class="reveal" style="transition-delay:160ms">
      <dl class="divide-y divide-border border-y border-border">
        <div class="py-5">
          <dt class="eyebrow text-muted-foreground">Direct Phone</dt>
          <dd class="mt-2">
            <a href="tel:${PHONE_HREF}" class="text-lg font-medium underline decoration-accent decoration-1 underline-offset-4 hover:text-accent-foreground text-foreground">
              ${PHONE_DISPLAY}
            </a>
            <p class="mt-1 text-xs text-muted-foreground">Instant phone support during office hours</p>
          </dd>
        </div>
        <div class="py-5">
          <dt class="eyebrow text-muted-foreground">Email</dt>
          <dd class="mt-2">
            <a href="mailto:${EMAIL}" class="text-base underline decoration-accent decoration-1 underline-offset-4 hover:text-accent-foreground">
              ${EMAIL}
            </a>
          </dd>
        </div>
        <div class="py-5">
          <dt class="eyebrow text-muted-foreground">Office Address</dt>
          <dd class="mt-2">
            <address class="text-sm leading-relaxed text-muted-foreground not-italic">
              <span class="text-foreground font-medium">Ficor Advisors LLP</span><br/>
              ${ADDRESS_LINES.join('<br/>')}<br/>
            </address>
          </dd>
        </div>
        <div class="py-5">
          <dt class="eyebrow text-muted-foreground">Hours</dt>
          <dd class="mt-2 text-sm text-muted-foreground">${HOURS}</dd>
        </div>
      </dl>
      <div class="mt-8 p-6 rounded bg-card border border-border">
        <p class="text-sm font-medium text-foreground">Looking to schedule a dedicated call slot?</p>
        <p class="mt-1 text-xs text-muted-foreground">Choose a specific date and time for a 1-on-1 discussion with our senior consultants.</p>
        <a href="${relPath}book-call.html" class="mt-4 inline-block text-xs font-medium tracking-wide text-primary uppercase underline hover:text-forest">
          Go to Book a Call page →
        </a>
      </div>
    </div>
  </div>
</div>

<section aria-label="Office location" class="border-t border-border">
  <iframe title="Map showing the Ficor Advisors office in Padmanabha Nagar, Bengaluru" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Ficor%20Advisors%2C%2027%2F3%2C%20002%2C%20Satyadhana%2C%20Lakshmi%20Nivasa%20Apartment%2C%2022nd%20Main%2C%20Revenue%20Layout%2C%20Padmanabha%20Nagar%2C%20Bengaluru%20560070&output=embed" class="h-[380px] w-full border-0 grayscale-[35%] sm:h-[460px]"></iframe>
</section>`;
}

// ==========================================
// 6. BOOK A CALL PAGE CONTENT (Dedicated Scheduling & Direct Call)
// ==========================================
function getBookCallContent(relPath = "") {
  return `<div class="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
  <div class="reveal">
    <p class="eyebrow flex items-center gap-3 text-muted-foreground">
      <span aria-hidden="true" class="h-px w-8 bg-accent"></span>Direct Consultation
    </p>
    <h1 class="mt-6 max-w-3xl text-4xl leading-[1.08] sm:text-5xl font-normal">
      Book a consultation call.
    </h1>
    <p class="mt-4 max-w-2xl text-base text-muted-foreground">
      Speak directly with our senior corporate secretarial and regulatory advisors. Connect right away via our dedicated line or schedule a 1-on-1 telephone appointment below.
    </p>
  </div>

  <!-- DIRECT CALL HIGHLIGHT CARD -->
  <div class="reveal mt-12 overflow-hidden rounded-lg border-2 border-primary/20 bg-gradient-to-r from-navy via-primary/95 to-violet p-8 text-ivory shadow-lg" style="transition-delay:60ms">
    <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div class="space-y-2">
        <div class="inline-flex items-center gap-2 rounded-full bg-brass/20 px-3 py-1 text-xs font-mono text-brass">
          <span class="h-2 w-2 rounded-full bg-brass animate-pulse"></span>
          Direct Helpline Available Now
        </div>
        <h2 class="text-2xl sm:text-3xl font-display font-normal text-ivory">
          Prefer an immediate discussion?
        </h2>
        <p class="text-sm text-ivory/80 max-w-xl leading-relaxed">
          Call our office directly to speak with an advisor regarding urgent corporate filings, NCLT proceedings, or FEMA guidance.
        </p>
      </div>
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
        <div class="text-left sm:text-right">
          <p class="font-mono text-xs text-brass">DIRECT PHONE NUMBER</p>
          <a href="tel:${PHONE_HREF}" class="text-2xl sm:text-3xl font-display font-semibold text-ivory hover:text-brass transition-colors">
            ${PHONE_DISPLAY}
          </a>
          <p class="text-xs text-ivory/60">${HOURS}</p>
        </div>
        <a href="tel:${PHONE_HREF}" class="inline-flex items-center gap-2 rounded-md bg-brass px-7 py-3.5 text-xs font-semibold tracking-wider text-navy uppercase shadow-md transition-opacity hover:opacity-90">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          Call Now
        </a>
      </div>
    </div>
  </div>

  <div class="mt-16 contact-layout-grid">
    <div class="reveal" style="transition-delay:120ms">
      <h3 class="font-display text-2xl font-normal text-foreground">
        Schedule a Dedicated 1-on-1 Call
      </h3>
      <p class="mt-2 text-sm text-muted-foreground">
        Select your convenient date, time slot, and consultation area. An advisor will prepare the necessary regulatory context before calling you.
      </p>

      <!-- SUCCESS NOTICE -->
      <div id="book-call-success" class="hidden mt-8 border border-border bg-secondary/60 p-8 lg:p-10 rounded-xl space-y-5">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full bg-forest/15 px-3 py-1 font-mono text-xs text-forest font-medium">
            <span class="h-2 w-2 rounded-full bg-forest animate-pulse"></span>
            Call Consultation Scheduled
          </div>
          <h3 class="mt-4 font-display text-2xl font-normal text-foreground">Your consultation call has been scheduled.</h3>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
            Booking Reference: <span id="book-call-ref" class="font-mono font-medium text-foreground"></span>
          </p>
          <p id="book-call-summary" class="mt-2 text-sm text-foreground font-medium"></p>
        </div>

        <div class="p-4 rounded-lg bg-background/85 border border-border/70 space-y-3">
          <p class="text-xs text-muted-foreground">
            A confirmation has been routed to <strong class="text-foreground">${EMAIL}</strong>. Click below to verify or notify our desk directly:
          </p>
          <div class="flex flex-wrap gap-3">
            <a id="book-call-mailto-btn" href="mailto:${EMAIL}" class="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-semibold tracking-wider text-primary-foreground uppercase shadow transition-opacity hover:opacity-90">
              Notify Desk via Email (${EMAIL}) ✉️
            </a>
            <a id="book-call-whatsapp-btn" href="https://wa.me/918147588559" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-md border border-input bg-card px-5 py-2.5 text-xs font-semibold tracking-wider text-foreground uppercase hover:bg-secondary transition-colors">
              Notify via WhatsApp 💬
            </a>
          </div>
        </div>

        <div class="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 text-xs text-muted-foreground">
          <span>Need immediate assistance? Call <a href="tel:${PHONE_HREF}" class="underline text-foreground font-medium">${PHONE_DISPLAY}</a></span>
          <button type="button" id="reset-call-btn" class="underline hover:text-foreground font-mono cursor-pointer">
            Schedule another call
          </button>
        </div>
      </div>

      <!-- CALL BOOKING FORM -->
      <form id="book-call-form" novalidate class="mt-8 space-y-6">
        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <label for="call-name" class="eyebrow block text-muted-foreground">Your Name *</label>
            <div class="mt-2.5">
              <input id="call-name" name="call-name" required class="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" placeholder="e.g. Ramesh Kumar"/>
            </div>
            <p id="call-name-error" class="hidden mt-2 text-xs text-destructive"></p>
          </div>
          <div>
            <label for="call-phone" class="eyebrow block text-muted-foreground">Contact Number *</label>
            <div class="mt-2.5">
              <input id="call-phone" name="call-phone" type="tel" required class="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" placeholder="e.g. 8147588559"/>
            </div>
            <p id="call-phone-error" class="hidden mt-2 text-xs text-destructive"></p>
          </div>
          <div>
            <label for="call-email" class="eyebrow block text-muted-foreground">Work Email (optional)</label>
            <div class="mt-2.5">
              <input id="call-email" name="call-email" type="email" class="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" placeholder="name@company.in"/>
            </div>
          </div>
          <div>
            <label for="call-topic" class="eyebrow block text-muted-foreground">Consultation Topic</label>
            <div class="mt-2.5">
              <select id="call-topic" name="call-topic" class="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent">
                ${SERVICES.map(s => `<option value="${s.title}">${s.title}</option>`).join('')}
                <option value="General Secretarial Advisory">General Secretarial Advisory</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <label for="call-date" class="eyebrow block text-muted-foreground">Preferred Date *</label>
            <div class="mt-2.5">
              <input id="call-date" name="call-date" type="date" required class="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"/>
            </div>
            <p id="call-date-error" class="hidden mt-2 text-xs text-destructive"></p>
          </div>
          <div>
            <label for="call-time" class="eyebrow block text-muted-foreground">Preferred Time Slot *</label>
            <div class="mt-2.5">
              <select id="call-time" name="call-time" required class="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent">
                <option value="">Select a time slot…</option>
                <option value="Morning (10:00 AM – 1:00 PM IST)">Morning: 10:00 AM – 1:00 PM IST</option>
                <option value="Afternoon (2:00 PM – 5:00 PM IST)">Afternoon: 2:00 PM – 5:00 PM IST</option>
                <option value="Evening (5:00 PM – 6:30 PM IST)">Evening: 5:00 PM – 6:30 PM IST</option>
              </select>
            </div>
            <p id="call-time-error" class="hidden mt-2 text-xs text-destructive"></p>
          </div>
        </div>

        <div>
          <label for="call-notes" class="eyebrow block text-muted-foreground">Brief Notes on Your Requirements</label>
          <div class="mt-2.5">
            <textarea id="call-notes" name="call-notes" rows="4" class="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent resize-y" placeholder="Any specific questions, documents, or compliance notices to be addressed during the call..."></textarea>
          </div>
        </div>

        <div>
          <button type="submit" class="rounded-md bg-gradient-to-r from-primary to-violet px-8 py-4 text-xs font-semibold tracking-wider text-primary-foreground uppercase shadow-md transition-opacity hover:opacity-90 cursor-pointer">
            Confirm Call Booking & Route to ${EMAIL}
          </button>
          <p class="mt-2 text-xs text-muted-foreground">
            A confirmation notice is dispatched to ${EMAIL} to reserve your consultation slot.
          </p>
        </div>
      </form>
    </div>

    <div class="reveal" style="transition-delay:180ms">
      <div class="rounded-lg border border-border bg-card p-7 shadow-sm space-y-6">
        <div>
          <h4 class="font-display text-xl font-normal text-foreground">What to expect on your call</h4>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
            Our corporate secretarial consultations are practical, confidential, and solution-driven.
          </p>
        </div>
        <ul class="space-y-4 text-sm text-foreground/85">
          <li class="flex items-start gap-3">
            <span class="font-mono text-xs font-medium text-coral mt-0.5">01</span>
            <span>Direct discussion with an experienced corporate law and compliance specialist.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="font-mono text-xs font-medium text-violet mt-0.5">02</span>
            <span>Accurate statutory timelines, filing procedures, and procedural roadmaps.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="font-mono text-xs font-medium text-forest mt-0.5">03</span>
            <span>Clear fee transparency and actionable next steps without regulatory jargon.</span>
          </li>
        </ul>
        <div class="border-t border-border pt-6 space-y-3">
          <p class="eyebrow text-muted-foreground">Practice Location</p>
          <p class="text-sm text-foreground">
            Ficor Advisors LLP<br/>
            ${ADDRESS_LINES.join('<br/>')}
          </p>
          <p class="text-xs text-muted-foreground">
            Looking for written enquiries? <a href="${relPath}contact.html" class="text-primary underline hover:text-forest">Visit Contact Page</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

// ==========================================
// RUN GENERATION
// ==========================================
const pages = [
  {
    filename: 'index.html',
    title: 'Ficor Advisors — Corporate Secretarial & 360° Compliance Practice',
    desc: 'Secretarial, legal and compliance work that keeps a company in good standing — audits, restructuring, capital markets, GST, IPR and start-up compliance.',
    contentFn: getHomeContent,
    active: 'home'
  },
  {
    filename: 'about.html',
    title: 'About the Practice — FICOR Advisors LLP',
    desc: 'Vision, mission, principle and approach of FICOR Advisors LLP, providing 360° compliance support and corporate secretarial advisory since 2012.',
    contentFn: getAboutContent,
    active: 'about'
  },
  {
    filename: 'services.html',
    title: 'Services Directory — FICOR Advisors LLP',
    desc: 'Eight practice areas covering secretarial, legal, FEMA, NCLT, and 360° compliance work for companies across India.',
    contentFn: getServicesContent,
    active: 'services'
  },
  {
    filename: 'articles.html',
    title: 'Regulatory Bulletins & Insights — FICOR Advisors LLP',
    desc: 'Regulatory intelligence and compliance bulletins from FICOR Advisors LLP, a corporate secretarial practice in Bengaluru.',
    contentFn: getArticlesContent,
    active: 'articles'
  },
  {
    filename: 'contact.html',
    title: 'Contact Us — FICOR Advisors LLP, Bengaluru',
    desc: `Reach FICOR Advisors LLP in Bengaluru: ${EMAIL}, ${PHONE_DISPLAY}, ${HOURS}. Office in Padmanabha Nagar.`,
    contentFn: getContactContent,
    active: 'contact'
  },
  {
    filename: 'book-call.html',
    title: 'Book a Call — FICOR Advisors LLP',
    desc: `Schedule a 1-on-1 consultation or call FICOR Advisors directly at ${PHONE_DISPLAY}. Direct assistance for corporate compliance.`,
    contentFn: getBookCallContent,
    active: 'book-call'
  }
];

// Generate root pages
for (const page of pages) {
  const html = wrapHtml(page.title, page.desc, page.contentFn(""), page.active, "");
  fs.writeFileSync(page.filename, html);
  console.log(`Generated root page: ${page.filename}`);
}

// Generate directory mirrors for clean URLs
const dirMap = [
  { dir: 'about', page: pages[1] },
  { dir: 'services', page: pages[2] },
  { dir: 'articles', page: pages[3] },
  { dir: 'contact', page: pages[4] },
  { dir: 'book-call', page: pages[5] }
];

for (const item of dirMap) {
  if (!fs.existsSync(item.dir)) {
    fs.mkdirSync(item.dir, { recursive: true });
  }
  const html = wrapHtml(item.page.title, item.page.desc, item.page.contentFn("../"), item.page.active, "../");
  fs.writeFileSync(path.join(item.dir, 'index.html'), html);
  console.log(`Generated clean URL mirror: ${item.dir}/index.html`);
}

console.log('All pages generated successfully!');
