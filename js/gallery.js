document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-img");
  const galleryImages = document.querySelectorAll(".gallery img");

  if (!modal || !modalImage) return;

  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      modalImage.src = image.src;
      modal.classList.add("is-visible");
    });
  });

  modal.addEventListener("click", () => {
    modal.classList.remove("is-visible");
  });
});
