document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("galleryModalImg");
  const galleryImages = document.querySelectorAll(".gallery-item img");

  if (!modal || !modalImg || !window.bootstrap) return;

  const imageModal = new bootstrap.Modal(modal);

  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      modalImg.src = image.src;
      modalImg.alt = image.alt;
      imageModal.show();
    });
  });
});
