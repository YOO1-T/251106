# 설치 및 실행 가이드

## 🚀 빠른 시작

### 1단계: Node.js 설치 확인

터미널(명령 프롬프트)을 열고 다음 명령어를 실행하세요:

```bash
node --version
npm --version
```

Node.js가 설치되어 있지 않다면 [nodejs.org](https://nodejs.org)에서 다운로드하세요.

### 2단계: 프로젝트 의존성 설치

프로젝트 폴더에서 다음 명령어를 실행하세요:

```bash
npm install
```

이 명령어는 필요한 모든 패키지를 자동으로 설치합니다.

### 3단계: 개발 서버 실행

```bash
npm run dev
```

### 4단계: 브라우저에서 열기

브라우저를 열고 다음 주소로 접속하세요:
```
http://localhost:5173
```

## 🎮 게임 조작법

### 키보드 (권장)
- **숫자 키 (0-9)**: 정답 입력
- **Backspace**: 입력 지우기
- **Enter**: 정답 제출

### 마우스/터치
- 화면의 숫자 버튼 클릭
- ⌫ 버튼: 지우기
- ✓ 버튼: 제출

### 게임 중
- **⏸️ 버튼**: 일시정지
- **▶️ 버튼**: 계속하기

## 📦 프로덕션 빌드

프로덕션용으로 빌드하려면:

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

빌드 결과를 미리보려면:

```bash
npm run preview
```

## 🔧 문제 해결

### 포트가 이미 사용 중인 경우

다른 프로그램이 5173 포트를 사용 중이면 Vite가 자동으로 다른 포트를 선택합니다.
터미널에 표시되는 주소를 확인하세요.

### 의존성 설치 오류

캐시를 삭제하고 다시 설치하세요:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

Windows에서는:
```bash
npm cache clean --force
rmdir /s node_modules
del package-lock.json
npm install
```

### 빌드 오류

TypeScript 오류가 있는 경우, 타입 체크를 건너뛰고 빌드할 수 있습니다:

```bash
npm run build -- --force
```

## 💾 데이터 저장

게임 진행 상황, 통계, 설정은 브라우저의 LocalStorage에 자동 저장됩니다.

데이터를 초기화하려면:
1. 브라우저 개발자 도구 열기 (F12)
2. Application (Chrome) 또는 Storage (Firefox) 탭
3. Local Storage 선택
4. multiplication-rain로 시작하는 항목 삭제

## 🌐 배포

### Vercel에 배포

1. [Vercel](https://vercel.com) 가입
2. 프로젝트 import
3. 자동 배포 시작

### Netlify에 배포

1. [Netlify](https://netlify.com) 가입
2. 새 사이트 추가
3. 빌드 명령어: `npm run build`
4. 배포 폴더: `dist`

### GitHub Pages에 배포

`vite.config.ts`에 base 경로 추가:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/repository-name/'
})
```

그리고 빌드 후 dist 폴더를 GitHub Pages에 업로드하세요.

## 📱 모바일에서 테스트

같은 네트워크의 모바일 기기에서 테스트하려면:

1. 개발 서버 실행 시 표시되는 네트워크 주소 확인
2. 모바일 브라우저에서 해당 주소 접속

예: `http://192.168.1.100:5173`

## ⚙️ 개발 환경 설정

### VS Code 추천 확장

- ESLint
- Prettier
- TypeScript Vue Plugin (Volar)
- ES7+ React/Redux/React-Native snippets

### 코드 스타일

프로젝트는 TypeScript strict 모드를 사용합니다.
린팅 실행:

```bash
npm run lint
```

## 📞 지원

문제가 발생하면:
1. README.md의 문제 해결 섹션 확인
2. GitHub Issues에 버그 리포트 작성
3. 상세한 오류 메시지와 함께 문의

즐거운 학습 되세요! 🎉


