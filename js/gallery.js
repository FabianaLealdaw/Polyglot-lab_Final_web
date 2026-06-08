document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const closeButton = document.getElementById("modal-close");
  const galleryImages = document.querySelectorAll(".gallery-item img");

  if (!modal || !modalImg) return;

  // Hide the enlarged image preview.
  const closeModal = () => {
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
  };

  galleryImages.forEach((image) => {
    // Open the modal with the selected gallery image.
    image.addEventListener("click", () => {
      modalImg.src = image.src;
      modalImg.alt = image.alt;
      modal.classList.add("is-visible");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  // Close the modal when the user clicks outside the image.
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  // Allow keyboard users to close the preview.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
});
