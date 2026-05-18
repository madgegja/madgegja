#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const OUT_HTML = '/Claude/personal/madgegja/docs/_build_pdf/portfolio.html';

const IMG = {
  dashboardDetail: '/tmp/live_caps/dashboard_ai_draft_20260506.png',
  dashboardOverview: '/tmp/live_caps/dashboard_main_20260506.png',
  dashboardFull: '/tmp/live_caps/dashboard_full_20260506.png',
  translateSearch: '/tmp/live_caps/translate_search_20260506.png',
  translateMain: '/tmp/live_caps/translate_main_20260506.png',
  bizopsPortalLive: '/tmp/live_caps/bizops_portal_local_20260506.png',
  // Legacy 2026-03 archives (kept for reference)
  dashboardDetailLegacy: '/Claude/portfolio/assets/screenshots/dashboard_detail.png',
  bizopsPortal: '/Claude/portfolio/assets/screenshots/bizops_portal.png',
  nexus: '/Claude/portfolio/assets/nexus-screenshot.png',
  csFlow: '/tmp/diagrams/cs_flow_diagram_20260219.png',
  chargebackFlow: '/tmp/diagrams/chargeback_flow_diagram_20260220.png',
  csInfographic: '/tmp/diagrams/cs_infographic_20260220.png',
  csL1L2L3: '/tmp/diagrams/cs_l1_l2_l3_analysis_20260225.png',
  csMonthly: '/tmp/diagrams/cs_monthly_analysis_202603.png',
  chargebackManual: '/tmp/diagrams/chargeback_operation_manual_20260304.png',
  aiCsRoadmap: '/tmp/diagrams/ai_cs_integration_roadmap_presentation_20260307.png',
  multilingualRagAudit: '/tmp/diagrams/multilingual-rag-audit.png',
  l3AutoResponse: '/tmp/diagrams/l3_auto_response_engine_20260310.png',
  archCsAiDashboard: '/tmp/diagrams/arch_cs_ai_dashboard.png',
  archBizopsToolkit: '/tmp/diagrams/arch_bizops_toolkit.png',
  archVocLoop: '/tmp/diagrams/arch_voc_loop.png',
  archPhaseRoadmap: '/tmp/diagrams/arch_phase_roadmap.png',
};

// ─── External config loader (per-target) ────────────────────────
const CONFIG_NAME = process.argv[2] || 'socar';
const cfgFn = require('./data/' + CONFIG_NAME + '.config.js');
const cfg = cfgFn(IMG);

