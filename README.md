<h1 align="center">
  Hi there, I'm <a href="https://github.com/madgegja">Chongsun Yu</a>
  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="28">
</h1>

<p align="center">
  <b>Global Platform Operations Team Lead @ Toomics Global</b><br>
  <i>Turning messy data into actionable insights — now with AI Agents</i>
</p>

<p align="center">
  <a href="https://github.com/madgegja">
    <img src="https://img.shields.io/badge/GitHub-madgegja-181717?style=flat-square&logo=github" />
  </a>
</p>

---

### About Me

- Currently working as **Global Platform Operations Team Lead** at **Toomics Global**
- 12 years of experience in **IT Platform Operations** — Payment, CS, Chargeback, IP Management
- Building **AI Agent systems** to automate BizOps analysis & reporting
- Building **AI-powered CS Chatbot** — real-time customer support across 10 markets
- Building **CS data analysis automation pipelines** with Python
- Analyzing operational data across **10 global markets** (EN/FR/ES/PT/DE/TH/JP/CN/IT/KR)
- Interested in **AI-powered operations**, **data-driven process improvement**, and **operational efficiency**

---

### What I'm Working On

<table>
  <tr>
    <td align="center" width="33%">
      <a href="https://github.com/madgegja/Ai-Chat-bot-project">
        <img src="https://img.shields.io/badge/💬_Project-Ai--Chat--bot-10B981?style=for-the-badge&logo=anthropic&logoColor=white" />
      </a>
      <br>
      <img src="https://img.shields.io/badge/🔒_Private_Repository-gray?style=flat-square" />
      <br><br>
      <b>Toomics CS AI Chatbot</b>
      <br><br>
      Claude API + FastAPI + RAG 기반 CS 챗봇<br>
      11,621건 실데이터 분석 → 38% 셀프서비스 자동화<br>
      10개 마켓 · 10개 언어 · Fraud 탐지 · 스마트 에스컬레이션
    </td>
    <td align="center" width="33%">
      <a href="https://github.com/madgegja/toomics-ai-agent">
        <img src="https://img.shields.io/badge/🤖_Project-toomics--ai--agent-7C3AED?style=for-the-badge&logo=anthropic&logoColor=white" />
      </a>
      <br>
      <img src="https://img.shields.io/badge/🔒_Private_Repository-gray?style=flat-square" />
      <br><br>
      <b>AI Agent — BizOps PM Assistant</b>
      <br><br>
      Claude Code 기반 AI 에이전트 시스템<br>
      결제 · CS · 차지백 · IP · 플랫폼 데이터 분석 자동화<br>
      12년차 PM 페르소나로 보고서 생성 & 운영 인사이트 도출
    </td>
    <td align="center" width="33%">
      <a href="https://github.com/madgegja/bizops-CS-Study">
        <img src="https://img.shields.io/badge/📊_Project-bizops--CS--Study-blue?style=for-the-badge&logo=python&logoColor=white" />
      </a>
      <br>
      <img src="https://img.shields.io/badge/🔒_Private_Repository-gray?style=flat-square" />
      <br><br>
      <b>BizOps CS Analysis & Reporting System</b>
      <br><br>
      Zendesk ticket data analysis automation pipeline<br>
      Raw 12,920 tickets → Clean 3,227 tickets → Reports & Charts
    </td>
  </tr>
</table>

---

### 💬 CS AI Chatbot Project Highlights

```
Customer Message
    │
    ▼
[1] Language Detection (10 languages)
    │
    ▼
[2] Fraud Detection ──┬── Intent Classification
    (parallel)         │   (7 categories × 23 sub-intents)
    │                  │
    ▼                  ▼
[3] Routing Decision
    ├── L1 → Immediate Escalation (Fraud/Critical)
    ├── L2 → AI Draft + Agent Review (Ticket)
    └── L3 → Self-Service Auto Response (38%)
```

**핵심 기능**: 🎯 의도 분류 · ⚡ 셀프서비스 자동 처리 · 👥 스마트 에스컬레이션 · 🛡️ Fraud 탐지 · 🌍 다국어 지원

**기술 스택**: FastAPI · Claude API · ChromaDB (RAG) · Docker · Nginx · Pydantic v2

**주요 성과**:
- 11,621건 실제 CS 데이터 기반 — 7개월 × 10개 마켓 분석
- 월 ~630건(38%) 셀프서비스 자동 처리 목표
- 90/10 하이브리드 응답: 90% 매뉴얼 템플릿 + 10% AI 자연어 글루
- 9개 Red Flag 지표 실시간 Fraud 스코어링 (0~100)
- Production 서버 배포 완료 (Docker + systemd)

---

### 🤖 AI Agent Project Highlights

```
.agent/
├── AGENT.md     ← 12년차 PM/PO 페르소나 & 행동 규칙
└── SKILLS.md    ← 6개 도메인 분석 스킬 정의

데이터 주입 → 자동 분류 → 분석 → 보고서 생성 → 개선 제안
```

**지원 데이터**: 💳 결제(Payment) · 🔄 차지백(Chargeback) · 📞 CS · 🛡️ IP 보호 · 📈 플랫폼 KPI · 💰 정산

**주요 기능**:
- 데이터 자동 분류 및 품질 검증
- WoW / MoM / YoY 비교 분석
- 일일 · 주간 · 월간 · 분기 보고서 자동 생성
- 차지백 리스크 모니터링 & 사전 경고
- 이해관계자별 맞춤 커뮤니케이션 (경영진/개발팀/CS팀/파트너)

---

### 📊 CS Analysis Project Highlights

**Key Features:**
- 3-layer data filtering (auto-reply / spam / merge)
- 4-priority category classification engine
- Auto-generated weekly reports (4 types) + charts
- Monthly VOC analysis with Excel dashboards
- Multi-language CS analysis (10 markets)

```
Zendesk Raw JSON (12,920)
       │
       ▼  3-Layer Filtering (-9,693)
Clean Data (3,227)
       │
       ├──▶ Weekly Reports (4 types + charts)
       ├──▶ Monthly CSV / Excel (per market tabs)
       └──▶ VOC Analysis Reports (Excel + Markdown)
```

---

### Tech Stack

<p>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" />
  <img src="https://img.shields.io/badge/Matplotlib-11557C?style=for-the-badge&logo=matplotlib&logoColor=white" />
  <img src="https://img.shields.io/badge/Claude_AI-D4A574?style=for-the-badge&logo=anthropic&logoColor=white" />
  <img src="https://img.shields.io/badge/Claude_Code-191919?style=for-the-badge&logo=anthropic&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/ChromaDB-FF6F00?style=for-the-badge&logo=databricks&logoColor=white" />
  <img src="https://img.shields.io/badge/Excel-217346?style=for-the-badge&logo=microsoftexcel&logoColor=white" />
  <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" />
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/Confluence-172B4D?style=for-the-badge&logo=confluence&logoColor=white" />
  <img src="https://img.shields.io/badge/Zendesk-03363D?style=for-the-badge&logo=zendesk&logoColor=white" />
</p>

---

### GitHub Stats

<p align="center">
  <img src="https://streak-stats.demolab.com/?user=madgegja&theme=tokyonight&hide_border=true" width="60%" />
</p>

<p align="center">
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=madgegja&theme=tokyonight" width="97%" />
</p>

---

<p align="center">
  <i>"Data doesn't lie. It just needs someone to ask the right questions — or an AI Agent to find them."</i>
</p>
