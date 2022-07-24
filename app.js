import renderVideos from './renderVids.js';
import handleVideo from './handleVideo.js';

window.addEventListener('DOMContentLoaded', renderVideos());

const videos = [...document.querySelectorAll('.video-container')];

videos.forEach((movie) => {
  movie.addEventListener('mouseenter', handleVideo);

  movie.addEventListener('mouseleave', () => {
    console.log('liw');
    movie.removeEventListener('mouseenter', handleVideo);
  });
});
