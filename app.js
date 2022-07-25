import renderVideos from './renderVids.js';
import handleVideo from './handleVideo.js';
import formatDuration from './formatDuration.js';

const startVideoPlayer = () => {
  window.addEventListener('DOMContentLoaded', renderVideos());
  const videoCarts = [...document.querySelectorAll('.cart-container')];

  videoCarts.forEach((movie) => {
    const video = movie.querySelector('video');
    const totalDuration = movie.querySelector('.total-duration');
    video.addEventListener('loadeddata', function () {
      totalDuration.textContent = formatDuration(this.duration);
    });

    movie.addEventListener('mouseenter', handleVideo);
    movie.addEventListener('mouseleave', () => {
      movie.removeEventListener('mouseenter', handleVideo);
    });
  });
};

startVideoPlayer();
