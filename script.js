/* https://api.unsplash.com/photos/random/?client_id=HZuPX_r8Ori2KRfmOFwXbJ_zfyUip0OFLzWSkYbp8DU */
// backticks = ``

/* ==================
General const and let
================== */

const body = document.body
const topLeft = document.getElementById("top-left")
const topRight = document.getElementById("top-right")
const center = document.getElementById("center")
const bottomLeft = document.getElementById("bottom-left")
const bottom = document.getElementById("bottom")
const bottomRight = document.getElementById("bottom-right")

/* ==================
General function
================== */


/* ==================
Dark Light Mode
================== */

const mainBody = document.getElementById("main-body")
const btnDLModeContainer = document.getElementById("button-dark-light-mode-container")
const btnDLMode = document.getElementById("button-dark-light-mode")
const rootCSS = document.querySelector(":root").style
if (localStorage.getItem("darkLightMode") == null) {localStorage.setItem("darkLightMode", "light")}
let darkLightMode = localStorage.getItem("darkLightMode")
const variableRoot = [
    "--primaryCol",
    "--primaryColOp",
    "--primaryColOpPlus",
    "--secondaryCol",
    "--secondaryColOp",
    "--textShadow",
]

const lightVariable = [
    "rgba(240,240,240,1)",
    "rgba(240,240,240,0.8)",
    "rgba(240,240,240,0.4)",
    "rgba(7,7,7,1)",
    "rgba(7,7,7,0.8)",
    "1px 1px 0.02em rgba(7,7,7,0.5)"
]

const darkVariable = [
    "rgba(7,7,7,1)",
    "rgba(7,7,7,0.8)",
    "rgba(7,7,7,0.4)",
    "rgba(240,240,240,1)",
    "rgba(240,240,240,0.8)",
    "1px 1px 0.02em rgba(240,240,240,0.5)"
]

btnDLModeContainer.onclick = () => {
    if (darkLightMode === "light") {
        toggleDarkLightMode(darkVariable)
        localStorage.setItem("darkLightMode", "dark")
        darkLightMode = localStorage.getItem("darkLightMode")
        btnDLMode.style.transform = "translateX(25px)"
     } 
    else if (darkLightMode === "dark" ){ 
        toggleDarkLightMode(lightVariable) 
        localStorage.setItem("darkLightMode", "light")
        darkLightMode = localStorage.getItem("darkLightMode")
        btnDLMode.style.transform = "translateX(0px)"
    }
}

function toggleDarkLightMode(variable) {
    for (let i = 0; i < variableRoot.length; i++) {
        rootCSS.setProperty(variableRoot[i], variable[i])
    }
}

if (darkLightMode === "light") { // first time open site
    toggleDarkLightMode(lightVariable)
    btnDLMode.style.transform = "translateX(0px)"
}
else if (darkLightMode === "dark") {
    toggleDarkLightMode(darkVariable)
    btnDLMode.style.transform = "translateX(25px)"
}

/* ==================
Background image
================== */
const backgroundImg = document.getElementById("background-image")

/* Accessing local storage for image topic */
let imageQuery = localStorage.getItem("image topic")
if (imageQuery == null || imageQuery === "") { //search for an error in get the localstorage or empty value
    localStorage.setItem("image topic", "nature")
    imageQuery = localStorage.getItem("image topic")
}

async function getImage() { //Getting the API for the image and showing it
    // let response = await fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${imageQuery}`)
    // let data = await response.json().catch(err => console.error(err))
    // backgroundImg.src = `${data.urls.regular}`
    backgroundImg.src = "https://images.unsplash.com/photo-1542396817-804fa5be8ecf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzgwMjUwMTM&ixlib=rb-1.2.1&q=80&w=1080"
    // console.log(data.urls.regular)    
    // return data
}

/* Changing topic of the image with the input field */
const inputImage = document.getElementById("input-search-image")
const btnImage = document.getElementById("button-search-image")
btnImage.onclick = () => changeImageTopic()
inputImage.addEventListener("keyup", function (e) {
    if (e.key === 'Enter') {
        changeImageTopic()
    }
})

function changeImageTopic() {
    if (inputImage.value) {
        localStorage.setItem("image topic", inputImage.value)
        imageQuery = localStorage.getItem("image topic")
        getImage()
        inputImage.value = ""
    }
}

/* Author */

getImage()
// getImage().then(data => {
//     bottomLeft.innerHTML = `
//     <p id="author-img"><span id="author-img-by">Ph: </span>${data.user.name}</p>
//     <p id="author-topic">Topic: ${imageQuery}</p>
//     <p id="author-unsplash">by Unsplash</p>
//     `
// })

