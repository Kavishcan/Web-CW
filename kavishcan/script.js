///////////////////////////////////////////////////////////
//  navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-160px",
  }
);
obs.observe(sectionHeroEl);

// Get all the main navigation links
const navLinks = document.querySelectorAll(".main-nav-link");

// Add a scroll event listener to the window
window.addEventListener("scroll", () => {
  // Get the current scroll position
  const currentScrollPos = window.pageYOffset;

  // Loop through all the main navigation links
  navLinks.forEach((link) => {
    // Get the section corresponding to the link's href attribute
    const section = document.querySelector(link.hash);

    // Check if the section is in view
    if (
      section.offsetTop <= currentScrollPos + 200 &&
      section.offsetTop + section.offsetHeight > currentScrollPos + 200
    ) {
      // Add the "active" class to the link
      link.classList.add("active");
    } else {
      // Remove the "active" class from the link
      link.classList.remove("active");
    }
  });
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Scroll to other links
    if (href && href[0] === "#" && document.querySelector(href)) {
      e.preventDefault();
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Do nothing for other links
    if (href && href[0] !== "#") {
      return;
    }
  });
});

// Get the "Explore" button element
const exploreBtn = document.querySelector(".btn--hero");

exploreBtn.addEventListener("click", () => {
  window.scrollBy({
    top: 700,
    behavior: "smooth",
  });
});

///////////////////////////////////////////////////////////
// Comment form

// get form elements
const form = document.querySelector(".cta-form");
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const whereSelect = document.getElementById("select-where");
const packageSelect = document.getElementById("select-package");
const ratingRadio = document.getElementsByName("rating");
const feedbackMessage = document.getElementById("feedback-message");

const popup = document.getElementById("popup");
const wrap = document.getElementById("popup-wrapper");

const message = document.getElementById("message");

// add event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default form submission behavior

  // check if all fields are valid
  if (
    validateFullName() &&
    validateEmail() &&
    validateWhereSelect() &&
    validatePackageSelect() &&
    validateRatingRadio() &&
    validateFeedbackMessage()
  ) {
    const body = `Name: ${fullName.value}\nEmail: ${email.value}\nHeard from: ${
      whereSelect.value
    }\nPackage: ${
      packageSelect.value
    }\nRating: ${getSelectedRating()}\nFeedback: ${feedbackMessage.value}`;
    const subject = "Feedback from your website";
    const mailto = `mailto:kavishcan2002@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    popup.classList.toggle("active-popup");

    // reset the form
    form.reset();
  }
});

// validation functions for each form field
function validateFullName() {
  if (fullName.value.trim() === "") {
    message.innerHTML = `* Please enter your full name.`;
    fullName.style.boxShadow = "0 0 10px red"; // add red box shadow
    fullName.focus();
    return false;
  }
  fullName.style.boxShadow = "none"; // remove box shadow
  message.innerHTML = ``;
  return true;
}

function validateEmail() {
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email.value)) {
    // alert("Please enter a valid email address.");
    message.innerHTML = `* Please enter a valid email address.`;
    email.style.boxShadow = "0 0 10px red"; // add red box shadow
    email.focus();
    return false;
  }
  message.innerHTML = ``;
  email.style.boxShadow = "none"; // remove box shadow
  return true;
}

function validateWhereSelect() {
  if (whereSelect.value === "") {
    // alert("Please select where you heard from us.");
    message.innerHTML = `* Please select where you heard from us.`;
    whereSelect.style.boxShadow = "0 0 10px red"; // add red box shadow
    whereSelect.focus();
    return false;
  }
  message.innerHTML = ``;
  whereSelect.style.boxShadow = "none"; // remove box shadow
  return true;
}

function validatePackageSelect() {
  if (packageSelect.value === "") {
    // alert("Please select a package.");
    message.innerHTML = `* Please select a package.`;
    packageSelect.style.boxShadow = "0 0 10px red"; // add red box shadow
    packageSelect.focus();
    return false;
  }
  message.innerHTML = ``;
  packageSelect.style.boxShadow = "none"; // remove box shadow
  return true;
}

function validateRatingRadio() {
  if (!getSelectedRating()) {
    // alert("Please select a rating.");
    message.innerHTML = `* Please select a rating.`;
    return false;
  }
  message.innerHTML = ``;
  return true;
}

// helper function to get the selected rating
function getSelectedRating() {
  for (let i = 0; i < ratingRadio.length; i++) {
    if (ratingRadio[i].checked) {
      return ratingRadio[i].value;
    }
  }
  return null;
}

function validateFeedbackMessage() {
  if (feedbackMessage.value.trim() === "") {
    // alert("Please enter your feedback.");
    message.innerHTML = `* Please enter your feedback.`;
    feedbackMessage.style.boxShadow = "0 0 10px red"; // add red box shadow
    feedbackMessage.focus();
    return false;
  }
  message.innerHTML = ``;
  feedbackMessage.style.boxShadow = "none"; // remove box shadow
  return true;
}

function closePopup() {
  popup.classList.remove("active-popup");
}
