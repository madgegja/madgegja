// _example.config.js — annotated minimal template
//
// 새 회사/직무 지원 시 이 파일을 base로 복사:
//   cp data/_example.config.js data/<company>.config.js
//   $EDITOR data/<company>.config.js
//   node build_portfolio.js <company>
//
// 모든 필드는 필수. null / 빈 배열 허용. IMG.* 키는 build_portfolio.js 의 IMG 맵 참조.

module.exports = (IMG) => ({
  // ── 메타 ─────────────────────────────────────────────
  target: {
    company: '<COMPANY>',           // 예: '쏘카 (SOCAR)'
    role: '<ROLE>',                  // 예: '고객서비스 운영기획 매니저'
    locale: 'ko',
    title: '<NAME> — <TITLE>',       // PDF/HTML title 태그
  },

  // ── 커버 페이지 ───────────────────────────────────────
  cover: {
    mark: '<HEADER MARK>',                  // 예: '프로젝트 포트폴리오 · CS 운영'
    nameKo: '유종선',
    nameEn: 'CHONGSUN YU',
    quote: '"<one-line vision/manifesto>"',
    tagline: '<personal tagline>',          // 예: '직접 만드는 PM × 프로덕트 오너'
    stats: [                                 // 4 stats — 가로 한 줄
      { v: '12',   l: 'CS · CX · 운영 (년)' },
      { v: '10',   l: '해외 마켓' },
      { v: '11',   l: '프로젝트' },
      { v: '13K+', l: '분석 티켓' },
    ],
    selectedTag: '<선택 프로젝트 라벨>',
    selected: [                              // 6 highlight projects (커버용)
      // { num: '01', name: 'project-name', desc: 'one-line description' },
    ],
    meta: [                                  // 직무 매핑 — 보통 3 줄
      { k: '지원',        v: '<role @ company>' },
      { k: '역량',        v: '<skill stack>' },
      { k: '운영 사이트', v: '<live URLs · separated>' },
    ],
    contact: '+82-10-XXXX-XXXX · email · site · github',
    date: '2026.05',
  },

  // ── 프로젝트 ─────────────────────────────────────────
  hero: '<project-key>',          // projects 배열에서 어느 key 를 hero 로 둘지
  projects: [
    /*
    {
      key: 'unique-key',
      name: 'display-name',
      statuses: ['Production', 'Live', 'AI'],   // status chip 라벨
      url: 'https://...',                        // optional
      description: '...',
      stack: ['Python', 'FastAPI'],
      problem: '...',
      strategy: '...',
      results: '...',
      features: ['feat 1', 'feat 2'],
      metric: { value: '1,422', label: '...' },
      image: IMG.someImageKey,                   // null OK
      imageCaption: '...',
    },
    */
  ],

  // ── 시스템 구성도 (csy-p 톤 다이어그램, 4선) ───────────
  archDiagrams: [
    // { src: IMG.archXxx, title: '...', sub: '...' },
  ],
  archMark: 'SYSTEM ARCHITECTURE · 직접 설계한 운영 구성도',
  archTitle: '시스템 구성도',
  archSub: '...',

  // ── 운영 산출물 갤러리 (6선) ─────────────────────────
  galleryItems: [
    // { src: IMG.csXxx, title: '...', sub: '...', file: 'filename' },
  ],
  galleryMark: '...',
  galleryTitle: '...',
  gallerySub: '...',

  // ── 커리어 / 도메인 / 도구 / 연락처 ─────────────────
  career: [
    // { period: 'YYYY.MM — YYYY.MM', role: '...', co: '회사', focus: '...' },
  ],
  domainBars: [
    // { l: '도메인 이름', v: 95 },        // v = 0-100 (%)
  ],
  tools: ['Zendesk', 'Python', 'GitHub'],
  contact: [
    // { k: '이메일', v: 'email' },
    // { k: 'GitHub', v: '<a href="">github.com/...</a>' },
  ],
  sumFootLeft: '<name> · <portfolio title>',
  sumFootRight: '<education>',
});
