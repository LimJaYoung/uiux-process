# AURORA:NE Fan Orbit Process

## 01. 아이템 선정

선정 팬덤: `AURORA:NE`

가상의 4인조 퍼포먼스 그룹과 팬덤 `Orbit`을 소재로 선정했다. 실제 브랜드나 아이돌 이미지를 사용하지 않아 저작권 리스크가 낮고, 멤버 프로필, 팬 피드, 응원 투표, 라이브 일정, 굿즈 이벤트, 알림, 채팅창으로 확장하기 좋다.

합격 이유:
- 멤버 4명을 프로필과 콘텐츠 단위로 설계할 수 있다.
- 팬 행동이 감상에 그치지 않고 피드, 투표, 라이브, 채팅으로 연결된다.
- 채팅창이 필요한 명분이 분명하다. 팬들은 라이브 전후로 같은 관심사를 가진 사람들과 실시간 반응을 공유한다.
- 430px 이하 모바일 화면에서 앱다운 밀도와 인터랙션을 보여주기 좋다.

## 02. 프로젝트 정의

프로젝트 정의: 팬 활동이 흩어진 경험을 하나의 모바일 팬덤 허브로 묶는 React 모바일웹.

핵심 목표:
- 팬덤 세계관을 첫 화면에서 강하게 전달한다.
- 팬이 오늘 할 일을 즉시 이해하게 한다.
- 멤버, 피드, 투표, 라이브, 채팅을 하단 탭과 카드 흐름으로 연결한다.
- 채팅창을 포트폴리오 핵심 기능으로 구현한다.

타깃 사용자:
- 라이브 일정과 팬 커뮤니티를 자주 확인하는 10-30대 팬
- 멤버별 콘텐츠와 팬 반응을 빠르게 탐색하고 싶은 사용자
- 같은 팬과 실시간으로 대화하고 싶은 사용자

## 03. 리서치 조사 분석

핵심 발견:
- 팬들은 정보 확인, 감정 표현, 커뮤니티 참여를 한 화면 흐름 안에서 원한다.
- 팬덤 서비스는 콘텐츠 카드만 나열하면 앱처럼 느껴지지 않는다.
- 채팅과 투표는 팬의 참여감을 빠르게 높이는 기능이다.
- 모바일에서는 하단 탭, 알림 배지, 진행률, 상태 피드백이 사용성을 좌우한다.

## 04. 문제정의 및 솔루션 방향

문제:
- 팬덤 활동이 피드, 라이브, 투표, 채팅으로 분리되어 맥락이 끊긴다.
- 팬이 지금 참여할 수 있는 행동이 명확하지 않다.
- 채팅 기능이 없으면 팬끼리 실시간 감정을 공유하기 어렵다.

솔루션:
- Home에 오늘의 라이브, 인기 피드, 진행 중 투표, 채팅 CTA를 함께 배치한다.
- 팬덤 활동을 하단 탭으로 고정한다.
- 채팅창에 읽음 상태, 입력창, 안전 안내를 포함해 실제 서비스처럼 보이게 한다.

## 05. 인사이트 도출

핵심 인사이트:
`팬덤 모바일웹의 가치는 콘텐츠를 보여주는 데서 끝나지 않고, 팬이 지금 함께 참여하고 있다는 감각을 만드는 데 있다.`

## 06. 참고 레퍼런스 제시

레퍼런스 방향:
- 팬덤앱: 멤버, 피드, 라이브, 채팅 구조
- 음악 앱: 하단 탭과 Now 카드
- 커뮤니티 앱: 피드 카드와 댓글/반응 구조
- 메신저 앱: 말풍선, 읽음 상태, 입력창

## 07. 디자인 시스템 추출

디자인 원칙:
- 어두운 우주 배경과 선명한 오로라 포인트
- 모바일 카드의 밀도는 높이되 여백으로 숨을 준다.
- 상태 UI는 색상, 배지, 진행률로 빠르게 인지되게 한다.
- 채팅은 말풍선 대비와 시간/읽음 상태를 명확히 분리한다.

## 08. 디자인 시스템 등록

토큰 요약:
- Color: orbit-night, aurora-lime, plasma-pink, star-white, mist-blue
- Typography: display, title, body, caption
- Radius: shell, card, chip, bubble
- Spacing: mobile-safe, section-gap, card-padding
- Component: bottom-tab, fan-card, vote-card, chat-bubble, chat-input

## 09. 정보구조도 설계

IA:
- Home
- Members
- Feed
- Vote
- Live
- Chat
- My

핵심 흐름:
Home -> 오늘의 라이브 확인 -> 알림 신청 -> 채팅방 진입 -> 팬 반응 공유

Chat UX Flow:
Chat List -> Chat Room -> Message Input -> Sending -> Sent -> Read -> Safety Notice

## 10. 와이어프레임 제작

필수 화면:
- Home
- Member Detail
- Feed
- Vote
- Live
- Notification
- Chat List
- Chat Room
- My

상태:
- 투표 전/후
- 알림 Off/On
- 채팅 입력 전/입력 중/전송 완료/읽음
- 피드 응원 전/후

## 11. 팬덤 세계관 & 카피 전략

Tone:
- 몰입감 있는 우주/오로라 무드
- 팬이 함께 움직인다는 에너지
- 기능 설명보다 참여 행동 중심

핵심 카피:
- `Tonight, Orbit gathers before the light.`
- `지금 켜진 응원, 오늘의 궤도를 바꿉니다.`
- `라이브 전, 같은 마음의 팬들과 먼저 만나세요.`

## 12. Figma 디자인

최종 디자인 기준:
- 430px 모바일 프레임 기준
- 멤버 카드, 피드 카드, 투표 진행률, 라이브 일정, 채팅창을 실제 앱 화면 수준으로 디자인
- 채팅창은 말풍선, 시간, 읽음 상태, 입력창, 안전 안내를 포함

## 13. React 바이브코딩

컴포넌트:
- AppShell
- BottomTabBar
- HomeScreen
- MemberCard
- FeedCard
- VotePoll
- LiveScheduleCard
- NotificationList
- ChatList
- ChatRoom
- ChatBubble
- ChatInput

TypeScript 모델:
- Member
- FeedPost
- VotePollData
- LiveSchedule
- NotificationItem
- ChatRoomData
- ChatMessage
- MessageStatus

## 14. 팬덤 모바일웹 React 구현

구현된 인터랙션:
- 하단 탭 전환
- 투표 선택 후 진행률 변경
- 피드 응원 상태 토글
- 라이브 알림 토글
- 채팅 메시지 입력/전송 데모
- 채팅 안전 안내 표시

## 15. 배포

배포 준비:
- 정적 결과물 `dist/index.html` 생성
- 430px 이하 모바일 기준 QA
- 로컬 서버에서 확인 가능

## 16. 사용성 테스트

필수 테스트:
- 첫 화면 컨셉 이해
- 멤버 정보 탐색
- 투표 참여
- 라이브 알림 신청
- 채팅 메시지 입력/전송
- 신고/차단 안전 UX 위치 확인

## 17. 케이스스터디 장표

장표 흐름:
1. Cover
2. Problem
3. UX Strategy
4. IA
5. Wireframe
6. Design System
7. Key Screens
8. Chat UX
9. React Build
10. Usability Test
11. Final Result
12. Reflection

