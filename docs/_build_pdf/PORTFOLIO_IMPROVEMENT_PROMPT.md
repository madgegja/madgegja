# Portfolio Improvement Prompt — Chongsun Yu / SOCAR CS Ops

> 단독 실행 가능한 작업 명세. 이 파일 하나만 보고도 포트폴리오를 csy-p.com 레벨로 끌어올릴 수 있도록 작성. 다른 세션/에이전트가 그대로 픽업해서 작업할 수 있게.

---

## 1. 목표

`/Claude/personal/madgegja/docs/Chongsun_YU_Portfolio_Socar_2026.pdf` 의 시각 자산 품질을 **csy-p.com** 라이브 사이트 수준으로 끌어올린다. 텍스트 본문은 이미 잘 정리되어 있고, **구성도(아키텍처/시스템 다이어그램)와 스크린샷만 디자인 그레이드로 재제작**하면 된다.

### 측정 가능한 완료 조건

- [ ] 설계 다이어그램 6개가 csy-p.com과 동일한 톤(다크 네이비 + 블루 액센트 + 모던 산세리프)으로 재작성되어 있다
- [ ] 라이브 프로덕트 스크린샷 5개가 현재 시점(2026-05) 기준으로 다시 캡처되어 있다
- [ ] 갤러리 페이지가 단순 PNG 그리드가 아닌 카드 디자인으로 통일되어 있다
- [ ] PDF 빌드 후 8~9페이지 안에서 모든 비주얼이 인쇄 품질(300dpi-equivalent at A4)로 보인다

### 비-목표 (skip)

- 본문 텍스트 재작성 (이미 완료)
- 폰트 변경 (Noto Serif/Sans CJK KR + Source Serif 4 + Inter 그대로)
- 이력서 PDF (별도 자산)

---

## 2. 디자인 레퍼런스 — csy-p.com (필수 톤 매칭)

**라이브 URL:** https://csy-p.com (Basic Auth: admin/jooyu0329)
**로컬 정적 사본:** `/Claude/csy-p.com/index.html` + `/Claude/csy-p.com/assets/css/style.css`

### 컬러 팔레트 (csy-p style.css에서 직접 추출)

```css
--bg: #0f172a              /* 배경 다크 네이비 */
--card-bg: #1e293b         /* 카드 배경 */
--text: #e2e8f0            /* 본문 */
--text-dim: #94a3b8        /* 보조 텍스트 */
--accent-blue: #3b82f6     /* 주 액센트 */
--accent-cyan: #0891b2     /* 보조 액센트 */
--border: rgba(255,255,255,0.08)
--font-en: 'Outfit', -apple-system, sans-serif
--font-kr: 'Noto Sans KR', sans-serif
--font-mono: 'JetBrains Mono', monospace
```

### 톤 키워드

- **모던, 다크, 고대비** (Anthropic의 parchment+terracotta와 정반대)
- **Linear.app · Vercel · Stripe 계열** (omd-lab refs ★표시 활용 가능)
- 여백 충분, 한 줄 메시지 강함, 폰트 weight 명확 차이 (300/600/800)
- 그라디언트는 절제. solid + 1pt 보더로 깔끔하게.

---

## 3. 자산 인벤토리

### 이미 확보된 것 (재활용 OK)

