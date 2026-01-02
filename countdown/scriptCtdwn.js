const targetDate = new Date("June 20, 2026 00:00:00").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d;
    document.getElementById("hours").innerText = h < 10 ? '0'+h : h;
    document.getElementById("minutes").innerText = m < 10 ? '0'+m : m;
    document.getElementById("seconds").innerText = s < 10 ? '0'+s : s;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("timer-wrapper").style.display = "none";
        document.getElementById("message").style.display = "block";
    }
}, 1000);