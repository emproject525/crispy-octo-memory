import fs from 'fs';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import debug from 'debug';

import {
  ContType,
  IArchiveResponse,
  ICd,
  IContPhoto,
  IContVideo,
  IRelation,
  IRelationCont
} from 'dto';
import { removeNulls, make500Response, isNonNullable } from 'utils';

import imgTypes from '@data/code/img_type.json';
import sources from '@data/code/source.json';
import medias from '@data/code/media.json';
import departments from '@data/code/department.json';

import photos from '@data/photo/list.json';
import videos from '@data/video/list.json';
import relations from '@data/relation/list.json';

const photosParsed = photos.map((item) =>
  removeNulls<IContPhoto>(item as IContPhoto)
);
const vidoesParsed = videos.map((item) =>
  removeNulls<IContVideo>(item as IContVideo)
);
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
      removeNulls<ICd>({
        ...item,
        cdId: `${item.group}-${item.seq}`
      } as ICd)
    );
    const SOURCE = sources.map((item) =>
      removeNulls<ICd>({
        ...item,
        cdId: `${item.group}-${item.seq}`
      } as ICd)
    );
    const MEDIA = medias.map((item) =>
      removeNulls<ICd>({
        ...item,
        cdId: `${item.group}-${item.seq}`
      } as ICd)
    );
    const DEPARTMENT = departments.map((item) =>
      removeNulls<ICd>({
        ...item,
        cdId: `${item.group}-${item.seq}`
      } as ICd)
    );

    const response: IArchiveResponse<Record<string, ICd[]>, false> = {
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
app.get('/api/photos', (req: Request, res: Response) => {
  try {
    const response: IArchiveResponse<IContPhoto> = {
      header: {
        success: true,
        status: 200,
        message: '성공하였습니다'
      },
      body: {
        list: photosParsed.slice(0, 40),
        count: photos.length,
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
      const response: IArchiveResponse<IContPhoto, false> = {
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
      if (req.body.contType === 'P' || req.body.contType === 'V') {
        const target = (
          req.body.contType === 'V' ? vidoesParsed : photosParsed
        ).find((item) => item.contId === req.body.contId);

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
app.get('/api/videos', (req: Request, res: Response) => {
  try {
    const response: IArchiveResponse<IContVideo> = {
      header: {
        success: true,
        status: 200,
        message: '성공하였습니다'
      },
      body: {
        list: vidoesParsed.slice(0, 40),
        count: videos.length,
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
      const response: IArchiveResponse<IContVideo, false> = {
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
 * 영상 서비스 제공??? 테스트 중
 * https://www.thisdot.co/blog/building-a-multi-response-streaming-api-with-node-js-express-and-react
 */
app.get(
  '/stream/:contId',
  (
    req: Request<{
      contId: string;
    }>,
    res: Response
  ) => {
    const video = vidoesParsed.find(
      (item) => String(item.contId) === req.params.contId
    );

    if (video) {
      const absolutePath = path.join(
        __dirname,
        '../videos/',
        video.orgFileName || ''
      );
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
          'Content-Type': 'video/mp4'
        };

        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4'
        };

        res.writeHead(200, head);
        fs.createReadStream(absolutePath).pipe(res);
      }
    }
  }
);

const findCont = (
  contType: ContType,
  contId: number
): IContPhoto | IContVideo | undefined => {
  if (contType === 'P') {
    return photosParsed.find((item) => item.contId === contId);
  } else if (contType === 'V') {
    return vidoesParsed.find((item) => item.contId === contId);
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
      // contId인 경우
      const f1 = relationsParsed
        .filter(
          (item) =>
            item.contType === req.query.contType &&
            String(item.contId) === String(req.query.contId)
        )
        .map((item) => findCont(item.relContType, item.relContId))
        .filter(isNonNullable);
      // relContId인 경우
      const f2 = relationsParsed
        .filter(
          (item) =>
            item.relContType === req.query.contType &&
            String(item.relContId) === String(req.query.contId)
        )
        .map((item) => findCont(item.contType, item.contId))
        .filter(isNonNullable);

      const relations: IRelationCont['relations'] = [...f1, ...f2];

      const response: IArchiveResponse<IRelationCont['relations'][0]> = {
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
