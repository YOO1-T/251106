# 🔧 Git 설치 가이드 (Windows)

## 📥 방법 1: Git 공식 설치 프로그램 (추천)

### 1단계: 다운로드

**공식 사이트에서 다운로드:**
```
https://git-scm.com/download/win
```

또는 직접 다운로드 링크:
```
https://github.com/git-for-windows/git/releases/latest
```

- **64-bit**: `Git-2.x.x-64-bit.exe` 다운로드 (대부분의 컴퓨터)
- **32-bit**: `Git-2.x.x-32-bit.exe` 다운로드

### 2단계: 설치

1. **다운로드한 `.exe` 파일 실행**

2. **설치 옵션 선택** (권장 설정):

   #### ✅ 중요 설정들:
   
   - **Select Components**
     - ✅ Windows Explorer integration (체크)
     - ✅ Git Bash Here (체크)
     - ✅ Git GUI Here (체크)
   
   - **Choosing the default editor**
     - 추천: "Use Visual Studio Code as Git's default editor"
     - 또는: "Use Notepad as Git's default editor" (간단)
   
   - **Adjusting your PATH environment**
     - ✅ **"Git from the command line and also from 3rd-party software"** (필수!)
   
   - **Choosing HTTPS transport backend**
     - ✅ "Use the OpenSSL library" (기본값)
   
   - **Configuring the line ending conversions**
     - ✅ "Checkout Windows-style, commit Unix-style line endings" (기본값)
   
   - **Configuring the terminal emulator**
     - ✅ "Use MinTTY" (기본값)
   
   - **나머지는 모두 기본값으로 진행**

3. **Install 클릭**

4. **설치 완료!**

### 3단계: 설치 확인

1. **새로운 PowerShell 또는 명령 프롬프트 열기** (중요: 새로 열어야 함!)

2. **다음 명령어 실행:**
   ```bash
   git --version
   ```

3. **결과 예시:**
   ```
   git version 2.43.0.windows.1
   ```

   이렇게 나오면 설치 성공! ✅

### 4단계: Git 사용자 정보 설정

Git을 처음 사용하기 전에 사용자 정보를 설정해야 합니다:

```bash
git config --global user.name "당신의 이름"
git config --global user.email "your.email@example.com"
```

**예시:**
```bash
git config --global user.name "홍길동"
git config --global user.email "hong@example.com"
```

**설정 확인:**
```bash
git config --global user.name
git config --global user.email
```

---

## 📥 방법 2: GitHub Desktop (Git 포함, 더 쉬움!)

Git 명령어가 어렵다면 GitHub Desktop을 설치하세요. Git이 자동으로 포함됩니다!

### 1단계: 다운로드
```
https://desktop.github.com
```

### 2단계: 설치
1. 다운로드한 `GitHubDesktopSetup.exe` 실행
2. 자동으로 설치됨 (설정 필요 없음)
3. GitHub 계정으로 로그인

### 3단계: 사용
- GUI로 Git 사용 가능
- 명령어 몰라도 OK
- 초보자에게 완벽!

---

## 🎯 설치 후 다음 단계

### Git 설치 완료 후:

1. **프로젝트 폴더로 이동**
   ```bash
   cd C:\Users\ADMIN\Desktop\test
   ```

2. **Git 저장소 초기화**
   ```bash
   git init
   ```

3. **파일 추가**
   ```bash
   git add .
   ```

4. **첫 커밋**
   ```bash
   git commit -m "Initial commit: 구구단 산성비 게임"
   ```

5. **GitHub에 연결** (저장소를 먼저 github.com에서 만들어야 함)
   ```bash
   git remote add origin https://github.com/당신의사용자명/multiplication-rain-game.git
   git branch -M main
   git push -u origin main
   ```

---

## 🆘 문제 해결

### "git이 인식되지 않습니다" 오류

**원인:** PATH 환경 변수에 Git이 추가되지 않음

**해결 방법:**

1. **PowerShell/명령 프롬프트를 새로 열기**
   - 기존 창을 닫고 새로 열어야 합니다!

2. **그래도 안 되면 수동으로 PATH 추가:**
   - Windows 검색에서 "환경 변수" 검색
   - "시스템 환경 변수 편집" 클릭
   - "환경 변수" 버튼 클릭
   - "시스템 변수"에서 "Path" 선택 → "편집"
   - "새로 만들기" 클릭
   - 추가: `C:\Program Files\Git\cmd`
   - 확인 후 PowerShell 재시작

3. **재설치:**
   - Git 제거 후 다시 설치
   - "Add to PATH" 옵션 확인

### 한글이 깨져 보일 때

```bash
git config --global core.quotepath false
git config --global gui.encoding utf-8
```

### 자격 증명 저장

매번 비밀번호 입력하기 귀찮다면:

```bash
git config --global credential.helper wincred
```

---

## 💡 Git 기본 명령어 치트시트

```bash
# 저장소 초기화
git init

# 파일 추가
git add .                    # 모든 파일
git add 파일명.txt           # 특정 파일

# 커밋 (저장)
git commit -m "메시지"

# 상태 확인
git status

# 원격 저장소 연결
git remote add origin https://github.com/사용자명/저장소명.git

# 푸시 (업로드)
git push origin main

# 풀 (다운로드)
git pull origin main

# 브랜치 확인
git branch

# 로그 확인
git log
```

---

## 🎓 추가 학습 자료

- **Git 공식 문서 (한글)**: https://git-scm.com/book/ko/v2
- **GitHub 가이드**: https://guides.github.com/
- **Git 시각화 학습**: https://learngitbranching.js.org/?locale=ko

---

## ✅ 설치 완료 체크리스트

- [ ] Git 다운로드 완료
- [ ] Git 설치 완료 (PATH 옵션 포함)
- [ ] `git --version` 명령어 성공
- [ ] 사용자 이름 설정 완료
- [ ] 사용자 이메일 설정 완료
- [ ] 프로젝트 폴더에서 `git init` 실행

**모두 완료했다면 이제 GitHub에 배포할 준비가 되었습니다! 🚀**

다음 단계: `QUICKSTART_DEPLOY.md` 파일을 참고하여 배포를 진행하세요!


