# Resume Doctor — Anthropic BDR Invocation

## Quick use (Mode A: Skill in this conversation)

```
/resume-doctor
```
그러면 현재 세션에서 Resume Doctor 프로토콜이 실행됩니다 (이력서/JD/커버레터 경로를 함께 알려주세요).

---

## Quick use (Mode B: Opus subagent, 권장 — 별도 컨텍스트)

아래 블록을 이 채팅창에 붙여넣고 보내면, Claude가 Opus 서브에이전트를 띄워 7-pass 리뷰를 수행합니다.

```
@Agent opus 로 다음 작업 수행:

description: "Resume Doctor — Anthropic BDR pass"
subagent_type: critic
model: opus

prompt:
Run the full Resume Doctor protocol defined at /root/.claude/skills/resume-doctor/SKILL.md.
Apply all 7 passes (JD Decode → Bullet Scan → Anti-slop → Story arc → Resume↔Cover overlap → ATS → Tone-match).
Anthropic-specific tone calibration: precise, understated, evidence-forward, mission-aware. No hype.

INPUTS:

JD:
Business Development Representative — Anthropic — Seoul, South Korea.
Responsibilities:
- Maintain full ownership of pipeline generating activities in your sales territory
- Collaborate with sales teams to optimize lead handoff
- Manage and prioritize a high volume of inbound leads
- Conduct initial qualifications for high-potential leads
- Outbound against strategic prospects (Startup + Enterprise)
- Support strategic outbound initiatives
- Provide data-driven insights to inform sales strategies
- Continuously refine processes
You may be a good fit if:
- 2-3+ years in fast-growing startup, similar role
- Strong analytical skills
- Salesforce, HubSpot, SQL (preferred)
- Excellent comms
- Fast-paced dynamic env
- Passion for AI/ML; understands API-first / consumption-based models
- Fluent Korean and English

RESUME (EN):
Read /Claude/personal/madgegja/docs/resume_chongsun_yu_anthropic_bdr_20260427_EN.md

RESUME (KR):
Read /Claude/personal/madgegja/docs/resume_chongsun_yu_anthropic_bdr_20260427.md

COVER_LETTER + Why Anthropic short-form + Form answers:
Read /Claude/personal/madgegja/docs/anthropic_bdr_application_pack_20260427.md

EXTRA_CONTEXT:
- Personal site: csy-p.com (AI projects, builds, writing)
- GitHub: github.com/madgegja
- Currently leading active BD with PayPal, Checkout.com, WorldPay, Airwallex (payment) + Markvision (IP) at Toomics Global
- Built production AI Agent on Claude API (48h→1h reporting)
- Bangkok JV 4.5 years
- ANU Bachelor of Commerce (Finance), 5 years in Australia
- Korean Native + English Business Native

LANGUAGE: Run the report in Korean (사용자가 한국어 사용자), but quote BEFORE/AFTER bullets in their original language (EN bullets stay EN, KR bullets stay KR).

OUTPUT:
- Use the exact 9-section report format from the SKILL.md
- Cite line numbers in every BEFORE block
- For any number you would add, use [NUMBER NEEDED: <what>] — never invent
- Surface ≥3 P0 edits, ≥1 cut recommendation, ≥3 candidate questions
- Final section #9: propose the single-line summary that should open the EN resume (currently the PROFILE first sentence)

DO NOT rewrite the entire resume. Diff-style only.
DO NOT add cover-letter language to resume bullets.
DO NOT use AI-tell phrases (leveraged, drove transformation, passionate about, results-driven).
```

---

## After the report comes back

1. 사용자(나)가 P0/P1 중 어떤 것을 수용할지 결정 + `[NUMBER NEEDED]` 메트릭을 채워서 회신
2. **Editor 패스** (별도 호출):

```
@Agent
description: "Resume editor — apply confirmed edits"
subagent_type: executor
model: sonnet

prompt:
다음 P0/P1 편집을 두 파일에 모두 반영:
- /Claude/personal/madgegja/docs/resume_chongsun_yu_anthropic_bdr_20260427.md (KR)
- /Claude/personal/madgegja/docs/resume_chongsun_yu_anthropic_bdr_20260427_EN.md (EN)

승인된 편집:
<여기에 P0-1, P0-2 ... 단위로 BEFORE/AFTER 그대로 붙여넣기>

규칙:
- BEFORE 텍스트가 정확히 일치하지 않으면 중단하고 보고
- 한 편집씩 적용 후 다음으로 진행
- 추가 의견 금지 — 명시된 편집만 반영
- 양쪽 언어 파일에 같은 사실이 반영되도록
```

3. PDF 재생성:
```
node /Claude/personal/madgegja/docs/_build_pdf/build.js
google-chrome --headless --disable-gpu --no-sandbox \
  --print-to-pdf=/Claude/personal/madgegja/docs/Chongsun_YU_Resume_Anthropic_BDR_2026.pdf \
  --no-pdf-header-footer \
  file:///Claude/personal/madgegja/docs/_build_pdf/resume.html
```
