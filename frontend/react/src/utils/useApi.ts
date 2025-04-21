import axios, { isAxiosError } from "axios";

export const useFetch = async (url: string, headers: any) => {
  try {
    const response = await axios.get(url, { headers });
    const data = response.data;
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.message;
    }
  }
};

export const usePost = async (url: string, data: any) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
    };
    const res = await axios.post(url, data, { headers });
    if (res.status < 200 || res.status >= 300) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.message;
    }
  }
};

export const endpoints = {
  contact: {
    list: "https://api.studentall.az:9851/api/contact-info/list",
    create: "https://api.studentall.az:9851/api/contact-us/create",
  },
  news: {
    list: "https://api.studentall.az:9851/api/news/list",
    getById: "https://api.studentall.az:9851/api/news/get/",
  },
  company: {
    getAllByName: "https://api.studentall.az:9851/api/company/getByName/",
  },
  career: {
    list: "https://api.studentall.az:9851/api/career/list",
    getById: "https://api.studentall.az:9851/api/career/get/",
  },
};
