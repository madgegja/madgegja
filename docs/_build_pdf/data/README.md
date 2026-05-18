# Portfolio Builder · 사용 가이드

회사·직무별로 설정 파일 1개만 갈아끼우면 동일 톤의 포트폴리오 PDF 가 빌드된다.

## 빠른 시작

```bash
# 1. 새 target 설정 생성
cp data/_example.config.js data/<company>.config.js

# 2. 내용 수정 (커버·프로젝트·커리어·도구 등)
$EDITOR data/<company>.config.js

# 3. 빌드 (config 이름만 인자로)
node build_portfolio.js <company>

# 4. PDF 렌더
google-chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=/Claude/personal/madgegja/docs/Chongsun_YU_Portfolio_<Company>_2026.pdf \
  --print-to-pdf-no-header file:///Claude/personal/madgegja/docs/_build_pdf/portfolio.html
```

기본값(`socar`)으로 빌드하려면 인자 생략: `node build_portfolio.js`

## 디렉터리 구조

```
_build_pdf/
├── build_portfolio.js          # 렌더러 (수정 거의 안 함)
├── data/
│   ├── _example.config.js      # 새 target 베이스
│   ├── socar.config.js         # SOCAR 활성 config
│   └── README.md               # 이 파일
├── diagrams/                   # csy-p 톤 시스템 구성도 HTML 소스
│   ├── arch_cs_ai_dashboard.html
│   ├── arch_voc_loop.html
│   ├── arch_phase_roadmap.html
│   └── arch_bizops_toolkit.html
└── portfolio.html              # 빌드 결과 (gitignore)
```

## 설정 파일 구조 (config.js)

8개 섹션. 모두 필수.

| 섹션 | 무엇 | 영향 페이지 |
|---|---|---|
| `target` | 회사·직무·title 태그 | (메타) |
| `cover` | 메인 커버 (이름·tagline·quote·stats·selected projects·meta) | Page 1 |
| `hero` + `projects` | hero 프로젝트 키 + 전체 프로젝트 배열 | Page 2 + 5~9 |
| `archDiagrams` (+mark/title/sub) | 시스템 구성도 4선 | Page 3 |
| `galleryItems` (+mark/title/sub) | 운영 산출물 갤러리 6선 | Page 4 |
| `career` | 커리어 타임라인 | Page 10 |
| `domainBars` + `tools` | 도메인 전문성 + 도구 | Page 10 |
| `contact` + `sumFoot*` | 연락처 + 푸터 | Page 10 |

## 새 이미지 추가

설정에서 `IMG.someKey` 로 참조하는 이미지가 새로 필요하면:

1. `build_portfolio.js` 의 `IMG = {...}` 맵에 키 추가:

   ```js
   const IMG = {
     ...,
     mySocarImage: '/Claude/personal/madgegja/docs/img/socar_specific.png',
   };
   ```

2. config 에서 `image: IMG.mySocarImage` 참조

## 새 시스템 구성도 추가 (csy-p 톤)

1. `diagrams/<name>.html` 작성 — `arch_cs_ai_dashboard.html` 을 베이스로 복사
2. 다크 네이비 `#0f172a` + 일렉트릭 블루 `#3b82f6` 톤 유지
3. 1600x900 해상도, padding 48px 56px
4. PNG 렌더:
   ```bash
   google-chrome --headless --disable-gpu --no-sandbox --window-size=1600,900 \
     --hide-scrollbars --screenshot=/tmp/diagrams/<name>.png \
     "file:///Claude/personal/madgegja/docs/_build_pdf/diagrams/<name>.html"
   ```
5. `IMG` 맵 + config `archDiagrams` 에 등록

## 라이브 캡처 갱신

cs-dashboard.duckdns.org / cs-translate.duckdns.org 같은 라이브 사이트는 admin 로그인 필요.

```bash
# 헤드리스 캡처 (puppeteer 자동 로그인)
node /tmp/capture_dashboard.mjs       # 메인 + 상세 + AI Draft
node /tmp/capture_translate2.mjs      # 메인 + 검색

# IMG 맵의 dashboardDetail / translateSearch 등이 자동으로 참조
```

스크립트는 `/tmp/live_caps/dashboard_*_<date>.png` / `/tmp/live_caps/translate_*_<date>.png` 형식으로 저장됨. config 에서 그대로 참조.

## 폰트 / 톤

- 본문: Source Serif 4 + Noto Serif CJK KR
- UI 라벨: Inter + Noto Sans CJK KR
- 모노: JetBrains Mono
- 한글 line-height 1.55, letter-spacing -0.008em, word-break: keep-all

색 팔레트는 `:root` 변수에서 한 번에 변경 가능 (Anthropic parchment+terracotta 기준).

## 검증 체크리스트

빌드 후 페이지별 PNG 추출해서 시각 점검:

```bash
pdftoppm -r 80 -png /Claude/personal/madgegja/docs/Chongsun_YU_Portfolio_<Company>_2026.pdf /tmp/preview/p
ls /tmp/preview/p-*.png   # 10페이지 모두 존재하는지
```

기대 결과:
- `p-01`: 커버
- `p-02`: HERO (라이브 캡처)
- `p-03`: 시스템 구성도 4선
- `p-04`: 산출물 갤러리 6선
- `p-05` ~ `p-09`: 프로젝트 페어 카드
- `p-10`: 커리어 + 도메인 + 도구 + 연락처

각 페이지 우측 하단 `NN / 10` 페이지 번호 + 좌측 하단 page tag 확인.

## 알려진 제약

- **이미지 base64 임베드**: PDF 가 4-5MB 까지 커짐. 정상.
- **Chrome 헤드리스 폰트 fallback**: Noto CJK KR 미설치 환경에서는 본문 한글이 WenQuanYi 로 fallback. `apt install fonts-noto-cjk` 로 해결.
- **라이브 캡처 stale**: 매 빌드 시 캡처 갱신 필요. `make capture` 같은 자동화 미구축.

## 변경 가이드

- **커버 색·로고만 변경**: `build_portfolio.js` 의 `:root` CSS 변수
- **새 페이지 추가**: `pagesArr` 배열에 `wrapPage(...)` 추가, render 함수 작성
- **프로젝트 카드 레이아웃 변경**: `renderCompact` / `renderHero` 함수
- **시스템 구성도 교체**: config 의 `archDiagrams` 배열 + `IMG` 맵
