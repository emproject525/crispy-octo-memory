## archive-api

- archive api express 서버 (포트 8080)
- DB 연결 X
- 이미지, 영상(m3u8) stream, 오디오 서비스
- typescript 적용

## archive

- archive front 서버 (포트 3000)
- typescript 적용

## types/archive-types

- archive-api, archive에서 사용하는 타입 모음

## lawyercommu-next

- 익명 커뮤니티 front 서버 (포트 3000)
- typescript 적용
- nextjs + express

```
yarn create next-app lawyercommu-next
cd lawyercommu-next/
rm -rf node_modules
yarn set version berry
yarn add --dev prettier
yarn dlx @yarnpkg/sdks vscode
```

## vscode로 실행하기 위한 추가 작업

- sdks 설정

```
yarn dlx @yarnpkg/sdks vscode
```

- vscode 내에서 typescript version 변경

1. control + shift + P
2. [Typescript> Select TypeScripty Version...] 선택
3. [Use Workspace Version] 선택

- 잡다한 에러 발생 시

1. The remote archive doesn't match the expected checksum

```
yarn cache clean --all   (캐시 모두 제거)
yarn install
```

2. Deduplicate dependencies with overlapping ranges

```
yarn dedupe
yarn dedupe --strategy highest
yarn dedupe '@babel/\*'
```

- 전체 버전 업그레이드

```
yarn plugin import interactive-tools
yarn upgrade-interactive
```

- 프로젝트가 사용하는 패키지 버전 확인

```
yarn why webpack
```

- 주기적으로 browerslist update 확인

```
yarn up -R caniuse-lite
```

```
npx update-browserslist-db@latest
```

