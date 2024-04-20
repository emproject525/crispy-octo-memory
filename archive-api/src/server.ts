import fs from 'fs';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import debug from 'debug';
import Throttle from 'throttle';

import {
  IWriter,
  IContTextParams,
  IContPhotoParams,
  IContAudioParams,
  IContVideoParams,
  IRes,
  IContPhoto,
  IContTextJoinWriters,
  IContAudio,
  IContVideo,
  ICode,
  ContType,
  IRelationCont,
  IKeyword
} from 'archive-types';

import { make500Response, isNonNullable, getStartEnd } from 'utils';

import imgTypes from '@data/code/img_type.json';
import sources from '@data/code/source.json';
import medias from '@data/code/media.json';
import departments from '@data/code/department.json';
import photos from '@data/photo/list.json';
import videos from '@data/video/list.json';
import audios from '@data/audio/list.json';
import writers from '@data/text/writers.json';
import texts from '@data/text/list.json';
import relations from '@data/relation/list.json';
import keywords from '@data/keywords/list.json';

import {
  ContAudio,
  ContPhoto,
  ContTextJoinWriters,
  ContVideo,
  Code,
  Relation
} from '@dto';

const photosParsed = photos.map((item) => new ContPhoto(item));
const vidoesParsed = videos.map((item) => new ContVideo(item));
const audioParsed = audios.map((item) => new ContAudio(item));
const writersParsed = writers.map((item) => item as IWriter);
const textParsed = texts.map(
  (item) =>
    new ContTextJoinWriters({
      ...item,
      writers: (item.writers || [])
        .map((id) => writersParsed.find((item) => item.id === id))
        .filter(isNonNullable)
    })
);
const relationsParsed = relations.map((item) => new Relation(item));
const keywordsParsed = keywords.map((item) => item as IKeyword);

const app: Application = express();
app.use(
  cors({
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
  }),
  // querystring 파싱 (req.query)
  express.urlencoded({
    extended: true
  }),
  // request payload 파싱 (req.body)
  express.json()
);

const log = debug('app:log');
log.log = console.log.bind(console);

const port: number = 8080;

/**
 * 코드 데이터 조회
 */
app.get('/api/codes', (req: Request, res: Response) => {
  try {
    const IMG_TYPE = imgTypes.map((item) =>
      new Code(item.seq, 'IMG_TYPE', item).get()
    );
    const SOURCE = sources.map((item) =>
      new Code(item.seq, 'SOURCE', item).get()
    );
    const MEDIA = medias.map((item) => new Code(item.seq, 'MEDIA', item).get());
    const DEPARTMENT = departments.map((item) =>
      new Code(item.seq, 'DEPARTMENT', item).get()
    );

    const response: IRes<Record<string, ICode[]>, false> = {
      header: {
        success: true,
        status: 200,
        message: 'ok'
      },
      body: {
        IMG_TYPE,
        SOURCE,
        MEDIA,
        DEPARTMENT
      }
    };

    res.status(200).type('application/json').send(response);
  } catch (e) {
    res
      .status(200)
      .send(make500Response(e instanceof Error ? e.message : String(e)));
  }
});

/**
 * 사진 목록 조회
 */
app.get(
  '/api/photos',
  (req: Request<{}, {}, {}, IContPhotoParams>, res: Response) => {
    try {
      const { page, size } = req.query;

      // 검색 조건 필터
      const target = photosParsed
        .filter((item) => item.matchSearchParams(req.query))
        .map((item) => item.get());

      const count = target.length;
      const sliceIdx = getStartEnd(count, Number(size), Number(page));

      const response: IRes<IContPhoto> = {
        header: {
          success: true,
          status: 200,
          message: '성공하였습니다'
        },
        body: {
          list: target.slice(sliceIdx[0] - 1, sliceIdx[1]),
          count,
          keywords: []
        }
      };
      res.status(200).type('application/json').send(response);
    } catch (e) {
      res
        .status(200)
        .send(make500Response(e instanceof Error ? e.message : String(e)));
    }
  }
);

/**
 * 사진 상세 데이터
 */
