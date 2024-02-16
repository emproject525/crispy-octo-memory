import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import { IArchiveResponse, ICd, IContPhoto } from 'dto';
import { removeNulls } from 'utils';

import imgTypes from '@data/code/img_type.json';
import sources from '@data/code/source.json';
import medias from '@data/code/media.json';
import departments from '@data/code/department.json';

import photos from '@data/photo/list.json';

const app: Application = express();
app.use(cors());

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
    res.status(500);
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
        list: photos.map((item) => removeNulls<IContPhoto>(item as IContPhoto)),
        totalCount: photos.length,
        keywords: []
      }
    };
    res.status(200).type('application/json').send(response);
  } catch (e) {
    res.status(500);
  }
});

/**
 * 정적 파일 서비스
 */
app.use('/images', express.static('images'));

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
