import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import React, { Suspense } from 'react';

import Error404 from './@error/404';
import Fallback from './@error/Fallback';
import Root from './Root';

/** import pages */
const Dashboard = React.lazy(() => import('pages/dashboard'));
const Photos = React.lazy(() => import('pages/photo/Photos'));
const PhotoDetailRoute = React.lazy(
  () => import('pages/photo/Detail/PhotoDetailRoute'),
);
const Texts = React.lazy(() => import('pages/text/Texts'));
const TextDetailRoute = React.lazy(
  () => import('pages/text/Detail/TextDetailRoute'),
);
const Videos = React.lazy(() => import('pages/video/Videos'));
const VideoDetailRoute = React.lazy(
  () => import('pages/video/Detail/VideoDetailRoute'),
);
const Audios = React.lazy(() => import('pages/audio/Audios'));
const AudioDetailRoute = React.lazy(
  () => import('pages/audio/Detail/AudioDetailRoute'),
);

const getSuspensePages = (ele: JSX.Element) => (
  <Suspense fallback={<Fallback />}>{ele}</Suspense>
);

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} errorElement={<Error404 />}>
      <Route path={'/'} element={getSuspensePages(<Dashboard />)} />
      <Route path="/photos">
        <Route index element={getSuspensePages(<Photos />)} />
        <Route
          path=":contId"
          element={getSuspensePages(<PhotoDetailRoute />)}
        />
      </Route>
      <Route path="/texts">
        <Route index element={getSuspensePages(<Texts />)} />
        <Route path=":contId" element={getSuspensePages(<TextDetailRoute />)} />
      </Route>
      <Route path="/videos">
        <Route index element={getSuspensePages(<Videos />)} />
        <Route
          path=":contId"
          element={getSuspensePages(<VideoDetailRoute />)}
        />
      </Route>
      <Route path="/audios">
        <Route index element={getSuspensePages(<Audios />)} />
        <Route
          path=":contId"
          element={getSuspensePages(<AudioDetailRoute />)}
        />
      </Route>
    </Route>,
  ),
);
