function updateTimeline(e) {
  if (e.buttons & (1 === 1)) {
    const rect = timelineContainer.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    timelineContainer.style.setProperty('--progres-position', percent);
    video.currentTime = percent * video.duration;
  }
}
export default updateTimeline;