/* ==================
Time
================== */
const timeContainer = document.getElementById("time-container")

getCurrentTime() //showing the first time
function getCurrentTime() {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    timeContainer.textContent = time
}

setInterval(getCurrentTime, 1000) //keep showing every second so it will be updated

/* ==================
Daily quote
================== */

/* Accessing local storage for indexQuote */
if (localStorage.getItem("indexQuote") == null || localStorage.getItem("indexQuote") === 1642) {localStorage.setItem("indexQuote", 0)}
const indexQuote = localStorage.getItem("indexQuote")
const dateDay = new Date().getDate()
const dateMonth = (new Date().getUTCMonth() + 1)
const dateToday = `${dateDay}.${dateMonth}`
if (localStorage.getItem("date") == null) { localStorage.setItem("date", dateToday) }
const dateLocal = localStorage.getItem("date")
if (dateToday !== dateLocal) { localStorage.setItem("indexQuote", (indexQuote + 1) ) }

/* Function to change the daily quote */
const quoteText = document.getElementById("quote-text")
const quoteAuthor = document.getElementById("quote-author")

getDailyQuote() // We could actually run just one time a day and save it in the localStorage but it's not so long to take just a single quote

async function getDailyQuote() { //Getting quote from a "personal" JSON with the quotes and show them how we want
    const response = await fetch("quote1643.json")
    const data = await response.json().catch(err => console.error(err))
    const todayQuote = data[indexQuote].text
    const todayAuthor = data[indexQuote].author
    localStorage.setItem("indexQuote", indexQuote)
    quoteText.textContent = todayQuote
    if (todayAuthor == null) {
        quoteAuthor.textContent = "Unknown"
    } else {
        quoteAuthor.textContent = todayAuthor
    }
}

/* ==================
To do list
================== */

const toDoTitle = document.getElementById("to-do-title")
let showTodoTF = false
const toDoContainer = document.getElementById("to-do-container")
const toDoCollection = document.getElementById("to-do-collection")
const toDoElements = document.getElementsByClassName("to-do-element")
const toDoInputContainer = document.getElementById("to-do-container-input")
const toDoInput = document.getElementById("to-do-input")
const btnTDAdd = document.getElementById("btn-to-do-add")

/* Accessing the localStorage to take the todos and checked ones or if none create new array */
if (localStorage.getItem("to do") == null) { localStorage.setItem("to do", "[]") }
let toDoList = JSON.parse(localStorage.getItem("to do"))
if (localStorage.getItem("to do checked") == null) { localStorage.setItem("to do checked", "[]") }
let toDoChecked = JSON.parse(localStorage.getItem("to do checked"))

showToDoList()
function showToDoList() { //Showing the todos with a for loop dividing if their are checked or not with a class for the style
    for (let i = 0; i < toDoList.length; i++) {
        if (toDoChecked.includes(i) === true) {
            toDoCollection.innerHTML += `
            <li class="to-do-element">
                <button class="btn-to-do-check btn-to-do-checked" onclick="checkToDoEl(${i})"></button>
                <p class="to-do-text to-do-checked">${toDoList[i]}</p>
                <button class="btn btn-to-do-remove" onclick="removeToDoEl(${i})">x</button>
            </li>
            `
        } else {
            toDoCollection.innerHTML += `
            <li class="to-do-element">
                <button class="btn-to-do-check" onclick="checkToDoEl(${i})"></button>
                <p class="to-do-text">${toDoList[i]}</p>
                <button class="btn btn-to-do-remove" onclick="removeToDoEl(${i})">x</button>
            </li>
            `
        }
    }
}

function refreshToDolist() { //Updating the localStorage with the todos and checked
    localStorage.setItem("to do", JSON.stringify(toDoList))
    localStorage.setItem("to do checked", JSON.stringify(toDoChecked))
}

function removeToDoEl(num) { //Remove button for eliminate one item from the list and managing the checked ones
    toDoList.splice(num, 1)
    toDoCollection.innerHTML = ""

    if (toDoChecked.includes(num)){ //Check if the delete is on an item already checked
        tempIndex = toDoChecked.indexOf(num)
        toDoChecked.splice(tempIndex, 1)
    }
    /* This part here it could be done with array.reduce but like this it seems clearer */
    arrayBefore = toDoChecked.filter(value => value < num)  //Recover all of the item of the array that are before the one is deleting
    arrayFiltered = toDoChecked.filter(value => value > num) //Take all of the item of the array after the one is deleting
    arrayMapped = arrayFiltered.map(value => value - 1) //Mapping all of the element to coincide with the original element ones it's gone
    for(let i = 0; i < arrayBefore.length; i++) {
        arrayMapped.push(arrayBefore[i]) //Join the before array with all the item that they didn't change their index with the one that changed
    }    
    toDoChecked = arrayMapped

    refreshToDolist()
    showToDoList()
}

