import { endpoints, useFetch } from "./api.js";

const id = new URLSearchParams(window.location.search).get("id");
const language = localStorage.getItem("language") || "az";
const getDetails = async () => {
  const headers = {
    "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
    "accept-language": language,
  };
  const res = await useFetch(endpoints.news.getById + id, headers);
  return res;
};

const title = document.querySelector(".news-title");
const decription = document.querySelector(".news-description");
const img = document.querySelector(".news-image");

getDetails().then((data) => {
  title.textContent = data.title;
  decription.innerHTML = data.description;
  img.src = `https://api.studentall.az:9851/api/file/getFile/${data.image}`;
  img.classList.add("w-full", "max-h-[300px]", "rounded-md");
});

const getList = async () => {
  const res = await useFetch(endpoints.news.list);
  return res;
};

const slideWrapper = document.querySelector(".swiper-wrapper");

getList().then((data) =>
  data
    .filter((item) => item.id != id)
    .map((item) => {
      const div = document.createElement("div");
      div.classList.add("swiper-slide");

      const link = document.createElement("a");
      link.href = `./newsDetail.html?id=${item.id}`;

      const imageDiv = document.createElement("div");

      const img = document.createElement("img");
      img.src = `https://api.studentall.az:9851/api/file/getFile/${item.image}`;

      const p = document.createElement("p");
      p.textContent = item.title;

      imageDiv.append(img);
      link.append(imageDiv, p);
      div.append(link);
      slideWrapper.append(div);
    })
);
