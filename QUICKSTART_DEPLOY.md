# ⚡ 5분 만에 배포하기

가장 쉬운 방법으로 구구단 산성비 게임을 인터넷에 배포해보세요!

## 🎯 가장 쉬운 방법: Vercel (추천!)

### 1단계: GitHub Desktop으로 코드 업로드 (2분)

1. **GitHub Desktop 다운로드**
   ```
   https://desktop.github.com
   ```
   - 다운로드 후 설치
   - GitHub 계정으로 로그인 (없으면 가입)

2. **프로젝트 업로드**
   - GitHub Desktop 열기
   - `File` → `Add Local Repository` 클릭
   - 찾아보기 클릭 → `C:\Users\ADMIN\Desktop\test` 선택
   - "Create a repository" 클릭
   - 이름: `multiplication-rain-game` 입력
   - "Publish repository" 클릭
   - ✅ Public (공개) 선택
   - Publish 클릭

   **완료!** 코드가 GitHub에 업로드되었습니다!

### 2단계: Vercel로 배포 (2분)

1. **Vercel 사이트 방문**
   ```
   https://vercel.com
   ```

2. **로그인 및 배포**
   - "Start Deploying" 또는 "Sign Up" 클릭
   - "Continue with GitHub" 선택
   - GitHub 계정으로 로그인
   - "New Project" 클릭
   - `multiplication-rain-game` 저장소 찾기
   - "Import" 클릭
   - 아무것도 수정하지 말고 "Deploy" 클릭

3. **배포 완료!** 🎉
   - 2-3분 후 완료
   - 생성된 URL 클릭
   - 게임이 인터넷에 공개되었습니다!

### 예상 URL
```
https://multiplication-rain-game.vercel.app
```

---

## 🌐 다른 방법들

### 방법 2: Netlify Drop (드래그 앤 드롭)

**필요 조건**: Node.js 설치 필요

1. **프로젝트 빌드**
   - PowerShell 또는 명령 프롬프트 열기
   ```bash
   cd C:\Users\ADMIN\Desktop\test
   npm install
   npm run build
   ```

2. **Netlify Drop 사용**
   - https://app.netlify.com/drop 방문
   - `test/dist` 폴더를 웹페이지로 드래그 앤 드롭
   - 즉시 배포 완료!

### 방법 3: GitHub Pages

**필요 조건**: Git, Node.js 설치 필요

1. **설정 파일 수정**
   - `vite.config.ts` 파일 열기
   - `base` 경로 확인:
   ```typescript
   base: '/multiplication-rain-game/',
   ```

2. **명령어 실행**
   ```bash
   cd C:\Users\ADMIN\Desktop\test
   
   # Git 초기화
   git init
   git add .
   git commit -m "Initial commit"
   
   # GitHub에 푸시 (저장소를 먼저 github.com에서 만들어야 함)
   git remote add origin https://github.com/당신의사용자명/multiplication-rain-game.git
   git push -u origin main
   
   # GitHub Pages 배포
   npm install --save-dev gh-pages
   npm run deploy
   ```

3. **GitHub Pages 활성화**
   - GitHub 저장소 → Settings → Pages
   - Source: `gh-pages` 브랜치 선택
   - Save

---

## 📱 배포 후 해야 할 일

### ✅ 테스트
- [ ] PC 브라우저에서 게임 실행
- [ ] 스마트폰에서 접속해보기
- [ ] 게임이 정상 작동하는지 확인

### 🎉 공유
- [ ] URL을 친구들에게 공유
- [ ] SNS에 게시
- [ ] 포트폴리오에 추가

### 🔄 업데이트 방법

**Vercel 사용 시** (자동):
1. GitHub Desktop에서 변경사항 커밋
2. "Push origin" 클릭
3. Vercel이 자동으로 재배포!

**Netlify Drop 사용 시**:
1. 다시 빌드: `npm run build`
2. dist 폴더를 다시 드래그 앤 드롭

---

## 🆘 문제 해결

### "npm이 인식되지 않습니다" 오류
→ Node.js를 설치하세요: https://nodejs.org/ko

### "git이 인식되지 않습니다" 오류
→ Git을 설치하세요: https://git-scm.com/download/win

### 페이지가 빈 화면으로 보임
→ Vercel/Netlify 사용 시 `vite.config.ts`의 base를 `/`로 변경:
```typescript
base: '/', // GitHub Pages가 아닌 경우
```

### 404 에러
→ GitHub Pages 사용 시 저장소 이름과 base 경로가 일치하는지 확인

---

## 💡 꿀팁

1. **Vercel 추천 이유**
   - ✅ 가장 쉬움
   - ✅ 자동 HTTPS
   - ✅ 커밋할 때마다 자동 재배포
   - ✅ 빠른 속도
   - ✅ 무료

2. **커스텀 도메인 연결** (선택사항)
   - Vercel 대시보드 → Settings → Domains
   - 원하는 도메인 추가 (예: gugudangame.com)

3. **성능 모니터링**
   - Vercel 대시보드에서 방문자 수, 속도 확인 가능

---

## 🎓 더 자세한 정보

- 상세 가이드: `GITHUB_DEPLOY.md` 참고
- 체크리스트: `DEPLOYMENT_CHECKLIST.md` 참고

**축하합니다! 이제 전 세계 누구나 당신의 게임을 플레이할 수 있습니다! 🎮🌍**


