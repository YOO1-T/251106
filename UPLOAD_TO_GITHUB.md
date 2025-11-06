# 📤 GitHub에 프로젝트 올리기

**저장소**: https://github.com/YOO1-T/251106.git  
**계정**: YOO-1T

## 🎯 가장 쉬운 방법: GitHub Desktop 사용 (추천!)

### 1단계: GitHub Desktop 설치

1. **다운로드**
   ```
   https://desktop.github.com
   ```

2. **설치 및 로그인**
   - 다운로드한 파일 실행
   - GitHub 계정으로 로그인 (YOO-1T)

### 2단계: 프로젝트 추가

1. **GitHub Desktop 열기**

2. **저장소 추가**
   - `File` → `Add Local Repository` 클릭
   - `Choose...` 버튼 클릭
   - `C:\Users\ADMIN\Desktop\test` 폴더 선택
   - "The directory does not appear to be a Git repository" 에러가 나면:
     - "create a repository" 링크 클릭

3. **저장소 생성**
   - Name: `251106` (이미 만들어진 저장소 이름과 동일하게)
   - Description: `구구단 산성비 게임 - 초등학교 2학년 곱셈 학습 게임`
   - "Create Repository" 클릭

### 3단계: 기존 GitHub 저장소에 연결

1. **Repository 메뉴 클릭**
   - `Repository` → `Repository settings...`

2. **Remote 설정**
   - Primary remote repository (origin)
   - URL 입력: `https://github.com/YOO1-T/251106.git`
   - "Save" 클릭

### 4단계: 파일 커밋 및 푸시

1. **변경사항 확인**
   - 왼쪽 패널에 모든 파일이 표시됨

2. **커밋 메시지 작성**
   - 왼쪽 하단 "Summary" 입력란:
     ```
     Initial commit: 구구단 산성비 게임
     ```
   - "Commit to main" 버튼 클릭

3. **GitHub에 푸시**
   - 상단의 "Push origin" 버튼 클릭
   - GitHub 계정 인증 (필요시)

4. **완료!** 🎉
   - https://github.com/YOO1-T/251106 에서 확인

---

## 💻 방법 2: 명령줄 사용 (Git 설치 필요)

### 사전 준비: Git 설치

1. **Git 다운로드**
   ```
   https://git-scm.com/download/win
   ```

2. **설치**
   - `.exe` 파일 실행
   - "Git from the command line and also from 3rd-party software" 옵션 선택
   - 나머지는 기본값으로 설치

3. **확인** (새 PowerShell 열기)
   ```bash
   git --version
   ```

4. **사용자 정보 설정**
   ```bash
   git config --global user.name "YOO-1T"
   git config --global user.email "your.email@example.com"
   ```

### 프로젝트 업로드

1. **프로젝트 폴더로 이동**
   ```bash
   cd C:\Users\ADMIN\Desktop\test
   ```

2. **Git 저장소 초기화**
   ```bash
   git init
   ```

3. **원격 저장소 연결**
   ```bash
   git remote add origin https://github.com/YOO1-T/251106.git
   ```

4. **파일 추가**
   ```bash
   git add .
   ```

5. **커밋**
   ```bash
   git commit -m "Initial commit: 구구단 산성비 게임"
   ```

6. **푸시**
   ```bash
   git branch -M main
   git push -u origin main
   ```

7. **GitHub 인증**
   - 브라우저가 열리면 로그인
   - 또는 Personal Access Token 입력

---

## 🔐 GitHub 인증 (필요시)

### Personal Access Token 생성

명령줄에서 푸시할 때 비밀번호 대신 토큰이 필요합니다:

1. **GitHub 웹사이트 방문**
   - https://github.com/settings/tokens

2. **토큰 생성**
   - "Generate new token" → "Generate new token (classic)"
   - Note: "Multiplication Rain Game"
   - Expiration: 90 days (원하는 기간)
   - 권한 선택:
     - ✅ repo (전체)
   - "Generate token" 클릭

3. **토큰 복사**
   - 생성된 토큰을 복사하여 안전하게 보관
   - (다시 볼 수 없으니 주의!)

4. **푸시할 때 사용**
   - Username: `YOO-1T`
   - Password: (복사한 토큰 붙여넣기)

---

## 📝 .gitignore 파일 확인

이미 프로젝트에 `.gitignore` 파일이 있습니다. 불필요한 파일(node_modules 등)은 자동으로 제외됩니다.

---

## ✅ 업로드 후 확인사항

업로드가 완료되면:

1. **GitHub 저장소 확인**
   ```
   https://github.com/YOO1-T/251106
   ```

2. **파일 확인**
   - [ ] src/ 폴더
   - [ ] package.json
   - [ ] README.md
   - [ ] vite.config.ts
   - [ ] 기타 모든 파일

3. **저장소 설명 추가** (선택사항)
   - GitHub 저장소 페이지에서
   - ⚙️ 버튼 클릭
   - About 섹션 편집:
     - Description: "구구단 산성비 게임 - 초등학교 2학년 곱셈 학습 게임"
     - Website: (배포 후 URL 추가)
     - Topics: `react`, `typescript`, `game`, `education`, `multiplication`

---

## 🌐 다음 단계: GitHub Pages로 배포

파일이 올라간 후 배포하려면:

### 방법 1: Vite 설정 수정

`vite.config.ts` 파일에서 base 경로 수정:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/251106/', // 저장소 이름과 일치
})
```

### 방법 2: 배포 명령어

```bash
# gh-pages 패키지 설치
npm install --save-dev gh-pages

# 배포
npm run deploy
```

### 방법 3: GitHub Pages 활성화

1. GitHub 저장소 → Settings → Pages
2. Source: `gh-pages` 브랜치 선택
3. Save

**배포 완료 URL:**
```
https://yoo1-t.github.io/251106/
```

---

## 🚀 더 쉬운 배포: Vercel 사용

1. **Vercel 방문**
   ```
   https://vercel.com
   ```

2. **배포**
   - GitHub로 로그인
   - "New Project" 클릭
   - `251106` 저장소 선택
   - "Deploy" 클릭

3. **완료!**
   - URL: `https://251106.vercel.app` (자동 생성)

---

## 🔄 코드 수정 후 다시 올리기

### GitHub Desktop 사용:
1. 파일 수정
2. GitHub Desktop에서 변경사항 확인
3. 커밋 메시지 작성
4. "Commit to main" 클릭
5. "Push origin" 클릭

### 명령줄 사용:
```bash
git add .
git commit -m "Update: 수정 내용"
git push
```

---

## 🆘 문제 해결

### "failed to push some refs" 오류

**원인:** 원격 저장소에 로컬에 없는 내용이 있음

**해결:**
```bash
git pull origin main --rebase
git push origin main
```

### 인증 실패

**해결:**
1. Personal Access Token 생성 (위 참고)
2. 토큰을 비밀번호로 사용

### "Repository not found" 오류

**원인:** 저장소 URL 또는 권한 문제

**확인:**
1. 저장소가 실제로 존재하는지
2. 저장소 URL이 정확한지
3. 계정에 권한이 있는지

---

## 📞 완료!

모든 단계를 완료하면:

✅ 코드가 GitHub에 백업됨  
✅ 버전 관리 가능  
✅ 협업 가능  
✅ 배포 준비 완료

**저장소 URL:** https://github.com/YOO1-T/251106

축하합니다! 🎉


