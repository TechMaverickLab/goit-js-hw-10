import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_IlxTCE8YSC24414EQo40TXBc0MGBSsE5sxGaBHATmcJqGsIpvmZ3GrgtJpBnSveg';

export const fetchBreeds = async() => {
	try {
		
		const response = await axios.get('https://api.thecatapi.com/v1/breeds');
		
		return response.data;
	} catch (error) {
		console.error('Error fetching breeds', error);
		throw error;
	}
};

export const fetchCatByBreed = async(breedId) => {
	try {
		
		const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
		
		return response.data[0];
	} catch (error) {
		console.error('Error fetching cat by breed', error);
		throw error;
	}
};
