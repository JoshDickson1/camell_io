document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksList = document.querySelectorAll('.nav-links li a'); // Get all nav links

  // Toggle mobile menu visibility
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinksList.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Reveal elements on scroll
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150; // Pixels from the top of the element to trigger

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      } else {
        element.classList.remove('active'); // Optional: remove 'active' when scrolled out
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Run on load to reveal elements already in view

  // Dynamic Features Section
  const features = [
    {
      icon: 'bx-cycling', // Placeholder icon from Boxicons
      title: 'Two-Tier Delivery',
      description: 'Choose between quick deliveries by bicycle riders or affordable ones by on-foot students. It\'s designed to meet your urgency and your budget.'
    },
    {
      icon: 'bx-task', // Placeholder icon
      title: 'Errand Requests - "Send Me"',
      description: 'From picking up your laundry to getting lecture notes, Camell lets you request errands and pay student assistants in-app.'
    },
    {
      icon: 'bx-wallet', // Placeholder icon
      title: 'Camell Wallet & Credit Points',
      description: 'Preload your Camell Wallet for faster checkout and get rewarded with bonus credit. Loyal users also unlock flexible ordering with soft credit points.'
    },
    {
      icon: 'bx-map-alt', // Placeholder icon
      title: 'Smart Order Tracking',
      description: 'Always know what\'s happening with your order. From "Confirmed" to "Delivered," track your package step-by-step—no guesswork, no stress.'
    }
  ];

  const featuresGrid = document.querySelector('.features-grid');

  if (featuresGrid) {
    features.forEach(feature => {
      const featureCard = document.createElement('div');
      featureCard.classList.add('feature-card');
      featureCard.classList.add('reveal'); // Add reveal class for animation

      featureCard.innerHTML = `
        <box-icon type='solid' name='${feature.icon}' class="icon"></box-icon>
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
      `;
      featuresGrid.appendChild(featureCard);
    });
  }

  // Re-run revealOnScroll after adding dynamic content
  revealOnScroll();
});