const $ = (id) => document.getElementById(id);

function updateCountdown() {
  const now = new Date();
  let next = new Date(now.getFullYear(), 9, 15, 0, 0, 0);
  if (now >= next) next = new Date(now.getFullYear() + 1, 9, 15, 0, 0, 0);
  const remaining = Math.max(0, next - now);
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  $("days").textContent = String(days).padStart(3, "0");
  $("hours").textContent = String(hours).padStart(2, "0");
  $("minutes").textContent = String(minutes).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 60000);

function celebrate(count = 42) {
  const colors = ["#e96f4c", "#e8b761", "#71866b", "#d89477", "#f0c9aa"];
  const symbols = ["✦", "✳", "•", "♥"];
  for (let i = 0; i < count; i += 1) {
    const bit = document.createElement("span");
    bit.className = "confetti";
    bit.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    bit.style.left = Math.random() * 100 + "vw";
    bit.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
    bit.style.setProperty("--size", (8 + Math.random() * 13) + "px");
    bit.style.setProperty("--fall", (2.4 + Math.random() * 2.8) + "s");
    bit.style.setProperty("--drift", (Math.random() * 180 - 90) + "px");
    bit.style.animationDelay = (Math.random() * .7) + "s";
    document.body.appendChild(bit);
    bit.addEventListener("animationend", () => bit.remove(), { once: true });
  }
}

$("sparkleButton").addEventListener("click", () => {
  celebrate(65);
  $("wishToast").textContent = "Your wish is on its way ✨";
  $("wishToast").classList.add("show");
  window.setTimeout(() => $("wishToast").classList.remove("show"), 2500);
});

document.querySelectorAll(".wish-card").forEach((card) => {
  card.addEventListener("click", () => {
    $("wishReveal").textContent = card.dataset.wish;
    $("wishReveal").classList.add("visible");
    celebrate(16);
  });
});

document.querySelector(".primary-button").addEventListener("click", () => celebrate(24));