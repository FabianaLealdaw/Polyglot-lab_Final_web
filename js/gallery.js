document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const closeButton = document.getElementById("modal-close");
  const galleryImages = document.querySelectorAll(".gallery-item img");

  if (!modal || !modalImg) return;

  const closeModal = () => {
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
  };

  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      modalImg.src = image.src;
      modalImg.alt = image.alt;
      modal.classList.add("is-visible");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
});
