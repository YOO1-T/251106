# 🚀 GitHub 배포 가이드

이 가이드는 구구단 산성비 게임을 GitHub에 업로드하고 GitHub Pages로 배포하는 방법을 설명합니다.

## 📋 사전 준비

### 1. Git 설치

1. **Git 다운로드**
   - https://git-scm.com/download/win
   - Windows용 Git 다운로드

2. **Git 설치**
   - 다운로드한 `.exe` 파일 실행
   - 기본 설정으로 설치 (Next 클릭)
   - **중요 옵션**:
     - "Git from the command line and also from 3rd-party software" 선택
     - "Use Visual Studio Code as Git's default editor" (선택사항)

3. **설치 확인**
   - 새 PowerShell 또는 명령 프롬프트 열기
   ```bash
   git --version
   ```

4. **Git 사용자 정보 설정**
   ```bash
   git config --global user.name "당신의 이름"
   git config --global user.email "당신의 이메일@example.com"
   ```

### 2. GitHub 계정 만들기

1. https://github.com 방문
2. "Sign up" 클릭하여 계정 생성
3. 이메일 인증 완료

## 📤 GitHub에 프로젝트 업로드

### 방법 1: GitHub Desktop 사용 (초보자 권장)

#### A. GitHub Desktop 설치
1. https://desktop.github.com 방문
2. Windows용 다운로드 및 설치
3. GitHub 계정으로 로그인

#### B. 프로젝트 업로드
1. GitHub Desktop 열기
2. `File` → `Add Local Repository` 클릭
3. `C:\Users\ADMIN\Desktop\test` 폴더 선택
4. "Create a repository" 클릭
5. Repository 이름: `multiplication-rain-game` (또는 원하는 이름)
6. Description: "구구단 산성비 게임 - 초등학교 2학년 곱셈 학습 게임"
7. "Create Repository" 클릭
8. "Publish repository" 클릭
   - ✅ "Keep this code private" 체크 해제 (공개)
9. GitHub에 업로드 완료!

### 방법 2: 명령줄 사용 (고급 사용자)

#### A. 로컬 저장소 초기화
```bash
cd C:\Users\ADMIN\Desktop\test
git init
git add .
git commit -m "Initial commit: 구구단 산성비 게임"
```

#### B. GitHub에 새 저장소 생성
1. https://github.com 로그인
2. 우측 상단 `+` → `New repository` 클릭
3. Repository name: `multiplication-rain-game`
4. Description: "구구단 산성비 게임 - 초등학교 2학년 곱셈 학습 게임"
5. Public 선택
6. "Create repository" 클릭

#### C. 원격 저장소 연결 및 푸시
```bash
git remote add origin https://github.com/당신의사용자명/multiplication-rain-game.git
git branch -M main
git push -u origin main
```

## 🌐 GitHub Pages로 웹사이트 배포

### 1단계: Vite 설정 수정

`vite.config.ts` 파일을 다음과 같이 수정하세요:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/multiplication-rain-game/', // GitHub 저장소 이름으로 변경
})
```

### 2단계: 배포 스크립트 추가

`package.json`의 `scripts` 섹션에 다음을 추가하세요:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "deploy": "npm run build && npx gh-pages -d dist"
  }
}
```

### 3단계: gh-pages 패키지 설치

```bash
npm install --save-dev gh-pages
```

### 4단계: 변경사항 커밋 및 푸시

```bash
git add .
git commit -m "Add GitHub Pages deployment config"
git push
```

### 5단계: GitHub Pages 배포

```bash
npm run deploy
```

이 명령어가 자동으로:
1. 프로젝트를 빌드하고
2. `gh-pages` 브랜치를 생성하고
3. 빌드된 파일을 GitHub에 업로드합니다

### 6단계: GitHub Pages 활성화

1. GitHub 저장소 페이지로 이동
2. `Settings` → `Pages` 클릭
3. Source: `gh-pages` 브랜치 선택
4. 폴더: `/ (root)` 선택
5. `Save` 클릭

### 7단계: 웹사이트 확인

약 1-2분 후, 다음 주소로 접속하세요:
```
https://당신의사용자명.github.io/multiplication-rain-game/
```

## 🔄 업데이트 배포

코드를 수정한 후 다시 배포하려면:

```bash
# 변경사항 커밋
git add .
git commit -m "Update: 수정 내용 설명"
git push

# GitHub Pages에 재배포
npm run deploy
```

## 📱 다른 배포 옵션

### Vercel (권장 - 가장 쉬움)

1. https://vercel.com 방문
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. GitHub 저장소 선택
5. 자동 배포 시작!
6. 완료 후 제공되는 URL로 접속

**장점:**
- 자동 HTTPS
- 커밋할 때마다 자동 재배포
- 무료 도메인 제공
- 더 빠른 성능

### Netlify

1. https://netlify.com 방문
2. GitHub 계정으로 로그인
3. "New site from Git" 클릭
4. GitHub 저장소 선택
5. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. "Deploy site" 클릭

## 🎯 완료!

축하합니다! 이제 구구단 산성비 게임이 전 세계 어디서나 접속 가능한 웹사이트가 되었습니다! 🎉

### 배포된 사이트 URL 예시:

- **GitHub Pages**: `https://당신의사용자명.github.io/multiplication-rain-game/`
- **Vercel**: `https://multiplication-rain-game.vercel.app`
- **Netlify**: `https://multiplication-rain-game.netlify.app`

## 🔧 문제 해결

### 페이지가 빈 화면으로 보일 때
- `vite.config.ts`의 `base` 경로가 올바른지 확인
- 저장소 이름과 일치하는지 확인

### 404 에러가 발생할 때
- GitHub Pages가 활성화되어 있는지 확인
- `gh-pages` 브랜치가 생성되었는지 확인

### 배포 후 변경사항이 반영되지 않을 때
- 브라우저 캐시 삭제 (Ctrl + F5)
- 1-2분 대기 후 다시 시도

## 📞 추가 도움

더 자세한 정보가 필요하면:
- GitHub Pages 문서: https://pages.github.com/
- Vite 배포 가이드: https://vitejs.dev/guide/static-deploy.html
- Vercel 문서: https://vercel.com/docs

즐거운 배포 되세요! 🚀


