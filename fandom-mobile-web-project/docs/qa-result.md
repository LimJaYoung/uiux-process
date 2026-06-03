# QA Result

검증 URL:

`http://localhost:8001/fandom-mobile-web-project/dist/index.html`

Production URL:

`https://dist-flame-mu.vercel.app`

## Browser QA

| 항목 | 결과 |
| --- | --- |
| 문서 제목 | AURORA:NE Fan Orbit \| Fandom Mobile Web |
| 초기 화면 | Home |
| 앱 프레임 폭 | 430px |
| 하단 탭 | Home, Members, Feed, Vote, Chat, My |
| Hero 카피 | Orbit gathers before the light. |
| 투표 인터랙션 | Vote 탭에서 선택 후 진행률 변경 확인 |
| 채팅 입력 | 메시지 입력 후 말풍선 추가 확인 |
| 채팅 안전 UX | 신고/차단 안내 노출 확인 |
| 가로 오버플로 | 없음 |

## QA Notes

- `AURORA begins here` 선택 후 진행률이 35%에서 43%로 변경되어 투표 완료 상태를 확인했다.
- 채팅창에서 `오늘 라이브 같이 달리자!` 메시지 전송 후 말풍선이 추가되었다.
- Chat Room에 운영 안내와 안전 안내가 함께 노출된다.
- 430px 앱 프레임 안에서 콘텐츠가 잘리지 않고 하단 탭이 고정된다.

## Production QA Notes

- Vercel production URL responds with `200 OK`.
- Production Home, Vote, Chat screens load successfully.
- Production Vote interaction was verified in browser automation.
- Production Chat text input automation was blocked by the browser automation virtual clipboard limitation, while the same chat send flow passed local browser QA.
