# ✅ 배포 체크리스트

GitHub에 프로젝트를 배포하기 전에 이 체크리스트를 확인하세요!

## 📋 사전 준비 (필수)

- [ ] **Git 설치 완료**
  - https://git-scm.com/download/win
  - 설치 후 `git --version` 명령어로 확인

- [ ] **Node.js 설치 완료**
  - https://nodejs.org/ko
  - 설치 후 `node --version` 및 `npm --version` 명령어로 확인

- [ ] **GitHub 계정 생성**
  - https://github.com

## 🚀 빠른 배포 방법 (3가지 중 선택)

### 방법 1: GitHub Desktop (가장 쉬움! ⭐ 추천)

1. **GitHub Desktop 설치**
   - [ ] https://desktop.github.com 에서 다운로드
   - [ ] 설치 후 GitHub 계정으로 로그인

2. **프로젝트 업로드**
   - [ ] GitHub Desktop 열기
   - [ ] `File` → `Add Local Repository` 선택
   - [ ] `C:\Users\ADMIN\Desktop\test` 폴더 선택
   - [ ] "Create a repository" 클릭
   - [ ] Repository 이름: `multiplication-rain-game` 입력
   - [ ] "Publish repository" 클릭

3. **Vercel로 배포 (무료, 자동, 가장 빠름)**
   - [ ] https://vercel.com 방문
   - [ ] GitHub 계정으로 로그인
   - [ ] "New Project" 클릭
   - [ ] 방금 만든 저장소 선택
   - [ ] "Deploy" 클릭
   - [ ] 🎉 완료! URL 받기

### 방법 2: Netlify 드래그 앤 드롭 (코딩 없이 배포)

1. **프로젝트 빌드**
   ```bash
   cd C:\Users\ADMIN\Desktop\test
   npm install
   npm run build
   ```

2. **Netlify에 배포**
   - [ ] https://app.netlify.com/drop 방문
   - [ ] `dist` 폴더를 웹페이지에 드래그 앤 드롭
   - [ ] 🎉 즉시 배포 완료!

### 방법 3: GitHub Pages (명령줄 사용)

1. **로컬 저장소 초기화**
   ```bash
   cd C:\Users\ADMIN\Desktop\test
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **GitHub에 저장소 생성**
   - [ ] https://github.com/new 방문
   - [ ] Repository 이름: `multiplication-rain-game`
   - [ ] Public 선택
   - [ ] "Create repository" 클릭

3. **푸시 및 배포**
   ```bash
   git remote add origin https://github.com/당신의사용자명/multiplication-rain-game.git
   git branch -M main
   git push -u origin main
   
   npm install --save-dev gh-pages
   npm run deploy
   ```

4. **GitHub Pages 활성화**
   - [ ] 저장소 Settings → Pages
   - [ ] Source: `gh-pages` 브랜치 선택
   - [ ] Save 클릭

## 🌐 배포 완료 후

- [ ] 웹사이트 URL 확인
- [ ] 브라우저에서 게임 테스트
- [ ] 모바일에서도 테스트
- [ ] URL을 친구들과 공유! 🎉

## 📱 예상 배포 URL

- **Vercel**: `https://multiplication-rain-game.vercel.app`
- **Netlify**: `https://multiplication-rain-game.netlify.app`
- **GitHub Pages**: `https://당신의사용자명.github.io/multiplication-rain-game/`

## 💡 배포 시간

- **Vercel**: 2-3분
- **Netlify Drop**: 즉시
- **GitHub Pages**: 1-5분

## ⚠️ 주의사항

### vite.config.ts 설정
GitHub Pages 사용 시 `vite.config.ts`의 `base` 경로를 확인하세요:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/multiplication-rain-game/', // 저장소 이름과 동일하게
})
```

**Vercel이나 Netlify를 사용한다면 base를 '/'로 변경하세요:**

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/', // Vercel/Netlify는 루트 경로 사용
})
```

## 🎯 추천 배포 방법

**처음 사용자**: Vercel + GitHub Desktop 조합
- 가장 쉽고 빠름
- 자동 배포
- 무료 HTTPS
- 커스텀 도메인 지원

## 🆘 도움이 필요하면

1. `GITHUB_DEPLOY.md` 파일 참고
2. 각 플랫폼의 공식 문서 확인
3. GitHub Issues에 질문 남기기

---

**준비되셨나요? 위 체크리스트를 따라하면 5분 안에 배포 완료! 🚀**