```
/Claude/portfolio/assets/screenshots/
  dashboard_detail.png       ← AI Draft 90% 라이브 캡처 (1440x900) ★ 핵심
  dashboard_overview.png     ← 티켓 큐 + 마켓 분포 (1440x900)
  translate_search.png       ← 다국어 "결제" 하이라이트 (1280x900)
  translate_main.png         ← 메인 (1280x900)
  bizops_portal.png          ← GitHub Pages 포털 (1440x900)
/Claude/portfolio/assets/
  nexus-screenshot.png       ← Nexus 워크스페이스 관리 (1440x900)
/tmp/diagrams/
  cs_flow_diagram_20260219.png            ← BizOPS HTML → PNG (1600x1200)
  cs_l1_l2_l3_analysis_20260225.png       ← L3 85.3% 분석
  cs_monthly_analysis_202603.png          ← 월간 보고서 산출물
  chargeback_operation_manual_20260304.png ← 4,220건 매뉴얼
  ai_cs_integration_roadmap_presentation_20260307.png
  multilingual-rag-audit.png               ← RAG 검증 보고서
  l3_auto_response_engine_20260310.png    ← Phase 2 설계서
  chatbot_cost_analysis_20260222.png       ← 챗봇 비용 모델링
```

### **새로 만들어야 할 것** (csy-p 톤으로)

#### 🆕 Diagram-1: cs-ai-dashboard 시스템 아키텍처

**컴포넌트 (좌→우 데이터 플로우):**

```
[Zendesk Inbox]  →  [FastAPI Webhook]  →  [Lang Normalizer]  →  [Claude SDK + RAG]
                                                                      ↓
[Customer]  ←  [Agent Review UI]  ←  [6-dim Quality Score]  ←  [Draft Generated]
```

**라벨/메트릭:**
- 1,422 tests · Phase 1 live
- 9 markets · 10 languages
- 12-pattern spam detection
- 6-dim quality scoring (Accuracy · Tone · Brevity · Empathy · Compliance · Locale)
- Invisible AI: 95/5 rule (95% template + 5% Claude flexibility)

**스타일:**
- 다크 #0f172a 배경
- 컴포넌트는 #1e293b 카드, 1pt 보더 #3b82f6
- 화살표는 #94a3b8, 굵기 1.5pt
- AI/RAG 컴포넌트는 #3b82f6 강조 보더
- "Customer" 종착점은 #0891b2 (cyan) 강조

#### 🆕 Diagram-2: BizOps Automation Toolkit — 4-Platform API Integration

**중심 → 4방향 모듈 다이어그램:**

```
            [Slack]                [Confluence]
                 ↘                     ↙
                  [Python Orchestrator]
                 ↗                     ↘
          [Zendesk]            [Google Sheets]
```

**라벨:**
- Weekly HTML Report Auto-gen (Confluence)
- Chargeback Real-time Sync (Sheets)
- Slack Team Digest (Slack)
- Source Data Pull (Zendesk)
- 95%↓ 리포트 시간 (2일 → 1시간)

#### 🆕 Diagram-3: Phase Roadmap — 수동 → 반자동 → 자동

**3단 가로 타임라인:**

```
Phase 1 (Done)  ─→  Phase 2 (In Design)  ─→  Phase 3 (Roadmap)
Draft + Review        L3 Auto-Response          Full Auto Triage
1,422 tests           23 response trees         End-to-end pipeline
Live in production    30+ design pages          Closed-loop QA
```

각 단계는 카드 형태, 현재 단계는 #3b82f6 강조, 향후 단계는 #475569 dim.

---

## 4. 구현 가이드

### 4.1 다이어그램 제작 방법 (둘 중 하나 선택)

**Option A: HTML + 인라인 SVG → headless Chrome → PNG**

권장. 프로젝트 빌드 인프라가 이미 그렇게 동작 중. 새 다이어그램용 HTML 파일을 만들고 다음 명령으로 PNG 추출:

```bash
google-chrome --headless --disable-gpu --no-sandbox \
  --window-size=1600,900 --hide-scrollbars \
  --screenshot=/tmp/diagrams/<name>.png \
  "file:///Claude/personal/madgegja/docs/_build_pdf/diagrams/<name>.html"
```

각 HTML 파일은 다음 구조:

