const PEXELS_API_KEY = "g6pfqDv6v8GinH90Sh4K1jYXNYA426z0bnO74o89GAMXeOGwaU6xLs1w"
const BASE_URL = "https://api.pexels.com/v1/search?query="

const row = document.getElementById('images-container')
const btnPrimary = document.getElementById('btn-load-images')
const btnSecondary = document.getElementById('btn-load-secondary')
const btnSearch = document.getElementById('btn-search')
const inputField = document.getElementById('search-field')

const fetchImages = (query) => {
    fetch(BASE_URL + query, {
        method: 'GET',
        headers: {
            Authorization: PEXELS_API_KEY
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Errore nella chiamata API')
        }
    })
    .then((data) => {
        row.innerHTML = ''
        data.photos.forEach((photo) => {
            row.innerHTML += `
            <div class="col">
                <div class="card shadow-sm h-100">
                    
                    <a href="./details.html?imageId=${photo.id}">
                        <img src="${photo.src.medium}" class="bd-placeholder-img card-img-top" style="height: 225px; object-fit: cover; cursor: pointer;">
                    </a>
                    
                    <div class="card-body d-flex flex-column justify-content-between">
                        
                        <a href="./details.html?imageId=${photo.id}" class="text-decoration-none text-dark">
                            <h5 class="card-title text-white ">${photo.alt ? photo.alt : 'Immagine senza titolo'}</h5>
                        </a>
                        
                        <p class="card-text text-secondary">Artist: ${photo.photographer}</p>
                        
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="this.closest('.col').remove()">Hide</button>
                            </div>
                            <small class="text-muted">${photo.id}</small>
                        </div>
                    </div>
                </div>
            </div>
            `
        })
    })
    .catch((err) => {
        console.log(err)
    })
}

// Event Listeners
btnPrimary.addEventListener('click', () => fetchImages('hamsters'))
btnSecondary.addEventListener('click', () => fetchImages('tigers'))

btnSearch.addEventListener('click', () => {
    const searchTerm = inputField.value
    if (searchTerm.length > 0) {
        fetchImages(searchTerm)
    }
})