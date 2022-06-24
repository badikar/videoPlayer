// select DOM elements
const video = document.querySelector('video');
const videoContainer = document.querySelector('.video-container');

const playPauseBtn = document.querySelector('.play-pause-btn');
const playPauseIcon = document.querySelector('.play-pause-icon');

const fullScreenBtn = document.querySelector('.full-screen-btn');
const fullScreenIcon = document.querySelector('.full-screen-icon');

// flags
let isFullScreen = false;

// Play/Pause
function playVideo() {
  video.play();
  playPauseIcon.classList.replace('fa-play-circle', 'fa-pause-circle');
}
function pauseVideo() {
  video.pause();
  playPauseIcon.classList.replace('fa-pause-circle', 'fa-play-circle');
}
const togglePlay = () => {
  video.paused ? playVideo() : pauseVideo();
};

//  full screen
function fullScreen() {
  isFullScreen = false;
  console.log('add class full');
  fullScreenIcon.className.replace('fa-solid fa-expand', 'fa-light fa-minimize');
}
function minimizeScreen() {
  console.log('add class minimize');
  // fullScreenIcon.className.replace('fa-solid fa-expand', 'fa-light fa-minimize');
  isFullScreen = true;
}

function toggleFullScreen() {
  isFullScreen ? fullScreen() : minimizeScreen();
  console.log(isFullScreen);
}

// event listeners
document.addEventListener('keydown', (e) => {
  switch (e.key.toLowerCase()) {
    case ' ':
    case 'k':
      togglePlay();
      break;
    case 'f':
      toggleFullScreen();
  }
});

// full screen listener
fullScreenBtn.addEventListener('click', toggleFullScreen);

// toggle play lsiteners
video.addEventListener('click', togglePlay);
playPauseBtn.addEventListener('click', togglePlay);