app.get(
  '/api/photos/:contId',
  (
    req: Request<{
      // 캐스팅이 안되는듯? 그냥 string 타입임 ==> path여서 string으로 받네
      contId?: string;
    }>,
    res: Response
  ) => {
    try {
      const target = photosParsed.find(
        (item) => String(item.contId) === req.params.contId
      );

      if (!target) {
        throw '잘못된 데이터입니다.';
      } else if (!target.inService()) {
        throw '서비스 중지된 데이터입니다.';
      } else {
        const response: IRes<IContPhoto, false> = {
          header: {
            success: true,
            status: 200,
            message: '성공하였습니다'
          },
          body: target
        };
        res.status(200).type('application/json').send(response);
      }
    } catch (e) {
      res
        .status(200)
        .send(make500Response(e instanceof Error ? e.message : String(e)));
    }
  }
);

/**
 * 정적 파일 서비스
 */
app.use('/images', express.static('images'));
app.use('/videos/stream', express.static('videos/stream'));
app.use('/audios', express.static('audios'));

/**
 * 정적 파일 다운로드
 */
app.post(
  '/download',
  (
    req: Request<
      {},
      {},
      {
        contType?: ContType;
        contId?: number;
      }
    >,
    res: Response
  ) => {
    try {
      if (req.body.contType === 'P') {
        // 사진 다운로드
        const target = photosParsed.find(
          (item) => item.contId === req.body.contId
        );
        if (target && target.filePath) {
          res
            .status(200)
            .header({
              Ongoing: 'Y',
              'Access-Control-Expose-Headers': [
                'Ongoing',
                'Content-Disposition'
              ]
            })
            .attachment(target.orgFileName || target.filePath)
            .download(path.join(__dirname, '..', target.filePath));
        } else {
          throw '다운로드 이미지가 없습니다.';
        }
      } else if (req.body.contType === 'V') {
        // 영상 다운로드
        const target = vidoesParsed.find(
          (item) => item.contId === req.body.contId
        );
        if (target && target.mediaType === '00' && target.filePath) {
          const videoPath = path.join(__dirname, '..', target.filePath);
          const stat = fs.statSync(videoPath);
          const fileSize = stat.size;

          // 다운로드 방식이 2가지
          // 1) res.download 사용  -> 오디오 다운로드 (header 만 변경 가능, writeHead 쓰면 에러남)
          // 2) stream.pipe 사용   -> 비디오 다운로드 (예전 방식인듯)

          res
            .header({
              Ongoing: 'Y',
              'Access-Control-Expose-Headers': [
                'Ongoing',
                'Content-Disposition'
              ]
            })
            .attachment(target.orgFileName || '')
            .contentType('video/mp4')
            .writeHead(200, {
              'Content-Length': fileSize
            });

          const stream = fs.createReadStream(videoPath);
          // const throttle = new Throttle(1024 * 1024 * 5); // throttle to 5MB/sec - simulate lower speed
          // stream.pipe(throttle);

          stream.pipe(res, { end: true });
          // stream.on('data', (chunk) => {
          //   console.log(`Sent ${chunk.length} bytes to client.`);
          //   res.write(chunk);
          // });
          stream.on('end', () => {
            console.log(`File fully sent to client. : ${target.filePath} `);
            res.end();
          });
        } else {
          throw '다운로드할 영상 파일이 없습니다.';
        }
      } else if (req.body.contType === 'A') {
        // 오디오 다운로드
        const target = audioParsed.find(
          (item) => item.contId === req.body.contId
        );
        if (target && target.filePath) {
          const audioPath = path.join(__dirname, '..', target.filePath);
          const stat = fs.statSync(audioPath);

          res
            .header({
              Ongoing: 'Y',
              'Access-Control-Expose-Headers': [
                'Ongoing',
                'Content-Disposition'
              ]
            })
            .download(audioPath, () => {
              console.log(`File fully sent to client. : ${target.filePath} `);
            });
        } else {
          throw '다운로드할 오디오 파일이 없습니다.';
        }
      } else {
        throw '컨텐츠 타입을 확인하세요.';
      }
    } catch (e) {
      res
        .status(200)
        .send(make500Response(e instanceof Error ? e.message : String(e)));
    }
  }
);

/**
 * 영상 목록 조회
 */
