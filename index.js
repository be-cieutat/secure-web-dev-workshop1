// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

console.log('🚀 It Works!');

/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */

// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations

function getFilmingLocationsNumber () {
	let len = filmingLocations.length
	return len
}
console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris`)

// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in

function sortFilmingLocationsByStartDate () {
	const compareFn = (elementA, elementB) => new Date(elementB.fields.date_debut) - new Date(elementA.fields.date_debut)
	return filmingLocations.sort(compareFn)
}
console.log(sortFilmingLocationsByStartDate()[filmingLocations.length - 1], sortFilmingLocationsByStartDate()[0]);

// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result

function getFilmingLocationsNumber2020 () {
	let count = 0;
	for (let i = 0; i < filmingLocations.length; i++) {
		if (filmingLocations[i].fields.date_debut.startsWith('2020')) {count++}
	}
	return count
}
console.log(getFilmingLocationsNumber2020())

// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result

function getFilmingLocationsNumberPerYear () {
	let filmingLocationsPerYear = filmingLocations.reduce((y, c) => {
		let year = c.fields.date_debut.substring(0,4);
		if (!y.hasOwnProperty(year)) {
			y[year]=0;
		}
		y[year]++;
		return y;
	}, {});
	return filmingLocationsPerYear
}
console.log(getFilmingLocationsNumberPerYear())

// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the

function getFilmingLocationsNumberPerDistrict () {
	let filmingLocationsPerDistrict = filmingLocations.reduce((d, c) => {
		let district = c.fields.ardt_lieu;
		if (!d.hasOwnProperty(district)) {
			d[district]=0;
		}
		d[district]++;
		return d;
	}, {});
	return filmingLocationsPerDistrict
}
console.log(getFilmingLocationsNumberPerDistrict())

// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array

function getFilmLocationsByFilm () {
	let filmingLocationsByFilm = filmingLocations.reduce((n, c) => {
		let name = c.fields.nom_tournage;
		if (!n.hasOwnProperty(name)) {
			n[name]=0;
		}
		n[name]++;
		return n;
	}, {});
	return filmingLocationsByFilm
}
console.log(getFilmLocationsByFilm());

// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result

function getNumberOfFilms() {
	return Object.keys(getFilmLocationsByFilm()).length
}
console.log(getNumberOfFilms());

// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result

function getArseneFilmingLocations () {
	let filtered = filmingLocations => filmingLocations.fields.nom_tournage === 'LRDM - Patriot season 2';
	const filteredFilm = filmingLocations.filter(filtered);
	return filteredFilm
}
console.log(getArseneFilmingLocations())

// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result

function getFavoriteFilmsLocations (favoriteFilmsNames) {
	let filtered = filmingLocations => favoriteFilms.includes(filmingLocations.fields.nom_tournage);
	const filteredFilm = filmingLocations.filter(filtered).fields;
	let filteredFilmPerDistrict = filmingLocations.reduce((d, c) => {
		let district = c.fields.ardt_lieu;
		if (!d.hasOwnProperty(district)) {
			d[district]=0;
		}
		d[district]++;
		return d;
	}, {});
	return filteredFilmPerDistrict
}
const favoriteFilms =
	[
		'LRDM - Patriot season 2',
		'Alice NEVERS',
		'Emily in Paris',
	]
console.log(getFavoriteFilmsLocations())


// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm () {
	let dico = {};
	for (let i = 0; i < filmingLocations.length; i++) {
		if (dico[filmingLocations[i].fields.nom_tournage] === undefined)
		{
			dico[filmingLocations[i].fields.nom_tournage] = [filmingLocations[i].adresse_lieu];
		}
		else {
			dico[filmingLocations[i].fields.nom_tournage].push(filmingLocations[i]);
		}
	}
	return dico
}
console.log(getFilmingLocationsPerFilm())

// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes () {
	let dico = {}
	for(let element of filmingLocations){
		if (dico[element.fields.type_tournage] === undefined){
			dico[element.fields.type_tournage] = 1;
		}
		else{
			dico[element.fields.type_tournage]++;
		}
	}
	return dico
}
// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes () {
	let dico = countFilmingTypes()
	let items = Object.keys(dico).map(function(key) {
		return [key, dico[key]];
	});
	items.sort(function(first, second) {
		return second[1] - first[1];
	});
	return items;
}
console.log(sortedCountFilmingTypes())
/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms/(1000*60*60*24)).toFixed(0)} days, ${((ms/(1000*60*60))%24).toFixed(0)} hours and ${((ms/(1000*60))%60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration

function longestDuration (){
	let result = 0;
	let filmResult;
	let startDate;
	let endDate;
	for (let element of filmingLocations){
		startDate = new Date(element.fields.date_debut);
		endDate = new Date(element.fields.date_fin);
		if (endDate-startDate > result){
			result = endDate-startDate;
			filmResult = element.fields.nom_tournage;
		}
	}
	return "Longest film : "+filmResult+" with duration of : "+ duration(result);
}

// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result

function averageDuration(){
	let avg = 0;
	let startDate;
	let endDate;
	for (let element of filmingLocations){
		startDate = new Date(element.fields.date_debut);
		endDate = new Date(element.fields.date_fin);
		avg += endDate-startDate;
	}
	avg = avg/filmingLocations.length;
	return duration(avg);
}
console.log(averageDuration())
