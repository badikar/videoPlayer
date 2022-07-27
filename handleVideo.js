import formatDuration from './formatDuration.js';

function handleVideo() {
  // select DOM elements
  const video = this.querySelector('video');
  const videoContainer = this.querySelector('.video-container');
  const videoContainerOverlay = this.querySelector('.video-container-overlay');
  const playPauseBtn = this.querySelector('.play-pause-btn');
  const fullScreenBtn = this.querySelector('.full-screen-btn');

  // flags
  let isFullScreen = false;

  // *******************

  // Play/Pause
  function playVideo() {
    videoContainerOverlay.classList.add('video-container-overlay-remove');
    video.play();
    // video.onwaiting = loadSpinner();
    playPauseBtn.firstElementChild.setAttribute('class', 'fa fa-pause-circle ');
  }
  function pauseVideo() {
    videoContainerOverlay.classList.remove('video-container-overlay-remove');
    video.pause();
    playPauseBtn.firstElementChild.setAttribute('class', 'fa fa-play-circle ');
  }
  const togglePlay = () => {
    video.paused ? playVideo() : pauseVideo();
  };
  function onPlayEnded() {
    playPauseBtn.firstElementChild.setAttribute('class', 'fa fa-play-circle ');
    videoContainerOverlay.classList.remove('video-container-overlay-remove');
  }

  //  full screen
  function fullScreen() {
    videoContainer.requestFullscreen();
    isFullScreen = true;
    fullScreenBtn.firstElementChild.setAttribute('class', 'fa fa-compress');
    console.log(isFullScreen);
  }
  function minimizeScreen() {
    document.exitFullscreen();
    isFullScreen = false;
    fullScreenBtn.firstElementChild.setAttribute('class', 'fa fa-expand');
    console.log(isFullScreen);
  }
  function toggleFullScreen() {
    isFullScreen ? minimizeScreen() : fullScreen();
  }

  // full screen listener
  fullScreenBtn.addEventListener('click', toggleFullScreen);

  // toggle play lsiteners
  video.addEventListener('ended', onPlayEnded);
  video.addEventListener('click', togglePlay);
  videoContainerOverlay.addEventListener('click', togglePlay);
  playPauseBtn.addEventListener('click', togglePlay);

  // ************volume control*****************

  const volumeSlider = this.querySelector('.volume-slider');

  const volumeBtn = this.querySelector('.volume-btn');

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
    if (isMoving === false) return;
    else if (e.buttons & (1 === 1)) {
      const rect = volumeSlider.getBoundingClientRect();
      const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
      video.volume = percent;
      volumeSlider.style.setProperty('--progres-position', percent);
      video.volume > 0.5 ? highVolume() : lowVolume();
      if (video.volume <= 0.02) muteVolume();
    }
  }

  volumeBtn.addEventListener('click', toggleMute);

  // volumeSlider.addEventListener('click', setVolume);
  volumeSlider.addEventListener('pointermove', setVolume);
  volumeSlider.addEventListener('pointerdown', setVolume);
  volumeSlider.addEventListener('touchmove', setVolume);
  volumeSlider.addEventListener('pointerdown', () => (isMoving = true));

  // duration

  const currentTimeDOM = this.querySelector('.current-time');

  // time update
  video.addEventListener('timeupdate', function () {
    currentTimeDOM.textContent = formatDuration(this.currentTime);
    let percent = video.currentTime / video.duration;
    timelineContainer.style.setProperty('--progres-position', percent);
  });

  //  playback speed
  // const speedBtn = this.querySelector('.speed-btn');

  // speedBtn.addEventListener('click', changePlaybackSpeed);

  // function changePlaybackSpeed() {
  //   let newPlaybackRate = video.playbackRate + 0.25;
  //   if (newPlaybackRate > 2) newPlaybackRate = 0.25;
  //   video.playbackRate = newPlaybackRate;
  //   speedBtn.textContent = `${newPlaybackRate}x`;
  // }

  // timeline
  const timelineContainer = this.querySelector('.timeline-container');

  timelineContainer.addEventListener('pointermove', updateTimeline);
  timelineContainer.addEventListener('pointerdown', updateTimeline);
  timelineContainer.addEventListener('touchmove', updateTimeline);

  function updateTimeline(e) {
    if (e.buttons & (1 === 1)) {
      const rect = timelineContainer.getBoundingClientRect();
      const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
      timelineContainer.style.setProperty('--progres-position', percent);
      video.currentTime = percent * video.duration;
    }
  }
}

export default handleVideo;
