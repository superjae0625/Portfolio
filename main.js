"use strict";
// Make Navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
    // console.log(window.scrollY);
    // console.log(`navbarHeight: ${navbarHeight}`);
    if (window.scrollY > navbarHeight) {
        navbar.classList.add("navbar--dark");
    } else {
        navbar.classList.remove("navbar--dark");
    }
});

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
    const target = event.target;
    const link = target.dataset.link;
    console.log(target);
    console.log(link);
    if (link == null) {
        return;
    }
    navbarMenu.classList.remove("open");
    //null이 아닐 때만 출력(id가 클릭이 될 때만 출력/link가 있는경우만 출력)
    scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("open");
});

//Handle click on "contact me" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
    scrollIntoView("#contact");
});

//Make home slowly faade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

//Show "arrow up" button when scrolling down
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add("visible");
    } else {
        arrowUp.classList.remove("visible");
    }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener("click", () => {
    scrollIntoView("#home");
});

//Porjects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
    const filter =
        e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }

    //Remove selection from the previous item and select the new one
    const active = document.querySelector(".category__btn.selected");
    active.classList.remove("selected");
    const target =
        e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
    // console.log(e.target);
    // console.log(e.target.parentNode);
    // console.log(target);
    // click된 것이 버튼이면 e.target을 쓰고 아니면 span을 쓴다
    target.classList.add("selected");

    //애니메이션은 각 프로젝트를 담고있는 상자에다가 줌
    projectContainer.classList.add("anime-out");
    setTimeout(() => {
        projects.forEach((project) => {
            // console.log(project.dataset.type);
            if (filter === "*" || filter === project.dataset.type) {
                project.classList.remove("invisible");
            } else {
                project.classList.add("invisible");
            }
        });
        projectContainer.classList.remove("anime-out");
    }, 300);
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
}
