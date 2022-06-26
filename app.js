// select DOM elements
const video = document.querySelector('video');
const videoContainer = document.querySelector('.video-container');

const playPauseBtn = document.querySelector('.play-pause-btn');

const fullScreenBtn = document.querySelector('.full-screen-btn');

// flags
let isFullScreen = false;

// Play/Pause
function playVideo() {
  video.play();
  playPauseBtn.firstElementChild.setAttribute('class', 'fa fa-pause-circle ');
}
function pauseVideo() {
  video.pause();
  playPauseBtn.firstElementChild.setAttribute('class', 'fa fa-play-circle ');
}
const togglePlay = () => {
  video.paused ? playVideo() : pauseVideo();
};
function onPlayEnded() {
  playPauseBtn.firstElementChild.setAttribute('class', 'fa fa-play-circle ');
}

//  full screen
function fullScreen() {
  videoContainer.requestFullscreen();
  isFullScreen = true;
  fullScreenBtn.firstElementChild.setAttribute('class', 'fa fa-compress');
}
function minimizeScreen() {
  document.exitFullscreen();
  isFullScreen = false;
  fullScreenBtn.firstElementChild.setAttribute('class', 'fa fa-expand');
}
function toggleFullScreen() {
  isFullScreen ? minimizeScreen() : fullScreen();
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
      break;
  }
});

// full screen listener
fullScreenBtn.addEventListener('click', toggleFullScreen);

// toggle play lsiteners
video.addEventListener('ended', onPlayEnded);
video.addEventListener('click', togglePlay);
playPauseBtn.addEventListener('click', togglePlay);

// volume control
const volumeSlider = document.querySelector('.volume-slider');
const volumeThumb = document.querySelector('.volume-slider-thumb');
const volumeBtn = document.querySelector('.volume-btn');

function setVolume(e) {
  if (e.target.classList.contains('volume-slider-thumb')) {
    return;
  }
  const width = this.clientWidth;
  const clickX = e.offsetX;
  volumeThumb.style.transform = `translate(${clickX}px,-50%)`;
  video.volume = clickX / width;
  console.log(video.volume);
  if (video.volume < 0.02) {
    muteVolume();
  } else {
    video.muted = false;
    volumeBtn.firstElementChild.setAttribute('class', 'fa fa-volume-high');
  }
}

function muteVolume() {
  volumeBtn.firstElementChild.setAttribute('class', 'fa fa-volume-mute');
  video.muted = true;
}

volumeSlider.addEventListener('click', setVolume);