const toDataURL = (p) => {
  if (!p || !fs.existsSync(p)) return null;
  const ext = path.extname(p).slice(1).toLowerCase();
  const mime = ext === 'svg' ? 'image/svg+xml' : `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  return `data:${mime};base64,${fs.readFileSync(p).toString('base64')}`;
};

// ─── Project data — 한글 본문, 코드/기술 키워드만 영문 ─────────────
const projects = cfg.projects;

// ─── Render helpers ──────────────────────────────────────────────
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const statusChip = (s) => {
  const map = {
    Production: 'st-prod',
    Live: 'st-live',
    AI: 'st-ai',
    Archived: 'st-arc',
    Analytics: 'st-an',
    Execution: 'st-exec',
    DevOps: 'st-devops',
    Expertise: 'st-exp',
    Output: 'st-out',
    'NEW BIZ': 'st-newbiz',
    Blockchain: 'st-bc',
    'B2B Partner CX': 'st-cx',
  };
  const cls = map[s] || 'st-default';
  return `<span class="status ${cls}">${esc(s)}</span>`;
};

const stackChip = (s) => `<span class="stack-chip">${esc(s)}</span>`;

const imgEl = (src, caption, cls = 'card-img') => {
  const data = toDataURL(src);
  if (!data) return '';
  return `
    <figure class="${cls}">
      <img src="${data}" alt="" />
      ${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}
    </figure>`;
};

const renderHero = (p) => `
<section class="proj-hero">
  <div class="proj-num-row">
    <span class="proj-flag">플래그십 · 프로덕션 CS AI</span>
    <span class="proj-period">2024 ~ 현재</span>
  </div>
  <h2 class="proj-name">${esc(p.name)}</h2>
  <div class="proj-statuses">${p.statuses.map(statusChip).join('')}</div>
  ${p.url ? `<div class="proj-url"><a href="${esc(p.url)}">${esc(p.url)}</a></div>` : ''}
  <p class="proj-desc">${esc(p.description)}</p>
  ${imgEl(p.image, p.imageCaption, 'hero-img')}
  <div class="hero-stat">
    <div class="hero-val">${esc(p.metric.value)}</div>
    <div class="hero-lbl">${esc(p.metric.label)}</div>
  </div>
  <div class="psr">
    <div class="psr-block psr-problem"><div class="psr-tag">문제</div><p>${esc(p.problem)}</p></div>
    <div class="psr-block psr-strategy"><div class="psr-tag">전략</div><p>${esc(p.strategy)}</p></div>
    <div class="psr-block psr-result"><div class="psr-tag">성과</div><p>${esc(p.results)}</p></div>
  </div>
  <div class="proj-feats">
    <div class="feat-tag">핵심 기능</div>
    <div class="feat-list">${p.features.map((f) => `<span class="feat">${esc(f)}</span>`).join('')}</div>
  </div>
  <div class="proj-stack">
    <div class="stack-tag">기술 스택</div>
    <div class="stack-list">${p.stack.map(stackChip).join('')}</div>
  </div>
  <div class="proj-foot">
    <div class="pf-row"><span class="pf-k">단계</span><span class="pf-v">Phase 1 · Draft + Review (운영 중) · Phase 2 L3 자동 응답 설계 중</span></div>
    <div class="pf-row"><span class="pf-k">범위</span><span class="pf-v">9개 마켓 · 10개 언어 · 12 패턴 스팸 · 6차원 품질</span></div>
    <div class="pf-row"><span class="pf-k">기술 깊이</span><span class="pf-v">FastAPI 백엔드 · Vanilla JS SPA · JWT 인증 · Zendesk-native UX</span></div>
  </div>
</section>
`;

const renderCompact = (p) => `
<section class="proj-card${p.image ? ' has-img' : ''}">
  ${p.image ? imgEl(p.image, p.imageCaption, 'card-img-band') : ''}
  <div class="card-inner">
    <div class="card-head">
      <div class="card-name-row">
        <h3 class="card-name">${esc(p.name)}</h3>
        <div class="card-statuses">${p.statuses.map(statusChip).join('')}</div>
      </div>
      ${p.url ? `<div class="card-url"><a href="${esc(p.url)}">${esc(p.url)}</a></div>` : ''}
    </div>
    <p class="card-desc">${esc(p.description)}</p>
    <div class="card-metric">
      <span class="card-mval">${esc(p.metric.value)}</span>
      <span class="card-mlbl">${esc(p.metric.label)}</span>
    </div>
    <div class="card-psr">
      <div class="cps cps-problem"><span class="cps-tag">문제</span><span class="cps-txt">${esc(p.problem)}</span></div>
      <div class="cps cps-strategy"><span class="cps-tag">전략</span><span class="cps-txt">${esc(p.strategy)}</span></div>
      <div class="cps cps-result"><span class="cps-tag">성과</span><span class="cps-txt">${esc(p.results)}</span></div>
    </div>
    <div class="card-foot">
      <div class="card-feats-tag">핵심 기능</div>
      <div class="card-feats">${p.features.map((f) => `<span class="feat-mini">${esc(f)}</span>`).join('')}</div>
      <div class="card-stack-tag">스택</div>
      <div class="card-stack">${p.stack.map(stackChip).join('')}</div>
    </div>
  </div>
</section>
`;

const cover = `
<section class="cover">
  <div class="cover-mark">프로젝트 포트폴리오 · CS 운영</div>
  <h1 class="cover-name">유종선<br><span class="cover-name-en">CHONGSUN YU</span></h1>
  <div class="cover-quote">"내가 만드는 AI 시스템은 구조적 문제를<br>끝까지 해결한다 — 직무라서가 아니라,<br>문제가 거기 있고 다른 누구도 풀지 않을 것이기 때문이다."</div>
  <div class="cover-tag">직접 만드는 PM × 프로덕트 오너</div>

  <div class="cover-stats">
    <div class="cover-stat"><span class="cs-v">12</span><span class="cs-l">CS · CX · 운영 (년)</span></div>
    <div class="cover-stat"><span class="cs-v">10</span><span class="cs-l">해외 마켓</span></div>
    <div class="cover-stat"><span class="cs-v">11</span><span class="cs-l">프로젝트</span></div>
    <div class="cover-stat"><span class="cs-v">13K+</span><span class="cs-l">분석 티켓</span></div>
  </div>

  <div class="cover-projects">
    <div class="cp-tag">주요 CS / CX 프로젝트 · 라이브</div>
    <div class="cp-grid">
      <div class="cp-item"><span class="cp-num">01</span><span class="cp-name">cs-ai-dashboard</span><span class="cp-desc">프로덕션 CS AI 대시보드 · Claude SDK · 9-마켓 RAG · 1,422 테스트</span></div>
      <div class="cp-item"><span class="cp-num">02</span><span class="cp-name">cs-ai-chatbot</span><span class="cp-desc">하이브리드 AI 챗봇 · 7×32 의도 · 9 Red Flag 사기 탐지</span></div>
      <div class="cp-item"><span class="cp-num">03</span><span class="cp-name">ai-translate</span><span class="cp-desc">폐쇄망 CS 번역 DB · FTS5 · 25,070 용어 · 10개 언어</span></div>
      <div class="cp-item"><span class="cp-num">04</span><span class="cp-name">global-cs-analytics</span><span class="cp-desc">9단계 필터링 · 4단계 분류 · 13,400+ 티켓</span></div>
      <div class="cp-item"><span class="cp-num">05</span><span class="cp-name">bizops-automation-toolkit</span><span class="cp-desc">CS 리포팅 2일 → 1시간 · 4 플랫폼 API 통합</span></div>
      <div class="cp-item"><span class="cp-num">06</span><span class="cp-name">CS_claw</span><span class="cp-desc">Telegram CS 운영 어시스턴트 · 15 NLP 패턴 · Claude Opus + Vision</span></div>
    </div>
  </div>

  <div class="cover-meta">
    <div class="cover-row"><span class="cover-k">지원</span><span class="cover-v">고객서비스 운영기획 매니저, 쏘카 (SOCAR)</span></div>
    <div class="cover-row"><span class="cover-k">역량</span><span class="cover-v">CS 운영기획 · VOC 분석 · AI 자동화 · 다국가 운영 · QA</span></div>
    <div class="cover-row"><span class="cover-k">운영 사이트</span><span class="cover-v">cs-dashboard.duckdns.org · cs-translate.duckdns.org · tg-bizops.github.io</span></div>
  </div>

  <div class="cover-foot">
    <div class="cover-contact">+82-10-4167-0856 · madgegja@gmail.com · csy-p.com · github.com/madgegja</div>
    <div class="cover-date">2026.05</div>
  </div>
</section>
`;

const summary = `
<section class="summary-page">
  <h2 class="sec-title">커리어 타임라인</h2>
  <div class="timeline">
    <div class="tl-item"><div class="tl-period">2024.06 — 현재</div><div class="tl-role">팀장, BizOps팀 (6명)</div><div class="tl-co">투믹스글로벌, 서울</div><div class="tl-focus">다국어 CS 운영 · VOC 분석 · AI 자동화 · QA · IP 보호</div></div>
    <div class="tl-item"><div class="tl-period">2022.01 — 2023.11</div><div class="tl-role">파트장, B2B 파트너 CX</div><div class="tl-co">엔엑스쓰리게임즈, 서울</div><div class="tl-focus">B2B PSP 파트너 온보딩 · 멀티채널 결제 CX · 투자 유치</div></div>
    <div class="tl-item"><div class="tl-period">2019.11 — 2021.12</div><div class="tl-role">파트장, 글로벌 가맹점 운영</div><div class="tl-co">NHN KCP, 서울</div><div class="tl-focus">B2B 가맹점 CX · 크로스보더 분쟁 운영 · Critical Incident 대응</div></div>
    <div class="tl-item"><div class="tl-period">2015.06 — 2019.11</div><div class="tl-role">IT Director / 팀장</div><div class="tl-co">Treepay Co., Ltd., 방콕</div><div class="tl-focus">현지 가맹점 CS · 규제 CS · 3사 JV 이해관계자 운영</div></div>
    <div class="tl-item"><div class="tl-period">2014.10 — 2015.06</div><div class="tl-role">어카운트 매니저, 글로벌 가맹점 운영</div><div class="tl-co">NHN KCP, 서울</div><div class="tl-focus">Cybersource FDS · 가맹점 거절률 최적화 · 8배 성공률</div></div>
  </div>

  <h2 class="sec-title sec-title-2">도메인 전문성 · CS / CX</h2>
  <div class="bars">
    <div class="bar"><div class="bar-l">CS / CX 운영·분석</div><div class="bar-track"><div class="bar-fill" style="width:95%"></div></div><div class="bar-v">95%</div></div>
    <div class="bar"><div class="bar-l">B2B 가맹점 / 파트너 CX</div><div class="bar-track"><div class="bar-fill" style="width:92%"></div></div><div class="bar-v">92%</div></div>
    <div class="bar"><div class="bar-l">CS용 AI 자동화 (Claude · RAG)</div><div class="bar-track"><div class="bar-fill" style="width:90%"></div></div><div class="bar-v">90%</div></div>
    <div class="bar"><div class="bar-l">사기 탐지 & 차지백 CS</div><div class="bar-track"><div class="bar-fill" style="width:88%"></div></div><div class="bar-v">88%</div></div>
    <div class="bar"><div class="bar-l">CS 워크플로우 / QA 자동화</div><div class="bar-track"><div class="bar-fill" style="width:85%"></div></div><div class="bar-v">85%</div></div>
  </div>

  <h2 class="sec-title sec-title-2">도구</h2>
  <div class="tools-list">
    ${['Zendesk', 'Confluence', 'Jira', 'Slack', 'Claude API', 'Python', 'pandas', 'FastAPI', 'GitHub', 'Google Sheets', 'TypeScript', 'Next.js', 'shadcn/ui', 'JavaScript', 'HTML5', 'CSS3', 'Chart.js', 'Plotly', 'SQLite', 'JWT'].map(stackChip).join('')}
  </div>

  <div class="contact-box">
    <div class="cb-row"><span class="cb-k">이메일</span><span class="cb-v">madgegja@gmail.com</span></div>
    <div class="cb-row"><span class="cb-k">사이트</span><span class="cb-v"><a href="https://csy-p.com">csy-p.com</a></span></div>
    <div class="cb-row"><span class="cb-k">GitHub</span><span class="cb-v"><a href="https://github.com/madgegja">github.com/madgegja</a></span></div>
    <div class="cb-row"><span class="cb-k">LinkedIn</span><span class="cb-v"><a href="https://www.linkedin.com/in/chongsun-yu-67aa84138/">linkedin.com/in/chongsun-yu-67aa84138</a></span></div>
    <div class="cb-row"><span class="cb-k">전화</span><span class="cb-v">+82-10-4167-0856</span></div>
  </div>

  <div class="sum-foot">
    <span>유종선 CHONGSUN YU · CS 운영 프로젝트 포트폴리오</span>
    <span>호주국립대 (ANU) · 경영학 학사 (재무 전공) · 2007–2012</span>
  </div>
</section>
`;

// ─── Architecture Page (csy-p tone) ────────────────────────────
const archDiagrams = cfg.archDiagrams;

const renderArch = () => `
<section class="arch">
  <div class="arch-head">
    <span class="arch-mark">SYSTEM ARCHITECTURE · 직접 설계한 운영 구성도</span>
    <h2 class="arch-title">시스템 구성도 4선</h2>
    <p class="arch-sub">CS 운영기획·자동화 빌드 과정에서 직접 그린 시스템 구성도. csy-p.com 포트폴리오 톤(다크 네이비 + 일렉트릭 블루)으로 통일. 각 다이어그램은 운영 가능한 실제 파이프라인 / 사이클 / 모듈 구성을 1:1로 반영.</p>
  </div>
  <div class="arch-stack">
    ${archDiagrams.map((d) => {
      const data = toDataURL(d.src);
      return `
      <figure class="arch-item">
        <div class="arch-img">${data ? `<img src="${data}" alt="" />` : ''}</div>
        <figcaption>
          <div class="arch-cap-title">${esc(d.title)}</div>
          <div class="arch-cap-sub">${esc(d.sub)}</div>
        </figcaption>
      </figure>`;
    }).join('')}
  </div>
</section>
`;

// ─── Diagram Gallery ────────────────────────────────────────────
const galleryItems = cfg.galleryItems;

const renderGallery = () => `
<section class="gallery">
  <div class="gallery-head">
    <span class="gallery-mark">CS 운영 다이어그램 · 설계 산출물</span>
    <h2 class="gallery-title">설계·분석·문서화 6선</h2>
    <p class="gallery-sub">투믹스글로벌 BizOps팀에서 직접 작성·발행한 CS 운영 다이어그램·분석 보고서·시스템 설계서. 모두 GitHub Pages 포털 (<a href="https://tg-bizops.github.io/BizOPS/">tg-bizops.github.io/BizOPS/</a>) 에 공개.</p>
  </div>
  <div class="gallery-grid">
    ${galleryItems.map((g) => {
      const data = toDataURL(g.src);
      return `
      <figure class="gal-item">
        <div class="gal-img">${data ? `<img src="${data}" alt="" />` : ''}</div>
        <figcaption>
          <div class="gal-title">${esc(g.title)}</div>
          <div class="gal-sub">${esc(g.sub)}</div>
          <div class="gal-file"><code>${esc(g.file)}.html</code></div>
        </figcaption>
      </figure>`;
    }).join('')}
  </div>
</section>
`;

// ─── Pagination ─────────────────────────────────────────────────
const heroProj = projects.find((p) => p.key === cfg.hero) || projects[0];
const others = projects.filter((p) => p.key !== heroProj.key);
const pairs = [];
for (let i = 0; i < others.length; i += 2) pairs.push(others.slice(i, i + 2));

// helper: stamp every page with a page-footer (page n / total)
let __pgIdx = 0;
let __totalPages = 0;
const pgFoot = (label) =>
  `<div class="pg-foot"><span class="pg-tag">${label}</span><span class="pg-num"><span class="pg-cur">__N__</span> / <span class="pg-tot">__T__</span></span></div>`;

const wrapPage = (cls, body, label) =>
  `<div class="page ${cls}">${body}${pgFoot(label)}</div>`;

const pagesArr = [
  wrapPage('page-cover', cover, 'COVER'),
  wrapPage('page-hero', renderHero(heroProj), `FLAGSHIP · ${heroProj.name}`),
  wrapPage('page-arch', renderArch(), 'SYSTEM ARCHITECTURE'),
  wrapPage('page-gallery', renderGallery(), 'OPERATING ARTIFACTS · 산출물'),
  ...pairs.map((pair) =>
    wrapPage('page-pair', `<div class="pair-grid">${pair.map(renderCompact).join('')}</div>`, `PROJECTS · ${pair.map((p) => p.name).join(' · ')}`)
  ),
  wrapPage('page-sum', summary, 'CAREER · SKILLS · CONTACT'),
];

// ─── CSS ────────────────────────────────────────────────────────
const css = `
:root{
  --near-black:#141413;
  --terracotta:#c96442;
  --coral:#d97757;
  --moss:#6b7755;
  --parchment:#f5f4ed;
  --ivory:#faf9f5;
  --sand:#e8e6dc;
  --charcoal:#4d4c48;
  --olive:#5e5d59;
  --stone:#87867f;
  --dim:#a8a69e;
  --border-cream:#f0eee6;
  --border-warm:#e8e6dc;
  --ring-warm:#d1cfc5;
}

*{box-sizing:border-box}
html,body{margin:0;padding:0}

/* font stacks */
:root{
  --ff-serif:'Source Serif 4','Source Serif Pro','Iowan Old Style','Palatino','Noto Serif CJK KR','Georgia',serif;
  --ff-sans:'Inter','SF Pro Text','Helvetica Neue','Noto Sans CJK KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif;
  --ff-mono:'JetBrains Mono','SF Mono','Menlo','Noto Sans CJK KR',monospace;
  --ff-display:'Source Serif 4','Iowan Old Style','Palatino','Noto Serif CJK KR',serif;
}

body{
  font-family:var(--ff-serif);
  background:var(--parchment);
  color:var(--near-black);
  font-size:9.6pt;
  line-height:1.55;
  -webkit-font-smoothing:antialiased;
  letter-spacing:-0.008em;
  word-break:keep-all;
}
a{color:var(--terracotta);text-decoration:none}
a:hover{text-decoration:underline}

.page{
  width:210mm;
  height:297mm;
  margin:0 auto;
  padding:16mm 16mm 13mm;
  background:var(--parchment);
  page-break-after:always;
  position:relative;
  overflow:hidden;
}
.page:last-child{page-break-after:auto}

/* ─── COVER ─────────────────────────────────────── */
.page-cover{padding:0}
.cover{
  height:100%;
  padding:25mm 18mm 13mm;
  display:flex;
  flex-direction:column;
}
.cover-mark{
  font-family:var(--ff-sans);
  font-size:9.4pt;
  letter-spacing:0.22em;
  color:var(--terracotta);
  font-weight:600;
  margin-bottom:8mm;
}
.cover-name{
  font-family:var(--ff-display);
  font-weight:600;
  font-size:42pt;
  line-height:1.04;
  letter-spacing:-0.022em;
  margin:0 0 6pt;
  color:var(--near-black);
}
.cover-name-en{
  font-weight:400;
  color:var(--charcoal);
  font-size:30pt;
  font-family:var(--ff-display);
}
.cover-quote{
  font-family:var(--ff-serif);
  font-size:13pt;
  font-style:italic;
  color:var(--charcoal);
  line-height:1.50;
  margin-top:10mm;
  letter-spacing:-0.008em;
  max-width:140mm;
}
.cover-tag{
  font-family:var(--ff-sans);
  font-size:10pt;
  color:var(--terracotta);
  letter-spacing:0.10em;
  margin-top:6mm;
  font-weight:600;
}
.cover-stats{
  display:flex;
  justify-content:space-between;
  margin-top:14mm;
  padding:6mm 0;
  border-top:1px solid var(--border-warm);
  border-bottom:1px solid var(--border-warm);
  max-width:160mm;
}
.cover-stat{display:flex;flex-direction:column;align-items:flex-start}
.cs-v{
  font-family:var(--ff-serif);
  font-weight:600;
  font-size:30pt;
  color:var(--terracotta);
  line-height:1;
  letter-spacing:-0.020em;
}
.cs-l{
  font-family:var(--ff-sans);
  font-size:7.6pt;
  letter-spacing:0.06em;
  color:var(--olive);
  margin-top:4pt;
}
.cover-projects{margin-top:9mm}
.cp-tag{
  font-family:var(--ff-sans);
  font-size:8pt;
  letter-spacing:0.10em;
  font-weight:600;
  color:var(--terracotta);
  margin-bottom:5pt;
}
.cp-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:3pt 18pt;
}
.cp-item{
  display:grid;
  grid-template-columns:8mm 36mm 1fr;
  gap:5pt;
  padding:3pt 0;
  border-bottom:1px dotted var(--border-warm);
  align-items:baseline;
}
.cp-num{
  font-family:var(--ff-sans);
  font-size:7.6pt;
  color:var(--terracotta);
  font-weight:600;
  letter-spacing:0.10em;
}
.cp-name{
  font-family:var(--ff-mono);
  font-size:8.2pt;
  color:var(--near-black);
  font-weight:500;
}
.cp-desc{
  font-family:var(--ff-sans);
  font-size:7.6pt;
  color:var(--olive);
  letter-spacing:0;
  line-height:1.40;
}
.cover-meta{margin-top:auto;margin-bottom:5mm}
.cover-row{display:flex;align-items:baseline;margin-bottom:4pt;font-size:9.8pt}
.cover-k{
  font-family:var(--ff-sans);
  font-size:8.4pt;
  letter-spacing:0.06em;
  color:var(--terracotta);
  font-weight:600;
  width:22mm;
  flex-shrink:0;
}
.cover-v{color:var(--near-black);font-size:10pt}
.cover-foot{
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  font-family:var(--ff-sans);
  font-size:8.2pt;
  color:var(--olive);
  border-top:1px solid var(--border-warm);
  padding-top:4mm;
  letter-spacing:0;
}
.cover-date{color:var(--terracotta);font-weight:600;letter-spacing:0.14em}