function checkToDoEl(num) { //Modifiyng te array by adding or taking for the "checked" classes 
    if (toDoChecked.includes(num)) {
        tempIndex = toDoChecked.indexOf(num)
        toDoChecked.splice(tempIndex, 1)
    } else {
        toDoChecked.push(num)
    }
    toDoCollection.innerHTML = ""
    refreshToDolist()
    showToDoList()
}

function showToDo() { //Showing the Todos clicking on the h3
    if (showTodoTF === true) {
        toDoContainer.style.display = "none"
        toDoInputContainer.style.display = "none"
        showTodoTF = false
    } else {
        toDoContainer.style.display = "flex"
        toDoContainer.style.flexDirection = "column"
        btnTDAdd.style.display = "block"
        showTodoTF = true
    }
}

toDoTitle.addEventListener("click", showToDo)

btnTDAdd.addEventListener("click", function () { //Displaying the input when clicked the plus button
    toDoInputContainer.style.display = "block"
    toDoInput.focus()
    btnTDAdd.style.display = "none"
})

function addToDoEl() { // Adding new element of the todo > with enter in the input
    toDoList.push(toDoInput.value)
    toDoCollection.innerHTML += `
    <li class="to-do-element">
        <button class="btn-to-do-check" onclick="checkToDoEl(${toDoList.length - 1})"></button>
        <p class="to-do-text">${toDoList[toDoList.length - 1]}</p>
        <button class="btn btn-to-do-remove" onclick="removeToDoEl(${toDoList.length - 1})">x</button>
    </li>
    `
    refreshToDolist()
}

toDoInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        addToDoEl()
        toDoInput.value = ""
    }
})

/* ==================
Weather 
================== */

/* Changing the weather language and style */
const weatherContainerConditions = document.getElementById("weather-container-conditions")
if (localStorage.getItem("language weather") == null) { localStorage.setItem("language weather", "EN") }
let languageWeather = localStorage.getItem("language weather")
const btnLangWeather = document.getElementById("btn-lang-weather")
const weatherLangList = document.getElementById("ul-weather-lang")

btnLangWeather.textContent = languageWeather

btnLangWeather.addEventListener("click", function () {
    weatherLangList.style.display = "flex"
    weatherLangList.style.justifyContent = "flex-end"
    btnLangWeather.style.display = "none"
})

function changeWeatherLang(lang) {
    if (lang === 1) {
        languageWeather = "IT"
    } else if (lang === 2) {
        languageWeather = "EN"
    } 
    localStorage.setItem("language weather", languageWeather)
    btnLangWeather.textContent = languageWeather
    weatherLangList.style.display = "none"
    btnLangWeather.style.display = "inline-block"
    getWeather()
}

/* Getting current position with different function and launching the API if success */
let positionLat
let positionLon

function successPosition(pos) {
    let crd = pos.coords
    positionLat = crd.latitude
    positionLon = crd.longitude
    weatherWidget()
}
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
const optionsPosition = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
}
function getWeather(){navigator.geolocation.getCurrentPosition(successPosition, error, optionsPosition); }
getWeather()

async function weatherWidget() { //API to get the weather and show what we want
    let response = await fetch(`
    https://api.openweathermap.org/data/2.5/weather?lat=${positionLat}&lon=${positionLon}&units=metric&lang=${languageWeather}&appid=a37f024c4d2140764c8725453a2fa1a6`)
    let data = await response.json().catch(err => console.error(err))
    let iconWeather = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    weatherContainerConditions.innerHTML = `
    <h4 id="weather-city">${data.name}</h4>
    <p id="weather-now">${data.weather[0].description}</p>
    <p id="weather-temp">${parseInt(data.main.temp)}°C</p>
    <img id="weather-icon" src="${iconWeather}">`
}

/* Showing weather or not */
const weatherTitle = document.getElementById("weather-title")
const weatherContainer = document.getElementById("weather-container")
if (localStorage.getItem("weather TF") == null) { localStorage.setItem("weather TF", "true" )}
let showWeatherTF = localStorage.getItem("weather TF")

