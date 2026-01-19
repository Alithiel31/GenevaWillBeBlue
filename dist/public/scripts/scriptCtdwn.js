export function initCountdown() {
  const timerElement = document.getElementById("days");
  
  // Sécurité : si l'élément "days" n'existe pas, on n'active pas le timer
  if (!timerElement) return;

  const targetDate = new Date("June 20, 2026 00:00:00").getTime();

  // Function to update countdown display
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d;
    document.getElementById("hours").innerText = h < 10 ? '0' + h : h;
    document.getElementById("minutes").innerText = m < 10 ? '0' + m : m;
    document.getElementById("seconds").innerText = s < 10 ? '0' + s : s;

    if (distance < 0) {
      clearInterval(timer);
      const timerWrapper = document.getElementById("timer-wrapper");
      if (timerWrapper) timerWrapper.style.display = "none";

      const buttonGroup = document.querySelector(".button-group");
      if (buttonGroup) buttonGroup.style.display = "none";

      const message = document.getElementById("message");
      if (message) message.style.display = "block";
    }
  };

  // Call immediately to show correct values on page load
  updateCountdown();
  
  // Then update every second
  const timer = setInterval(updateCountdown, 1000)
};