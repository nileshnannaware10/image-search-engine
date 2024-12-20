async function searchImages() {
    const query = document.getElementById('search-query').value;
    if (!query) {
        alert('Please enter a search term');
        return;
    }

    const apiKey = 'wU4sCZ1fMD01ID4I1ET2i2YPA_X-tSl_2gNYzMaG31s'; // Replace with your Unsplash API key
    const endpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&client_id=${apiKey}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        console.error(error);
        alert('Failed to fetch images. Please check your API key or endpoint.');
    }
}

function displayResults(images) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (!images || images.length === 0) {
        resultsContainer.innerHTML = '<p>No images found. Try a different search term.</p>';
        return;
    }

    images.forEach(image => {
        const card = document.createElement('div');
        card.className = 'image-card';

        const img = document.createElement('img');
        img.src = image.urls.small;
        img.alt = image.alt_description || 'Image';

        const caption = document.createElement('p');
        caption.textContent = image.description || image.alt_description || 'No description';

        card.appendChild(img);
        card.appendChild(caption);

        resultsContainer.appendChild(card);
    });
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
}

// Set default theme
document.body.setAttribute('data-theme', 'light');