const nextButton = document.getElementById("nextButton");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

let yesSize = 1.5; // Initial size for Yes button
const noTexts = [
  "No",
  "Are you sure?",
  "Really?",
  "Think again?",
  "Please?",
  "Last chance!",
  "🥺",
];
let noClickCount = 0;

// Handle Page Transition
nextButton.addEventListener("click", () => {
  page1.classList.add("hidden");
  page2.classList.remove("hidden");
});

// Handle No button click
noButton.addEventListener("click", () => {
  yesSize += 0.3;
  yesButton.style.fontSize = `${yesSize}rem`;

  noClickCount = (noClickCount + 1) % noTexts.length;
  noButton.textContent = noTexts[noClickCount];
});

// Handle Yes button click (Confetti Effect & "YAY" Text)
yesButton.addEventListener("click", () => {
  startConfetti();

  // Add "YAY!" text below the buttons
  if (!document.getElementById("yayText")) {
    const yayText = document.createElement("h2");
    yayText.id = "yayText";
    yayText.textContent = "YAY! 🎉";
    yayText.classList.add("yay-animation");
    page2.appendChild(yayText);
  }
});

// Confetti Effect
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const confetti = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#ff0000", "#ff69b4", "#ffffff"];

  for (let i = 0; i < 200; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 1,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 - 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  function draw() {
    confetti.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      confetti.fillStyle = p.color;
      confetti.beginPath();
      confetti.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      confetti.fill();
    });
  }

  function update() {
    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
  }

  function animate() {
    draw();
    update();
    requestAnimationFrame(animate);
  }

  animate();

  setTimeout(() => {
    canvas.width = 0;
    canvas.height = 0;
  }, 5000);
}
