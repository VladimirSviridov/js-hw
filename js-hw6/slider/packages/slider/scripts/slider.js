document.head.insertAdjacentHTML("afterbegin", '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">');

let slider = document.querySelector('.slider');

// Создаем иконку загрузки
let loadIcon = document.createElement('i');
loadIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
slider.insertAdjacentElement("afterbegin", loadIcon);

// Создаем левую стрелку
let leftArrow = document.createElement('i');
leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
slider.insertAdjacentElement("beforeend", leftArrow);

// Создаем правую стрелку
let rightArrow = document.createElement('i');
rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
slider.insertAdjacentElement("beforeend", rightArrow);

// Ждем когда весь контент целиком загрузится
window.addEventListener('load', function () {
    leftArrow.addEventListener('click', function () {
        images.setNextLeftImage();
    });

    rightArrow.addEventListener('click', function () {
        images.setNextRightImage();
    });

    // Инициализация слайдера
    images.init();
    // Скрываем иконку загрузки
    hideLoadIcon(loadIcon);
});

/**
 * Функция скрывает иконку загрузки
 * @param {HTMLElement} loadIcon 
 */
function hideLoadIcon(loadIcon) {
    loadIcon.style.display = "none";
}

/**
 * Функция берет у элемента слайдера его data-атрибуты размеров,
 * и если они определены, то самому слайдеру меняет размеры.
 * @param {HTMLDivElement} slider 
 */
function setSizes(slider) {
    let width = slider.getAttribute("data-width");
    let height = slider.getAttribute("data-height");
    if (width !== null && width !== "") {
        slider.style.width = width;
    }
    if (height !== null && height !== "") {
        slider.style.height = height;
    }
}
setSizes(slider);

// Объект слайдера
let images = {
    /* {int} Номер текущего изображения */
    currentIdx: 0,

    /* {HTMLDivElement[]} slides элементы слайдов */
    slides: [],
    
    /** Получаем все слайды и показываем первый слайд. */
    init() {
        this.slides = document.querySelectorAll('.slider-item');
        this.showImageWithCurrentIdx();
    },

    /** Всем слайдам добавляем класс hidden-slide. */
    hideVisibleImages() {
        this.slides.forEach(function (slide) {
            slide.classList.add('hidden-slide');
        });
    },

    /** Переключиться на предыдущее изображение. */

    /**
     * Сделал аналогичным образом, но используя библиотечные классы. Долго пытался релизовать удаляя класс анимации
     * при наличии такового, даже создал схему с двумя классами замещающими друг друга, но работало не стабильно.
     * Подсмотрел ваш вариант и сделал так же.
     */
    setNextLeftImage() {
        this.hideVisibleImages();
        if (this.currentIdx == 0) {
            this.currentIdx = this.slides.length - 1;
        } else {
            this.currentIdx--;
        }
        const currentSlide = this.slides[this.currentIdx];
        currentSlide.classList.add('bounceInLeft');
        currentSlide.classList.remove('hidden-slide');
        setTimeout(() => {
            currentSlide.classList.remove('bounceInLeft');
        }, 500);
    },

    /** Переключиться на следующее изображение. */
    setNextRightImage() {
        this.hideVisibleImages();
        if (this.currentIdx == this.slides.length - 1) {
            this.currentIdx = 0;
        } else {
            this.currentIdx++;
        }
        const currentSlide = this.slides[this.currentIdx];
        currentSlide.classList.add('bounceInRight');
        currentSlide.classList.remove('hidden-slide');
        setTimeout(() => {
            currentSlide.classList.remove('bounceInRight');
        }, 500);
    },
};