/* ─── HERO ──────────────────────────────────────── */
.page-hero{padding:14mm 14mm 10mm}
.proj-hero{display:flex;flex-direction:column}
.proj-num-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4pt}
.proj-flag{
  font-family:var(--ff-sans);
  font-size:8.2pt;
  letter-spacing:0.16em;
  color:var(--terracotta);
  font-weight:600;
}
.proj-period{
  font-family:var(--ff-sans);
  font-size:8.2pt;
  color:var(--olive);
  letter-spacing:0.04em;
}
.proj-name{
  font-family:var(--ff-serif);
  font-weight:600;
  font-size:26pt;
  line-height:1.10;
  margin:0 0 5pt;
  color:var(--near-black);
  letter-spacing:-0.018em;
}
.proj-statuses{display:flex;gap:4pt;flex-wrap:wrap;margin-bottom:4pt}
.proj-url{
  font-family:var(--ff-mono);
  font-size:8.6pt;
  margin-bottom:5pt;
}
.proj-desc{
  font-family:var(--ff-serif);
  font-size:10.4pt;
  line-height:1.55;
  color:var(--charcoal);
  margin:5pt 0 8pt;
  letter-spacing:-0.005em;
}

.hero-img{
  margin:4pt 0 9pt;
  padding:0;
  border:1px solid var(--ring-warm);
  border-radius:3pt;
  background:#fff;
  overflow:hidden;
  box-shadow:0 2pt 6pt rgba(0,0,0,0.04);
}
.hero-img img{
  display:block;
  width:100%;
  height:auto;
  max-height:78mm;
  object-fit:cover;
  object-position:top center;
}
.hero-img figcaption{
  font-family:var(--ff-sans);
  font-size:7.8pt;
  color:var(--olive);
  padding:4pt 9pt;
  border-top:1px solid var(--border-warm);
  background:var(--ivory);
  letter-spacing:0;
  line-height:1.40;
}

