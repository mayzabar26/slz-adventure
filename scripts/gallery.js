let slideIndex = 1;

//Function to load images from JSON and initialize the gallery
async function loadGallery() {

  // Fetch JSON data
  const response = await fetch('images.json');
  const data = await response.json();

  const slideshowContainer = document.getElementById('slideshow-container');
  const thumbnailsContainer = document.getElementById('thumbnails');

  //Loop through images and create slides and thumbnails
  data.images.forEach((image, index) => {
    //Create the slide
    const slide = document.createElement('section');
    slide.classList.add('slides');
    slide.innerHTML = `
      <img data-src="${image.url}" alt="${image.title}" class="lazy" style="width:100%">
    `;
    slideshowContainer.insertBefore(slide, slideshowContainer.querySelector('.next'));

    //Create the thumbnail
    const thumbnail = document.createElement('img');
    thumbnail.src = image.thumbnail;
    thumbnail.alt = image.title;
    thumbnail.classList.add('thumbnail');
    thumbnail.onclick = () => currentSlide(index + 1);
    thumbnailsContainer.appendChild(thumbnail);
  });

  //Show the first slide
  showSlide(slideIndex);

  //Initialize lazy loading for the images
  lazyLoadImages();
}

//Function to display the current slide
function showSlide(n) {
  const slides = document.querySelectorAll('.slides');
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  slides.forEach(slide => (slide.style.display = 'none'));
  slides[slideIndex - 1].style.display = 'block';
}

//Function to navigate between slides
function changeSlide(n) {
  showSlide((slideIndex += n));
}

//Function to set the current slide
function currentSlide(n) {
  showSlide((slideIndex = n));
}

//Lazy loading images using IntersectionObserver
function lazyLoadImages() {
  const lazyImages = document.querySelectorAll('img.lazy');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src; // Load the actual image
        img.onload = () => img.classList.add('loaded'); // Add class when loaded
        observer.unobserve(img); // Stop observing this image
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));
}

//Load the gallery on page load
loadGallery();
