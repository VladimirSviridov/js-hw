const video = document.querySelector('video');
const playBtn = document.querySelector('.fa-play');
const pauseBtn = document.querySelector('.fa-pause');
const volume = document.querySelector('.volume');
const timing = document.querySelector('.timing');
const currentTimeEl = document.querySelector('.currentTime');

let wasVideoPlaying = false;
let progressIdentifier = null;

window.addEventListener('load', function () {
    timing.min = 0;
    timing.max = video.duration;
});

pauseBtn.addEventListener('click', function () {
    if (!video.paused) {
        // console.log('pause btn');
        video.pause();
        clearInterval(progressIdentifier);
    }
});

playBtn.addEventListener('click', function () {
    // console.log('play btn');
    if (video.paused) {
        video.play();
        progressIdentifier = setInterval(changeProgress, 100);
    }
});

timing.addEventListener('change', function (event) {
    // console.log('timing change');
    video.currentTime = timing.value;
    if (wasVideoPlaying) {
        video.play();
        progressIdentifier = setInterval(changeProgress, 100);
    }
});

timing.addEventListener('mousedown', function (event) {
    // console.log('timing mousedown');
    clearInterval(progressIdentifier);
    wasVideoPlaying = !video.paused;
    if (wasVideoPlaying) {
        video.pause();
    }
});

function changeProgress() {
    timing.value = video.currentTime;
    currentTimeEl.innerText = video.currentTime;
}

volume.addEventListener('change', function () {
    video.volume = volume.value;
});
