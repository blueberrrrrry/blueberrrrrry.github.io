# 포트폴리오

TypeScript + Vite로 만든 이력서/포트폴리오 사이트.  
화면 중앙의 액체 블롭은 마우스를 가까이 대면 흩어졌다가, 멀어지면 다시 뭉쳐듭니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

`dist` 폴더에 정적 파일이 생성됩니다.

## GitHub Pages 배포

main 브랜치에 푸시하면 GitHub Actions가 빌드 후 **gh-pages** 브랜치에 결과물을 푸시합니다.

**⚠️ 반드시 설정:**  
**Settings → Pages → Build and deployment → Source** 를 **Deploy from a branch** 로 두고, **Branch** 를 **gh-pages** / **/(root)** 로 선택한 뒤 Save 하세요.

- **main**을 선택하면 소스 코드만 배포되어, `.ts` 파일이 비디오 MIME 타입으로 잘못 전달되면서 스크립트 로드 에러가 납니다.
- **gh-pages** 브랜치에는 빌드된 파일만 있으므로, 이 브랜치를 선택해야 사이트가 정상적으로 열립니다.
