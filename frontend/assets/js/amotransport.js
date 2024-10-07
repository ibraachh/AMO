import { endpoints, useFetch } from "./api.js";
const language = localStorage.getItem("language") || "az";
const getList = async () => {
  const headers = {
    "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
    "accept-language": language,
  };
  const res = await useFetch(
    endpoints.company.getAllByName + "amoTransport",
    headers
  );
  return res;
};

const transportLogo = document.querySelector(".transportLogo");
const title = document.querySelector(".headingTitle");

getList().then((data) => {
  title.textContent = data.title;
  transportLogo.src = `https://api.studentall.az:9851/api/file/getFile/${data?.logo}`;
  data?.companyCards.map((item, index) => {
    const card = document.querySelector(`.card-${index + 1}`);
    card.textContent = item.title;
  });
});
