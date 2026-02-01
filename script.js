// ===== Utility: Base64 encode/decode (supports Unicode) =====
function encodeData(obj) {
  const json = JSON.stringify(obj);
  return btoa(unescape(encodeURIComponent(json)));
}

function decodeData(str) {
  try {
    const json = decodeURIComponent(escape(atob(str)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// ===== Floating Hearts Background =====
function spawnFloatingHearts() {
  const container = document.getElementById('heartsBg');
  const hearts = ['\u2764', '\u2665', '\u2763'];

  setInterval(() => {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (12 + Math.random() * 12) + 'px';
    heart.style.animationDuration = (8 + Math.random() * 8) + 's';
    container.appendChild(heart);

    heart.addEventListener('animationend', () => heart.remove());
  }, 1500);
}

// ===== Confetti =====
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#d46a7a', '#e8909e', '#dda0ad', '#c9a0d5', '#ddb89a', '#f2c6c6', '#e8c9b0', '#d4bfdb'];

  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      opacity: 1,
    });
  }

  let frame = 0;
  const maxFrames = 300;

  function animate() {
    if (frame > maxFrames) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of pieces) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.rotation += p.rotSpeed;

      if (frame > maxFrames - 80) {
        p.opacity = Math.max(0, p.opacity - 0.015);
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    frame++;
    requestAnimationFrame(animate);
  }

  animate();
}

// ===== No Button Dodge Logic =====
function setupNoButton() {
  const btnNo = document.getElementById('btnNo');
  const btnYes = document.getElementById('btnYes');
  let dodgeCount = 0;
  const maxDodges = 20;
  const noTexts = [
    'No', 'Are you sure?', 'Really?', 'Think again!',
    'Please?', 'Pretty please?', 'With a cherry on top?',
    'Just say yes!', 'Come on!', 'You know you want to!',
    'Last chance...', 'Okay fine...', 'Just kidding!',
    'Try again!', 'Nope, say yes!', 'Almost...', 'So close!',
    'Not today!', 'Catch me!', 'You can\'t click me!'
  ];

  function dodgeButton(e) {
    dodgeCount++;

    // Update text
    btnNo.textContent = noTexts[Math.min(dodgeCount, noTexts.length - 1)];

    // Shrink slightly each time (never below 60% so it's still visible)
    const scale = Math.max(0.6, 1 - dodgeCount * 0.02);

    // Grow the Yes button
    const yesScale = Math.min(1.5, 1 + dodgeCount * 0.04);
    btnYes.style.transform = `scale(${yesScale})`;

    // Move to a random spot on screen, but ensure it stays within viewport
    // Use fixed positioning so it moves around the whole page
    const btnWidth = btnNo.offsetWidth;
    const btnHeight = btnNo.offsetHeight;
    const padding = 20;

    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    const newX = padding + Math.random() * (maxX - padding);
    const newY = padding + Math.random() * (maxY - padding);

    btnNo.style.position = 'fixed';
    btnNo.style.left = newX + 'px';
    btnNo.style.top = newY + 'px';
    btnNo.style.zIndex = '100';
    btnNo.style.transform = `scale(${scale})`;
  }

  // Desktop: dodge on hover
  btnNo.addEventListener('mouseenter', dodgeButton);

  // Mobile: dodge on touch
  btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeButton(e);
  });
}

// ===== Yes Button Handler =====
function setupYesButton(data) {
  const btnYes = document.getElementById('btnYes');

  btnYes.addEventListener('click', () => {
    // Hide the card
    document.getElementById('valentineCard').classList.add('hidden');
    document.getElementById('cardButtons').classList.add('hidden');

    // Show response
    const response = document.getElementById('yesResponse');
    response.classList.remove('hidden');

    // Set personalized text
    const yesText = document.getElementById('yesText');
    yesText.textContent = `You just made ${data.from}'s day!`;

    // Launch confetti
    launchConfetti();

    // Second wave of confetti
    setTimeout(launchConfetti, 1500);
  });
}

