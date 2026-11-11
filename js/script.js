const BOOK_URL =
  "https://app.squareup.com/appointments/book/7h8i4gg9snnlwt/L5AKCJ5AXEKRV/start";

/* =========================
   BOOKING
========================= */
function openBooking(url = BOOK_URL) { window.open(url, "_blank", "noopener,noreferrer"); }

document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-action='book']"); if (trigger) { openBooking(trigger.dataset.bookUrl || BOOK_URL); }
});

/* Accessible services menu */
const menuBtn = document.getElementById("menuBtn");
const menuOverlay = document.getElementById("menuOverlay");
const menuClose = document.getElementById("menuClose");
let menuReturnFocus = null;
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".menu-links a").forEach(link => {
  if (link.getAttribute("href") === currentPage) link.setAttribute("aria-current","page");
});
function setMenuOpen(open) {
  if (!menuOverlay || !menuBtn) return;
  if (open) {
    menuReturnFocus = document.activeElement;
    menuOverlay.inert = false;
    menuOverlay.setAttribute("aria-hidden","false");
    menuOverlay.classList.add("active");
    menuBtn.setAttribute("aria-expanded","true");
    document.body.classList.add("menu-open");
    menuClose?.focus();
  } else {
    menuClose?.blur();
    menuOverlay.classList.remove("active");
    menuOverlay.setAttribute("aria-hidden","true");
    menuOverlay.inert = true;
    menuBtn.setAttribute("aria-expanded","false");
    document.body.classList.remove("menu-open");
    (menuReturnFocus?.isConnected ? menuReturnFocus : menuBtn)?.focus();
  }
}
menuBtn?.addEventListener("click",()=>setMenuOpen(true));
menuClose?.addEventListener("click",()=>setMenuOpen(false));
menuOverlay?.addEventListener("click",e=>{if(e.target===menuOverlay)setMenuOpen(false)});
document.addEventListener("keydown",e=>{
  if(!menuOverlay?.classList.contains("active"))return;
  if(e.key==="Escape"){e.preventDefault();setMenuOpen(false)}
  if(e.key==="Tab"){
    const items=Array.from(menuOverlay.querySelectorAll('a[href],button:not([disabled])'));
    if(!items.length)return;
    const first=items[0],last=items[items.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }
});
/* =========================
   AVAILABILITY ROTATION
========================= */
const availabilityText = document.querySelector(".availability-text");

const slots = ["Few spots left", "Booking this week", "Next availability soon"];

if (availabilityText) {
  const random = Math.floor(Math.random() * slots.length);
  availabilityText.textContent = slots[random];
}

/* =========================
   TESTIMONIAL ROTATION
========================= */
const testimonials = document.querySelectorAll(".testimonial");

if (testimonials.length) {
  let index = 0;

  setInterval(() => {
    testimonials[index].classList.remove("active");
    index = (index + 1) % testimonials.length;
    testimonials[index].classList.add("active");
  }, 4000);
}

/* =========================
   PARALLAX
========================= */
const hero = document.querySelector(".parallax");

function animateParallax() {
  let current = 0;

  function loop() {
    const target = window.scrollY;
    current += (target - current) * 0.08;

    if (hero) {
      hero.style.transform = `translate3d(0, ${current * 0.3}px, 0)`;
    }

    requestAnimationFrame(loop);
  }

  loop();
}

animateParallax();

/* =========================
   REVEAL ANIMATION
========================= */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

window.addEventListener("load", () => {
  document.querySelectorAll(".block, .text-block").forEach((el) => {
    observer.observe(el);
  });
});

/* GOOGLE MAP */
function initMap() {
  if (!document.getElementById("map") || !window.google?.maps) return;
  const location = { lat: 40.7642, lng: -73.9117 };

  const map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 13,
    disableDefaultUI: true,
    mapId: "502f318c005719995eaf0539"
  });

  new google.maps.Marker({
    position: location,
    map,
  });
}

window.initMap = initMap;

/* BOOK NOW */
const footerCTA = document.querySelector(".footer-cta");

function checkScrollBottom() {
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.body.offsetHeight;

  if (scrollPosition >= pageHeight - 50) {
    footerCTA?.classList.add("active");
  } else {
    footerCTA?.classList.remove("active");
  }
}

window.addEventListener("scroll", checkScrollBottom);
