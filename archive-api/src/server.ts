import fs from 'fs';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import debug from 'debug';
import Throttle from 'throttle';
import { isAfter } from 'date-fns';

import {
  ContType,
  IRes,
  ICode,
  IContAudio,
  IContPhoto,
  IContText,
  IContVideo,
  IRelation,
  IRelationCont,
  IContTextJoinWriters,
  IWriter,
  IContAudioParams,
  IContPhotoParams,
  IContTextParams,
  IContVideoParams
} from 'archive-types';

import {
  removeNulls,
  make500Response,
  isNonNullable,
  getStartEnd,
  stringToDate
} from 'utils';

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

const photosParsed = photos.map((item) =>
  removeNulls<IContPhoto>(item as IContPhoto)
);
const vidoesParsed = videos.map((item) =>
  removeNulls<IContVideo>(item as IContVideo)
);
const audioParsed = audios.map((item) =>
  removeNulls<IContAudio>(item as IContAudio)
);
const writersParsed = writers.map((item) => item as IWriter);
const textParsed: IContTextJoinWriters[] = texts
  .map((item) => removeNulls<IContText>(item as IContText))
  .map((item) => ({
    ...item,
    writers: (item.writers || [])
      .map((id) => writersParsed.find((item) => item.id === id))
      .filter(isNonNullable)
  }));
