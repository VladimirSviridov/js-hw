const video = document.querySelector('video');
const playBtn = document.querySelector('.fa-play');
const pauseBtn = document.querySelector('.fa-pause');
const volume = document.querySelector('.volume');
//По тексту timing округлил до второго знака
const timing = document.querySelector('.timing');
const currentTimeEl = document.querySelector('.currentTime');

let wasVideoPlaying = false;
let progressIdentifier = null;

//У меня почему то срабатывает через раз. Постоянно timing.max в самом плеере тянется как будто оно равно 100 (как дефолтно)
window.addEventListener('load', function () {
    timing.min = 0;
    timing.max = +video.duration;
});

document.addEventListener('keyup', function (event) {
    if (event.code === "Space") {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
});
//Прибавляем громкость
//Выянил для себя, что поменя event на keydown, можно прибовлять громкость или перематывать видео зажатие клавиши
document.addEventListener('keyup', function (event) {
    if (event.code === "ArrowUp") {
        volume.value = +volume.value + 0.1;
        video.volume = volume.value;
    }
    //Убавляем громкость
    else if (event.code === "ArrowDown") {
        volume.value = +volume.value - 0.1;
        video.volume = volume.value;
    }
    //Перемотка видео. Видео возобновляет в том же режими что было до перемотки (если было на паузе то остается на паузе)
    //если проигрывалось, то продолжает проигрываться
    if (event.code === "ArrowRight") {
        timing.value = +timing.value + 0.5;
    } //Перематываем назад
    else if (event.code === "ArrowLeft") {
        timing.value = +timing.value - 0.5;
    }
    video.currentTime = timing.value;
    progressIdentifier = timing.value;
    if (wasVideoPlaying) {
        video.play();
        progressIdentifier = setInterval(changeProgress, 100);
    }
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


//Запуск и остановка видео по клику на самом видео.
video.addEventListener('click', function (event) {
        if(!video.paused) {
            // console.log('pause btn');
            video.pause();
            clearInterval(progressIdentifier);
        } else if (video.paused) {
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
        progressIdentifier = progressIdentifier.toFixed(2);
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
    //Округлил показ времени до 2 знаков после запятой
    currentTimeEl.innerText = video.currentTime.toFixed(2);
}

volume.addEventListener('change', function () {
    video.volume = volume.value;
});
