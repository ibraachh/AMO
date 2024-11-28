import { endpoints, useFetch } from "./api.js";

const amoDoLogo = document.querySelector(".amoDoLogo");
const headingTitle = document.querySelector(".headingTitle");
const descriptionPart1 = document.querySelector(".description-part1");
const descriptionPart2 = document.querySelector(".description-part2");
const language = localStorage.getItem("language") || "az";

const getList = async () => {
  const headers = {
    "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
    "accept-language": language,
  };
  const res = await useFetch(
    endpoints.company.getAllByName + "amotrade",
    headers
  );
  return res;
};

getList().then((data) => {
  headingTitle.textContent = data.title;
  let parts = data.description.split("<br><br>");

  descriptionPart1.innerHTML = parts[0] ? parts[0] : "";
  descriptionPart2.innerHTML = parts[1] ? parts[1] : "";
  amoDoLogo.src = `https://api.studentall.az:9851/api/file/getFile/${data.logo}`;

  data.companyCards.map((item, index) => {
    const cardText = document.querySelector(`.card-${index + 1} p`);
    cardText.textContent = item.title;
  });
});

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
