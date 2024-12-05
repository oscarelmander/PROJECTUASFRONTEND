document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play_button');
    const audio = document.getElementById('music_audio');
    const progressBar = document.getElementById('music_progress');
    const currentTimeDisplay = document.getElementById('current_time');
    const totalTimeDisplay = document.getElementById('total_time');
    const musicSelector = document.getElementById('music_selector');
    const musicTitle = document.getElementById('music_title');
    const musicArtist = document.getElementById('music_artist');
    const albumCover = document.querySelector(".album-cover");

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

    // Change song
    musicSelector.addEventListener('change', () => {
        const selectedOption = musicSelector.options[musicSelector.selectedIndex];
        audio.src = selectedOption.value;
        musicTitle.textContent = selectedOption.getAttribute("data-title");
        musicArtist.textContent = selectedOption.getAttribute("data-artist");
        albumCover.src = selectedOption.getAttribute("data-cover");

        // Reset progress and play new song
        audio.currentTime = 0;
        progressBar.style.width = "0%";
        audio.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    });

    // Initialize total duration once audio is loaded
    audio.addEventListener('loadedmetadata', () => {
        totalTimeDisplay.textContent = formatTime(audio.duration);
    });
});
s