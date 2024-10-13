document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".gallery-image");
    let currentIndex = 0;

    images[currentIndex].classList.add("active");

    function showNextImage() {
        images[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add("active");
    }

    function showPrevImage() {
        images[currentIndex].classList.remove("active");
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images[currentIndex].classList.add("active");
    }

    document.getElementById("next").addEventListener("click", showNextImage);
    document.getElementById("prev").addEventListener("click", showPrevImage);
});