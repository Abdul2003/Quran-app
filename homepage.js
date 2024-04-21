// FETCH API
fetch("https://api.alquran.cloud/v1/surah")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

//INITIATE LOOP
function appendData(data) {
  for (var i = 0; i < data.data.length; i++) {
    var divContainer = document.getElementById("surahs-container");
    //LINK VERSE ID TO VERSE PAGE
    var id = data.data[i].number;
    //CREATE CARD
    var divCards = document.createElement("a");
    divCards.href = `/Verses/verses.html?id=${id}`;
    divCards.classList.add("cards");

    //CREATE SURAH CONTAINERS
    var numberContainer = document.createElement("span");
    numberContainer.classList.add("number-container");

    var engtitleContainer = document.createElement("div");
    engtitleContainer.classList.add("surah");

    var subtitleContainer = document.createElement("div");
    subtitleContainer.classList.add("surah-eng");

    var arabictitleContainer = document.createElement("div");
    arabictitleContainer.classList.add("surah-ara");

    //CREATE SURAH ELEMENTS
    var surahName = document.createElement("h1");
    var surahnameEng = document.createElement("span");
    var surahnameArabic = document.createElement("span");
    //FETCH DATA FROM API
    numberContainer.innerHTML = data.data[i].number;
    surahName.innerHTML = data.data[i].englishName;
    surahnameArabic.innerHTML = data.data[i].name;
    surahnameEng.innerHTML = data.data[i].englishNameTranslation;
    //APPEND TO DISPLAY DATA
    engtitleContainer.appendChild(surahName);
    subtitleContainer.appendChild(surahnameEng);
    arabictitleContainer.appendChild(surahnameArabic);

    divCards.appendChild(numberContainer);
    divCards.appendChild(engtitleContainer);
    divCards.appendChild(subtitleContainer);
    divCards.appendChild(arabictitleContainer);

    divContainer.appendChild(divCards);
  }
}
