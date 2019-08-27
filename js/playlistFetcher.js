var userPlaylists = [];
var playlistUrl = "https://www.youtube.com/embed/videoseries?list=<playlistId>&autoplay=1&loop=1&fs=0&iv_load_policy&modestbranding=1";

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({
            scope: "https://www.googleapis.com/auth/youtube.readonly"
        });
}

function loadClient() {
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest");
}

function execute() {
    return gapi.client.youtube.playlists.list({
            "part": "snippet,contentDetails",
            "maxResults": 50,
            "mine": true
        })
        .then(function (response) {
                userPlaylists = response.result.items;
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
    userPlaylists.forEach(playlist => {
        var playlistCard = document.createElement("div");
        playlistCard.setAttribute("class", "card text-center");

        playlistCard.innerHTML = `
        <img class="card-img-top" src="${playlist.snippet.thumbnails.medium.url}">
        <div class="card-body">
            <h5 class="card-title">${playlist.snippet.title}</h5>
        </div>
        `
        playlistDiv.appendChild(playlistCard);

        playlistCard.onclick = function () {
            runPlaylist(playlist.id);
        };
    });

    document.getElementById("get-playlists-button").style.display = "none";
}

function runPlaylist(playlistId) {
    document.getElementById("music-iframe").setAttribute("src", playlistUrl.replace('<playlistId>', playlistId));
    document.getElementById("iframe-container").style.display = "block";
}