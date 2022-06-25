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

const volumeSliderThumb = document.querySelector('.volume-slider-thumb');
const volumeSlider = document.querySelector('.volume-slider');

function setVolume(e) {
  const width = this.clientWidth;
  console.log(width);
  const clickX = e.offsetX;
  console.log(clickX);
  video.volume = clickX / width;
  console.log(volumeSliderThumb);
  volumeSliderThumb.style.transform = `translateX(${clickX}px)`;
}

volumeSlider.addEventListener('click', setVolume);