if (showWeatherTF === "true") { //Showing like was when i it was closed
    weatherContainer.style.display = "block" 
} else if (showWeatherTF === "false") {
    weatherContainer.style.display = "none" 
}

function showWeather() {
    if (showWeatherTF === "true") {
        weatherContainer.style.display = "none" 
        showWeatherTF = "false"
    } else if(showWeatherTF === "false") {
        weatherContainer.style.display = "block"
        showWeatherTF = "true"
    }
    localStorage.setItem("weather TF", showWeatherTF)
}

weatherTitle.addEventListener("click", showWeather)

/* ==================
Transition News Crypto
================== */

const switchNC = document.getElementById("switch-btn-NC")
const btnNewsToCrypto = document.getElementById("btn-news-to-crypto")
const btnCryptoToNews = document.getElementById("btn-crypto-to-news")
const newsDiv = document.getElementById("news-div")
const cryptoDiv = document.getElementById("crypto-div")
const newsTitle = document.getElementById("news-title")
const cryptoTitle = document.getElementById("crypto-title")
// localStorage.removeItem("nc display")
if (localStorage.getItem("nc display") == null) { localStorage.setItem("nc display", "true") }
let NCdisplayTF = localStorage.getItem("nc display")
// localStorage.removeItem("crypto or news")
if (localStorage.getItem("crypto or news") == null) { localStorage.setItem("crypto or news", "news") }
let cryptoOrNews = localStorage.getItem("crypto or news") //Access localStorage to know what to show

function showCryptoOrNews(){
    if (cryptoOrNews === "news") {
    showNews()
    } else if (cryptoOrNews === "crypto") {
    showCrypto()
    } 
}
// 
/* Functions to show one or the other */
function showNews() {
    switchNC.style.display = "block"
    newsDiv.style.display = "block"
    cryptoDiv.style.display = "none"
    btnCryptoToNews.style.display = "none"
    btnNewsToCrypto.style.display = "inline-block"
    newsTitle.style.display = "block"
    cryptoTitle.style.display = "none"
    cryptoOrNews = "news"
    localStorage.setItem("crypto or news", cryptoOrNews)
}

function showCrypto() {
    switchNC.style.display = "block"
    newsDiv.style.display = "none"
    cryptoDiv.style.display = "block"
    btnNewsToCrypto.style.display = "none"
    btnCryptoToNews.style.display = "inline-block"
    cryptoTitle.style.display = "block"
    newsTitle.style.display = "none"
    cryptoOrNews = "crypto"
    localStorage.setItem("crypto or news", cryptoOrNews)
}

btnNewsToCrypto.addEventListener("click", showCrypto)
btnCryptoToNews.addEventListener("click", showNews)

if (NCdisplayTF === "true") { //Showing like was when it was closed
    showCryptoOrNews()
} else if (NCdisplayTF === "false") {
    newsDiv.style.display = "none" 
    cryptoDiv.style.display = "none" 
    switchNC.style.display = "none"
    btnCryptoToNews.style.display = "none"
    btnNewsToCrypto.style.display = "none"
    if (cryptoOrNews === "news") {
        cryptoTitle.style.display = "none"
    } else if (cryptoOrNews === "crypto") {
        newsTitle.style.display = "none"
    } 
}

function NCdisplay() { //How to menage the click of the news or crypto title
    if (NCdisplayTF === "true") {
        newsDiv.style.display = "none"
        cryptoDiv.style.display = "none" 
        switchNC.style.display = "none"
        NCdisplayTF = "false"
    } else if(NCdisplayTF === "false") {
        showCryptoOrNews()
        NCdisplayTF = "true"
    }
    localStorage.setItem("nc display", NCdisplayTF)
}

newsTitle.addEventListener("click", NCdisplay)
cryptoTitle.addEventListener("click", NCdisplay)

/* ==================
News
================== */

const btnNewsState = document.getElementById("btn-news-state")
const btnNewsStateContainer = document.getElementById("btn-news-state-container")
const btnNewsCategory = document.getElementById("btn-news-category")
const newsStateList = document.getElementById("news-state-list")
const newsCategoryList = document.getElementById("news-category-list")
const newsContainer = document.getElementById("news-container")

/* Category and country "buttons" and style */
let countryNews = localStorage.getItem("country news")
if (countryNews == null || countryNews === "") {
    localStorage.setItem("country news", "it")
    countryNews = localStorage.getItem("country news")
}
btnNewsState.textContent = countryNews

let categoryNews = localStorage.getItem("category news")
if (categoryNews == null || categoryNews === "") {
    localStorage.setItem("category news", "general")
    categoryNews = localStorage.getItem("category news")
}
btnNewsCategory.textContent = categoryNews

