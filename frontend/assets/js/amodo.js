import { endpoints, useFetch } from "./api.js";

const amoDoLogo = document.querySelector(".amoDoLogo");
const headingTitle = document.querySelector(".headingTitle");
const descriptionPart1 = document.querySelector(".description-part1");
const descriptionPart2 = document.querySelector(".description-part2");

const getList = async () => {
  const res = await useFetch(endpoints.company.getAllByName + "amodo");
  return res;
};

getList().then((data) => {
  headingTitle.textContent = data.title;
  let parts = data.description.split("<br><br>");

  descriptionPart1.innerHTML = parts[0];
  descriptionPart2.innerHTML = parts[1];
  amoDoLogo.src = `https://api.studentall.az:9851/api/file/getFile/${data.logo}`;

  data.companyCards.map((item, index) => {
    const cardText = document.querySelector(`.card-${index + 1} p`);
    cardText.textContent = item.title;
  });

  console.log(data);
});
