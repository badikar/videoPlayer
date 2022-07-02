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
    // console.log('width' + width);
    // console.log('click' + clickX);
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
volumeSlider.addEventListener('touchmove', setVolume);

volumeSlider.addEventListener('pointerdown', () => (isMoving = true));

const CurrentTimeDOM = document.querySelector('.current-time');
const totalDuration = document.querySelector('.total-duration');

// duration

video.addEventListener('loadeddata', function () {
  totalDuration.textContent = formatDuration(this.duration);
});

// time update
video.addEventListener('timeupdate', function () {
  CurrentTimeDOM.textContent = formatDuration(this.currentTime);
});

// total duration
const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

function formatDuration(time) {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);
  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
  } else {
    return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(
      seconds
    )}`;
  }
}

//  playback speed
const speedBtn = document.querySelector('.speed-btn');

speedBtn.addEventListener('click', changePlaybackSpeed);

function changePlaybackSpeed() {
  let newPlaybackRate = video.playbackRate + 0.25;
  if (newPlaybackRate > 2) newPlaybackRate = 0.25;
  video.playbackRate = newPlaybackRate;
  speedBtn.textContent = `${newPlaybackRate}x`;
}
