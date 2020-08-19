const websites = [
    { name: 'facebook', url: 'http://www.facebook.com' },
    { name: 'youtube', url: 'http://www.youtube.com' },
    { name: 'kattis', url: 'https://open.kattis.com/' },
    { name: 'github', url: 'http://www.github.com' },
    { name: 'outlook', url: 'http://outlook.live.com' },
    { name: 'reddit', url: 'http://www.reddit.com' },
    { name: 'messenger', url: 'http://www.messenger.com' },
]

function keypress(ele) {
    website = '';
    if (ele.value) {
        websites.forEach(site => {
            if (site.name.includes(ele.value)) {
                website = site.url
                display(website);
            }
        })
        if (!website) {
            hide();
        }
        if (event.key === 'Enter') {
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
        window.location.replace("http://www.google.com/search?q=" + text);
    }
}

function goToSite(site) {
    window.location.replace(site);
}
function display(website) {
    var autosearch = document.getElementById("auto");
    var search = document.getElementsByClassName("search")[0];
    search.style.borderColor = "green";
    search.style.borderRadius = "2em 2em 0 0";
    search.style.borderWidth = ".2em .2em 0 .2em"
    autosearch.type = "text";
    autosearch.value = website;
}
function hide() {
    var autosearch = document.getElementById("auto");
    var search = document.getElementsByClassName("search")[0];
    autosearch.type = "hidden"
    search.style.borderColor = "pink";
    autosearch.value = '';
    search.style.borderRadius = "2em";
    search.style.borderWidth = ".2em"
}

function date() {
    var today = new Date();
    let [month, day, year] = today.toLocaleDateString().split("/")
    document.getElementById('dateText').innerHTML =
        day + "/" + month + "/" + year;
    var t = setTimeout(date, 2000);
}

function clock() {
    var today = new Date();
    console.log('hej')
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clockText').innerHTML =
        h + ":" + m + ":" + s;
    var t = setTimeout(clock, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i; // add zero in front of numbers < 10
    }
    return i;
}