// api 용량을 줄이기 위해서 body 제거
const textNoBodyParsed = textParsed.map((item) => ({
  ...item,
  body: null
}));
const relationsParsed = relations.map((item) =>
  removeNulls<IRelation>(item as IRelation)
);

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
      removeNulls<ICode>({
        ...item,
        cdId: `${item.group}-${item.seq}`
      } as ICode)
    );
    const SOURCE = sources.map((item) =>
      removeNulls<ICode>({
        ...item,
        cdId: `${item.group}-${item.seq}`
      } as ICode)
    );
    const MEDIA = medias.map((item) =>
      removeNulls<ICode>({
        ...item,
        cdId: `${item.group}-${item.seq}`
      } as ICode)
    );
    const DEPARTMENT = departments.map((item) =>
      removeNulls<ICode>({
        ...item,
        cdId: `${item.group}-${item.seq}`
      } as ICode)
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
      const { page, size, keyword } = req.query;
      const count = photos.length;
      const sliceIdx = getStartEnd(count, Number(size), Number(page));

      const response: IRes<IContPhoto> = {
        header: {
          success: true,
          status: 200,
          message: '성공하였습니다'
        },
        body: {
          list: photosParsed.slice(sliceIdx[0] - 1, sliceIdx[1]),
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
      // 캐스팅이 안되는듯? 그냥 string 타입임 ==> query여서 string으로 받네
      contId?: string;
    }>,
    res: Response
  ) => {
    try {
      const response: IRes<IContPhoto, false> = {
        header: {
          success: true,
          status: 200,
          message: '성공하였습니다'
        },
        body: photosParsed.find(
          (item) => String(item.contId) === req.params.contId
        )
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
              'Download-Success': 'Y',
              'Access-Control-Expose-Headers': [
                'Download-Success',
                'Content-Disposition'
              ]
            })
            .attachment(target.orgFileName || target.filePath)
            .download(path.join(__dirname, '..', target.filePath));
        } else {
          res.status(200).send(make500Response('다운로드 이미지가 없습니다.'));
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

          res
            .header({
              'Download-Success': 'Y',
              'Access-Control-Expose-Headers': [
                'Download-Success',
                'Content-Disposition'
              ]
            })
            .writeHead(200, {
              'Content-Type': 'video/mp4',
              'Content-Disposition': `attachment; filename=${target.orgFileName}`,
              'Content-Length': fileSize
            });

          const readStream = fs.createReadStream(videoPath);
          const throttle = new Throttle(1024 * 1024 * 5); // throttle to 5MB/sec - simulate lower speed

          readStream.pipe(throttle);

          throttle.on('data', (chunk) => {
            console.log(`Sent ${chunk.length} bytes to client.`);
            res.write(chunk);
          });

          throttle.on('end', () => {
            console.log('File fully sent to client.');
            res.end();
          });
        } else {
          res
            .status(200)
            .send(make500Response('다운로드할 영상 파일이 없습니다.'));
        }
      } else if (req.body.contType === 'A') {
        // 오디오 다운로드
        const target = audioParsed.find(
          (item) => item.contId === req.body.contId
        );
        if (target && target.filePath) {
          const audioPath = path.join(__dirname, '..', target.filePath);
          const stat = fs.statSync(audioPath);
          const fileSize = stat.size;

          res
            .header({
              'Download-Success': 'Y',
              'Access-Control-Expose-Headers': [
                'Download-Success',
                'Content-Disposition'
              ]
            })
            .writeHead(200, {
              'Content-Type': `audio/${target.format || 'mp3'}`,
              'Content-Disposition': `attachment; filename=${target.orgFileName}`,
              'Content-Length': fileSize
            });

          const readStream = fs.createReadStream(audioPath);
          const throttle = new Throttle(1024 * 1024 * 5); // throttle to 5MB/sec - simulate lower speed

          readStream.pipe(throttle);

          throttle.on('data', (chunk) => {
            console.log(`Sent ${chunk.length} bytes to client.`);
            res.write(chunk);
          });

          throttle.on('end', () => {
            console.log('File fully sent to client.');
            res.end();
          });
        } else {
          res
            .status(200)
            .send(make500Response('다운로드할 오디오 파일이 없습니다.'));
        }
      } else {
        res.status(200).send(make500Response('컨텐츠 타입을 확인하세요.'));
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
      const { page, size, keyword } = req.query;
      const count = videos.length;
      const sliceIdx = getStartEnd(count, Number(size), Number(page));

      const response: IRes<IContVideo> = {
        header: {
          success: true,
          status: 200,
          message: '성공하였습니다'
        },
        body: {
          list: vidoesParsed.slice(sliceIdx[0] - 1, sliceIdx[1]),
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
      const response: IRes<IContVideo, false> = {
        header: {
          success: true,
          status: 200,
          message: '성공하였습니다'
        },
        body: vidoesParsed.find(
          (item) => String(item.contId) === req.params.contId
        )
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
        res
          .status(200)
          .type('application/json')
          .send(make500Response('영상 없음'));
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
      const { page, size, keyword } = req.query;
      const count = audioParsed.length;
      const sliceIdx = getStartEnd(count, Number(size), Number(page));

      const response: IRes<IContAudio> = {
        header: {
          success: true,
          status: 200,
          message: '성공하였습니다'
        },
        body: {
          list: audioParsed.slice(sliceIdx[0] - 1, sliceIdx[1]),
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
      const response: IRes<IContAudio, false> = {
        header: {
          success: true,
          status: 200,
          message: '성공하였습니다'
        },
        body: audioParsed.find(
          (item) => String(item.contId) === req.params.contId
        )
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
 * 문서 목록 조회
 */
app.get(
  '/api/texts',
  (req: Request<{}, {}, {}, IContTextParams>, res: Response) => {
    try {
      const { page, size, keyword, endDt, startDt, textType } = req.query;

      const target = textParsed.filter((item) => {
        let match = true;

        if (textType) {
          match = match && item.textType === textType;
        }

        if (item.regDt) {
          const regDt = stringToDate(item.regDt, 'yyyy-MM-dd HH:mm:ss');
          if (startDt) {
            match =
              match &&
              isAfter(
                regDt,
                stringToDate(`${startDt} 00:00:00`, 'yyyy-MM-dd HH:mm:ss')
              );
          }
          if (endDt) {
            match =
              match &&
              isAfter(
                stringToDate(`${endDt} 23:59:59`, 'yyyy-MM-dd HH:mm:ss'),
                regDt
              );
          }
        }

        if (keyword && item.title) {
          const reg = new RegExp(keyword, 'ig');
          match = match && reg.test(item.title);
        }

        return match;
      });

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
      const body = textParsed.find(
        (item) => String(item.contId) === req.params.contId
      );

      if (!body) {
        throw '본문이 없습니다.';
      }

      const response: IRes<IContTextJoinWriters, false> = {
        header: {
          success: true,
          status: 200,
          message: '성공하였습니다'
        },
        body
      };
      res.status(200).type('application/json').send(response);
    } catch (e) {
      res
        .status(200)
        .send(make500Response(e instanceof Error ? e.message : String(e)));
    }
  }
);

const findCont = (
  contType: ContType,
  contId: number
): IContPhoto | IContVideo | IContAudio | IContTextJoinWriters | undefined => {
  if (contType === 'P') {
    return photosParsed.find((item) => item.contId === contId);
  } else if (contType === 'V') {
    return vidoesParsed.find((item) => item.contId === contId);
  } else if (contType === 'A') {
    return audioParsed.find((item) => item.contId === contId);
  } else if (contType === 'T') {
    return textNoBodyParsed.find((item) => item.contId === contId);
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
        .filter(
          (item) =>
            (req.query.contType === item.contType &&
              String(req.query.contId) === String(item.contId)) ||
            (req.query.contType === item.relContType &&
              String(req.query.contId) === String(item.relContId))
        )
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
