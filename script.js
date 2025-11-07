const modal = document.getElementById("video-modal");
const btn = document.getElementById("listen-button");
const closeBtn = document.getElementById("close-modal");
const video = modal.querySelector("iframe");

btn.addEventListener("click", () => {
    modal.style.display = 'flex';
    const src = video.src;
    if (!src.includes("&autoplay=1")) {
        video.src += "&autoplay=1";
    }
});

closeBtn.addEventListener("click", () => {
    modal.style.display = 'none';
    video.src = video.src.replace("&autoplay=1", "");
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        video.src = video.src.replace("&autoplay=1", "");
    }
});


// Merch modal
const merchModal = document.getElementById("merch-modal");
const merchBtn = document.querySelector('nav a[href="#merch-modal"]');
const closeMerch = document.getElementById("close-merch-modal");

merchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    merchModal.style.display = "flex";
});

closeMerch.addEventListener("click", () => {
    merchModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === merchModal) {
        merchModal.style.display = "none";
    }
});


// Gallery modal
const galleryModal = document.getElementById("gallery-modal");
const galleryBtn = document.querySelector('nav a[href="#gallery-modal"]');
const closeGallery = document.getElementById("close-gallery-modal");

galleryBtn.addEventListener("click", (event) => {
    event.preventDefault();
    galleryModal.style.display = "flex";
});

closeGallery.addEventListener("click", () => {
    galleryModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === galleryModal) {
        galleryModal.style.display = "none";
    }
});
