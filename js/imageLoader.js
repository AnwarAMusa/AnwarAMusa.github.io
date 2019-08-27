const refreshTimeInMinutes = 10;

changeImage();
["fullscreenchange", "mozfullscreenchange", "webkitfullscreenchange", "msfullscreenchange"].forEach(screenChange => {
  document.addEventListener(screenChange, showFullscreenButton);
})

function changeImage() {
  const firstImage = document.getElementById('first-image');
  const secondImage = document.getElementById('second-image');

  setInterval(function () {
    if (secondImage.style.opacity > 0) {
      secondImage.style.opacity = 0;
      secondImage.style.backgroundImage = `url('https://source.unsplash.com/random/1920x1080/?nature,mountain,lake,river,sea,snow,sand,stars,${new Date().getTime()}')`;
    } else {
      secondImage.style.opacity = 1;
      firstImage.style.backgroundImage = `url('https://source.unsplash.com/random/1920x1080/?nature,mountain,lake,river,sea,snow,sand,stars,${new Date().getTime()}')`;
    }
  }, refreshTimeInMinutes * 1000);
}

function fullscreen() {

  /* Get the element you want displayed in fullscreen */
  var doc = document.documentElement;

  /* Function to open fullscreen mode */
  if (doc.requestFullscreen) {
    doc.requestFullscreen();
  } else if (doc.mozRequestFullScreen) {
    /* Firefox */
    doc.mozRequestFullScreen();
  } else if (doc.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    doc.webkitRequestFullscreen();
  } else if (doc.msRequestFullscreen) {
    /* IE/Edge */
    doc.msRequestFullscreen();
  }

  document.getElementById("fullscreen-icon").style.display = "none";
}

function showFullscreenButton() {
  if (!document.fullscreenElement) {
    document.getElementById("fullscreen-icon").style.display = "block";
  }
}