let currentSlide = 0;

window.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('section');
    
    sections.forEach(function(section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var scrollTop = window.scrollY;
      var windowHeight = window.innerHeight;
      
      if (scrollTop >= sectionTop - windowHeight + (sectionHeight / 2)) {
        section.classList.add('fade');
      } else {
        section.classList.remove('fade');
      }
    });
  });

  const slides = document.querySelectorAll('.slide');
  
  
  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }
    nextSlide()
    setInterval(nextSlide, 5000);
  
  
  