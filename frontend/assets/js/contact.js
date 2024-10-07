import { endpoints, useFetch, usePost } from "./api.js";

const getList = async () => {
  const res = await useFetch(endpoints.contact.list);
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
