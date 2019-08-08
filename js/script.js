changeImage();

function changeImage() {
  //setTimeout(changePhoto, 5000); // Change image every 2 seconds
}

function fullscreen() {

  /* Get the element you want displayed in fullscreen */
  var doc = document.documentElement;

  /* Function to open fullscreen mode */
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
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