const refreshTimeInMinutes = 10;
var userPlaylists = [];
const playlistUrl = "https://www.youtube.com/embed/videoseries?list=";

changeImage();

document.addEventListener("fullscreenchange", showFullscreenButton);
document.addEventListener("mozfullscreenchange", showFullscreenButton);
document.addEventListener("webkitfullscreenchange", showFullscreenButton);
document.addEventListener("msfullscreenchange", showFullscreenButton);

function authenticate() {
  return gapi.auth2.getAuthInstance()
    .signIn({
      scope: "https://www.googleapis.com/auth/youtube.readonly"
    })
    .then(function () {
        console.log("Sign-in successful");
      },
      function (err) {
        console.error("Error signing in", err);
      });
}

function loadClient() {
  //gapi.client.setApiKey("");
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      });
}

function execute() {
  return gapi.client.youtube.playlists.list({
      "part": "snippet,contentDetails",
      "maxResults": 25,
      "mine": true
    })
    .then(function (response) {
        userPlaylists = response.result.items;
        console.log("userPlaylists", userPlaylists);
      },
      function (err) {
        console.error("Execute error", err);
      });
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({
    client_id: "314368813807-7tfs9ht0d1e459uchpoq52u9ubsk27cc.apps.googleusercontent.com"
  });
});


function displayPlaylists() {
  var playlistDiv = document.getElementById("playlists");
  var list = document.createElement("ul");
  list.setAttribute("id", "playlists-list")
  playlistDiv.appendChild(list);

  userPlaylists.forEach(playlist => {
    var listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(playlist.snippet.title));
    listItem.onclick = function () {
      runPlaylist(playlist.id);
    };
    list.appendChild(listItem);
  });

  document.getElementById("music-controls").style.display = "none";
}

function runPlaylist(playlistId) {
  var musicFrame = document.getElementById("music-iframe");
  musicFrame.setAttribute("src", `${playlistUrl}${playlistId}`)
  musicFrame.style.display = "inline";

}

function changeImage() {
  const firstImage = document.getElementById('first-image');
  const secondImage = document.getElementById('second-image');

  setInterval(function () {
    if (secondImage.style.opacity > 0) {
      secondImage.style.transition = '';
      secondImage.style.opacity = 0;
      secondImage.style.backgroundImage = `url('https://source.unsplash.com/random/1920x1080/?nature,water,mountain,lake,river,sea,snow,sand,stars,${new Date().getTime()}')`;
    } else {
      secondImage.style.transition = 'all 1s linear';
      secondImage.style.opacity = 1;
      firstImage.style.backgroundImage = `url('https://source.unsplash.com/random/1920x1080/?nature,water,mountain,lake,river,sea,snow,sand,stars,${new Date().getTime()}')`;
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