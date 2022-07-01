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
    case 'm':
      toggleMute();
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

const lowVolume = () => {
  volumeBtn.firstElementChild.setAttribute('class', 'fa fa-volume-low fa-fw');
  video.muted = false;
};
const highVolume = () => {
  volumeBtn.firstElementChild.setAttribute('class', 'fa fa-volume-high fa-fw');
  video.muted = false;
};
const muteVolume = () => {
  volumeBtn.firstElementChild.setAttribute('class', 'fa fa-volume-mute fa-fw');
  video.muted = true;
};
function toggleMute() {
  video.muted = !video.muted;
  volumeBtn.firstElementChild.classList.toggle('fa-volume-mute');
}

let isMoving = false;

function setVolume(e) {
  // console.log(isMoving);
  // console.log(e.buttons & 1);
  if (isMoving === false || e.target.classList.contains('volume-slider-thumb')) return;
  else if (e.buttons & (1 === 1)) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    volumeThumb.style.transform = `translate(${clickX - width}px,-50%)`;
    video.volume = clickX / width;
    video.volume > 0.5 ? highVolume() : lowVolume();
    if (video.volume <= 0.04) muteVolume();
  }
}

volumeBtn.addEventListener('click', toggleMute);

// volumeSlider.addEventListener('click', setVolume);
volumeSlider.addEventListener('pointermove', setVolume);
volumeSlider.addEventListener('pointerdown', setVolume);
volumeSlider.addEventListener('pointerdown', () => (isMoving = true));
