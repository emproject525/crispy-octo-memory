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
const PhotoOne = React.lazy(() => import('pages/photo/PhotoOne'));
const Texts = React.lazy(() => import('pages/text/Texts'));
const TextOne = React.lazy(() => import('pages/text/TextOne'));
const Videos = React.lazy(() => import('pages/video/Videos'));
const VideoOne = React.lazy(() => import('pages/video/VideoOne'));
const Audios = React.lazy(() => import('pages/audio/Audios'));
const AudioOne = React.lazy(() => import('pages/audio/AudioOne'));

const getSuspensePages = (ele: JSX.Element) => (
  <Suspense fallback={<Fallback />}>{ele}</Suspense>
);

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} errorElement={<Error404 />}>
      <Route path={'/'} element={getSuspensePages(<Dashboard />)} />
      <Route path="/photos">
        <Route index element={getSuspensePages(<Photos />)} />
        <Route path=":contId" element={getSuspensePages(<PhotoOne />)} />
      </Route>
      <Route path="/texts">
        <Route index element={getSuspensePages(<Texts />)} />
        <Route path=":contId" element={getSuspensePages(<TextOne />)} />
      </Route>
      <Route path="/videos">
        <Route index element={getSuspensePages(<Videos />)} />
        <Route path=":contId" element={getSuspensePages(<VideoOne />)} />
      </Route>
      <Route path="/audios">
        <Route index element={getSuspensePages(<Audios />)} />
        <Route path=":contId" element={getSuspensePages(<AudioOne />)} />
      </Route>
    </Route>,
  ),
);
