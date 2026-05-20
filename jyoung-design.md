# JYOUNG UIUX AI PROJECT SYSTEM

## AI 기반 UIUX 프로젝트 스타터 시스템

이 문서는 초보 학생들도 AI와 함께
안정적으로 UIUX 프로젝트를 제작할 수 있도록 만든
AI 기반 프로젝트 제작 시스템입니다.

핵심 목적은:

```txt
감성적인 표현 ❌
CSS 속성 기반 설계 ⭕
```

입니다.

AI가 디자인을 흔들리지 않게 구현하도록
실질적인 수치와 규칙을 명확하게 정의합니다.

---

# System Goal

## 핵심 목표

- 초보 학생도 일정한 디자인 퀄리티 유지
- AI가 디자인을 랜덤하게 생성하지 않도록 제어
- 디자인 시스템 기반 프로젝트 제작
- Vibe Coding 기반 실전 프로젝트 제작
- Claude / Cursor / GPT / MCP 대응
- Tailwind 기반 실전 구현 최적화

---

# ZIP 다운로드 구조

```txt
/project-name.zip

├── jyoung-uiux.md
├── custom.md
├── style-guide.css
├── tokens.json
├── prompt.txt
└── README.md
```

---

# 1. jyoung-uiux.md

## 역할

수정하지 않는
기본 디자인 시스템 원본 파일

AI는 항상 이 문서를 기준으로 작업합니다.

---

# 포함 내용

## Design Principle

```txt
- Minimal
- Clean
- Professional
- Spacious
- Modern
- Editorial
```

---

# Typography System

## Main Title

```css
font-size: 52px;
font-weight: 800;
line-height: 1.1;
letter-spacing: -0.02em;
```

---

## Subtitle

```css
font-size: 28px;
font-weight: 700;
line-height: 1.3;
letter-spacing: -0.02em;
```

---

## Body Text

```css
font-size: 16px;
font-weight: 400;
line-height: 1.4;
letter-spacing: -0.02em;
```

---

## Card Title

```css
font-size: 32px;
font-weight: 700;
line-height: 1.2;
letter-spacing: -0.02em;
```

---

# Layout System

## Desktop Container

```css
max-width: 1440px;
margin: 0 auto;
```

---

## Laptop

```css
width: 90%;
margin: 0 auto;
```

---

## Mobile

```css
padding: 0 20px;
```

허용 범위:

```css
padding: 0 20px;
padding: 0 24px;
```

---

# Spacing Rules

## Title Group

```css
gap: 30px;
```

---

## Section Spacing

```css
padding-block:
clamp(80px, 10vw, 160px);
```

---

# Border System

## Default Border

```css
border: 1px solid #111;
```

---

# Radius System

## Default

```txt
8px
16px
24px
```

---

# Shadow System

## Default

```txt
none
```

허용 범위:

```txt
none
minimal
soft
```

---

# Motion System

## 기본 원칙

```txt
- subtle motion only
- fast transition
- layout shift 금지
- 과한 animation 금지
```

---

# Button System

## Button Height

```css
sm: 40px;
md: 48px;
lg: 56px;
```

---

## Primary Button

```css
border: 1px solid #111;
background: #111;
color: #fff;
```

---

# Input System

```css
height: 56px;
border: 1px solid #111;
padding-inline: 20px;
```

---

# Card System

```css
border: 1px solid #111;
border-radius: 24px;
padding: 32px;
background: #fff;
```

---

# Image System

## Image Source

```txt
Unsplash 사용
```

## Rules

```txt
- 고퀄리티 실사 이미지 사용
- 과한 stock 느낌 금지
- blur 과다 사용 금지
- overlay 최소화
```

---

# Icon System

## Icon Library

```txt
Font Awesome 사용
```

## Rules

```txt
- outline icon 우선
- fill icon 최소화
- icon size 통일
```

---

# Z-index System

```css
header: 100;
dropdown: 300;
modal: 1000;
loading: 9999;
```

---

# Max Text Width

```css
max-width: 680px;
```

---

# Responsive Rules

```txt
- mobile-first
- clamp 적극 사용
- fixed width 금지
- responsive typography 사용
```

---

# AI 금지 리스트

```txt
- neumorphism 금지
- glassmorphism 과다 사용 금지
- gradient 남용 금지
- glow 효과 금지
- floating animation 금지
- bounce animation 금지
- random font mixing 금지
- full rounded button 남용 금지
```

---

# Section Structure Template

```txt
subtitle
title
description
button
image
```

---

# 2. custom.md

## 역할

사용자가 직접 입력한 값 저장.

입력값이 있다면
AI는 custom.md 값을 우선 적용합니다.

---

# 포함 항목

```md
# custom.md

## Project Name

## Main Font

## Primary Color

## Accent Color

## Background Color

## Radius Style

## Shadow Style

## Motion Style

## Mood Keywords

## Project Type

## Responsive Priority
```

---

# 기본 규칙

```txt
미입력 항목은
jyoung-uiux.md 기본값 자동 적용
```

---

# 3. style-guide.css

## 역할

실제 구현용 CSS 변수 파일

---

## 예시

```css
:root{
  --primary:#111111;
  --accent:#2563eb;

  --font-main:'Pretendard';

  --radius-md:16px;
  --radius-lg:24px;

  --container:1440px;
}
```

---

# 4. tokens.json

## 역할

Figma / MCP / Claude / Cursor 대응용 토큰 시스템

---

## 예시

```json
{
  "color": {
    "primary": "#111111",
    "accent": "#2563eb"
  },
  "radius": {
    "md": "16px",
    "lg": "24px"
  }
}
```

---

# 5. prompt.txt

## 역할

학생들이 AI에게 그대로 붙여넣는 프롬프트

---

## 예시

```txt
이 프로젝트는
jyoung-uiux.md 기준으로 작업한다.

사용자 정의 값은
custom.md를 우선 적용한다.

모든 UI는
spacing / typography / color system /
motion system 규칙을 유지한다.

Tailwind 기반으로 구현하고,
mobile-first 기준으로 제작한다.

과한 shadow / gradient / glow 사용 금지.
```

---

# 6. README.md

## 역할

프로젝트 사용 설명서

---

## 예시

```md
# Project Starter

AI 기반 UIUX 프로젝트 스타터 시스템입니다.

## Included Files

- jyoung-uiux.md
- custom.md
- style-guide.css
- tokens.json
- prompt.txt

## Usage

1. AI에게 md파일 첨부
2. prompt.txt 입력
3. 프로젝트 생성
```

---

# 최종 방향성

이 시스템의 핵심은:

```txt
디자인 감각 의존 ❌
AI가 이해 가능한 설계 ⭕
```

입니다.

학생들은 이제:

- 디자인 시스템 입력
- custom 설정 입력
- AI에 prompt 입력
- 프로젝트 생성

흐름으로 안정적인 UIUX 프로젝트를 제작할 수 있습니다.

