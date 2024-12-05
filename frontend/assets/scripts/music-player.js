document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play_button');
    const audio = document.getElementById('music_audio');
    const progressBar = document.getElementById('music_progress');
    const currentTimeDisplay = document.getElementById('current_time');
    const totalTimeDisplay = document.getElementById('total_time');

    // Play/Pause Button
    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Update Progress Bar and Time
    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        // Update progress bar
        const progress = (currentTime / duration) * 100;
        progressBar.style.width = `${progress}%`;

        // Update current time and total duration
        currentTimeDisplay.textContent = formatTime(currentTime);
        totalTimeDisplay.textContent = formatTime(duration);
    });

    // Format time to MM:SS
    function formatTime(time) {
        if (isNaN(time)) return '00:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
});