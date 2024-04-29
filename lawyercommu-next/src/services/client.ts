'use client';

import axios from 'axios';
import qs from 'qs';

const base = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: false,
  timeout: 1000 * 60 * 5,
  paramsSerializer: (params) =>
    qs.stringify(params, {
      allowDots: true,
      indices: true,
      skipNulls: true,
      arrayFormat: 'repeat',
      filter: (prefix, value) =>
        typeof value === 'string' && value === '' ? undefined : value,
    }),
  formSerializer: {
    dots: true,
    indexes: true,
  },
});

export default base;
