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

1. 이 저장소를 `blueberrrrrry.github.io` 이름으로 푸시한 상태에서
2. **Settings → Pages**에서 Source를 **GitHub Actions**로 선택하거나,
3. 또는 **main** 브랜치의 **/ (root)** 또는 **/docs** 폴더를 선택한 뒤,  
   빌드 결과물을 올리려면:
   - `npm run build` 후 `dist` 내용을 **docs** 폴더로 복사해 커밋하거나
   - 아래처럼 GitHub Actions로 자동 배포할 수 있습니다.

### GitHub Actions로 자동 배포

`.github/workflows/deploy.yml` 파일을 추가하고, main에 푸시하면 빌드 후 Pages에 자동 배포됩니다.
