const PEXELS_API_KEY = "g6pfqDv6v8GinH90Sh4K1jYXNYA426z0bnO74o89GAMXeOGwaU6xLs1w" 
const container = document.getElementById('detail-container')
const params = new URLSearchParams(location.search)
const imageId = params.get('imageId')

console.log("ID recuperato:", imageId)


const fetchDetails = () => {

    fetch(`https://api.pexels.com/v1/photos/${imageId}`, {
        method: 'GET',
        headers: {
            Authorization: PEXELS_API_KEY
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Errore nel recupero dettagli')
        }
    })
    .then((photo) => {

        container.innerHTML = `
            <div class="col-10 col-md-7 col-lg-5">
                <div class="card mb-3">
                    <img src="${photo.src.large}" class="card-img-top img-fluid" alt="${photo.alt}">
                    <div class="card-body">
                        <h2 class="card-subtitle fs-4 pt-2">${photo.alt}</h2>
                        
                        <h5 class="card-text mt-3 fs-6">Fotografo: <span class="fw-bold">${photo.photographer}</span></h5>
                        
                        <a href="${photo.photographer_url}" target="_blank" class="btn btn-success mt-3">
                            Vai al profilo dell'artista
                        </a>
                        
                        <hr>
                        <p class="card-text"><small class="text-muted">ID Immagine: ${photo.id}</small></p>
                    </div>
                </div>
            </div>
        `
    
        document.body.style.backgroundColor = photo.avg_color
    })
    .catch((err) => {
        console.log(err)
        container.innerHTML = `<div class="alert alert-danger">Errore nel caricamento: ${err.message}</div>`
    })
}

if (imageId) {
    fetchDetails()
} else {
    container.innerHTML = '<div class="alert alert-warning">Nessun ID immagine specificato.</div>'
}