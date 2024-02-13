import express, { Application, Request, Response } from 'express';

import photos from '@data/photo/list.json';
import { ArchiveResponse } from 'dto';

const app: Application = express();

const port: number = 8080;

app.get('/photos', (req: Request, res: Response) => {
  const response: ArchiveResponse<any> = {
    header: {
      success: true,
      status: 200,
      message: '성공하였습니다'
    },
    body: {
      list: photos,
      totalCount: photos.length,
      keywords: []
    }
  };
  res.status(200).type('application/json').send(response);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
