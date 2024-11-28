import { endpoints, useFetch, usePost } from "./api.js";

const language = localStorage.getItem("language") || "az";

const getList = async () => {
  const headers = {
    "x-api-key": "aebddf40-4255-4a9a-8bdb-3eea84c28bb9",
    "accept-language": language,
  };
  const res = await useFetch(endpoints.contact.list, headers);
  return res;
};

const phone = document.querySelector(".phone");
const email = document.querySelector(".email");
const fax = document.querySelector(".fax");
const city = document.querySelector(".city");
const location = document.querySelector(".location");

getList().then((data) => {
  phone.textContent = data[0].phoneNumber;
  email.textContent = data[0].email;
  fax.textContent = data[0].fax;
  city.textContent = data[0].city;
  location.textContent = data[0].location;
});

// Form
const form = document.querySelector(".contact-us-form");
const alert = document.querySelector(".alert");
const submitButton = document.querySelector(".submitButton");
let loading = false;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (form.checkValidity()) {
    const formData = new FormData(form);
    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    if (
      !data.name ||
      !data.lastName ||
      !data.email ||
      !data.message ||
      !data.phoneNumber
    ) {
      alert.classList.add("text-red-500");
      alert.textContent = "Zəhmət olmasa bütün xanaları doldurun";
      return;
    }

    try {
      loading = true;
      submitButton.textContent = loading ? "Sending..." : "Send Message";
      submitButton.disabled = true;
      const res = await usePost(endpoints.contact.create, data);
      loading = false;
      submitButton.disabled = false;
      submitButton.textContent = loading ? "Sending..." : "Send Message";
      if (res) {
        alert.classList.add("text-white");
        alert.textContent = "Your message has been sent successfully";
        form.reset();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    console.error("Form doldurulmayıb!");
  }
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
