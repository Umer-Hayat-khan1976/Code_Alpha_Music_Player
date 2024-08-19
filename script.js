const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeControl = document.getElementById('volumeControl');
const nowPlaying = document.getElementById('nowPlaying');
const playlist = document.getElementById('playlist');
const searchInput = document.getElementById('searchInput');
let currentIndex = 0;

const songs = Array.from(playlist.getElementsByTagName('li'));

function loadSong(index) {
    audioPlayer.src = songs[index].getAttribute('data-src');
    nowPlaying.textContent = `Now Playing: ${songs[index].textContent}`;
}

function playSong() {
    audioPlayer.play();
    playPauseBtn.textContent = '⏸️';
}

function pauseSong() {
    audioPlayer.pause();
    playPauseBtn.textContent = '▶️';
}

function togglePlayPause() {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function playNextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    playSong();
}

function playPrevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    playSong();
}

playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', playPrevSong);

volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value;
});

songs.forEach((song, index) => {
    song.addEventListener('click', () => {
        currentIndex = index;
        loadSong(currentIndex);
        playSong();
    });
});

// Search functionality
searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    songs.forEach((song) => {
        const text = song.textContent.toLowerCase();
        song.style.display = text.includes(filter) ? '' : 'none';
    });
});

// Load the first song by default
loadSong(currentIndex);
