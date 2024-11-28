import { endpoints, useFetch } from "./api.js";
const language = localStorage.getItem("language") || "az";

const getList = async () => {
  const headers = {
    "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
    "accept-language": language,
  };
  const res = await useFetch(endpoints.news.list, headers);
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

const socialIcons = document.querySelector(".sosial-links");
async function fetchSocialMedia() {
  try {
    const headers = {
      "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
    };
    const response = await fetch(
      "https://api.studentall.az:9851/api/contact-info/list",
      { headers }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    Object.entries(data[0].socials).forEach(([key, value]) => {
      const socialIcon = document.createElement("li");
      socialIcon.innerHTML = `<a href="${value}" target="_blank"><i class="fa-brands fa-${key.toLocaleLowerCase()} text-[20px] hover:text-red-300 duration-200 "></i></a>`;
      socialIcons.append(socialIcon);
    });
  } catch (error) {
    console.log(error);
  }
}
fetchSocialMedia();
