# archive-api

## Available Scripts

In the project directory, you can run:

### debug

.vscode/launch.json

request가 launch일 때랑 request가 attach일 때 방법이 다른 것 같음
https://www.testkarts.com/blog/post/setting-up-debugging-express-with-vs-code-nodemon

Attach to Process Id
ProcessId로 디버깅할 때는 ts-node process를 잡아야함

### `yarn start`

localhost 8080 포트로 server 실행.

### TODO

- [ ] 실행 속도가 오래 걸림. 빌드 타임 줄이기.

### `yarn makestreamfiles`

videos 하위의 mp4 파일을 ffmpeg으로 변환하여 stream/{video명}/\* 에 저장함.

### TODO

- [ ] 변환한 파일 압축. (용량 줄이기)
- [ ] 변환 시 영상 썸네일 이미지 추출.
