//SIDENAV FUNTION
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("verses-container").style.marginRight = "0px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  document.getElementById("header-container").style.backgroundColor = "rgba(0,0,0,0.4)";
  document.getElementById("footer").style.backgroundColor = "rgba(0,0,0,0.4)";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0px";
  document.getElementById("verses-container").style.marginRight = "30px";
  document.body.style.backgroundColor = "white";
  document.getElementById("header-container").style.backgroundColor = "rgb(235, 235, 235)";
  document.getElementById("footer").style.backgroundColor = "rgb(235, 235, 235)";
}

// FETCH API
const params = new URLSearchParams(location.search);
const id = params.get("id");

fetch(`https://api.alquran.cloud/v1/surah/${id}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (arabData) {
    fetch(`https://api.alquran.cloud/v1/surah/${id}/en.asad`)
      .then(function (response) {
        return response.json();
      })
      .then(function (engData) {
        fetch("https://api.alquran.cloud/v1/surah")
          .then(function (response) {
            return response.json();
          })
          .then(function (navData) {
            appendData(arabData, engData, navData);
          })

          .catch(function (err) {
            console.log("error: " + err);
          });
      })

      .catch(function (err) {
        console.log("error: " + err);
      });
  });

//INITIATE LOOP
function appendData(arabData, engData, navData) {
  var divContainer = document.getElementById("verses-container");

  var ArabicTitle = document.createElement("div");
  ArabicTitle.classList.add("arabic-title");

  var EnglishTitle = document.createElement("div");
  EnglishTitle.classList.add("english-title");

  var TextContainer = document.createElement("div");
  TextContainer.classList.add("text-container");

  ArabicTitle.innerHTML = arabData.data.name;
  EnglishTitle.innerHTML = engData.data.englishNameTranslation;

  divContainer.appendChild(ArabicTitle);
  divContainer.appendChild(EnglishTitle);

  for (i = 0; i < arabData.data.ayahs.length; i++) {
    // SET TITLE AND TEXT VARIABLES
    var VerseNumber = document.createElement("span");
    VerseNumber.classList.add("verse-number");

    var ArabicText = document.createElement("div");
    ArabicText.classList.add("arabic-text");

    var EnglishText = document.createElement("div");
    EnglishText.classList.add("english-text");

    var line = document.createElement("hr");
    line.classList.add("line");

    //FETCH DATA FROM API
    VerseNumber.innerHTML = `${engData.data.number}:${engData.data.ayahs[i].numberInSurah}`;
    ArabicText.innerHTML = arabData.data.ayahs[i].text;
    EnglishText.innerHTML = engData.data.ayahs[i].text;

    //APPEND CHILDREN TO PARENT
    TextContainer.appendChild(ArabicText);
    TextContainer.appendChild(VerseNumber);
    TextContainer.appendChild(EnglishText);
    TextContainer.appendChild(line);

    divContainer.appendChild(TextContainer);
  }
    //SIDENAV DATA
    for (var j = 0; j < navData.data.length; j++) {
      var SidenavContainer = document.getElementById("sidenav-body");

      var id = navData.data[j].number;

      var Sidenav = document.createElement("a");
      Sidenav.classList.add("sidenav-body");
      Sidenav.href = `/Verses/verses.html?id=${id}`;

      var SidenavNumber = document.createElement("span");
      SidenavNumber.classList.add("sidenav-number");

      SidenavNumber.innerHTML = `${navData.data[j].number}<span>.</span>`;
      Sidenav.innerHTML = navData.data[j].englishName;

      Sidenav.appendChild(SidenavNumber);
      SidenavContainer.appendChild(Sidenav);
    
  }
}