```html
<!doctype html>
<style>
  body{margin:0;background:#0f172a;font-family:'Outfit','Noto Sans KR',sans-serif;color:#e2e8f0;padding:40px}
  .canvas{display:flex;flex-direction:column;gap:24px}
  .row{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
  .node{padding:14px 18px;background:#1e293b;border:1px solid rgba(255,255,255,0.08);border-radius:8px;min-width:140px}
  .node.accent{border-color:#3b82f6;background:#1e293b}
  .node.terminal{border-color:#0891b2;background:#0e2a35}
  .arrow{color:#94a3b8;font-size:24px}
  /* … */
</style>
<body>
  <!-- canvas with nodes + arrows -->
</body>
```

**Option B: design-surface skill 활용** (자동 디자인 그레이드)

```
/design-surface
프롬프트: "csy-p.com 다크 네이비 + 일렉트릭 블루 톤으로 cs-ai-dashboard 시스템 아키텍처 다이어그램 1장. 좌→우 데이터 플로우. 컴포넌트 7개. 1600x900px 단일 캔버스. starter: design_canvas.jsx"
```

### 4.2 omd-lab 활용 (브랜드 톤 일관성)

```bash
# Linear.app 톤 미리보기 (csy-p와 가장 가까운 ref)
omd-lab scaffold linear --target /Claude/personal/madgegja/docs/_build_pdf/diagrams_omd
# 또는 csy-p.com 자체를 ref로 추가
omd-lab match "dark navy electric blue minimal modern"
```

### 4.3 라이브 스크린샷 재캡처 (cs-dashboard.duckdns.org 등)

**현재 차단 사유:** Basic Auth(admin/jooyu0329) 통과 후 앱 레벨 로그인 게이트가 더 있음. 실제 dashboard UI 캡처가 안 됨.

**해결책 3가지 중 택1:**

1. **앱 로그인 우회** — JWT 또는 dev cookie를 chrome --disk-cache-dir 에 미리 주입
2. **로그인 화면 캡처** — 실제 운영 상태(로그인 게이트가 곧 보안 신호)로 캡처해 caption에 명시
3. **세션 쿠키 export** — 사용자 로컬 브라우저에서 쿠키 export → headless에 주입

```bash
# 예: 쿠키 주입 후 캡처
google-chrome --headless --user-data-dir=/tmp/chrome-profile \
  --window-size=1600,900 \
  --screenshot=/tmp/live_caps/cs_dashboard_$(date +%Y%m%d).png \
  "https://cs-dashboard.duckdns.org/"
```

기존 `/Claude/portfolio/assets/screenshots/dashboard_detail.png` 는 2026-03-10 캡처. 5월 시점 변화가 작다면 그대로 유지해도 OK.

### 4.4 갤러리 페이지 디자인 통일

현재 갤러리는 6개 PNG를 그리드로 나열만 함. 개선:
- 각 셀에 **상단 번호 (01~06)** + **타이틀** + **3-line description** + **filename** + **렌더링 일자**
- 카드 hover 효과는 무의미 (PDF), 대신 **좌측 컬러 바**로 카테고리 구분 (분석/설계/검증/리포트)
- 캡션 폰트는 8.4pt → 9pt 로 1단계 키우고 line-height 1.50 유지

### 4.5 빌드 체인

```bash
cd /Claude/personal/madgegja/docs/_build_pdf
# 1. 새 다이어그램 HTML들 → PNG 변환
for d in diagrams/*.html; do
  name=$(basename "$d" .html)
  google-chrome --headless --disable-gpu --no-sandbox \
    --window-size=1600,900 --hide-scrollbars \
    --screenshot="/tmp/diagrams/${name}.png" "file://$PWD/$d"
done
# 2. build_portfolio.js 의 IMG 맵 갱신
# 3. 포트폴리오 빌드
node build_portfolio.js
google-chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=/Claude/personal/madgegja/docs/Chongsun_YU_Portfolio_Socar_2026.pdf \
  --print-to-pdf-no-header file:///Claude/personal/madgegja/docs/_build_pdf/portfolio.html
# 4. 검증: 페이지별 PNG 추출 후 시각 점검
pdftoppm -r 150 -png /Claude/personal/madgegja/docs/Chongsun_YU_Portfolio_Socar_2026.pdf /tmp/preview/p
```

