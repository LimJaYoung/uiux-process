# JYOUNG UIUX AI PROJECT SYSTEM

AI 기반 UIUX 프로젝트 스타터 시스템입니다.
이 문서를 AI에 첨부하면 일관된 디자인 퀄리티로 프로젝트를 제작할 수 있습니다.

---

# Design Principle

```txt
Minimal / Clean / Professional / Spacious / Modern / Editorial
```

---

# Breakpoint System

```css
xs:  375px    /* 일반 모바일 (iPhone SE ~ 기본) */
sm:  480px    /* 대형 모바일 */
md:  768px    /* 태블릿 */
lg:  1024px   /* 노트북 */
xl:  1440px   /* 데스크탑 */
```

```txt
- 기본(default)은 320px 이상 소형 모바일 기준
- mobile-first 기준 작성
- min-width 기반 미디어쿼리 사용
- max-width 기반 미디어쿼리 금지
```

---

# Typography System

```txt
- 모든 font-size는 clamp() 사용
- 고정 px 단독 사용 금지
```

## Title Font (h1 ~ h6 공통 적용)
```css
font-family: "NexonLv2Gothic", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
```

## Main Title
```css
font-size: clamp(28px, 5vw, 52px);
font-weight: 800;
line-height: 1.1;
letter-spacing: -0.02em;
```

## Subtitle
```css
font-size: clamp(18px, 3vw, 28px);
font-weight: 700;
line-height: 1.3;
letter-spacing: -0.02em;
```

## Body Text
```css
font-size: clamp(14px, 1.5vw, 16px);
font-weight: 400;
line-height: 1.6;
letter-spacing: -0.02em;
```

## Card Title (2단)
```css
font-size: clamp(24px, 3.2vw, 46px);
font-weight: 600;
line-height: 1.4;
letter-spacing: -0.02em;
```

## Card Title (3단)
```css
font-size: clamp(18px, 2.1vw, 30px);
font-weight: 600;
line-height: 1.4;
letter-spacing: -0.02em;
```

## Caption / Label
```css
font-size: clamp(12px, 1.2vw, 14px);
font-weight: 400;
line-height: 1.4;
```

---

# Layout System

## Container
```css
max-width: 1440px;      /* desktop */
width: 90%;             /* laptop */
padding-inline: clamp(20px, 5vw, 24px);  /* mobile */
margin: 0 auto;
```

## Max Text Width
```css
max-width: 680px;
```

---

# Grid System

```txt
mobile  (< 768px)   → 1 column
tablet  (≥ 768px)   → 2 column
desktop (≥ 1024px)  → 3 column
```

## CSS
```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: clamp(16px, 2vw, 32px);
```

## Tailwind
```txt
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8
```

---

# Spacing System

## Section
```css
padding-block: clamp(80px, 10vw, 160px);
```

## Title Group
```css
gap: clamp(16px, 2vw, 30px);
```

## Component
```css
gap: clamp(12px, 1.5vw, 24px);
```

---

# Border System

```css
border: 1px solid #111;
```

---

# Radius System

```txt
8px   → small  (badge, tag)
16px  → medium (button, input)
24px  → large  (card, modal)
```

---

# Shadow System

```txt
기본값: none
허용: none / minimal / soft
```

---

# Motion System

```txt
- subtle motion only
- fast transition
- layout shift 금지
- 과한 animation 금지
- prefers-reduced-motion 대응 필수
```

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# Button System

```css
/* Height */
sm: 40px;
md: 48px;
lg: 56px;

/* 터치 타겟 최솟값 (필수) */
min-height: 44px;
min-width: 44px;

/* Primary */
border: 1px solid #111;
background: #111;
color: #fff;
padding-inline: clamp(16px, 2vw, 24px);
```

---

# Input System

```css
height: 56px;
min-height: 44px;
border: 1px solid #111;
padding-inline: 20px;
font-size: 16px;   /* iOS 자동 줌 방지 — 16px 미만 금지 */
```

---

# Card System

```css
border: 1px solid #111;
border-radius: 24px;
padding: clamp(20px, 3vw, 32px);
background: #fff;
```

---

# Image System

```txt
- Unsplash 사용
- 고퀄리티 실사 이미지
- overlay 최소화 / blur 과다 사용 금지
```

## 반응형 규칙 (필수)
```css
aspect-ratio: 16 / 9;
object-fit: cover;
width: 100%;
height: auto;
display: block;
```

## 용도별 비율
```txt
Hero          → 16:9
Card 썸네일   → 4:3 또는 16:9
프로필 아바타 → 1:1
배너          → 21:9
```

---

# Icon System

```txt
- Font Awesome 사용
- outline icon 우선
- 터치 클릭 영역 최소 44x44px 확보
```

---

# Z-index System

```css
header:   100;
dropdown: 300;
modal:    1000;
loading:  9999;
```

---

# Section Structure

```txt
subtitle → title → description → button → image
```

---

# AI 금지 리스트

```txt
- neumorphism 금지
- glassmorphism 과다 사용 금지
- gradient 남용 금지
- glow 효과 금지
- floating / bounce animation 금지
- random font mixing 금지
- full rounded button 남용 금지
- font-size 고정 px 단독 사용 금지
- input font-size 16px 미만 금지
- 이미지 aspect-ratio 미지정 금지
- 터치 타겟 44px 미만 금지
- max-width 기반 미디어쿼리 금지
```

---

# Custom Values

> 아래 값은 사용자가 직접 입력한 커스텀 설정입니다.
> 입력값이 있을 경우 기본값보다 우선 적용됩니다.

## 폰트 스타일
{{font_style | 기본값: Pretendard, Noto Sans KR, sans-serif}}

## 폰트 웨이트
{{font_weight | 기본값: 400 / 600 / 800}}

## 포인트 칼라
{{accent_color | 기본값: #2563eb}}

## 프라이머리 칼라
{{primary_color | 기본값: #111111}}

## 버튼 라운드
{{button_radius | 기본값: 16px}}

## 카드 라운드
{{card_radius | 기본값: 24px}}

## 추가 기준
{{extra_notes | 기본값: Minimal, Clean, Professional, Spacious, Modern, Editorial 톤을 유지한다.}}
