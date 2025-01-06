const toggleButton = document.querySelector('.theme-toggle');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

async function searchImages() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (query.trim() === '') {
        resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    const apiKey = 'K8wVHVtFx-wyIhcbVuGHlwb1C0z1zp_K12QZMGbxP7U';
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results.length === 0) {
            resultsDiv.innerHTML = '<p>No results found. Try a different search term.</p>';
            return;
        }

        data.results.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.urls.small;
            img.alt = photo.alt_description || 'Image';
            resultsDiv.appendChild(img);
        });
    } catch (error) {
        resultsDiv.innerHTML = '<p>There was an error fetching the images. Please try again later.</p>';
        console.error('Error fetching images:', error);
    }
}
