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
  console.log('added class full');
  videoContainer.classList.add('full-screen');
  isFullScreen = true;
  fullScreenIcon.className.replace('fa-expand', 'fa-pause-circle');
}
function minimizeScreen() {
  console.log('added class mini');
  videoContainer.classList.remove('full-screen');
  fullScreenIcon.className.replace('fa-expand', 'fa-pause-circle');
  isFullScreen = false;
}

function toggleFullScreen() {
  isFullScreen ? minimizeScreen() : fullScreen();
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