app.get(
  '/api/videos',
  (req: Request<{}, {}, {}, IContVideoParams>, res: Response) => {
    try {
      const { page, size } = req.query;

      // 검색 조건 필터
      const target = vidoesParsed
        .filter((item) => item.matchSearchParams(req.query))
        .map((item) => item.get());

      const count = target.length;
      const sliceIdx = getStartEnd(count, Number(size), Number(page));

      const response: IRes<IContVideo> = {
        header: {
          success: true,
          status: 200,
          message: '성공하였습니다'
        },
        body: {
          list: target.slice(sliceIdx[0] - 1, sliceIdx[1]),
          count,
          keywords: []
        }
      };
      res.status(200).type('application/json').send(response);
    } catch (e) {
      res
        .status(200)
        .send(make500Response(e instanceof Error ? e.message : String(e)));
    }
  }
);

/**
 * 영상 상세
 */
app.get(
  '/api/videos/:contId',
  (
    req: Request<{
      contId?: string;
    }>,
    res: Response
  ) => {
    try {
      const target = vidoesParsed.find(
        (item) => String(item.contId) === req.params.contId
      );

      if (!target) {
        throw '잘못된 데이터입니다.';
      } else if (!target.inService()) {
        throw '서비스 중지된 데이터입니다.';
      } else {
        const response: IRes<IContVideo, false> = {
          header: {
            success: true,
            status: 200,
            message: '성공하였습니다'
          },
          body: target
        };
        res.status(200).type('application/json').send(response);
      }
    } catch (e) {
      res
        .status(200)
        .send(make500Response(e instanceof Error ? e.message : String(e)));
    }
  }
);

/**
 * 영상 재생하는 html 제공
 */
app.get(
  '/html/stream/:contId',
  (
    req: Request<{
      contId: string;
    }>,
    res: Response
  ) => {
    try {
      const video = vidoesParsed.find(
        (item) => String(item.contId) === req.params.contId
      );

      if (video) {
        const playerHTML = fs
          .readFileSync(path.join(__dirname, '../videos/player.html'), 'utf8')
          .replace('{{id}}', video.fileName || '')
          .replace('{{fileName}}', video.fileName || '');

        res.status(200).type('html').send(playerHTML);
      } else {
        throw '영상 없음';
      }
    } catch (e) {
      res
        .status(200)
        .send(make500Response(e instanceof Error ? e.message : String(e)));
    }
  }
);

/**
 * 오디오 스트리밍
 * https://www.thisdot.co/blog/building-a-multi-response-streaming-api-with-node-js-express-and-react
 */
app.get(
  '/stream/audio/:contId',
  (
    req: Request<{
      contId: string;
    }>,
    res: Response
  ) => {
    const audio = audioParsed.find(
      (item) => String(item.contId) === req.params.contId
    );

    if (audio) {
      const absolutePath = path.join(__dirname, '..', audio.filePath || '');
      const stat = fs.statSync(absolutePath);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;
        const file = fs.createReadStream(absolutePath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': `audio/${audio.format || 'mp3'}`
        };

        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': `audio/${audio.format || 'mp3'}`
        };

        res.writeHead(200, head);
        fs.createReadStream(absolutePath).pipe(res);
      }
    }
  }
);

/**
 * 오디오 목록 조회
 */
app.get(
  '/api/audios',
  (req: Request<{}, {}, {}, IContAudioParams>, res: Response) => {
    try {
      const { page, size } = req.query;

      // 검색 조건 필터
      const target = audioParsed
        .filter((item) => item.matchSearchParams(req.query))
        .map((item) => item.get());

      const count = target.length;
      const sliceIdx = getStartEnd(count, Number(size), Number(page));

      const response: IRes<IContAudio> = {
        header: {
          success: true,
          status: 200,
          message: '성공하였습니다'
        },
        body: {
          list: target.slice(sliceIdx[0] - 1, sliceIdx[1]),
          count,
          keywords: []
        }
      };
      res.status(200).type('application/json').send(response);
    } catch (e) {
      res
        .status(200)
        .send(make500Response(e instanceof Error ? e.message : String(e)));
    }
  }
);

/**
 * 오디오 상세
 */
app.get(
  '/api/audios/:contId',
  (
    req: Request<{
      contId?: string;
    }>,
    res: Response
  ) => {
    try {
      const target = audioParsed.find(
        (item) => String(item.contId) === req.params.contId
      );

      if (!target) {
        throw '잘못된 데이터입니다.';
      } else if (!target.inService()) {
        throw '서비스 중지된 데이터입니다.';
      } else {
        const response: IRes<IContAudio, false> = {
          header: {
            success: true,
            status: 200,
            message: '성공하였습니다'
          },
          body: target
        };
        res.status(200).type('application/json').send(response);
      }
    } catch (e) {
      res
        .status(200)
        .send(make500Response(e instanceof Error ? e.message : String(e)));
    }
  }
);

