export const useFetch = async (url, headers) => {
  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during change:", error);
    throw error;
  }
};

export const usePost = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("usePost Error:", error);
    throw error;
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
};
