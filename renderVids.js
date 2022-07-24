import videos from './dataVideo.js';

const renderVideos = () => {
  const videoSection = document.querySelector('#section');
  const videoList = videos
    .map((singleVideo) => {
      return `
    <div class="video-container data-id="${singleVideo.id}">
    <div class="video-container-overlay">
        <div class="overlay-icon">
            <i class="fa fa-play-circle"></i>
        </div>
    </div>
    <div class="video-controls-container">
        <div class="controls">
            <button class="play-pause-btn">
                <i class="fa fa-play-circle"></i>
            </button>
            <div class="volume-container">
                <button class="volume-btn">
                    <i class="fa fa-volume-high fa-fw"></i>
                </button>
                <div class="volume-slider">
                    <div class="volume-slider-progres">
                        <div class="volume-slider-thumb"></div>
                    </div>
                </div>
            </div>
            <div class="duration-container">
                <span class="current-time">0:00</span> /
                <span class="total-duration"></span>
            </div>
            <div class="timeline-container">
                <div class="timeline">
                    <div class="timeline-thumb"></div>
                </div>
            </div>
            <button class="speed-btn wide-btn">1x
            </button>
            <button class="full-screen-btn">
                <i class="fa fa-expand"></i>
            </button>
        </div>
    </div>
    <video src="${singleVideo.src}" poster="./videos/poster_1.png"></video>
</div>`;
    })
    .join('');
  videoSection.innerHTML = videoList;
};

export default renderVideos;