/**
 * 문서 목록 조회
 */
app.get(
  '/api/texts',
  (req: Request<{}, {}, {}, IContTextParams>, res: Response) => {
    try {
      const { page, size } = req.query;

      // 검색 조건 필터
      const target = textParsed
        .filter((item) => item.matchSearchParams(req.query))
        .map((item) => item.get(true));

      const count = target.length;
      const sliceIdx = getStartEnd(count, Number(size), Number(page));

      const response: IRes<IContTextJoinWriters> = {
        header: {
          success: true,
          status: 200,
          message: '성공하였습니다'
        },
        body: {
          list: target.slice(sliceIdx[0] - 1, sliceIdx[1]),
          count,
          keywords: []
        }
      };
      res.status(200).type('application/json').send(response);
    } catch (e) {
      res
        .status(200)
        .send(make500Response(e instanceof Error ? e.message : String(e)));
    }
  }
);

/**
 * 문서 상세
 */
app.get(
  '/api/texts/:contId',
  (
    req: Request<{
      contId?: string;
    }>,
    res: Response
  ) => {
    try {
      const target = textParsed.find(
        (item) => String(item.contId) === req.params.contId
      );

      if (!target) {
        throw '잘못된 데이터입니다.';
      } else if (!target.inService()) {
        throw '서비스 중지된 데이터입니다.';
      } else {
        const response: IRes<IContTextJoinWriters, false> = {
          header: {
            success: true,
            status: 200,
            message: '성공하였습니다'
          },
          body: target
        };
        res.status(200).type('application/json').send(response);
      }
    } catch (e) {
      res
        .status(200)
        .send(make500Response(e instanceof Error ? e.message : String(e)));
    }
  }
);

/**
 * 최근 검색어 5개 랜덤
 */
app.get('/api/latestkeywords', (req: Request, res: Response) => {
  try {
    const totalCnt = keywordsParsed.length;
    const count = 5;
    const randomStart = Math.floor(Math.random() * (totalCnt - count)) + 1;

    console.log(`최근 검색어 ${randomStart}부터 5개`);

    const response: IRes<IKeyword> = {
      header: {
        success: true,
        status: 200,
        message: '성공하였습니다'
      },
      body: {
        list: keywordsParsed.slice(randomStart, randomStart + count),
        count,
        keywords: []
      }
    };

    res.status(200).type('application/json').send(response);
  } catch (e) {
    res
      .status(200)
      .send(make500Response(e instanceof Error ? e.message : String(e)));
  }
});

const findCont = (
  contType: ContType,
  contId: number
): IContPhoto | IContVideo | IContAudio | IContTextJoinWriters | undefined => {
  if (contType === 'P') {
    return photosParsed.find((item) => item.contId === contId)?.get();
  } else if (contType === 'V') {
    return vidoesParsed.find((item) => item.contId === contId)?.get();
  } else if (contType === 'A') {
    return audioParsed.find((item) => item.contId === contId)?.get();
  } else if (contType === 'T') {
    return textParsed.find((item) => item.contId === contId)?.get(true);
  }

  return undefined;
};

/**
 * 관련 컨텐츠 조회
 */
app.get(
  '/api/relations',
  (
    req: Request<
      undefined,
      {},
      undefined,
      {
        contType: ContType;
        contId: number;
      }
    >,
    res
  ) => {
    try {
      const relations: IRelationCont['relations'] = relationsParsed
        .filter((item) => item.related(req.query.contType, req.query.contId))
        .map((item) =>
          req.query.contType === item.contType &&
          String(req.query.contId) === String(item.contId)
            ? findCont(item.relContType, item.relContId)
            : findCont(item.contType, item.contId)
        )
        .filter(isNonNullable);

      const response: IRes<IRelationCont['relations'][0]> = {
        header: {
          success: true,
          status: 200,
          message: '성공하였습니다'
        },
        body: {
          count: relations.length,
          keywords: [],
          list: relations
        }
      };
      res.status(200).type('application/json').send(response);
    } catch (e) {
      res
        .status(200)
        .send(make500Response(e instanceof Error ? e.message : String(e)));
    }
  }
);

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