.hero-stat{
  display:flex;
  align-items:baseline;
  gap:14pt;
  margin:0 0 10pt;
  padding:9pt 14pt;
  background:linear-gradient(90deg, var(--ivory) 0%, var(--parchment) 100%);
  border-left:3.5pt solid var(--terracotta);
  border-radius:2pt;
}
.hero-val{
  font-family:var(--ff-serif);
  font-weight:600;
  font-size:32pt;
  line-height:1;
  color:var(--terracotta);
  letter-spacing:-0.022em;
}
.hero-lbl{
  font-family:var(--ff-sans);
  font-size:10.5pt;
  color:var(--charcoal);
  line-height:1.3;
  letter-spacing:0;
}

.psr{display:flex;flex-direction:column;gap:7pt;margin-bottom:9pt}
.psr-block{border-left:2.5pt solid var(--ring-warm);padding:1pt 0 1pt 11pt}
.psr-problem{border-left-color:var(--terracotta)}
.psr-strategy{border-left-color:var(--coral)}
.psr-result{border-left-color:var(--moss)}
.psr-tag{
  font-family:var(--ff-sans);
  font-size:8.6pt;
  letter-spacing:0.08em;
  font-weight:700;
  margin-bottom:1pt;
}
.psr-problem .psr-tag{color:var(--terracotta)}
.psr-strategy .psr-tag{color:var(--coral)}
.psr-result .psr-tag{color:var(--moss)}
.psr p{margin:0;font-size:9.6pt;line-height:1.50;color:var(--near-black)}

