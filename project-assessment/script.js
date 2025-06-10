
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});


navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


const faqs = document.querySelectorAll('.faq');
faqs.forEach(faq => {
  faq.querySelector('.question').addEventListener('click', () => {
    faq.classList.toggle('open');
  });
});


const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

function setDarkMode(enabled) {
  if (enabled) {
    body.classList.add('dark');
    darkModeToggle.textContent = '☀️';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    body.classList.remove('dark');
    darkModeToggle.textContent = '🌙';
    localStorage.setItem('darkMode', 'disabled');
  }
}

darkModeToggle.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');
  setDarkMode(!isDark);
});


if (localStorage.getItem('darkMode') === 'enabled') {
  setDarkMode(true);
} else {
  setDarkMode(false);
}


const track = document.querySelector('.carousel-track');
const leftBtn = document.querySelector('.carousel-btn.left');
const rightBtn = document.querySelector('.carousel-btn.right');
const cards = Array.from(track.children);
const cardWidth = cards[0].getBoundingClientRect().width;
let currentIndex = 0;

function updateCarousel() {
  const offset = -cardWidth * currentIndex;
  track.style.transform = `translateX(${offset}px)`;
}

leftBtn.addEventListener('click', () => {
  currentIndex = Math.max(currentIndex - 1, 0);
  updateCarousel();
});

rightBtn.addEventListener('click', () => {
  currentIndex = Math.min(currentIndex + 1, cards.length - Math.floor(track.parentElement.offsetWidth / cardWidth));
  updateCarousel();
});


const farmerBtn = document.getElementById('farmerBtn');
const partnerBtn = document.getElementById('partnerBtn');
const audienceContent = document.getElementById('audienceContent');

const content = {
  farmer: `
    <p>As a farmer, AgriLink helps you optimize your crops, access markets, and get weather alerts.</p>
  `,
  partner: `
    <p>As an AgriTech partner, you can collaborate with us to bring new tech to the farming community.</p>
  `
};

function setAudience(audience) {
  if (audience === 'farmer') {
    farmerBtn.classList.add('active');
    partnerBtn.classList.remove('active');
    audienceContent.innerHTML = content.farmer;
  } else {
    partnerBtn.classList.add('active');
    farmerBtn.classList.remove('active');
    audienceContent.innerHTML = content.partner;
  }
}


setAudience('farmer');

farmerBtn.addEventListener('click', () => setAudience('farmer'));
partnerBtn.addEventListener('click', () => setAudience('partner'));


const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = contactForm.querySelector('input[type="text"]').value.trim();
  const email = contactForm.querySelector('input[type="email"]').value.trim();
  const message = contactForm.querySelector('textarea').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields!');
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    alert('Please enter a valid email!');
    return;
  }

  alert('Thanks for reaching out! We will get back to you soon.');
  contactForm.reset();
});


const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


const visitorCounter = document.getElementById('visitorCounter');
let visits = parseInt(localStorage.getItem('visits') || '0');
visits++;
localStorage.setItem('visits', visits);
visitorCounter.textContent = `Visits: ${visits}`;

document.addEventListener('DOMContentLoaded', () => {

const chatDisplay = document.querySelector('.chat-display');
const chatInput = document.querySelector('.chat-window input');
const chatButton = document.querySelector('.chat-window button');

const startupBio = `We are Agritech Pro, empowering farmers with smart tools. Our mission is to revolutionize agriculture by providing AI-powered insights on soil, weather, and market prices. We specialize in smart soil sensors, crop management advice, and local market updates.`;

chatButton.addEventListener('click', async () => {
  const userText = chatInput.value.trim();
  if (!userText) {
    alert("Please enter a question!");
    return;
  }

  // Show user message
  const userMsg = document.createElement('div');
  userMsg.textContent = `You: ${userText}`;
  userMsg.style.fontWeight = '700';
  chatDisplay.appendChild(userMsg);

  chatInput.value = '';
  chatInput.disabled = true;
  chatButton.disabled = true;

  // Show waiting message
  const botMsg = document.createElement('div');
  botMsg.textContent = `AgriBot: typing...`;
  botMsg.style.fontStyle = 'italic';
  chatDisplay.appendChild(botMsg);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;

  try {
    const response = await puter.ai.chat({
      prompt: `${startupBio}\n\nUser: ${userText}\nAgriBot:`,
      max_tokens: 150,
    });

    botMsg.textContent = `AgriBot: ${response.text || response.answer || 'Sorry, no answer.'}`;
  } catch (error) {
    botMsg.textContent = "AgriBot: Sorry, something went wrong.";
    console.error(error);
  }

  chatInput.disabled = false;
  chatButton.disabled = false;
  chatInput.focus();
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
});

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    chatButton.click();
    e.preventDefault();
  }
});
 
document.querySelectorAll('.sample-q').forEach(btn => {
  btn.addEventListener('click', () => {
    chatInput.value = btn.textContent;
    chatButton.click();
  });
});

});