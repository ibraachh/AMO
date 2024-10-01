import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';
import { STORAGE_KEY } from 'src/auth/context/jwt';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export const BASE_URL = CONFIG.site.serverUrl;
const API_KEY = CONFIG.site.api_key;


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-API-KEY': API_KEY,
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers['X-API-KEY'] = API_KEY;
    config.headers['Access-Control-Allow-Origin'] = '*';
    const token = sessionStorage.getItem(STORAGE_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export const axiosForDownload = axios.create({
  baseURL: BASE_URL,
  responseType: "blob",
  headers: {
    "X-API-KEY": API_KEY,
  },
});

axiosForDownload.interceptors.request.use(
  async (config) => {
    config.headers["X-API-KEY"] = API_KEY;
    config.headers["Access-Control-Allow-Origin"] = "*";
    const token = sessionStorage.getItem(STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const axiosForUpload = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
  headers: {
    "X-API-KEY": API_KEY,
    "Content-Type": "multipart/form-data",
  },
});

axiosForUpload.interceptors.request.use(
  async (config) => {
    config.headers["X-API-KEY"] = API_KEY;
    config.headers["Access-Control-Allow-Origin"] = "*";
    const token = sessionStorage.getItem(STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

export default axiosInstance;

export const axiosPatch = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json-patch+json',
    'X-API-KEY': API_KEY,
  },
});

axiosPatch.interceptors.request.use(
  async (config) => {
    config.headers['X-API-KEY'] = API_KEY;
    config.headers['Access-Control-Allow-Origin'] = '*';
    const token = sessionStorage.getItem(STORAGE_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPatch.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);


// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

export const fileFetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosForDownload.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------