.proj-feats,.proj-stack{margin-top:6pt}
.feat-tag,.stack-tag{
  font-family:var(--ff-sans);
  font-size:7.8pt;
  letter-spacing:0.10em;
  font-weight:600;
  color:var(--stone);
  margin-bottom:3pt;
}
.feat-list{display:flex;flex-wrap:wrap;gap:3pt}
.feat{
  display:inline-block;
  font-family:var(--ff-sans);
  font-size:8.2pt;
  padding:2.5pt 7pt;
  background:var(--ivory);
  border:1px solid var(--ring-warm);
  border-radius:3pt;
  color:var(--charcoal);
}
.stack-list{display:flex;flex-wrap:wrap;gap:3pt}
.stack-chip{
  display:inline-block;
  font-family:var(--ff-mono);
  font-size:7.6pt;
  padding:2pt 6pt;
  background:transparent;
  border:1px solid var(--border-warm);
  border-radius:2pt;
  color:var(--olive);
}

.proj-foot{
  margin-top:7pt;
  padding:6pt 12pt;
  border-left:2.5pt solid var(--moss);
  background:rgba(107,119,85,0.04);
  border-radius:2pt;
}
.pf-row{display:flex;align-items:baseline;font-size:9pt;margin-bottom:2pt}
.pf-row:last-child{margin-bottom:0}
.pf-k{
  font-family:var(--ff-sans);
  font-size:7.8pt;
  letter-spacing:0.06em;
  color:var(--moss);
  font-weight:600;
  width:22mm;
  flex-shrink:0;
}
.pf-v{color:var(--near-black)}

