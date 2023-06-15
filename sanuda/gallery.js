const slides = document.querySelectorAll(".slide");
const clearActives = () => {
  slides.forEach((slide) => slide.classList.remove("active"));
};
const setActive = (e) => {
  clearActives();
  e.target.classList.add("active");
};
slides.forEach((slide) => {
  slide.addEventListener("click", setActive);
});

const select = document.getElementById("select-color");

select.addEventListener("change", function () {
  const selectedOption = select.options[select.selectedIndex].value;

  if (selectedOption === "colour-1") {
    document.body.style.backgroundColor = "SeaShell";
  } else if (selectedOption === "colour-2") {
    document.body.style.backgroundColor = "Coral";
  } else if (selectedOption === "colour-3") {
    document.body.style.backgroundColor = "DarkSeaGreen";
  } else if (selectedOption === "colour-4") {
    document.body.style.backgroundColor = "Aquamarine";
  } else {
    document.body.style.backgroundColor = "";
  }
});

const selectFont = document.getElementById("select-font");
const slideElements = document.querySelectorAll(".slide");

selectFont.addEventListener("change", (event) => {
  const selectedFontSize = event.target.value;

  // Set the font size of all h3 and p elements in all slide elements based on the selected option
  switch (selectedFontSize) {
    case "font-1":
      slideElements.forEach((slide) => {
        slide.querySelectorAll("h3, p").forEach((elem) => {
          elem.style.fontSize = "17px";
        });
      });
      break;
    case "font-2":
      slideElements.forEach((slide) => {
        slide.querySelectorAll("h3, p").forEach((elem) => {
          elem.style.fontSize = "21px";
        });
      });
      break;
    case "font-3":
      slideElements.forEach((slide) => {
        slide.querySelectorAll("h3, p").forEach((elem) => {
          elem.style.fontSize = "24px";
        });
      });
      break;
    default:
      // If no option is selected, reset the font size to default
      slideElements.forEach((slide) => {
        slide.querySelectorAll("h3, p").forEach((elem) => {
          elem.style.fontSize = "15px";
        });
      });
  }
});

const sectionHeroEl = document.querySelector(".gallery");

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
    rootMargin: "-350px",
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
