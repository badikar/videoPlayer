function changePlaybackSpeed() {
  //   speedBtn.addEventListener('click', changePlaybackSpeed);
  const speedBtn = this.querySelector('.speed-btn');

  let newPlaybackRate = video.playbackRate + 0.25;
  if (newPlaybackRate > 2) newPlaybackRate = 0.25;
  video.playbackRate = newPlaybackRate;
  speedBtn.textContent = `${newPlaybackRate}x`;
}

export default changePlaybackSpeed;