/* ─── STATUS CHIPS ────────────────────────────────── */
.status{
  display:inline-block;
  font-family:var(--ff-sans);
  font-size:7.2pt;
  font-weight:600;
  padding:1.8pt 6pt;
  border-radius:2.5pt;
  letter-spacing:0.05em;
  text-transform:uppercase;
}
.st-prod{background:var(--terracotta);color:#fff}
.st-live{background:var(--moss);color:#fff}
.st-ai{background:#3d3d3a;color:#faf9f5}
.st-arc{background:var(--sand);color:var(--charcoal)}
.st-an{background:var(--ivory);color:var(--terracotta);border:1px solid var(--terracotta)}
.st-exec{background:var(--ivory);color:var(--coral);border:1px solid var(--coral)}
.st-devops{background:var(--ivory);color:var(--moss);border:1px solid var(--moss)}
.st-exp{background:var(--ivory);color:var(--olive);border:1px solid var(--olive)}
.st-out{background:var(--ivory);color:var(--charcoal);border:1px solid var(--ring-warm)}
.st-newbiz{background:var(--coral);color:#fff}
.st-bc{background:var(--ivory);color:var(--charcoal);border:1px solid var(--ring-warm)}
.st-cx{background:var(--moss);color:#fff;opacity:0.85}
.st-default{background:var(--ivory);color:var(--olive);border:1px solid var(--ring-warm)}

/* ─── ARCHITECTURE PAGE (csy-p tone) ──────────────── */
.page-arch{padding:14mm 14mm 11mm}
.arch{display:flex;flex-direction:column;height:100%}
.arch-head{margin-bottom:5mm}
.arch-mark{
  font-family:var(--ff-sans);
  font-size:8.4pt;
  letter-spacing:0.16em;
  color:var(--terracotta);
  font-weight:600;
  display:block;
  margin-bottom:3pt;
}
.arch-title{
  font-family:var(--ff-display);
  font-weight:600;
  font-size:22pt;
  line-height:1.10;
  margin:0 0 4pt;
  color:var(--near-black);
  letter-spacing:-0.018em;
}
.arch-sub{
  font-family:var(--ff-serif);
  font-size:9.6pt;
  color:var(--charcoal);
  margin:0;
  line-height:1.55;
  letter-spacing:-0.005em;
  max-width:175mm;
}
.arch-stack{
  display:grid;
  grid-template-columns:1fr 1fr;
  grid-auto-rows:1fr;
  gap:5mm;
  flex:1;
}
.arch-item{
  margin:0;padding:0;
  display:flex;flex-direction:column;
  background:#0f172a;
  border:1px solid rgba(0,0,0,0.10);
  border-radius:4pt;
  overflow:hidden;
  box-shadow:0 2pt 8pt rgba(0,0,0,0.08);
}
.arch-img{
  flex:1 1 auto;
  background:#0f172a;
  display:flex;align-items:flex-start;justify-content:center;
  overflow:hidden;
  min-height:0;
}
.arch-img img{
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:top center;
}
.arch-item figcaption{
  flex:0 0 auto;
  padding:4mm 5mm 4mm;
  background:#fbfaf3;
  border-top:1px solid var(--border-warm);
  display:flex;
  flex-direction:column;
}
.arch-cap-title{
  font-family:var(--ff-display);
  font-weight:600;
  font-size:10pt;
  color:var(--near-black);
  line-height:1.20;
  margin-bottom:3pt;
  letter-spacing:-0.010em;
}
.arch-cap-sub{
  font-family:var(--ff-sans);
  font-size:7.8pt;
  color:var(--olive);
  line-height:1.50;
  letter-spacing:0;
}

/* ─── GALLERY PAGE ────────────────────────────────── */
.page-gallery{padding:14mm 14mm 11mm}
.gallery{display:flex;flex-direction:column;height:100%}
.gallery-head{margin-bottom:6mm}
.gallery-mark{
  font-family:var(--ff-sans);
  font-size:8.4pt;
  letter-spacing:0.16em;
  color:var(--terracotta);
  font-weight:600;
  display:block;
  margin-bottom:3pt;
}
.gallery-title{
  font-family:var(--ff-display);
  font-weight:600;
  font-size:22pt;
  line-height:1.10;
  margin:0 0 4pt;
  color:var(--near-black);
  letter-spacing:-0.018em;
}
.gallery-sub{
  font-family:var(--ff-serif);
  font-size:9.6pt;
  color:var(--charcoal);
  margin:0;
  line-height:1.50;
  letter-spacing:-0.005em;
}
.gallery-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  grid-template-rows:1fr 1fr 1fr;
  gap:5mm;
  flex:1;
}
.gal-item{
  margin:0;
  padding:0;
  display:flex;
  flex-direction:column;
  background:#fbfaf3;
  border:1px solid var(--border-warm);
  border-left:2.5pt solid var(--terracotta);
  border-radius:3pt;
  overflow:hidden;
}
.gal-img{
  flex:1 1 auto;
  background:#fff;
  border-bottom:1px solid var(--border-warm);
  overflow:hidden;
  display:flex;
  align-items:flex-start;
  justify-content:center;
  min-height:0;
}
.gal-img img{
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:top center;
}
.gal-item figcaption{padding:4pt 8pt 5pt;flex-shrink:0}
.gal-title{
  font-family:var(--ff-display);
  font-weight:600;
  font-size:9.6pt;
  color:var(--near-black);
  line-height:1.25;
  margin-bottom:2pt;
  letter-spacing:-0.008em;
}
.gal-sub{
  font-family:var(--ff-sans);
  font-size:7.6pt;
  color:var(--olive);
  line-height:1.40;
  letter-spacing:0;
  margin-bottom:2pt;
}
.gal-file code{
  font-family:var(--ff-mono);
  font-size:6.8pt;
  color:var(--stone);
  letter-spacing:0;
}

/* ─── PAIR PAGE ──────────────────────────────────── */
.page-pair{padding:13mm 13mm 11mm}
.pair-grid{display:flex;flex-direction:column;gap:5mm}

.proj-card{
  display:flex;
  flex-direction:row;
  background:#fbfaf3;
  border:1px solid var(--border-warm);
  border-left:3pt solid var(--terracotta);
  border-radius:3pt;
  overflow:hidden;
}
.proj-card.has-img{flex-direction:row}
.proj-card:not(.has-img){flex-direction:column}
.proj-card:not(.has-img) .card-inner{padding:7mm 9mm 6mm}

.card-img-band{
  flex:0 0 60mm;
  margin:0;
  padding:0;
  border-right:1px solid var(--border-warm);
  background:#fff;
  display:flex;
  flex-direction:column;
}
.card-img-band img{
  display:block;
  width:100%;
  height:auto;
  max-height:78mm;
  object-fit:cover;
  object-position:top center;
}
.card-img-band figcaption{
  font-family:var(--ff-sans);
  font-size:7.2pt;
  color:var(--olive);
  padding:4pt 7pt;
  border-top:1px solid var(--border-warm);
  background:var(--ivory);
  letter-spacing:0;
  line-height:1.38;
}

.card-inner{
  flex:1;
  display:flex;
  flex-direction:column;
  padding:6mm 7mm 6mm;
  min-width:0;
}

.card-head{margin-bottom:3pt}
.card-name-row{display:flex;align-items:center;gap:7pt;flex-wrap:wrap;margin-bottom:2pt}
.card-name{
  font-family:var(--ff-serif);
  font-weight:600;
  font-size:14pt;
  line-height:1.10;
  margin:0;
  color:var(--near-black);
  letter-spacing:-0.012em;
}
.card-statuses{display:flex;gap:3pt;flex-wrap:wrap}
.card-url{
  font-family:var(--ff-mono);
  font-size:7.8pt;
  margin-top:1pt;
}
.card-desc{
  font-family:var(--ff-serif);
  font-size:9.4pt;
  line-height:1.50;
  color:var(--charcoal);
  margin:3pt 0 5pt;
  letter-spacing:-0.005em;
}
.card-metric{
  display:flex;
  align-items:baseline;
  gap:8pt;
  padding:4pt 9pt;
  margin:2pt 0 6pt;
  background:linear-gradient(90deg, var(--ivory) 0%, transparent 100%);
  border-left:2.5pt solid var(--terracotta);
}
.card-mval{
  font-family:var(--ff-serif);
  font-weight:600;
  font-size:18pt;
  line-height:1;
  color:var(--terracotta);
  letter-spacing:-0.018em;
}
.card-mlbl{
  font-family:var(--ff-sans);
  font-size:8.4pt;
  color:var(--olive);
  letter-spacing:0;
}
.card-psr{display:flex;flex-direction:column;gap:4pt;margin-bottom:5pt}
.cps{display:flex;align-items:flex-start;gap:6pt}
.cps-tag{
  font-family:var(--ff-sans);
  font-size:7.4pt;
  font-weight:700;
  padding:1pt 4pt;
  text-align:center;
  border-radius:1.5pt;
  flex-shrink:0;
  color:#fff;
  min-width:14pt;
}
.cps-problem .cps-tag{background:var(--terracotta)}
.cps-strategy .cps-tag{background:var(--coral)}
.cps-result .cps-tag{background:var(--moss)}
.cps-txt{font-size:8.6pt;line-height:1.46;color:var(--near-black);letter-spacing:-0.003em}

.card-foot{margin-top:5pt;padding-top:5pt;border-top:1px dashed var(--border-warm)}
.card-feats-tag,.card-stack-tag{
  font-family:var(--ff-sans);
  font-size:7.2pt;
  letter-spacing:0.08em;
  font-weight:600;
  color:var(--stone);
  margin-bottom:2pt;
}
.card-stack-tag{margin-top:4pt}
.card-feats{display:flex;flex-wrap:wrap;gap:2.5pt}
.feat-mini{
  font-family:var(--ff-sans);
  font-size:7.4pt;
  padding:1.5pt 5pt;
  background:var(--ivory);
  border:1px solid var(--ring-warm);
  border-radius:2pt;
  color:var(--charcoal);
}
.card-stack{display:flex;flex-wrap:wrap;gap:2.5pt}
.card-stack .stack-chip{font-size:7pt;padding:1pt 5pt}

/* ─── SUMMARY ─────────────────────────────────────── */
.page-sum{padding:18mm 18mm 13mm}
.sec-title{
  font-family:var(--ff-serif);
  font-weight:600;
  font-size:18pt;
  letter-spacing:-0.014em;
  margin:0 0 8pt;
  color:var(--near-black);
  border-bottom:1px solid var(--border-warm);
  padding-bottom:3pt;
}
.sec-title-2{margin-top:11pt}
.timeline{display:flex;flex-direction:column;gap:5pt}
.tl-item{
  display:grid;
  grid-template-columns:46mm 1fr;
  gap:6pt;
  padding:5pt 0;
  border-bottom:1px dotted var(--border-warm);
}
.tl-period{
  font-family:var(--ff-sans);
  font-size:8.6pt;
  color:var(--terracotta);
  font-weight:600;
  letter-spacing:0.04em;
  padding-top:1pt;
}
.tl-role{
  font-family:var(--ff-serif);
  font-weight:600;
  font-size:11pt;
  color:var(--near-black);
}
.tl-co{font-size:9.5pt;color:var(--charcoal)}
.tl-focus{
  font-family:var(--ff-sans);
  font-size:8.4pt;
  color:var(--olive);
  margin-top:1pt;
  letter-spacing:0;
}
.bars{display:flex;flex-direction:column;gap:5pt;margin-top:4pt}
.bar{
  display:grid;
  grid-template-columns:60mm 1fr 18mm;
  gap:8pt;
  align-items:center;
}
.bar-l{font-family:var(--ff-sans);font-size:9.5pt;color:var(--near-black);letter-spacing:0}
.bar-track{height:6pt;background:var(--sand);border-radius:3pt;overflow:hidden}
.bar-fill{height:100%;background:linear-gradient(90deg, var(--terracotta) 0%, var(--coral) 100%);border-radius:3pt}
.bar-v{
  font-family:var(--ff-serif);
  font-weight:600;
  font-size:11pt;
  color:var(--terracotta);
  text-align:right;
}
.tools-list{display:flex;flex-wrap:wrap;gap:3pt;margin-top:4pt}
.tools-list .stack-chip{font-size:8.4pt;padding:2pt 7pt}
.contact-box{
  margin-top:14pt;
  padding:10pt 14pt;
  background:var(--ivory);
  border:1px solid var(--border-warm);
  border-radius:3pt;
}
.cb-row{display:flex;align-items:baseline;font-size:9.8pt;margin-bottom:3pt}
.cb-k{
  font-family:var(--ff-sans);
  font-size:8.4pt;
  letter-spacing:0.06em;
  color:var(--terracotta);
  font-weight:600;
  width:22mm;
  flex-shrink:0;
}
.cb-v{color:var(--near-black);font-family:var(--ff-mono);font-size:9.5pt}
.sum-foot{
  margin-top:14pt;
  padding-top:6pt;
  border-top:1px solid var(--border-warm);
  font-family:var(--ff-sans);
  font-size:8pt;
  color:var(--olive);
  display:flex;
  justify-content:space-between;
  letter-spacing:0;
}

/* page footer (page n / total) */
.pg-foot{
  position:absolute;
  left:14mm; right:14mm; bottom:5mm;
  display:flex; justify-content:space-between; align-items:baseline;
  font-family:var(--ff-sans);
  font-size:7.6pt;
  color:var(--dim);
  letter-spacing:0.04em;
  border-top:1px solid var(--border-warm);
  padding-top:2.5mm;
}
.pg-tag{font-weight:500;letter-spacing:0.10em;color:var(--stone);text-transform:uppercase;font-size:7.4pt}
.pg-num{color:var(--terracotta);font-weight:600;letter-spacing:0.16em;font-family:var(--ff-mono)}
.pg-cur{color:var(--terracotta)}
.pg-tot{color:var(--stone)}
.page-cover .pg-foot{display:none}

@page{size:A4;margin:0}
@media print{
  html,body{background:var(--parchment)}
  .page{margin:0}
}
`;

const totalPages = pagesArr.length;
const __pages = pagesArr.map((p, i) =>
  p.replace('__N__', String(i + 1).padStart(2, '0')).replace('__T__', String(totalPages).padStart(2, '0'))
);

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>유종선 — CS 운영 프로젝트 포트폴리오</title>
<style>${css}</style>
</head>
<body>
${__pages.join('\n')}
</body>
</html>`;

fs.writeFileSync(OUT_HTML, html);
console.log('wrote', OUT_HTML, '(' + html.length + ' bytes,', projects.length, 'projects)');
