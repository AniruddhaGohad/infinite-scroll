let photos = [];
let isReady = false;
let imagesLoaded = 0;
let totalImages = 0;
let count = 5;

const API_KEY = 'OeTps2_PCsFeL7mv5VMsMh8qBuymOd_9RnUMrhS2U28';

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

const imageLoadedHandler = (e) => {
    imagesLoaded += 1;
    if(imagesLoaded === totalImages) {
        isReady = true;
        loader.style.display = 'none';
        count = 30;
    }
}

const displayPhotos = () => {
    totalImages = photos.length;
    photos.forEach(photo => {
        const anchor = document.createElement('a');
        anchor.href = photo.links.html;
        anchor.target = '_blank';
        const img = document.createElement('img');
        img.src = photo.urls.regular;
        img.alt = photo.alt_description;
        img.addEventListener('load', imageLoadedHandler);
        anchor.appendChild(img);
        imageContainer.appendChild(anchor);
    })
}

const getPhotos = async () => {
    try {
        const URL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`;
        const response = await fetch(URL);
        const result = await response.json()
        photos = result;
        displayPhotos();
    } catch (error) {
        console.log('OUCH!', error);
    }
}

window.addEventListener('scroll', (e) => {
    const scrolled = window.innerHeight + window.scrollY;
    const scrollLimit = document.body.offsetHeight - 1000;
    if(scrolled >= scrollLimit && isReady) {
        getPhotos();
        imagesLoaded = 0;
        isReady = false;
    }
});

getPhotos();