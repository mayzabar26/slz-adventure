//Set const for thumbnails, mainImage and title
const thumbnailsContainer = document.getElementById('thumbnails');
const mainImage = document.getElementById('main-image');
const imageTitle = document.createElement('p'); //Element to display the image title
mainImage.insertAdjacentElement('afterend', imageTitle); //Insert the title below the main image

//Function to change the main image
function changeMainImage(src, title) {
    mainImage.src = src; //Change the main image to the clicked thumbnail's image
    imageTitle.textContent = title; //Update the title below the main image
}

//Fetch the JSON file containing the images and slides data
fetch('data/images.json') //Make sure the path to the JSON file is correct
    .then(response => response.json()) //Parse the JSON response
    .then(data => {
        loadThumbnails(data.images); //Load the thumbnails
        setInitialMainImage(data.images); //Set the initial main image
    })
    .catch(error => {
        console.error('Error loading the JSON file:', error); //Log any error to the console
    });

//Function to set the initial main image when the page loads
function setInitialMainImage(images) {
    if (images.length > 0) {
        mainImage.src = images[0].url; //Set the first image in the JSON as the main image
        imageTitle.textContent = images[0].title; //Set the initial title for the first image
        mainImage.loading = 'lazy'; //Add lazy loading to the main image
    }
}

//Function to load the thumbnail images
function loadThumbnails(images) {
    images.forEach(image => {
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.classList.add('thumbnail'); //Add the 'thumbnail' class to each thumbnail

        //Create the thumbnail image
        const imgElement = document.createElement('img');
        imgElement.src = image.thumbnail; //Path to the thumbnail image
        imgElement.alt = image.title; //Alt text for the thumbnail
        imgElement.classList.add('thumbnail-img'); //Add the 'thumbnail-img' class
        imgElement.loading = 'lazy'; //Add lazy loading to the thumbnail image

        //Add a click event to change the main image when the thumbnail is clicked
        imgElement.addEventListener('click', () => {
            changeMainImage(image.url, image.title); //Change the main image and update the title
        });

        //Add the thumbnail to the thumbnails container
        thumbnailDiv.appendChild(imgElement);
        thumbnailsContainer.appendChild(thumbnailDiv);
    });
}
