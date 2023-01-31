function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slider = document.querySelector(container),
          slides = slider.querySelectorAll(slide),
          arrowPrev = slider.querySelector(prevArrow),
          arrowNext = slider.querySelector(nextArrow),
          totalSliderCounter = slider.querySelector(totalCounter),
          currentSliderCounter = slider.querySelector(currentCounter),
          slidesWrapper = slider.querySelector(wrapper),
          slidesField = slider.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    // Отображаем или нет 0 в общем счетчике слайдов
    if (slides.length < 10) {
        totalSliderCounter.textContent = `0${slides.length}`;
        currentSliderCounter.textContent = `0${slideIndex}`;
    } else {
        totalSliderCounter.textContent = slides.length;
        currentSliderCounter.textContent = slideIndex;
    }
    // Устан-м ширину блоку в 100%
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    // Добавим плавности блоку при перек-и слайдов и далее скроем неиспол-е слайды
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    // Переб-м все слайды на стр-це, где внутри нах-ся каждый отдел-й слайд (slide)
    slides.forEach(slide => {
        slide.style.width = width;
    });

    // Сделаем индикаторы(буллеты) для нашего слайдера
    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    // Далее размещ-м этот блок на стр-це
    slider.append(indicators);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if(i == 0) {
            dot.style.opacity = 1;
        } 
        indicators.append(dot);
        dots.push(dot);
    }

    // Фун-я превр-я строку в числов. тип данных и вырезающая все не числа, испол-ся регул-е выражения
    function doNumberFromString(str) {
        return +str.replace(/\D/g, '');
    }
    // Назначим обраб-к события для передвижения нашего слайдера, на кнопку Next
    arrowNext.addEventListener('click', () => {
        if (offset == doNumberFromString(width) * (slides.length -1)) {
            offset = 0;
        } else {
            offset +=  doNumberFromString(width);
        }
        transformSlidesLeft();
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        showZeroInCounterSlider();
        setStyleDots();

    });
    arrowPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = doNumberFromString(width) * (slides.length -1);
        } else {
            offset -=  doNumberFromString(width);
        }
        transformSlidesLeft();
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        showZeroInCounterSlider();
        setStyleDots();
    });

    // В буллеты добавить перек-е слайдов при клике
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = doNumberFromString(width) * (slideTo -1);
            transformSlidesLeft();
            showZeroInCounterSlider();
            setStyleDots();
        });
    });
    
    // Фун-я перебора массива буллетов dots, где каждой точке dot устанав-м инлайн-стили
    function setStyleDots() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    } 
    // Фун-я отображения 0 в счетчике слайдов
    function showZeroInCounterSlider() {
        if (slides.length < 10) {
            currentSliderCounter.textContent = `0${slideIndex}`;
        } else {
            currentSliderCounter.textContent = slideIndex;
        }
    }
    // Фун-я делаем смещение сашего слайдера, для смешения влево в css мы указ-м отриц. знач-я
    function transformSlidesLeft() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }
}

export default slider;