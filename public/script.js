// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navbar shadow + scroll-to-top button visibility
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  const scrollTopBtn = document.getElementById('scroll-top');

  if (nav) nav.classList.toggle('scrolled', window.scrollY > 0);
  if (scrollTopBtn) scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// ==================== Mobile Menu Toggle ====================
  function toggleMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    
    menu.classList.toggle("show");
    
  }

  // Optional: Close menu when any link is clicked
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.addEventListener("click", () => {
        document.getElementById("mobile-menu").classList.remove("show");
      });
    });
  });

// Smooth anchor scrolling (all links that start with #)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==================== Rotating Tagline ====================
const phrases = [
  "Where Quality Meets the Road – Shiku Infra",
  "Trusted Road Construction Experts",
  "Fast Execution, Solid Foundations",
  "15+ Years of Engineering Excellence"
];

let currentPhrase = 0;
const heroPhrase = document.getElementById("hero-phrase");

function rotateText() {
  if (!heroPhrase) return;
  heroPhrase.classList.remove('show');
  setTimeout(() => {
    currentPhrase = (currentPhrase + 1) % phrases.length;
    heroPhrase.textContent = phrases[currentPhrase];
    heroPhrase.classList.add('show');
  }, 400);
}

document.addEventListener("DOMContentLoaded", () => {
  if (heroPhrase) {
    heroPhrase.classList.add('show');
    setInterval(rotateText, 4000);
  }
});

// ==================== About "More Info" Toggle ====================
function toggleMore() {
  const about = document.querySelector('.about-section');
  const more = document.getElementById('more-info');
  if (about && more) {
    about.style.display = 'none';
    more.style.display = 'block';
    more.style.opacity = 0;
    setTimeout(() => { more.style.opacity = 1; }, 10);
    more.scrollIntoView({ behavior: 'smooth' });
  }
}

function hideMoreInfo() {
  const about = document.querySelector('.about-section');
  const more = document.getElementById('more-info');
  if (about && more) {
    more.style.display = 'none';
    about.style.display = 'flex';
    about.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==================== Scroll to Contact Section ====================
function scrollToReachUs() {
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==================== Tab Switching ====================
function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-btn');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.add('active');
    event.currentTarget.classList.add('active');
  }
}

function toggleReadMore(button) {
    const serviceBox = button.closest('.service-box');
    const isExpanded = serviceBox.classList.contains('expanded');

    serviceBox.classList.toggle('expanded');
    button.textContent = isExpanded ? "Read More" : "Show Less";
  }
  // CONTACT
 document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        message: document.getElementById("message").value.trim(),
      };

      console.log("📤 Sending data:", formData); // 👈 Add this for debug

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        console.log("✅ Server response:", result); // 👈 Add this for debug

        status.textContent = result.message;
        status.style.color = response.ok ? "green" : "red";

        if (response.ok) form.reset();
      } catch (err) {
        console.error("❌ Submission error:", err);
        status.textContent = "Something went wrong. Please try again.";
        status.style.color = "red";
      }
    });
  }
});
// Scroll animation trigger
const boxes = document.querySelectorAll('.executed-box');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeUp 0.8s ease forwards";
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

boxes.forEach(box => observer.observe(box));
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

