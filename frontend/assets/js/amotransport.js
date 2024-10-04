import { endpoints, useFetch } from "./api.js";

const getList = async () => {
  const res = await useFetch(endpoints.company.getAllByName + "amoTransport");
  return res;
};

const transportLogo = document.querySelector(".transportLogo");
const title = document.querySelector(".headingTitle");

getList().then((data) => {
  title.textContent = data.title;
  transportLogo.src = `https://api.studentall.az:9851/api/file/getFile/${data.logo}`;
  data?.companyCards.map((item, index) => {
    const card = document.querySelector(`.card-${index + 1}`);
    card.textContent = item.title;
  });
});
