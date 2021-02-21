const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocodeAPI = require('./utils/geocode');
const forecastAPI = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths to Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static HTML directory service 
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
	// console.log('Render root...');
	res.render('index', {
		title: "Weather App",
		name: "Senthil"
	});
});

app.get('/about', (req, res) => {
	// console.log('Render about...');
	res.render('about', {
		title: "About Me",
		name: "Senthil"
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: "Help and FAQs",
		name: 'Senthil',
		helpText: "This page provides help info and FAQs on my weather app"
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Must provide a search location'
		});
	}

	geocodeAPI(req.query.address, (error, { longitude, latitude, fullCity } = {}) => {
		if (error) {
			return res.send({ error });
		}
		
		forecastAPI(longitude, latitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}

			return res.send({
				city: req.query.address,
				fullCity, 
				forecastData
			});

		});
	});
});

app.get('/products', (req, res) => {
	console.log(req.query); 
	res.send({
		location: "Chennai",
		forecast: "Chances of rain patches..."
	});
});

/* app.get('/help/*', (req, res) => {
	res.send('Help article does not exists');
}); */

app.get('/help/*', (req, res) => {
	res.render('404Error', {
		title: 'ERROR 404',
		name: 'Senthil',
		errorText: 'Help article not found!'
	});
});

app.get('*', (req, res) => {
	res.render('404Error', {
		title: 'ERROR 404',
		name: 'Senthil',
		errorText: 'Page not found 404 error'
	});
});
/* app.get('*', (req, res) => {
	res.send('My 404 page');
}); */

/* app.get('', (req, res) => {
	res.send('<h1>Hello ExpressJS...</h1>');
});

app.get('/help', (req, res) => {
	res.send('Help page');
});

app.get('/about', (req, res) => {
	res.send('<h1>About us page</h1>');
}); */

app.listen(port, () => {
	console.log('Server is up and running on port ' + port);
}); 