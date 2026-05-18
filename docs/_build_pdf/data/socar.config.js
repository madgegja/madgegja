// SOCAR · 고객서비스 운영기획 매니저 — portfolio config
//
// 이 파일은 build_portfolio.js 가 import 한다. 다른 회사 지원 시:
//   1. 이 파일을 cp data/socar.config.js data/<company>.config.js
//   2. 아래 내용을 직무에 맞게 수정
//   3. node build_portfolio.js <company>   (default: socar)
//
// IMG.* 키는 build_portfolio.js 의 IMG 맵 참조 — 새 이미지 추가 시 거기에 먼저 등록할 것.

module.exports = (IMG) => ({
  // ── 1. 메타 ─────────────────────────────────────────
  target: {
    company: '쏘카 (SOCAR)',
    role: '고객서비스 운영기획 매니저',
    locale: 'ko',
    title: '유종선 — CS 운영 프로젝트 포트폴리오',
  },

  // ── 2. 커버 페이지 ───────────────────────────────────
  cover: {
    mark: '프로젝트 포트폴리오 · CS 운영',
    nameKo: '유종선',
    nameEn: 'CHONGSUN YU',
    quote:
      '"내가 만드는 AI 시스템은 구조적 문제를<br>끝까지 해결한다 — 직무라서가 아니라,<br>문제가 거기 있고 다른 누구도 풀지 않을 것이기 때문이다."',
    tagline: '직접 만드는 PM × 프로덕트 오너',
    stats: [
      { v: '12', l: 'CS · CX · 운영 (년)' },
      { v: '10', l: '해외 마켓' },
      { v: '11', l: '프로젝트' },
      { v: '13K+', l: '분석 티켓' },
    ],
    selectedTag: '주요 CS / CX 프로젝트 · 라이브',
    selected: [
      { num: '01', name: 'cs-ai-dashboard',          desc: '프로덕션 CS AI 대시보드 · Claude SDK · 9-마켓 RAG · 1,422 테스트' },
      { num: '02', name: 'cs-ai-chatbot',            desc: '하이브리드 AI 챗봇 · 7×32 의도 · 9 Red Flag 사기 탐지' },
      { num: '03', name: 'ai-translate',             desc: '폐쇄망 CS 번역 DB · FTS5 · 25,070 용어 · 10개 언어' },
      { num: '04', name: 'global-cs-analytics',      desc: '9단계 필터링 · 4단계 분류 · 13,400+ 티켓' },
      { num: '05', name: 'bizops-automation-toolkit',desc: 'CS 리포팅 2일 → 1시간 · 4 플랫폼 API 통합' },
      { num: '06', name: 'CS_claw',                  desc: 'Telegram CS 운영 어시스턴트 · 15 NLP 패턴 · Claude Opus + Vision' },
    ],
    meta: [
      { k: '지원',        v: '고객서비스 운영기획 매니저, 쏘카 (SOCAR)' },
      { k: '역량',        v: 'CS 운영기획 · VOC 분석 · AI 자동화 · 다국가 운영 · QA' },
      { k: '운영 사이트', v: 'cs-dashboard.duckdns.org · cs-translate.duckdns.org · tg-bizops.github.io' },
    ],
    contact: '+82-10-4167-0856 · madgegja@gmail.com · csy-p.com · github.com/madgegja',
    date: '2026.05',
  },

  // ── 3. 프로젝트 (기준 데이터 + 이 직무용 image 매핑) ────
  hero: 'cs-ai-dashboard',
  projects: [
    {
      key: 'cs-ai-dashboard',
      name: 'cs-ai-dashboard',
      statuses: ['Production', 'Live', 'AI', 'Python', 'FastAPI'],
      url: 'https://cs-dashboard.duckdns.org',
      description:
        '프로덕션 운영 중인 AI 기반 CS 운영 대시보드. FastAPI + Vanilla JS SPA 구조에 Zendesk API 연동. Claude SDK 기반 AI 응대 초안 생성, 9개 마켓 다국어 RAG, 12 패턴 스팸 탐지, 6차원 품질 스코어링. Phase 1 Draft+Review 운영 중.',
      stack: ['Python', 'FastAPI', 'Claude API', 'Zendesk API', 'RAG', 'JWT', 'Vanilla JS', 'SPA'],
      problem: '월 1,600건 이상의 다국어 티켓(필터 후·10개 마켓·10개 언어)을 모두 수동 처리. AI 보조 없이 상담사가 매 응답을 처음부터 작성.',
      strategy: '프로덕션 AI 대시보드 — 상담사가 처음부터 작성하지 않고 AI 초안을 검토. Invisible AI: 고객은 AI 존재를 인지하지 않음.',
      results: 'Phase 1 프로덕션 운영 중 — 1,422 테스트, Phase 1 Draft+Review 가동.',
      features: [
        'AI 응대 초안 생성 (95/5 룰)',
        '9-마켓 다국어 RAG',
        '스팸 탐지 (P1~P12)',
        '4단계 카테고리 파이프라인',
        'L3 자동 응답',
      ],
      metric: { value: '1,422', label: '테스트 · Phase 1 운영' },
      image: IMG.dashboardDetail,
      imageCaption:
        '프로덕션 라이브 (2026-05-06) — Generate AI Draft 클릭 후 시나리오 추천 UI · "해지했는데 결제됨" 5 시나리오 + AI 추천 마커 · 일본어 티켓 운영자 검토 노트.',
    },
    {
      key: 'cs-ai-chatbot',
      name: 'cs-ai-chatbot',
      statuses: ['Archived', 'AI', 'Python', 'FastAPI'],
      description: 'AI 기반 CS 챗봇 프로토타입 — cs-ai-dashboard로 발전. Claude API + RAG, 10개 마켓, 사기 탐지, 스마트 에스컬레이션.',
      stack: ['Python', 'FastAPI', 'Claude API', 'ChromaDB', 'Docker', 'Pydantic v2', 'GitHub Actions'],
      problem: '월 1,600+건의 10개 마켓·10개 언어 다국어 티켓을 수동 처리.',
      strategy: '하이브리드 AI 챗봇 — 90% 템플릿 일관성 + 10% Claude AI 유연성.',
      results: '38% 셀프서비스 목표 (월 ~630건 자동 처리), 9 Red Flag 사기 탐지 운영.',
      features: [
        '의도 분류 (7 카테고리 × 32 서브 의도)',
        '사기 탐지 (9 Red Flag 스코어링)',
        '3단계 스마트 라우팅',
        '다국어 템플릿 (30 × 10개 언어)',
      ],
      metric: { value: '161', label: '테스트' },
      image: IMG.dashboardOverview,
      imageCaption:
        '프로덕션 라이브 캡처 (2026-05-06) — 7 NEW · 4 OPEN · 117 PENDING · 101 SOLVED + 마켓 분포 도넛 + 카테고리 바 + 주간 트렌드.',
    },
    {
      key: 'ai-translate',
      name: 'ai-translate',
      statuses: ['Production', 'Live', 'AI', 'Python', 'FastAPI'],
      url: 'https://cs-translate.duckdns.org',
      description:
        '내부 CS 전용 폐쇄망 AI 번역 시스템. 외부 API 호출 없음 — 로컬 SQLite vocab.db에서만 동작. FTS5 전문 검색으로 10개 언어 25,070개 용어, 12개 소스 통합, 17단계 우선순위 체계 지원.',
      stack: ['Python', 'FastAPI', 'SQLite', 'FTS5', 'Vanilla JS', 'SPA', 'REST API'],
      problem: '10개 언어 CS 번역이 12+ 엑셀 시트·Confluence 페이지·PDF에 흩어져 있어 중앙 검색 불가.',
      strategy: '폐쇄망 번역 DB — 외부 API 없음, 고객 데이터가 서버를 떠나지 않음.',
      results: '10개 언어·10개 카테고리에 걸쳐 25,070 CS 용어 — 상담사 응대의 단일 진실 소스.',
      features: ['FTS5 전문 검색', '12개 소스 통합', '배치 번역 (1~20건)', '변경 이력 추적'],
      metric: { value: '25,070', label: '용어 · 10개 언어' },
      image: IMG.translateSearch,
      imageCaption:
        '프로덕션 라이브 캡처 (2026-05-06) — "결제" 검색 결과 97 Related Terms · 10/10 langs로 PIX Payment Delay / 決済遅延 / Zahlungsverzögerung 등 동시 매칭.',
    },
    {
      key: 'global-cs-analytics',
      name: 'global-cs-analytics',
      statuses: ['Analytics', 'MIT', 'Jupyter'],
      description: '다국가 운영을 위한 CS 데이터 분석·인터랙티브 대시보드. 티켓 볼륨 추이, SLA 벤치마킹, 카테고리 분석, Revenue Save 추적.',
      stack: ['Python', 'Jupyter', 'pandas', 'Plotly', 'Chart.js', 'Zendesk API'],
      problem: 'Zendesk 원시 데이터가 82% 노이즈 — 체계적 분석 불가. 10개 마켓 13K+ 티켓에 대한 마켓 간 패턴 가시성 부재.',
      strategy: '9단계 필터링 파이프라인 + 4단계 카테고리 분류 엔진.',
      results: '82% 노이즈 제거 — 클린 데이터 파이프라인 정립. 7개월간 13,400+ 티켓 분석 완료.',
      features: ['마켓별 볼륨 추이', 'SLA 벤치마킹', '9단계 노이즈 필터링', '인터랙티브 대시보드'],
      metric: { value: '82%', label: '노이즈 제거' },
      image: IMG.csL1L2L3,
      imageCaption: 'L1/L2/L3 티켓 레벨 분석 — 8개월 누적 12,464건, L3 셀프서비스 85.3%, L2 6.6%, L1 8.2%. 작성: BizOps팀.',
    },
    {
      key: 'bizops-automation-toolkit',
      name: 'bizops-automation-toolkit',
      statuses: ['Execution', 'MIT', 'Python'],
      description: '글로벌 CS 운영팀을 위한 업무 프로세스 자동화 도구. Zendesk 리포팅, 차지백 추적, Slack 팀 다이제스트, Confluence 문서화를 자동화.',
      stack: ['Python', 'Zendesk API', 'Google Sheets API', 'Slack Webhook', 'Confluence API', 'pandas'],
      problem: '수동 리포팅에 주 2일 소요 — 4개 플랫폼의 반복 데이터 수집.',
      strategy: '4개 플랫폼 API를 독립 연결한 모듈형 Python 툴킷.',
      results: '리포트 생성 2일 → 1시간 (95% 단축).',
      features: ['주간 HTML 리포트 자동 생성', '차지백 실시간 동기화', 'Slack 팀 다이제스트', 'Confluence 자동 업데이트'],
      metric: { value: '95%↓', label: '리포트 시간' },
      image: IMG.csMonthly,
      imageCaption: 'BizOps팀 월간 보고서 자동 생성 산출물 — 2026년 3월: 1,801건·SLA 2.50시간·1차 해결률 82.7%·10마켓 운영. 작성: 유종선.',
    },
    {
      key: 'cs-claw',
      name: 'CS_claw',
      statuses: ['AI', 'Production', 'Python', 'Telegram Bot'],
      description:
        '서버 모니터링·Zendesk 티켓 조회·감사 실행·배포를 단일 챗 인터페이스에서 처리하는 Telegram 기반 AI CS 운영 어시스턴트. Vision 지원 Claude Opus 대화형 AI, SQLite 세션 저장, 실시간 헬스 모니터링, 15 패턴 자연어 명령 라우팅.',
      stack: ['Python', 'Telegram API', 'Claude API', 'SQLite', 'Zendesk API', 'systemd', 'httpx'],
      problem: 'CS 서버 모니터링·티켓 확인·감사 실행에 SSH + 다수 CLI 도구 필요 — 온콜 대응 지연.',
      strategy: '단일 Telegram 챗 인터페이스 — 자연어가 운영 명령으로 라우팅. fcntl.flock 중복 제거·409 백오프·600초 워치독으로 안정성 확보.',
      results: '휴대폰에서 모든 CS 운영 처리 — 티켓 조회·감사 실행·배포·로그 검토.',
      features: [
        'Claude Opus AI + Vision',
        '자연어 라우팅 (15 패턴)',
        '서버 운영 (/health · /services · /logs · /deploy · /audit)',
        '안정성·안전장치 (flock·backoff·watchdog)',
      ],
      metric: { value: '1,342', label: '라인 · bot.py' },
      image: null,
    },
    {
      key: 'bizops-artifacts-portal',
      name: 'bizops-artifacts-portal',
      statuses: ['Output', 'Live'],
      url: 'https://tg-bizops.github.io/BizOPS/',
      description:
        '9개 카테고리에 걸친 58건의 운영 산출물을 호스팅하는 공개 CS 문서 포털. CS 매뉴얼(EN/KO), FAQ(10개 언어), ToS(10개 언어), 차지백 템플릿, AI 대시보드 문서, 분석 리포트, 주간 아카이브.',
      stack: ['GitHub Pages', 'HTML/CSS', 'GitHub Actions', 'Claude AI', '@media print', 'Confluence'],
      problem: 'CS 운영 문서가 Confluence·Sheets·로컬 파일에 분산 — 상담사 온보딩 지연.',
      strategy: '프린트 친화 스타일 + 카테고리 자동 인덱싱을 적용한 GitHub Pages 포털.',
      results: '58건 문서 공개 — 전부 단독 저술.',
      features: ['CS 운영 (10건)', 'AI 대시보드 (6건)', '차지백 (3건)', '대시보드 & IP (3건)'],
      metric: { value: '58', label: '문서 · 9개 카테고리' },
      image: IMG.bizopsPortalLive,
      imageCaption:
        'BizOps Portal — 2026 Week 10 라이브 (2026-05-06) — 11 CS 운영 · 10 FAQ · 13 AI 챗봇 · 4 차지백 · 1 IP 보호 · 4 CS Dashboard · 10 정책/약관 = 59 문서 · AI Agent Online.',
    },
    {
      key: 'nexus-dashboard',
      name: 'nexus-dashboard',
      statuses: ['DevOps', 'Production', 'TypeScript', 'Next.js'],
      url: 'https://cs-dashboard.duckdns.org/nexus',
      description:
        'Claude Code 워크스페이스 관리 대시보드. Next.js 16 + shadcn/ui — 다수 저장소의 에이전트·스킬·훅·프로젝트 지시문을 관리. JWT 인증, CRUD, 감사 로그, 실시간 모니터링, 설정 포터빌리티를 위한 import/export.',
      stack: ['TypeScript', 'Next.js 16', 'shadcn/ui', 'Tailwind CSS', 'JWT', 'PM2', 'REST API'],
      problem: 'AI 워크스페이스가 저장소별로 분산 — 에이전트·스킬·훅의 단일 관리 면 부재.',
      strategy: 'JWT + 감사 로그, 검색/하이라이트, 포터빌리티 import/export를 갖춘 통합 8페이지 콘솔.',
      results: '단일 UI에서 7개 프로젝트, 40+ 에이전트, 60+ 스킬을 관리하는 8페이지 대시보드.',
      features: ['8페이지 관리 콘솔', 'JWT 인증 + 감사 로그', '검색 + 하이라이트', '내보내기/가져오기'],
      metric: { value: '7 / 40+ / 60+', label: '프로젝트 · 에이전트 · 스킬' },
      image: IMG.nexus,
      imageCaption: '라이브 Claude Code 워크스페이스 개요 — 40 에이전트, 46 글로벌 룰, 최근 프로젝트 패널.',
    },
    {
      key: 'b2b-merchant-cx-playbook',
      name: 'b2b-merchant-cx-playbook',
      statuses: ['Expertise', 'CC BY 4.0', 'Docs'],
      description:
        'B2B 가맹점 고객 운영을 위한 오픈 지식베이스. 가맹점 온보딩, 크로스보더 CX, 사기·차지백 분쟁 처리, 시장별 현지화 — 12년 다국가 가맹점 CS 핸즈온 경험에서 정리.',
      stack: ['Visa / Mastercard', 'NHN KCP', 'Cross-border', 'FDS', 'AML/KYC', 'Mermaid'],
      problem: 'B2B 가맹점 CS 노하우가 부서간 구두 지식에 갇힘 — 신규 운영자를 위한 공개 레퍼런스 부재.',
      strategy: '4개 핵심 CS/CX 도메인의 시각적 플로우를 담은 오픈 플레이북 (CC BY 4.0).',
      results: '4개 핵심 가맹점-CX 도메인을 시각 플로우와 함께 다룬 종합 플레이북.',
      features: ['가맹점 온보딩 & CX', '크로스보더 정산 CS', '사기 & 차지백 분쟁', '시장 현지화'],
      metric: { value: '4', label: 'CS/CX 도메인 · CC BY 4.0' },
      image: IMG.chargebackManual,
      imageCaption: '차지백 오퍼레이션 매뉴얼 v1.4 — 14개월 누적 4,220건 · 9개 PG 분쟁 운영 가이드 · PG별 소명 자료 작성·제출·회원 제재 SOP. 작성: 유종선.',
    },
    {
      key: 'global-mass-remittance',
      name: 'global-mass-remittance',
      statuses: ['NEW BIZ', 'B2B Partner CX', 'Fintech'],
      description:
        '글로벌 B2B 파트너(Payoneer · Uber · Airbnb)를 위한 크로스보더 다중통화 대량 송금 플랫폼을 기획·런칭. 파트너 발굴·계약·온보딩·런칭 후 CS까지 B2B 파트너 풀 라이프사이클 책임 — 월 고정 매출 2억 원+ 창출. 문제 정의부터 계정 확장까지 End-to-End 파트너 CX.',
      stack: ['B2B Partner CX', 'Cross-border USD', 'USD Virtual Account', 'Mass Remittance', 'Payoneer', 'Uber', 'Airbnb', 'VAN'],
      problem: '글로벌 e-wallet 파트너가 한국 서브 가맹점 정산이 필요했으나 현지 PG 라이선스 취득 불가 — 파트너 측 블로커.',
      strategy: 'USD 가상계좌 + VAN 제휴 — 대량 송금 서비스. 파트너 측 CS·계약 협상·온보딩·런칭 후 거래별 지원까지 책임.',
      results: '신규 플랫폼 런칭 — 월 고정 매출 2억 원+ 창출. Payoneer · Uber · Airbnb를 풀 라이프사이클 B2B 파트너 CX로 온보딩.',
      features: ['B2B 파트너 라이프사이클 CX', '크로스보더 대량 송금', 'KRW-KRW / USD-USD 서비스', 'VAN 은행 파트너 온보딩'],
      metric: { value: '₩2억+', label: '월 매출 · 앵커 파트너 3곳' },
      image: IMG.chargebackFlow,
      imageCaption:
        '글로벌 PG 파트너 분쟁 플로우 — 8 PSP (PayPal · Cybersource · Airwallex · MyCard · WorldPay · Payletter · Paymentwall · Omise) · 결제 발생부터 정산·분쟁까지 전 라이프사이클을 다룸.',
    },
    {
      key: 'avatara-nft-platform',
      name: 'avatara-nft-platform',
      statuses: ['Blockchain', 'NX3 Games', 'Web3'],
      description:
        'NX3 Games (NEXON)에서 설계한 블록체인 기반 디지털 아바타 NFT 플랫폼. NFT 민팅 파이프라인·마켓플레이스 거래·토큰이코노미·Polygon 네트워크 GameFi 통합까지 End-to-End 서비스 설계 리드. 전 과정에서 Xsolla·Binance Pay와 B2B 파트너 CX 운영.',
      stack: ['Solidity', 'Polygon', 'NFT', 'Web3.js', 'IPFS', 'React', 'TypeScript', 'Hardhat'],
      problem: '게임 자산이 중앙 집중 서버에 묶여 있어 진정한 플레이어 소유권 부재; 파트너 통합도 분산.',
      strategy: 'Polygon 기반 NFT 민팅 + 마켓플레이스 + GameFi 루프 — 풀 소유권 라이프사이클, B2B PSP 파트너 CX (Xsolla, Binance Pay) 동반.',
      results: 'End-to-End NFT 플랫폼 설계 — 민팅 → 마켓플레이스 → GameFi 풀 라이프사이클.',
      features: ['제너러티브 아바타 민팅', 'NFT 마켓플레이스', 'GameFi 통합', '토큰이코노미 설계'],
      metric: { value: 'E2E', label: '민팅 → 마켓플레이스 → GameFi' },
      image: null,
    },
  ],

  // ── 4. 시스템 구성도 (csy-p 톤 다이어그램) ─────────────
  archDiagrams: [
    { src: IMG.archVocLoop,        title: 'VOC → 근본 원인 → 서비스 구조 변경',          sub: 'CS 운영의 5단계 폐쇄 루프 — VOC 인입·패턴 추출·근본 원인 진단·서비스 구조 변경·측정 검증. 4주 단위 환류.' },
    { src: IMG.archCsAiDashboard,  title: 'cs-ai-dashboard · 시스템 아키텍처',           sub: 'Zendesk Webhook → Lang Normalizer → Claude SDK + RAG → 6-dim Quality Score → Agent Review UI → Customer. Phase 1 운영 / Phase 2 설계 / Phase 3 로드맵.' },
    { src: IMG.archPhaseRoadmap,   title: 'CS Automation · 단계별 로드맵',                sub: '수동 → 반자동 → 자동 — Phase 1 Draft+Review (운영 중) · Phase 2 L3 Auto-Response (설계 중) · Phase 3 Closed-Loop Auto Triage (로드맵). 변화관리 리스크 통제하며 단계 확장.' },
    { src: IMG.archBizopsToolkit,  title: 'bizops-automation-toolkit · 4-Platform Integration', sub: 'Python Orchestrator 허브 + Zendesk · Sheets · Slack · Confluence 4 API 모듈. Weekly Report · Chargeback Sync · Slack Digest · Confluence Updater.' },
  ],
  archMark: 'SYSTEM ARCHITECTURE · 직접 설계한 운영 구성도',
  archTitle: '시스템 구성도 4선',
  archSub: 'CS 운영기획·자동화 빌드 과정에서 직접 그린 시스템 구성도. csy-p.com 포트폴리오 톤(다크 네이비 + 일렉트릭 블루)으로 통일. 각 다이어그램은 운영 가능한 실제 파이프라인 / 사이클 / 모듈 구성을 1:1로 반영.',

  // ── 5. 운영 산출물 갤러리 ─────────────────────────────
  galleryItems: [
    { src: IMG.csFlow,                                                  title: 'CS 운영 플로우 다이어그램',                  sub: '7개월 11,621 분석 티켓 · 월평균 1,662 · 4명 상담사 · ~90% 1차 해결률 · 자동화 후보 41%', file: 'cs_flow_diagram_20260219' },
    { src: IMG.csInfographic,                                           title: 'CS 현황 인포그래픽',                          sub: '월평균 1,662건 · YoY +7.6% · 1차 해결률 73% · 자동화 가능성 45% · 마켓·카테고리 분포', file: 'cs_infographic_20260220' },
    { src: IMG.multilingualRagAudit,                                    title: 'Multilingual RAG 시스템 — 전면 검증 보고서', sub: 'CS-AI Dashboard 다국어 RAG 검증 · 240개 케이스 · ID/PT/IT/EN 추가 검증 · 작성: 유종선', file: 'multilingual-rag-audit-20260312' },
    { src: IMG.l3AutoResponse,                                          title: 'L3 자동 응답 엔진 설계서',                    sub: 'Phase 2 엔진 설계 — Zendesk 자동 응답 아키텍처 · 신규 7카테고리 · 11→23개 응답 트리 · 30+ 설계 페이지', file: 'l3_auto_response_engine_20260310' },
    { src: IMG.aiCsRoadmap,                                             title: 'AI CS 통합 로드맵',                           sub: 'Zendesk 투명 통합 — 고객은 AI를 모른다 / 잘못된 AI 통합 vs 올바른 통합 비교 · 단계별 페이즈 정의', file: 'ai_cs_integration_roadmap_presentation_20260307' },
    { src: '/tmp/diagrams/chatbot_cost_analysis_20260222.png',          title: '챗봇 운영 비용 분석',                         sub: 'AI 챗봇 운영 비용 모델링 · 트래픽 시나리오별 ROI · LLM 단가·캐시 전략·자동화 비율 트레이드오프', file: 'chatbot_cost_analysis_20260222' },
  ],
  galleryMark: 'CS 운영 다이어그램 · 설계 산출물',
  galleryTitle: '설계·분석·문서화 6선',
  gallerySub: '투믹스글로벌 BizOps팀에서 직접 작성·발행한 CS 운영 다이어그램·분석 보고서·시스템 설계서. 모두 GitHub Pages 포털 (<a href="https://tg-bizops.github.io/BizOPS/">tg-bizops.github.io/BizOPS/</a>) 에 공개.',

  // ── 6. 커리어 타임라인 ──────────────────────────────
  career: [
    { period: '2024.06 — 현재',     role: '팀장, BizOps팀 (6명)',                 co: '투믹스글로벌, 서울',        focus: '다국어 CS 운영 · VOC 분석 · AI 자동화 · QA · IP 보호' },
    { period: '2022.01 — 2023.11',  role: '파트장, B2B 파트너 CX',                 co: '엔엑스쓰리게임즈, 서울',     focus: 'B2B PSP 파트너 온보딩 · 멀티채널 결제 CX · 투자 유치' },
    { period: '2019.11 — 2021.12',  role: '파트장, 글로벌 가맹점 운영',             co: 'NHN KCP, 서울',             focus: 'B2B 가맹점 CX · 크로스보더 분쟁 운영 · Critical Incident 대응' },
    { period: '2015.06 — 2019.11',  role: 'IT Director / 팀장',                    co: 'Treepay Co., Ltd., 방콕',   focus: '현지 가맹점 CS · 규제 CS · 3사 JV 이해관계자 운영' },
    { period: '2014.10 — 2015.06',  role: '어카운트 매니저, 글로벌 가맹점 운영',    co: 'NHN KCP, 서울',             focus: 'Cybersource FDS · 가맹점 거절률 최적화 · 8배 성공률' },
  ],

  // ── 7. 도메인 전문성 / 도구 ──────────────────────────
  domainBars: [
    { l: 'CS / CX 운영·분석',                     v: 95 },
    { l: 'B2B 가맹점 / 파트너 CX',                v: 92 },
    { l: 'CS용 AI 자동화 (Claude · RAG)',         v: 90 },
    { l: '사기 탐지 & 차지백 CS',                 v: 88 },
    { l: 'CS 워크플로우 / QA 자동화',             v: 85 },
  ],
  tools: ['Zendesk', 'Confluence', 'Jira', 'Slack', 'Claude API', 'Python', 'pandas', 'FastAPI', 'GitHub', 'Google Sheets', 'TypeScript', 'Next.js', 'shadcn/ui', 'JavaScript', 'HTML5', 'CSS3', 'Chart.js', 'Plotly', 'SQLite', 'JWT'],

  // ── 8. 연락처 / 푸터 ────────────────────────────────
  contact: [
    { k: '이메일',  v: 'madgegja@gmail.com' },
    { k: '사이트',  v: '<a href="https://csy-p.com">csy-p.com</a>' },
    { k: 'GitHub',  v: '<a href="https://github.com/madgegja">github.com/madgegja</a>' },
    { k: 'LinkedIn',v: '<a href="https://www.linkedin.com/in/chongsun-yu-67aa84138/">linkedin.com/in/chongsun-yu-67aa84138</a>' },
    { k: '전화',    v: '+82-10-4167-0856' },
  ],
  sumFootLeft: '유종선 CHONGSUN YU · CS 운영 프로젝트 포트폴리오',
  sumFootRight: '호주국립대 (ANU) · 경영학 학사 (재무 전공) · 2007–2012',
});
