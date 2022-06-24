// select DOM elements
const video = document.querySelector('video');
const playPauseBtn = document.querySelector('.play-pause-btn');
const playPauseIcon = document.querySelector('.play-pause-icon');

// funcs
const togglePlay = () => {
  video.paused ? video.play() : video.pause();
  console.log(playPauseIcon.classList);
  playPauseIcon.classList.replace('fa-play-circle', 'fa-pause-circle');
};

// event listeners
playPauseBtn.addEventListener('click', togglePlay);
