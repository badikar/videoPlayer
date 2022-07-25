import renderVideos from './renderVids.js';
import handleVideo from './handleVideo.js';

window.addEventListener('DOMContentLoaded', renderVideos());

const videos = [...document.querySelectorAll('.cart-container')];

videos.forEach((movie) => {
  movie.addEventListener('mouseenter', handleVideo);
  movie.addEventListener('mouseleave', () => {
    movie.removeEventListener('mouseenter', handleVideo);
  });
});
