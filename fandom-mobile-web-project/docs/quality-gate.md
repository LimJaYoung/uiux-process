# Quality Gate

## Goal

430px 이하 모바일 화면에서 최상급 팬덤앱 포트폴리오로 보일 것.

## Pass Criteria

| 기준 | 결과 |
| --- | --- |
| 팬덤 소재 명분이 분명한가 | Pass |
| 멤버/피드/투표/라이브/채팅 흐름이 있는가 | Pass |
| 채팅창이 실제 앱 수준의 상태를 포함하는가 | Pass |
| React 컴포넌트와 TypeScript 타입이 설계되어 있는가 | Pass |
| 430px 이하 모바일 화면에서 UI가 완성도 있게 보이는가 | Pass |
| 배포 가능한 정적 결과물이 있는가 | Pass |
| 브라우저에서 투표/채팅 핵심 인터랙션이 동작하는가 | Pass |

## Chat UX QA

| 항목 | 결과 |
| --- | --- |
| Chat List | 방 이름, 최근 메시지, 안읽음 배지 포함 |
| Chat Room | 헤더, 날짜 구분선, 메시지 리스트 포함 |
| Chat Bubble | 내 메시지/상대 메시지/시스템 메시지 구분 |
| Chat Input | 입력창, 이모지, 전송 버튼 포함 |
| Message Status | sending, sent, read, failed 모델 정의 |
| Safety UX | 신고/차단 안내 포함 |

## Verified Result

- Local URL: `http://localhost:8001/fandom-mobile-web-project/dist/index.html`
- App width: `430px`
- Vote interaction: Pass
- Chat send interaction: Pass
- Horizontal overflow: None