---

## 5. 파일 위치 맵

| 무엇 | 어디 |
|---|---|
| 빌드 스크립트 | `/Claude/personal/madgegja/docs/_build_pdf/build_portfolio.js` |
| 새 다이어그램 HTML 작업 폴더 (만들 것) | `/Claude/personal/madgegja/docs/_build_pdf/diagrams/` |
| 다이어그램 PNG 산출물 | `/tmp/diagrams/` |
| 라이브 스크린샷 | `/Claude/portfolio/assets/screenshots/` |
| 신규 라이브 캡처 | `/tmp/live_caps/` (만들 것) |
| 최종 PDF | `/Claude/personal/madgegja/docs/Chongsun_YU_Portfolio_Socar_2026.pdf` |
| 톤 레퍼런스 (csy-p) | `/Claude/csy-p.com/{index.html, assets/css/style.css}` |
| omd-lab refs | `/Claude/omd-lab/references/` (★ apple, ★ linear.app, ★ stripe, ★ vercel) |
| 메모리 (사용자 컨텍스트) | `/root/.claude/projects/-Claude/memory/` |

---

## 6. 시작 체크리스트 (다음 세션이 픽업할 때)

1. [ ] `/Claude/csy-p.com/` 정적 파일 5분 훑어 톤 체득
2. [ ] `/Claude/personal/madgegja/docs/Chongsun_YU_Portfolio_Socar_2026.pdf` 현 상태 확인
3. [ ] `mkdir -p /Claude/personal/madgegja/docs/_build_pdf/diagrams`
4. [ ] **§3의 Diagram-1 (cs-ai-dashboard 아키텍처)** HTML로 작성 → PNG 렌더 → 갤러리에 추가
5. [ ] **Diagram-2 (BizOps 4-Platform Integration)** 작성 → PNG → 포트폴리오에 추가
6. [ ] **Diagram-3 (Phase Roadmap)** 작성 → PNG → hero 페이지 보완으로 추가
7. [ ] 갤러리 페이지를 §4.4 가이드대로 카드화
8. [ ] 빌드 + PDF 산출 + 시각 점검 (페이지별 PNG)
9. [ ] 모든 변경 후 페이지 8 → 9 → 10 페이지로 늘어나면 OK (다이어그램 갤러리 풍성)

---

## 7. 무엇이 잘못되어 왔는가 (회고)

지금까지 시도된 접근:
- ✅ 본문 한글화 + 폰트 (Noto CJK KR) — 완료
- ✅ JD 톤에 맞춘 PG → B2B 가맹점 CX 재프레임 — 완료
- ✅ [CONFIRM]/[NUMBER NEEDED] 마커 실측 데이터 치환 — 완료
- ✅ 라이브 스크린샷 5종 + 다이어그램 8종 임베드 — 완료

부족했던 점:
- ❌ **모든 다이어그램이 BizOPS HTML 보고서를 그대로 PNG로 캡처한 것** — 본질적으로 운영 보고서 톤. 디자인 그레이드 아님.
- ❌ **csy-p.com과 톤이 정반대** (parchment vs dark navy)
- ❌ **시스템 아키텍처 구성도가 없음** — 데이터 플로우/모듈 분리/단계 진화를 보여주는 그림이 부재
- ❌ **갤러리는 그리드 나열에 그침** — 카드 시각 통일성 약함

이 프롬프트는 이 4가지를 정조준한다.

---

## 8. 출력 형식

작업 완료 시 다음을 보고:

1. 새로 추가한 다이어그램 파일 경로 목록
2. 갱신된 PDF의 페이지 수와 크기
3. 페이지별 1-line 변경 내역
4. 미해결 [TODO] (예: 라이브 캡처 못한 이유)
