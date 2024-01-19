const caseStudy = document.querySelector(".case-main");
const caseStudyAside = document.querySelector(".case-aside");
const caseAsidesLinks = document.querySelectorAll(".case-aside a");
const caseAsidesLinksLength = caseAsidesLinks.length;

const OFFSET = 60;

function showSnackbar() {
  var x = document.getElementById("snackbar");
  x.className = "show";

  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  showSnackbar();
}

function scrollIntoView() {
  const caseStudyVisible = () => {
    const elemTop = caseStudy.offsetTop - OFFSET;
    const elemHeight = caseStudy.offsetHeight;

    const withinViewPort = elemHeight + elemTop;
    const viewPortReachedEnd = window.scrollY + window.innerHeight;

    const isVisible = window.scrollY <= withinViewPort;
    const caseStudyTopIsVisible = elemTop <= window.scrollY;
    const notReachedEnd = withinViewPort >= viewPortReachedEnd;

    return caseStudyTopIsVisible && isVisible && notReachedEnd;
  };

  if (caseStudyVisible()) {
    caseStudyAside.style.marginLeft = "0rem";
  } else {
    caseStudyAside.style.marginLeft = "-23rem";
  }
}

function handleScrollToSections() {
  const clearLinkSelection = () => {
    const allSelectedLinks = document.querySelectorAll(
      ".case-aside a.selected"
    );
    const allSubLiTags = document.querySelectorAll("li.sub-li.show");

    allSubLiTags.forEach((subLiTag) => {
      subLiTag.classList.remove("show");
    });

    allSelectedLinks.forEach((selectedLink) => {
      selectedLink.classList.remove("selected");
    });
  };

  const handleLinkSelect = (link) => {
    const li = link.closest("li");
    const section = li.dataset.id;
    const subLiTags = document.querySelectorAll(
      `li.sub-li[data-id="${section}"]`
    );

    subLiTags.forEach((tag) => {
      tag.classList.add("show");
    });

    link.classList.add("selected");
  };

  for (let i = 0; i < caseAsidesLinksLength; i++) {
    const link = caseAsidesLinks[i];
    const hash = link.hash;
    if (!hash) continue;

    const section = document.querySelector(hash);

    if (!!section && section.offsetTop <= window.scrollY + 16 * 5) {
      clearLinkSelection();
      handleLinkSelect(link);
    }
  }
}

function runOnPageLoad() {
  scrollIntoView();
  handleScrollToSections();
}

function runOnScroll() {
  scrollIntoView();
  handleScrollToSections();
}

window.addEventListener("DOMContentLoaded", runOnPageLoad);
window.addEventListener("scroll", runOnScroll);
