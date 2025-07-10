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
        // element.classList.remove('active'); // Optional: remove 'active' when scrolled out
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Run on load to reveal elements already in view

  // Get Started Cards Slideshow
  const getStartedCardsData = [
    {
      image: 'assets/camelliiii.jpg',
      title: 'YOUsers',
      description: 'Quickly place orders from campus vendors and get it delivered.',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSfDcVLFlkHLuiCs_LNYVHmjBwu6SOUB9TyPQJsjW78UVPJ0lg/viewform?usp=header' // Unique link for YOUsers
    },
    {
      image: 'assets/camellii.jpg',
      title: 'Moovers',
      description: 'Earn money by delivering items to fellow students using bicycles.',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdK3sUptDj1v0b7mWCXS6OBTf5qAMo9KCSUFUTNIwC7xZWSZA/viewform?usp=header' // Unique link for Moovers
    },
    {
      image: 'assets/camelli.jpg',
      title: 'Vendors',
      description: 'Become a vendor and increase your visibility on campus.',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSf0u5kibJlFyn7BoJAIq-k2Jpq7jcCVnCbIlO32kt26vNEfkg/viewform?usp=preview' // Unique link for Vendors
    }
    // Add more cards here if needed
  ];

  const cardsAllContainer = document.querySelector('.cards-all');
  const sliderDotsContainer = document.querySelector('.slider-dots');
  let currentCardIndex = 0;
  // const cardsPerPage = 3; // This variable is not directly used for display logic after responsive adjustments.

  // Function to create and display cards
  const displayCards = () => {
    cardsAllContainer.innerHTML = ''; // Clear existing cards
    sliderDotsContainer.innerHTML = ''; // Clear existing dots

    getStartedCardsData.forEach((cardData, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${cardData.image}" alt="${cardData.title}">
        <h1>${cardData.title}</h1>
        <p>${cardData.description}</p>
        <a href="${cardData.link}" class="btn">Join the Waitlist</a>
      `;
      cardsAllContainer.appendChild(card);

      // Create dots for pagination
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) { // Mark first dot as active initially
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        currentCardIndex = index;
        updateSlider();
      });
      sliderDotsContainer.appendChild(dot);
    });

    updateSlider(); // Initial update
  };

  const updateSlider = () => {
    // Ensure there are children before trying to get offsetWidth
    if (cardsAllContainer.children.length === 0) return;

    const cardWidth = cardsAllContainer.children[0].offsetWidth;
    const cardsWrapperWidth = document.querySelector('.cards-wrapper').offsetWidth;

    let translateXValue;
    let visibleCards;

    if (window.innerWidth <= 768) {
      visibleCards = 1; // On mobile, show 1 card
    } else if (window.innerWidth <= 992) {
      visibleCards = 2; // On tablets, show 2 cards
    } else {
      visibleCards = 3; // On larger screens, show 3 cards
    }

    // Calculate the maximum index we can scroll to while keeping `visibleCards` in view
    const maxIndex = Math.max(0, getStartedCardsData.length - visibleCards);
    // Ensure currentCardIndex does not exceed the maximum possible index
    const actualIndex = Math.min(currentCardIndex, maxIndex);

    translateXValue = -actualIndex * cardWidth;

    cardsAllContainer.style.transform = `translateX(${translateXValue}px)`;

    // Update active dot
    document.querySelectorAll('.slider-dots .dot').forEach((dot, index) => {
      // The active dot logic should correspond to the 'actualIndex'
      dot.classList.toggle('active', index === actualIndex);
    });
  };

  // Add navigation for the slideshow (e.g., auto-play or manual buttons/swipes)
  let slideInterval = setInterval(() => {
    // Calculate the total number of "pages" or "slides"
    // This depends on how many cards are visible at once
    let visibleCardsCount;
    if (window.innerWidth <= 768) {
      visibleCardsCount = 1;
    } else if (window.innerWidth <= 992) {
      visibleCardsCount = 2;
    } else {
      visibleCardsCount = 3;
    }

    const totalSlides = Math.ceil(getStartedCardsData.length / visibleCardsCount);
    let nextIndex = currentCardIndex + 1;

    // If we've reached the end of a "page" of cards, loop back to the first "page"
    if (nextIndex > (getStartedCardsData.length - visibleCardsCount) || nextIndex >= getStartedCardsData.length) {
      nextIndex = 0;
    }

    currentCardIndex = nextIndex;
    updateSlider();
  }, 3000); // Change card every 3 seconds

  // Pause slideshow on hover
  cardsAllContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
  cardsAllContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
      // Recalculate visibleCardsCount on mouse leave too, in case window size changed
      let visibleCardsCount;
      if (window.innerWidth <= 768) {
        visibleCardsCount = 1;
      } else if (window.innerWidth <= 992) {
        visibleCardsCount = 2;
      } else {
        visibleCardsCount = 3;
      }
      const totalSlides = Math.ceil(getStartedCardsData.length / visibleCardsCount);
      let nextIndex = currentCardIndex + 1;

      if (nextIndex > (getStartedCardsData.length - visibleCardsCount) || nextIndex >= getStartedCardsData.length) {
        nextIndex = 0;
      }

      currentCardIndex = nextIndex;
      updateSlider();
    }, 3000);
  });


  // Initial display of cards
  displayCards();
  window.addEventListener('resize', updateSlider); // Adjust slider on window resize
});
