let nowPlaying = document.querySelector(".now-playing");
let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");

let currTime = document.querySelector(".current-time");
let seekSlider = document.querySelector(".seek_slider");
let totalDuration = document.querySelector(".total-duration");

let prev_track = document.querySelector(".prev-track");
let playPauseTrack = document.querySelector(".playpause-track");
let next_track = document.querySelector(".next-track");

// buat variabel yang berlaku untuk keseluruhan
let trackIndex = 0;
let isPlaying = false;
let updateTimer;

// buat audio tag / element yang akan dimainkan
let currTrack = document.createElement("audio");

// buat list lagu
let trackList = [
  {
    name: "GO CRY GO",
    artist: "Overlord",
    pathImage: "../assets/img/image1.jpg",
    pathSong: "../assets/song/song1.mp3",
  },
  {
    name: "SONG 2",
    artist: "udin",
    pathImage: "../assets/img/image1.jpg",
    pathSong: "../assets/song/song2.mp3",
  },
  {
    name: "SONG 3",
    artist: "ucok",
    pathImage: "../assets/img/image1.jpg",
    pathSong: "../assets/song/song3.mp3",
  },
  {
    name: "SONG 4",
    artist: "udin2",
    pathImage: "../assets/img/image1.jpg",
    pathSong: "../assets/song/song4.mp3",
  },
];

function resetValue() {
  currTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
}

function loadTrack(trackIndex) {
  setInterval(updateTimer);
  resetValue();

  currTrack.src = trackList[trackIndex].pathSong;
  currTrack.load();

  // ubah tampilan sesuai data
  trackArt.style.backgroundImage = `url(' ${trackList[trackIndex].pathImage} ')`;
  trackName.textContent = trackList[trackIndex].name;
  trackArtist.textContent = trackList[trackIndex].artist;
  nowPlaying.textContent = `PLAYING ${trackIndex + 1} OF ${trackList.length}`;

  updateTimer = setInterval(seekUpdate, 1000);

  //set agar track dilanjutkan jika sudah berakhir
  currTrack.addEventListener("ended", nextTrack);
}

// konfigurasi button
function playpauseTrack() {
  if (!isPlaying) {
    playTrack();
  } else {
    pauseTrack();
  }
}

function playTrack() {
  currTrack.play();
  isPlaying = true;
  playPauseTrack.innerHTML = '<i class="fas fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  currTrack.pause();
  isPlaying = false;
  playPauseTrack.innerHTML = '<i class="fas fa-play-circle fa-5x"></i>';
}

function prevTrack() {
  if (trackIndex > 0) {
    trackIndex -= 1;
  } else {
    trackIndex = trackList.length - 1;
  }
  loadTrack(trackIndex);
  playTrack();
}

function nextTrack() {
  if (trackIndex < trackList.length - 1) {
    trackIndex += 1;
  } else {
    trackIndex = 0;
  }
  loadTrack(trackIndex);
  playTrack();
}

function seekTo() {
  let seekto = currTrack.duration * (seekSlider.value / 100);

  currTrack.currentTime = seekto;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(currTrack.duration)) {
    seekPosition = currTrack.currentTime * (100 / currTrack.duration);
    seekSlider.value = seekPosition;

    let currentMinutes = Math.floor(currTrack.currentTime / 60);
    let currentSeconds = Math.floor(
      currTrack.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(currTrack.duration / 60);
    let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

    // Add a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    // Display the updated duration
    currTime.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

document.onkeydown = function (teziger) {
  switch (teziger.keyCode) {
    case 32: // KeyCode tombol Space
      playTrack();
      break;
    case 37:
      prevTrack();
      break;
    case 39:
      nextTrack();
      break;
  }
  teziger.preventDefault(); // Menghapus fungsi default tombol
};

loadTrack(trackIndex);
