// scripts.js

// Configuration
const DEFAULT_LOCALE = "en";
const SUPPORTED_LOCALES = ["en", "ar"];
const LOCALE_STORAGE_KEY = "userLocale"; // Key for localStorage/sessionStorage
const STORAGE_TYPE = "localStorage"; // Change to "sessionStorage" if needed

const FULLY_QUALIFIED_LOCALE_DEFAULTS = {
  en: "en-US",
  ar: "ar-EG",
};

// State
let locale;
let translations = {};

// When the page content is ready...
document.addEventListener("DOMContentLoaded", () => {
  const initialLocale =
    getStoredLocale() || supportedOrDefault(browserLocales(true));
  setLocale(initialLocale);
  bindLocaleSwitcher(initialLocale);
});

// Load translations for the given locale and translate
// the page to this locale
async function setLocale(newLocale) {
  if (newLocale === locale) return;

  try {
    const newTranslations = await fetchTranslationsFor(newLocale);
    locale = newLocale;
    translations = newTranslations;
    document.documentElement.lang = newLocale;
    document.documentElement.dir = dir(newLocale);
    translatePage();
    storeLocale(newLocale); // Store the locale
  } catch (error) {
    console.error("Failed to set locale:", error);
    // Handle error gracefully (e.g., fallback to default locale)
    await setLocale(DEFAULT_LOCALE);
  }
}

// Retrieves translations JSON object for the given
// locale over the network
async function fetchTranslationsFor(newLocale) {
  const response = await fetch(`assets/lang/${newLocale}.json`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch translations for ${newLocale}: ${response.status}`
    );
  }
  return await response.json();
}

// Replace the inner text of all elements with the
// data-i18n-key attribute to translations corresponding
// to their data-i18n-key
function translatePage() {
  document.querySelectorAll("[data-i18n-key]").forEach(translateElement);
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
    return interpolated.replace(new RegExp(`{\\s*${key}\\s*}`, "g"), value);
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
      FULLY_QUALIFIED_LOCALE_DEFAULTS[locale],
      options
    ).format(number);
  }
  return value;
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
      FULLY_QUALIFIED_LOCALE_DEFAULTS[locale],
      options
    ).format(parsedDate);
  }
  return value;
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
  return SUPPORTED_LOCALES.includes(locale);
}

// Retrieve the first locale we support from the given
// array, or return our default locale
function supportedOrDefault(locales) {
  return locales.find(isSupported) || DEFAULT_LOCALE;
}

function dir(locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

function bindLocaleSwitcher(initialValue) {
  const switcher = document.querySelector("[data-i18n-switcher]");
  if (switcher) {
    switcher.value = initialValue;
    switcher.onchange = (e) => setLocale(e.target.value);
  }
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

// Storage Functions
function storeLocale(locale) {
  if (STORAGE_TYPE === "localStorage") {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } else if (STORAGE_TYPE === "sessionStorage") {
    sessionStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }
}

function getStoredLocale() {
  if (STORAGE_TYPE === "localStorage") {
    return localStorage.getItem(LOCALE_STORAGE_KEY);
  } else if (STORAGE_TYPE === "sessionStorage") {
    return sessionStorage.getItem(LOCALE_STORAGE_KEY);
  }
  return null;
}
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
