// Smooth fade-in placeholder.
// More animations can be added later.

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transition = "0.3s";
  });
});

const year = new Date().getFullYear();
const footer = document.querySelector("footer p:last-child");
if (footer) {
  footer.innerHTML = `© ${year} Dr. Ahmed Al Salih`;
}