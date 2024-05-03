document.addEventListener('DOMContentLoaded', function () {
  var releaseDates = document.getElementsByClassName("release-date");
  for (var i = 0; i < releaseDates.length; i++) {
    var year = releaseDates[i].innerText;
    switch (true) {
      case (year >= 1980 && year <= 1984):
        releaseDates[i].classList.add("red");
        break;
      case (year >= 1985 && year <= 1989):
        releaseDates[i].classList.add("orange");
        break;
      case (year >= 1990 && year <= 1994):
        releaseDates[i].classList.add("yellow");
        break;
      case (year >= 1995 && year <= 1999):
        releaseDates[i].classList.add("green");
        break;
      case (year >= 2000 && year <= 2004):
        releaseDates[i].classList.add("blue");
        break;
      case (year >= 2005 && year <= 2009):
        releaseDates[i].classList.add("purple");
        break;
      case (year >= 2010 && year <= 2014):
        releaseDates[i].classList.add("pink");
        break;
      case (year >= 2015 && year <= 2019):
        releaseDates[i].classList.add("lightblue");
        break;
      case (year >= 2020 && year <= 2024):
        releaseDates[i].classList.add("biege");
        break;
      default:
        break;
    }
  }
});
