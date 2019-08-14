const refreshTimeInMinutes = 5;

changeImage();

function changeImage() {
  const firstImage = document.getElementById('first-image');
  const secondImage = document.getElementById('second-image');

  setInterval(function () {
    if (secondImage.style.opacity > 0) {
      secondImage.style.opacity = 0;
      secondImage.style.backgroundImage = `url('https://source.unsplash.com/random/1920x1080/?nature,${new Date().getTime()}')`;
      firstImage.style.opacity = 100;
    } else {
      firstImage.style.opacity = 0;
      firstImage.style.backgroundImage = `url('https://source.unsplash.com/random/1920x1080/?nature,${new Date().getTime()}')`;
      secondImage.style.opacity = 100;
    }
  }, refreshTimeInMinutes * 1000);
}

function fullscreen() {

  /* Get the element you want displayed in fullscreen */
  var doc = document.documentElement;

  /* Function to open fullscreen mode */
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    /* Firefox */
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    /* IE/Edge */
    document.documentElement.msRequestFullscreen();
  }

  document.getElementById("fullscreen-icon").style.display = "none";
}

function showFullscreenButton() {
  if (!document.fullscreenElement) {
    document.getElementById("fullscreen-icon").style.display = "block";
  }
}

document.addEventListener("fullscreenchange", showFullscreenButton);
document.addEventListener("mozfullscreenchange", showFullscreenButton);
document.addEventListener("webkitfullscreenchange", showFullscreenButton);
document.addEventListener("msfullscreenchange", showFullscreenButton);