// import { setTime } from './modules/clockmodule.js';
// import { setDate } from './modules/datemodule.js';
// import { setWeather } from './modules/weathermodule.js'
const websites = data[0].websites;

const weatherToPictures = [{
	alias: 'clear',
	pictureUrl: 'clear.png'
}, {
	alias: 'pcloudy',
	pictureUrl: 'partlycloudy.png'
}, {
	alias: 'mcloudy',
	pictureUrl: 'cloudy.png'
}, {
	alias: 'cloudy',
	pictureUrl: 'verycloudy.png'
}, {
	day: 'humidday',
	night: 'humidnight',
	pictureUrl: 'clear.png'
}, {
	alias: 'lightrain',
	pictureUrl: 'lightrain.png'
}, {
	alias: 'oshower',
	pictureUrl: 'occasionalshowers.png'
}, {
	alias: 'ishower',
	pictureUrl: 'isolatedshowers.png'
}, {
	alias: 'lightsnow',
	pictureUrl: 'lightsnow.png'
}, {
	alias: 'rain',
	pictureUrl: 'rain.png'
}, {
	alias: 'snow',
	pictureUrl: 'snow.png'
}, {
	alias: 'rainsnow',
	pictureUrl: 'mixed.png'
}, ]

const monthNames = ["January", "Feburary", "Mars", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

var searchEngine="DuckDuckGo";

function main() {
	let weatherDom = document.getElementById("weather");
	setWeather(weatherDom);
	let dateDom = document.getElementById("date");
	setDate(dateDom);
	let clockDom = document.getElementById("clock");
	setTime(clockDom);
}


function keypress(ele) {
	website = '';
	if (event.key) {
		websites.forEach(site => {
			if (site.name.includes(ele.value)) {
				website = site.url
				display(website);
			}
		})
		if (!website) {
			hide();
		}
		if (event.key === "Enter") {
			if (event.preventDefault) {
				event.preventDefault();
			}
			if (website) {
				goToSite(website);
			} else {
				searchWeb();
			}
		}
	} else {
		hide();
	}
}

function searchWeb() {
	var text = document.getElementsByClassName("search")[0].value;
	if (text) {
		var text = text.split(' ').join('+');
		console.log(searchEngine)
		if(searchEngine==="Google"){
			window.location.replace("https://www.google.com/search?q=" + text);
		}
		else if (searchEngine==="DuckDuckGo")
		{
			window.location.replace("https://www.duckduckgo.com/?q=" + text + "&kj=%23242C33&k7=%23242C33&k8=%23F0F1CE&kx=%23E35A00&k9=%23FFC777&kae=d&kw=w");

		}
	}
}

function goToSite(site) {
	window.location.replace(site);
}

function display(website) {
	var autosearch = document.getElementById("auto");
	var search = document.getElementsByClassName("search")[0];
	search.style.borderColor = "green";
	autosearch.type = "text";
	autosearch.value = website;
}

function activateSearch(sEngine){
	if(sEngine==="ddg"){
		searchEngine="DuckDuckGo";
		var s = document.getElementsByClassName("go");		
		s[0].id="goactive";
		s[1].id="goinactive";
	}else{
		searchEngine="Google";
		var s = document.getElementsByClassName("go");		
		s[1].id="goactive";
		s[0].id="goinactive";
	}
}

function hide() {
	var autosearch = document.getElementById("auto");
	var search = document.getElementsByClassName("search")[0];
	autosearch.type = "hidden"
	autosearch.value = '';
}

function date() {
	var today = new Date();
	let [month, day] = today.toLocaleDateString().split("/")
	document.getElementById('dateText').innerHTML = monthNames[month - 1] + ' ' + day;
	var t = setTimeout(date, 2000);
}

function clock() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('clockText').innerHTML =
		h + ":" + m;
	var t = setTimeout(clock, 500);
}

function checkTime(i) {
	if (i < 10) {
		i = "0" + i; // add zero in front of numbers < 10
	}
	return i;
}
const lat = -41.286461;
const long = 174.776230;
const endpoint = 'http://www.7timer.info/bin/api.pl?lon=174.776230&lat=-41.286461&product=civillight&output=json';

async function weather() {
	var weatherDoc = document.getElementById("weather");
	var weatherImg = document.getElementById("weatherLogo");
	var weatherObj = await getQuote(endpoint);

	console.log(weatherObj.weather);
	var minTemp = weatherObj.temp2m.min;
	var maxTemp = weatherObj.temp2m.max;
	var weather = weatherObj.weather.charAt(0).toUpperCase() + weatherObj.weather.slice(1);

	for (var w in weatherToPictures) {
		console.log(w);
		if (weatherToPictures[w].alias == weatherObj.weather) {
			weatherImg.src = 'images/weather/' + weatherToPictures[w].pictureUrl;
			console.log(w);
		}
	}
	if (minTemp == maxTemp) {
		weatherDoc.innerHTML = weatherObj.temp2m.min + " °C";
	} else {
		weatherDoc.innerHTML = weatherObj.temp2m.min + " - " + weatherObj.temp2m.max + " °C";
	}

}

async function getQuote(endpoint) {

	try {
		const response = await fetch(endpoint);

		if (!response.ok) {

			throw Error(response.statusText);
		}
		const json = await response.json();
		console.log(json);
		return json.dataseries[0];
	} catch (err) {
		console.log(err);
		console.log("Failed to fetch Quote");
	}
}
