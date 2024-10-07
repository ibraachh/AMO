import { endpoints, useFetch } from "./api.js";

const getList = async () => {
  const res = await useFetch(endpoints.news.list);
  return res;
};

const allNews = document.querySelector(".allNews");

getList().then((data) =>
  data.map((item) => {
    const div = document.createElement("div");
    div.classList.add("news-item");
    const a = document.createElement("a");
    a.href = `./newsDetail.html?id=${item.id}`;
    const img = document.createElement("img");
    img.classList.add("w-full", "h-[240px]", "object-cover");
    img.src = `https://api.studentall.az:9851/api/file/getFile/${item.image}`;
    const p = document.createElement("p");
    p.classList.add("text-[#fff]");
    p.textContent = item.title;
    a.append(img, p);
    div.append(a);
    allNews.append(div);
  })
);
