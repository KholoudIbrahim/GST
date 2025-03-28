// The locale our app first shows

const defaultLocale = "en";

const supportedLocales = ["en", "ar"];

const fullyQualifiedLocaleDefaults = {
  en: "en-US",

  ar: "ar-EG",
};

// The active locale

let locale;

// Gets filled with active locale translations

let translations = {};

// When the page content is ready...

document.addEventListener("DOMContentLoaded", () => {
  const initialLocale = supportedOrDefault(browserLocales(true));

  setLocale(initialLocale);

  bindLocaleSwitcher(initialLocale);
});

// Load translations for the given locale and translate

// the page to this locale

async function setLocale(newLocale) {
  if (newLocale === locale) return;

  const newTranslations = await fetchTranslationsFor(newLocale);

  locale = newLocale;

  translations = newTranslations;

  document.documentElement.lang = newLocale;

  document.documentElement.dir = dir(newLocale);

  translatePage();
}

// Retrieves translations JSON object for the given

// locale over the network

async function fetchTranslationsFor(newLocale) {
  const response = await fetch(`assets/lang/${newLocale}.json`);

  return await response.json();
}

// Replace the inner text of all elements with the

// data-i18n-key attribute to translations corresponding

// to their data-i18n-key

function translatePage() {
  document

    .querySelectorAll("[data-i18n-key]")

    .forEach((el) => translateElement(el));
}

// Replace the inner text of the given HTML element

// with the translation in the active locale,

// corresponding to the element's data-i18n-key

function translateElement(element) {
  const key = element.getAttribute("data-i18n-key");

  const options = JSON.parse(element.getAttribute("data-i18n-opt")) || {};

  element.innerText = translate(key, options);
}

function translate(key, interpolations = {}) {
  const message = translations[key];

  if (key.endsWith("-plural")) {
    return interpolate(
      pluralFormFor(message, interpolations.count),

      interpolations
    );
  }

  return interpolate(message, interpolations);
}

// Convert a message like "Hello, {name}" to "Hello, Chad"

// where the given interpolations object is {name: "Chad"}

function interpolate(message, interpolations) {
  return Object.keys(interpolations).reduce((interpolated, key) => {
    const value = formatDate(formatNumber(interpolations[key]));

    return interpolated.replace(new RegExp(`{\s*${key}\s*}`, "g"), value);
  }, message);
}

/*

  Given a value object like

  {

    "number" : 300000,

    "style": "currency",

    "currency": "EUR"

  } and that the current locale is en, returns "€300,000.00"

*/

function formatNumber(value) {
  if (typeof value === "object" && value.number) {
    const { number, ...options } = value;

    return new Intl.NumberFormat(
      fullyQualifiedLocaleDefaults[locale],

      options
    ).format(number);
  } else {
    return value;
  }
}

/*

  Given a value object like

  {

    "date": "2021-12-05 15:29:00",

    "dateStyle": "long",

    "timeStyle": "short"

  } and that the current locale is en,

  returns "December 5, 2021 at 3:29 PM"

*/

function formatDate(value) {
  if (typeof value === "object" && value.date) {
    const { date, ...options } = value;

    const parsedDate = typeof date === "string" ? Date.parse(date) : date;

    return new Intl.DateTimeFormat(
      fullyQualifiedLocaleDefaults[locale],

      options
    ).format(parsedDate);
  } else {
    return value;
  }
}

/*

  Given a forms object like

  {

    "zero": "No articles",

    "one": "One article",

    "other": "{count} articles"

  } and a count of 1, returns "One article"

*/

function pluralFormFor(forms, count) {
  const matchingForm = new Intl.PluralRules(locale).select(count);

  return forms[matchingForm];
}

function isSupported(locale) {
  return supportedLocales.indexOf(locale) > -1;
}

// Retrieve the first locale we support from the given

// array, or return our default locale

function supportedOrDefault(locales) {
  return locales.find(isSupported) || defaultLocale;
}

function dir(locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

function bindLocaleSwitcher(initialValue) {
  const switcher = document.querySelector("[data-i18n-switcher]");

  switcher.value = initialValue;

  switcher.onchange = (e) => {
    setLocale(e.target.value);
  };
}

/**

 * Retrieve user-preferred locales from browser

 *

 * @param {boolean} languageCodeOnly - when true, returns

 * ["en", "fr"] instead of ["en-US", "fr-FR"]

 * @returns array | undefined

 */

function browserLocales(languageCodeOnly = false) {
  return navigator.languages.map((locale) =>
    languageCodeOnly ? locale.split("-")[0] : locale
  );
}

// scripts.js

// ... (Your existing code) ...

// Function to set a cookie

function setCookie(name, value, days) {
  let expires = "";

  if (days) {
    const date = new Date();

    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie

function getCookie(name) {
  const nameEQ = name + "=";

  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) === " ") c = c.substring(1, c.length);

    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

// Override the setLocale function to use cookies

async function setLocale(newLocale) {
  if (newLocale === locale) return;

  const newTranslations = await fetchTranslationsFor(newLocale);

  locale = newLocale;

  translations = newTranslations;

  document.documentElement.lang = newLocale;

  document.documentElement.dir = dir(newLocale);

  translatePage(); // Store the selected locale in a cookie

  setCookie("locale", newLocale, 365); // Store for 365 days
}

// Modify the DOMContentLoaded event listener to check for a cookie

document.addEventListener("DOMContentLoaded", () => {
  let initialLocale = getCookie("locale");

  if (!initialLocale) {
    initialLocale = supportedOrDefault(browserLocales(true));
  } else if (!isSupported(initialLocale)) {
    initialLocale = supportedOrDefault(browserLocales(true));
  }

  setLocale(initialLocale);

  bindLocaleSwitcher(initialLocale);
});
// carousel
// $(".owl-carousel").owlCarousel({
//   loop: true,
//   // margin: 10,
//   nav: true,
//   responsive: {
//     0: {
//       items: 1,
//     },
//     600: {
//       items: 3,
//     },
//     1000: {
//       items: 5,
//     },
//   },
// });

// swiper

var swiper = new Swiper(".swiper-container", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 2,
  slidesPerView: "auto",
  loop: true,
  speed: 3000,
  allowTouchMove: true,
  spaceBetween: 10,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  autoplay: {
    // delay: 0,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// toggle subside menu

// Social Menu

// document.querySelectorAll(".nav-link").forEach((item) => {
//   item.addEventListener("mouseover", function () {
//     const targetPaneId = this.getAttribute("data-bs-target");
//     const targetPane = document.querySelector(targetPaneId);

//     // Remove 'active' class from all nav links
//     document.querySelectorAll(".nav-link").forEach((link) => {
//       link.classList.remove("active");
//     });

//     // Remove 'show' class from all tab panes
//     document.querySelectorAll(".tab-pane").forEach((pane) => {
//       pane.classList.remove("show", "active");
//     });

//     // Add 'active' class to the hovered nav link
//     this.classList.add("active");

//     // Add 'show' and 'active' classes to the corresponding tab pane
//     if (targetPane) {
//       targetPane.classList.add("show", "active");
//     }
//   });
// });
