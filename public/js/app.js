const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-001');
const messageTwo = document.querySelector('#message-002');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	searchLocation = search.value;
	messageOne.textContent = 'Loading....';
	messageTwo.textContent = '';
	
	fetch('http://localhost:3000/weather?address=' + searchLocation).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				console.log(data.error);
				messageOne.textContent = data.error;
				// messageTwo.textContent = '';
			} else {
				console.log(data.fullCity);
				console.log(data.forecastData);
				messageOne.textContent = data.fullCity;
				messageTwo.textContent = data.forecastData;
			}
		});
	});

	/* if (!searchLocation) {
		console.log('Must enter a location');
	} else {
		
	} */
});