btnNewsState.addEventListener("click", function () {
    newsStateList.style.display = "block"
    btnNewsStateContainer.style.display = "none"
    newsCategoryList.style.display = "none"
    btnNewsCategory.style.display = "inline-block"
    switchNC.style.display = "none"
    newsContainer.style.display = "none"
})

btnNewsCategory.addEventListener("click", function () {
    newsCategoryList.style.display = "block"
    btnNewsCategory.style.display = "none"
    newsStateList.style.display = "none"
    btnNewsStateContainer.style.display = "block"
    switchNC.style.display = "none"
    newsContainer.style.display = "none"
})

function changeNewsState(state) {
    if (state === 1) {
        countryNews = "it"
    } else if (state === 2) {
        countryNews = "fr"
    } else if (state === 3) {
        countryNews = "de"
    } else if (state === 4) {
        countryNews = "pt"
    } else if (state === 5) {
        countryNews = "gb"
    } else if (state === 6) {
        countryNews = "us"
    }
    localStorage.setItem("country news", countryNews)
    btnNewsState.textContent = countryNews
    newsStateList.style.display = "none"
    btnNewsStateContainer.style.display = "block"
    getNews()
}

function changeNewsCategory(category) {
    if (category === 1) {
        categoryNews = "business"
    } else if (category === 2) {
        categoryNews = "entertainment"
    } else if (category === 3) {
        categoryNews = "general"
    } else if (category === 4) {
        categoryNews = "health"
    } else if (category === 5) {
        categoryNews = "science"
    } else if (category === 6) {
        categoryNews = "sports"
    } else if (category === 7) {
        categoryNews = "technology"
    }
    localStorage.setItem("category news", categoryNews)
    btnNewsCategory.textContent = categoryNews
    newsCategoryList.style.display = "none"
    btnNewsCategory.style.display = "inline-block"
    getNews()
}

getNews()

async function getNews() { //API for getting the News and show what we want with a for loop for 3 news
    switchNC.style.display = "block"
    newsContainer.style.display = "block"
    newsContainer.innerHTML = ""
    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryNews}&category=${categoryNews}&apiKey=92392cdab3c54042ae71ad3a830e8afe`)
    let data = await response.json().catch(err => console.error(err))

    for (let i = 0; i <= 2; i++) {
        let article = data.articles[i]
        newsContainer.innerHTML += `
        <h4 class= "news-headline"> <a href="${article.url}">${article.title}</a> </h4>
        <p class= "news-author">${article.source.name}</p>
        `
    }
}

/* ==================
Crypto
================== */
const cryptoContainer = document.getElementById("crypto-container")

/* Accessing local storage for Crypto ID */
let cryptoID = localStorage.getItem("crypto id")
if (cryptoID == null || cryptoID === "") { //search for an error in get the localstorage or empty value
    localStorage.setItem("crypto id", "bitcoin")
    cryptoID = localStorage.getItem("crypto id")
}

const inputCrypto = document.getElementById("input-crypto-id")
const btnChangeCrypto = document.getElementById("btn-change-crypto")
btnChangeCrypto.onclick = () => changeCrypto()
inputCrypto.addEventListener("keyup", function (e) {
    if (e.key === 'Enter') {
        changeCrypto()
    }
})

function changeCrypto() { //Change CryptoID
    if (inputCrypto.value) {
        localStorage.setItem("crypto id", inputCrypto.value)
        cryptoID = localStorage.getItem("crypto id")
        inputCrypto.value = ""
        getCrypto()
    }
}

getCrypto() 

async function getCrypto() { //API for Crypto and showing the data we want
    let response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}`)
    let data = await response.json()
    cryptoContainer.innerHTML = `
    <div id="crypto-title-container">
        <h4 id="crypto-name">${data.name}</h4>
        <img id="crypto-img" src="${data.image.small}">
    </div>
    <p class= "crypto-values"> Now: $${data.market_data.current_price.usd}</p>
    <p class= "crypto-values"> Today: ${Math.round((data.market_data.price_change_percentage_24h)* 100)/100 }%</p>
    <p class= "crypto-values"> 7 days: ${Math.round((data.market_data.price_change_percentage_7d)* 100)/100 }%</p>
    <p class= "crypto-values"> 30 days: ${Math.round((data.market_data.price_change_percentage_30d)* 100)/100 }%</p>   
    `
}


/* 
1. Change the way you use the background image putting like a backgroudn image of the body
2. use background blend to see if we can rid of the text shadow 
*/