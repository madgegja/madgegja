#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { marked } = require('/tmp/node_modules/marked');

const SRC = '/Claude/personal/madgegja/docs/resume_chongsun_yu_socar_csops_20260506.md';
const OUT_HTML = '/Claude/personal/madgegja/docs/_build_pdf/resume_socar.html';

const md = fs.readFileSync(SRC, 'utf8');

// strip the leading `> Target Role:` blockquote — we'll render as a clean header block
const renderer = new marked.Renderer();
const body = marked.parse(md, { renderer, gfm: true, breaks: false });

const css = `
:root{
  --near-black:#141413;
  --terracotta:#c96442;
  --coral:#d97757;
  --parchment:#f5f4ed;
  --ivory:#faf9f5;
  --sand:#e8e6dc;
  --charcoal:#4d4c48;
  --olive:#5e5d59;
  --stone:#87867f;
  --dark-warm:#3d3d3a;
  --border-cream:#f0eee6;
  --border-warm:#e8e6dc;
  --ring-warm:#d1cfc5;
  --ff-serif:'Source Serif 4','Source Serif Pro','Iowan Old Style','Palatino','Noto Serif CJK KR','Georgia',serif;
  --ff-sans:'Inter','SF Pro Text','Helvetica Neue','Noto Sans CJK KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif;
  --ff-display:'Source Serif 4','Iowan Old Style','Palatino','Noto Serif CJK KR',serif;
}

*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{
  font-family:var(--ff-serif);
  background:var(--parchment);
  color:var(--near-black);
  font-size:10.5pt;
  line-height:1.55;
  -webkit-font-smoothing:antialiased;
  letter-spacing:-0.008em;
  word-break:keep-all;
}

.page{
  max-width:780px;
  margin:0 auto;
  padding:18mm 16mm 14mm;
  background:var(--parchment);
}

/* HEADER */
h1{
  font-family:var(--ff-display);
  font-weight:600;
  font-size:24pt;
  line-height:1.10;
  margin:0 0 4pt;
  letter-spacing:-0.012em;
  color:var(--near-black);
}

/* contact line (first <p> right after h1) */
h1 + p{
  font-family:var(--ff-sans);
  font-size:9pt;
  color:var(--olive);
  margin:0 0 6pt;
  letter-spacing:0;
}

/* target-role blockquote */
blockquote{
  margin:0 0 14pt;
  padding:7pt 12pt;
  border-left:2pt solid var(--terracotta);
  background:var(--ivory);
  font-family:var(--ff-sans);
  font-size:9pt;
  color:var(--charcoal);
  border-radius:2pt;
}
blockquote p{margin:0}
blockquote strong{color:var(--terracotta);font-weight:600}

/* RULES become subtle */
hr{
  border:0;
  height:1px;
  background:var(--border-warm);
  margin:13pt 0 12pt;
}

/* SECTIONS */
h2{
  font-family:var(--ff-display);
  font-weight:600;
  font-size:13pt;
  line-height:1.20;
  margin:14pt 0 6pt;
  color:var(--near-black);
  letter-spacing:-0.005em;
  letter-spacing:0.04em;
}

h3{
  font-family:var(--ff-display);
  font-weight:600;
  font-size:11.5pt;
  line-height:1.25;
  margin:9pt 0 1pt;
  color:var(--near-black);
}

h3 + p strong{
  font-weight:600;
  color:var(--terracotta);
}
h3 + p{
  font-family:var(--ff-sans);
  font-size:9.2pt;
  color:var(--charcoal);
  margin:0 0 4pt;
}

/* PROFILE / paragraphs */
p{
  margin:0 0 6pt;
  text-align:left;
}

/* LISTS */
ul{
  margin:2pt 0 6pt;
  padding-left:14pt;
}
ul li{
  margin-bottom:4pt;
  line-height:1.55;
}
ul li::marker{
  color:var(--terracotta);
}

strong{
  font-weight:600;
  color:var(--near-black);
}

/* category badges like [Active Payment BD] */
ul li strong:first-child{
  display:inline;
  font-family:var(--ff-sans);
  font-size:8.7pt;
  letter-spacing:0.02em;
  color:var(--terracotta);
  font-weight:600;
}

/* TABLE (Skills) */
table{
  width:100%;
  border-collapse:collapse;
  margin:4pt 0 8pt;
  font-size:9.6pt;
}
th, td{
  text-align:left;
  padding:5pt 8pt;
  vertical-align:top;
  border-bottom:1px solid var(--border-cream);
}
th{
  font-family:var(--ff-sans);
  font-weight:600;
  font-size:8.8pt;
  text-transform:uppercase;
  letter-spacing:0.06em;
  color:var(--stone);
  background:var(--ivory);
  width:24%;
}
td:first-child{
  font-weight:600;
  color:var(--near-black);
  width:24%;
}

/* PRINT */
@page{
  size:A4;
  margin:0;
}
@media print{
  html,body{background:var(--parchment);}
  .page{margin:0;padding:14mm 14mm 12mm;max-width:none}
  h2{page-break-after:avoid}
  h3{page-break-after:avoid}
  ul,table{page-break-inside:avoid}
}
`;

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>Chongsun Yu — Resume</title>
<style>${css}</style>
</head>
<body>
<div class="page">
${body}
</div>
</body>
</html>`;

fs.writeFileSync(OUT_HTML, html);
console.log('wrote', OUT_HTML, '(' + html.length + ' bytes)');
