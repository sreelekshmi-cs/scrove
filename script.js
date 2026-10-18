/* HOME PAGE - COLLECTION SLIDER */

const track = document.getElementById("collectionTrack");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

if (track && nextBtn && prevBtn) {
    let currentIndex = 0;

    function getVisibleCards() {
        return window.innerWidth <= 768 ? 2 : 4;
    }

    function showCards() {
        const cards = track.children;

        if (cards.length === 0) return;

        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);

        currentIndex = Math.min(currentIndex, maxIndex);

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = 20;

        track.style.transform =
            `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    }

    nextBtn.addEventListener("click", function () {
        const maxIndex = Math.max(
            0,
            track.children.length - getVisibleCards()
        );

        currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
        showCards();
    });

    prevBtn.addEventListener("click", function () {
        const maxIndex = Math.max(
            0,
            track.children.length - getVisibleCards()
        );

        currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
        showCards();
    });

    window.addEventListener("resize", showCards);
    showCards();
}


/* HOME PAGE - GRAPH ANIMATION */

const graph = document.querySelector(".growth");

if (graph && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
            graph.classList.remove("show");
            void graph.offsetWidth;
            graph.classList.add("show");
        } else {
            graph.classList.remove("show");
        }
    }, {
        threshold: 0.3
    });

    observer.observe(graph);
}


/* CONTACT PAGE - FORM */

const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const textarea = document.getElementById("message");
const count = document.getElementById("count");

if (textarea && count) {
    textarea.addEventListener("input", function () {
        count.textContent = textarea.value.length;
    });
}

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (successMessage) {
            successMessage.textContent =
                "Your message has been submitted successfully!";
        }

        form.reset();

        if (count) {
            count.textContent = "0";
        }
    });
}























/* Close Offer Bar */
function closeOffer() {
    document.getElementById("offerBar").style.display = "none";
}

/* Fashion Image Slider */
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides[currentSlide].classList.remove("active");

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}




function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}