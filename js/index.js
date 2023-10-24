
/* global document */

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const catText = document.querySelector('.cat-text');   
const modal = document.querySelector('.modal');
const modalImg = document.getElementById('img01');
const captionText = document.getElementById('caption');
const closeModal = document.querySelector('.close-modal');
  
async function init() {
	breedSelect.classList.add('hidden');
	catInfo.classList.add('hidden');

	document.body.tabIndex = -1;  
  	document.body.focus();        

	try {
		loader.classList.remove('hidden');
		const breeds = await fetchBreeds();
        
		breeds.forEach((breed) => {
			const option = document.createElement('option');
			option.value = breed.id;
			option.textContent = breed.name;
			breedSelect.appendChild(option);
		});

		breedSelect.classList.remove('hidden');
	} catch (err) {
		console.error('Failed to fetch breeds', err);
		error.textContent = 'Error loading breeds. Please try again later.';
		error.classList.remove('hidden');
	} finally {
		loader.classList.add('hidden');
		
	}
}

async function loadCatByBreed(breedId) {
	breedSelect.classList.add('hidden');

	try {
		loader.classList.remove('hidden');
		catInfo.classList.add('hidden');
		const catData = await fetchCatByBreed(breedId);
            
		const oldImage = catInfo.querySelector('.cat-image');
		if (oldImage) {
			oldImage.remove();
		}
            
		const catImage = document.createElement('img');
		catImage.src = catData.url;
		catImage.alt = catData.breeds[0].name;
		catImage.classList.add('cat-image');

		catInfo.prepend(catImage);

		catText.innerHTML = `
      <h1>${catData.breeds[0].name}</h1>
      <p>${catData.breeds[0].description}</p>
      <p>${catData.breeds[0].temperament}</p>
    `;
		catInfo.classList.remove('hidden');

		breedSelect.classList.remove('hidden');
	} catch (err) {
		console.error('Failed to fetch cat by breed', err);
		error.textContent = 'Error loading cat details. Please try again later.';
		error.classList.remove('hidden');
	} finally {
		loader.classList.add('hidden');
	}
}

function handleImageClick(event) {
	if (event.target.classList.contains('cat-image') && event.target.src) {
		if (modal.style.display !== 'flex') {
			modal.style.display = 'flex';
			modalImg.src = event.target.src;
			captionText.innerHTML = event.target.alt || '';
			captionText.style.display = event.target.alt ? 'block' : 'none';
		}
	} else if (event.target === modal || event.target === closeModal) {
		modal.style.display = 'none';
	}
}

function handleEscapeKeyPress(event) {
	if (event.key === 'Escape' && modal.style.display === 'flex') {
		modal.style.display = 'none';
	}
}

document.addEventListener('DOMContentLoaded', async() => {
	await init();

	breedSelect.addEventListener('change', async() => {
		const selectedBreedId = breedSelect.value;
		await loadCatByBreed(selectedBreedId);
	});

	document.addEventListener('click', handleImageClick);
	
	document.addEventListener('keydown', handleEscapeKeyPress);
	
});
