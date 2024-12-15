// JavaScript to handle suggestions and modal functionality

// Fetch JSON data dynamically
async function fetchSuggestions() {
    try {
        const response = await fetch('data/places-and-foods.json'); // Replace with the correct JSON file path
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching suggestions:", error);
    }
}

// Populate the suggestions section with cards
function populateSuggestions(data, type) {
    const container = type === 'places' 
        ? document.getElementById('places-list') 
        : document.getElementById('foods-list');

    // Clear existing content
    container.innerHTML = '';

    // Generate cards for each suggestion
    data[type].forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        // Create card content
        card.innerHTML = ` 
            <img src="${item.image}" alt="${item.title}" class="card-image">
            <h3>${item.title}</h3>
            <button class="details-btn" 
                data-title="${item.title}" 
                data-description="${item.description || ''}" 
                data-images='${JSON.stringify([item.image])}' 
                data-address="${item.address || ''}">
                View Details
            </button>
        `;

        // Append card to the container
        container.appendChild(card);
    });
}

// Open the modal dialog with details
function openDialog(title, description, images, address) {
    const dialog = document.getElementById('details-dialog');

    // Set dialog title
    document.getElementById('dialog-title').textContent = title;

    // Set dialog description
    document.getElementById('dialog-description').textContent = description;

    // Clear and populate images
    const photosContainer = document.getElementById('dialog-photos');
    photosContainer.innerHTML = '';
    images.forEach(imgUrl => {
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = `${title} image`;
        photosContainer.appendChild(img);
    });

    // Set address if available
    document.getElementById('dialog-address').textContent = address || 'No address available.';

    // Show dialog
    dialog.showModal();
}

// Close the modal dialog
function closeDialog() {
    const dialog = document.getElementById('details-dialog');
    dialog.close();
}

// Add event listeners to buttons and manage active states
function setupEventListeners(data) {
    // Buttons to toggle between places and foods
    document.getElementById('places-btn').addEventListener('click', () => {
        populateSuggestions(data, 'places');
        document.getElementById('places-list').style.display = 'block';
        document.getElementById('foods-list').style.display = 'none';

        // Set active button state
        document.getElementById('places-btn').classList.add('active');
        document.getElementById('food-btn').classList.remove('active');
    });

    document.getElementById('food-btn').addEventListener('click', () => {
        populateSuggestions(data, 'food');
        document.getElementById('foods-list').style.display = 'block';
        document.getElementById('places-list').style.display = 'none';

        // Set active button state
        document.getElementById('food-btn').classList.add('active');
        document.getElementById('places-btn').classList.remove('active');
    });

    // Event delegation for detail buttons
    document.getElementById('suggestions').addEventListener('click', (event) => {
        if (event.target.classList.contains('details-btn')) {
            const { title, description, images, address } = event.target.dataset;
            openDialog(title, description, JSON.parse(images), address);
        }
    });

    // Close dialog button
    document.getElementById('close-dialog').addEventListener('click', closeDialog);
}

// Initialize the script
async function init() {
    const data = await fetchSuggestions();

    if (data) {
        setupEventListeners(data);

        // Show places by default
        populateSuggestions(data, 'places');
        document.getElementById('places-list').style.display = 'block';
        document.getElementById('foods-list').style.display = 'none';

        // Set 'places' button as active by default
        document.getElementById('places-btn').classList.add('active');
    }
}

// Start the script once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