// ===== Message Suggestions =====
const suggestedMessages = [
  "Every moment with you feels like a beautiful dream.",
  "You make my heart skip a beat, every single day.",
  "Life with you is my favorite adventure.",
  "You're my today and all of my tomorrows.",
  "I fall in love with you more and more each day.",
  "You're the reason I believe in love.",
  "My heart is, and always will be, yours.",
  "Being with you is my happiest place.",
  "You're the best thing that ever happened to me.",
  "I love you more than words could ever say.",
  "You had me at hello, and you still do.",
  "Every love song makes me think of you.",
  "You are my sun, my moon, and all my stars.",
  "Loving you is the easiest thing I've ever done.",
  "With you, I'm home no matter where we are.",
  "You make the ordinary feel extraordinary.",
  "I choose you, today and every day after.",
  "My favorite place in the world is next to you.",
  "You're the missing piece I never knew I needed.",
  "Thank you for making my life so beautiful.",
  "I can't imagine my world without you in it.",
  "You make me want to be a better person.",
  "Every day with you is a gift I never take for granted.",
  "You stole my heart, but I'll let you keep it.",
  "I love the way you make me smile without even trying.",
  "You're my favorite notification.",
  "Distance means nothing when someone means everything.",
  "I didn't believe in forever until I met you.",
  "You're the plot twist I never saw coming.",
  "My love for you grows stronger with each passing day.",
  "You make my soul happy.",
  "In a sea of people, my eyes will always search for you.",
];

function showSuggestions() {
  const container = document.getElementById('suggestions');
  const textarea = document.getElementById('customMessage');

  container.innerHTML = '';

  const shuffled = [...suggestedMessages].sort(() => 0.5 - Math.random());
  const picked = shuffled.slice(0, 1);

  picked.forEach((msg) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'suggestion-chip';
    chip.textContent = msg;
    chip.addEventListener('click', () => {
      textarea.value = msg;
      container.querySelectorAll('.suggestion-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
    });
    container.appendChild(chip);
  });
}

function setupSuggestions() {
  showSuggestions();

  document.getElementById('refreshSuggestions').addEventListener('click', () => {
    showSuggestions();
  });
}

// ===== Theme Picker =====
function setupThemePicker() {
  const options = document.querySelectorAll('.theme-option');

  options.forEach((option) => {
    option.addEventListener('click', () => {
      options.forEach((o) => o.classList.remove('selected'));
      option.classList.add('selected');
      document.documentElement.setAttribute('data-theme', option.dataset.theme || 'classic');
    });
  });
}

// ===== Creator Form =====
function setupCreatorForm() {
  const form = document.getElementById('creatorForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const from = document.getElementById('senderName').value.trim();
    const to = document.getElementById('receiverName').value.trim();
    const msg = document.getElementById('customMessage').value.trim();
    const theme = document.querySelector('.theme-option.selected')?.dataset.theme || 'classic';

    if (!from || !to) return;

    const data = { from, to, theme };
    if (msg) data.msg = msg;

    const encoded = encodeData(data);
    const link = window.location.origin + window.location.pathname + '#' + encoded;

    const linkInput = document.getElementById('generatedLink');
    linkInput.value = link;

    document.getElementById('linkResult').classList.remove('hidden');

    // Scroll to result
    document.getElementById('linkResult').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Copy button
  document.getElementById('copyBtn').addEventListener('click', () => {
    const linkInput = document.getElementById('generatedLink');
    navigator.clipboard.writeText(linkInput.value).then(() => {
      const btn = document.getElementById('copyBtn');
      btn.textContent = 'Copied!';
      setTimeout(() => (btn.textContent = 'Copy'), 2000);
    });
  });
}

// ===== Show Valentine Page =====
function showValentine(data) {
  // Apply theme
  document.documentElement.setAttribute('data-theme', data.theme || 'classic');

  // Hide creator, show valentine
  document.getElementById('creatorPage').classList.add('hidden');
  document.getElementById('valentinePage').classList.remove('hidden');

  // Fill in card
  document.getElementById('cardReceiver').textContent = `Dear ${data.to}`;
  document.getElementById('cardSender').textContent = `- With love, ${data.from}`;

  const msgEl = document.getElementById('cardMessage');
  if (data.msg) {
    msgEl.textContent = `"${data.msg}"`;
  } else {
    msgEl.classList.add('hidden');
  }

  // Setup interactions
  setupNoButton();
  setupYesButton(data);
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  spawnFloatingHearts();

  const hash = window.location.hash.substring(1);

  if (hash) {
    const data = decodeData(hash);
    if (data && data.from && data.to) {
      showValentine(data);
    } else {
      // Invalid hash, show creator
      setupCreatorForm();
      setupThemePicker();
      setupSuggestions();
    }
  } else {
    // No hash, show creator page
    setupCreatorForm();
    setupThemePicker();
    setupSuggestions();
  }
});

// Handle window resize for confetti canvas
window.addEventListener('resize', () => {
  const canvas = document.getElementById('confettiCanvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
