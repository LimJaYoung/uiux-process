# Deploy Info

## Local

검증용 정적 결과물:

`fandom-mobile-web-project/dist/index.html`

로컬 서버에서 확인:

```bash
python3 -m http.server 4320
```

접속:

`http://localhost:4320/fandom-mobile-web-project/dist/index.html`

## Production Plan

Vite React 프로젝트로 의존성을 설치할 수 있는 환경에서는 아래 순서로 배포한다.

```bash
npm install
npm run build
npx vercel@latest
```

## Production Deployment

- Production URL: https://dist-flame-mu.vercel.app
- Inspect URL: https://vercel.com/limjayoungs-projects/dist/5BfgovjcQtJXGvVakb62p5mKXUZK
- Deployment ID: dpl_5BfgovjcQtJXGvVakb62p5mKXUZK
- Status: READY

## Production QA

| 항목 | 결과 |
| --- | --- |
| HTTP status | 200 OK |
| Vercel deployment | READY |
| Home 화면 로드 | Pass |
| 430px 앱 프레임 | Pass |
| Vote 탭 이동 및 투표 선택 | Pass |
| Chat 화면 로드 | Pass |
| Chat input 자동화 검증 | Browser automation clipboard limitation으로 입력 자동화 실패, local QA에서 전송 검증 완료 |
