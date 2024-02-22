import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import debug from 'debug';
import path from 'path';

import { ContType, IArchiveResponse, ICd, IContPhoto } from 'dto';
import { removeNulls, make500Response } from 'utils';

import imgTypes from '@data/code/img_type.json';
import sources from '@data/code/source.json';
import medias from '@data/code/media.json';
import departments from '@data/code/department.json';

import photos from '@data/photo/list.json';

const photosParsed = photos.map((item) =>
  removeNulls<IContPhoto>(item as IContPhoto)
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
        list: photosParsed.slice(0, 20),
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
            .attachment(target.fileName || target.filePath)
            .download(path.join(__dirname, '..', target.filePath));
        } else {
          res.status(200).send(make500Response('다운로드 이미지가 없습니다.'));
        }
      } else {
        res.status(200).send(make500Response('컨텐츠 타입 확인'));
      }
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
