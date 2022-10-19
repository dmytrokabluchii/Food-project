// Испол-м деструктуризацию {}
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider 92. Создаем слайдер на сайте
    const slider = document.querySelector(container),
          slides = slider.querySelectorAll(slide),
          arrowPrev = slider.querySelector(prevArrow),
          arrowNext = slider.querySelector(nextArrow),
          totalSliderCounter = slider.querySelector(totalCounter),
          currentSliderCounter = slider.querySelector(currentCounter),
          slidesWrapper = slider.querySelector(wrapper),
          slidesField = slider.querySelector(field),
        // Метод Window.getComputedStyle() возвр-т объект, содер-й знач-я всех CSS-свойств элемента
        // Где в () наход-ся наша общая обертка для слайдов
        // window.getComputedStyle(slidesWrapper) вернет нам объект с CSS-свойствами и мы возм-м с него ширину
          width = window.getComputedStyle(slidesWrapper).width;

    // Индекс опред-й полож-е в текущем слайде, где 1 это номер нашего слайда
    let slideIndex = 1;
    // Для работы с отступами, чтобы мы знали насколько отступили влево-вправо
    let offset = 0;

    // Отображаем или нет 0 в общем счетчике слайдов
    if (slides.length < 10) {
        // .textContent - Позволяет задавать или получать текстовое содержимое элемента и его потомков.
        totalSliderCounter.textContent = `0${slides.length}`;
        currentSliderCounter.textContent = `0${slideIndex}`;
    } else {
        totalSliderCounter.textContent = slides.length;
        currentSliderCounter.textContent = slideIndex;
    }

    // Устан-м ширину блоку в 100%
    // Т.е. мы помещ-м все слайды что есть на стр-це(slides.length) во внуть slidesField и чтобы они все помес-сь полностью
    slidesField.style.width = 100 * slides.length + '%';
    // Установ-м блоку slidesField css св-во display: flex;
    slidesField.style.display = 'flex';
    // Добавим плавности блоку при перек-и слайдов и далее скроем неиспол-е слайды
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    // Переб-м все слайды на стр-це, где внутри нах-ся каждый отдел-й слайд (slide)
    slides.forEach(slide => {
        // И каждому слайду устнан-м опред-ю ширину что нас интересует. В рез-те мы будем уверены что все слайды будут
        // одинаковой ширины и все они помес-ся в перем-ю slidesField
        slide.style.width = width;
    });

    // Lesson 94 Сделаем индикаторы(буллеты) для нашего слайдера
    // Теперь все элементы внутри слайдера что абсол-но спозиц-ны будут норм. отображ-ся
    slider.style.position = 'relative';
    // Создадим блок 'ol' для наших индикаторов и добавим ему класс
    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    // Вставим Css стили для наших индикаторов испол-я .cssText
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
    // Далее размещ-м этот блок на стр-це, т.е append наши indicator в блок slider
    slider.append(indicators);
    // Созд-м необ-е нам кол-во буллетов. Цикл закон-ся тогда когда конч-ся слайды(slides.length)
    for (let i = 0; i < slides.length; i++) {
        // Созд-м точки и добавим им атрибут c нумерацией нач-я с 1(i + 1), т.к. 1-й слайд - 1-я точка
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        // И для красивого отображения добавим им Css стили
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
        // Добавим подсветки активности буллетам при соот. слайде
        if(i == 0) {
            dot.style.opacity = 1;
        }
        // Далее аппендим их в наш 
        indicators.append(dot);
        // Далее мы получим массив с нашими буллетами
        dots.push(dot);
    }

    // Фун-я превр-я строку в числов. тип данных и вырезающая все не числа, испол-ся регул-е выражения
    // /\D/g - где \D это не числа, а g глобал-ть, т.е. мы заменим все не числа на пустую строку'', т.е. удалим их
    function doNumberFromString(str) {
        return +str.replace(/\D/g, '');
    }

    // Назначим обраб-к события для передвижения нашего слайдера, на кнопку Next
    arrowNext.addEventListener('click', () => {
        // И когда слайдер долистает до конца, мы должны вернуть его в начал-е положение
        // Если отступ(offset) будет равен ширине 1 слайда * на кол-во слайдов -1, то мы устан-м offset в 0
        // В width у нас будет наход-ся нечто '500px' и нам нужно будет прев-ть его в число и вырезать px
        if (offset == doNumberFromString(width) * (slides.length -1)) {
            offset = 0;
            // Если это будет не последний слайд, нам нужно будет добавить смещение
        } else {
            // offset +=  +width.slice(0, width.length - 2);
            offset +=  doNumberFromString(width);
            // Т.е. когда мы кликаем на стрелку Next к offset добав-я ширина еще одного слайда и слайд смест-ся на опредю велич-у
        }
        transformSlidesLeft();
        // При перем-и слайдов мы также должны контр-ть slideIndex в Счетчике. Если мы дошли до конца слайда(slides.length)
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        showZeroInCounterSlider();
        setStyleDots();

    });

    // Далее сделаем немного схожие действия для кнопки arrowPrev
    arrowPrev.addEventListener('click', () => {
        // изменим условие, когда у нас будет ровно 1-й слайд (offset == 0), мы перем-я в самый конец
        if (offset == 0) {
            // т.е. в пере-ю offset мы запишем наш посл-й слайд вычисл-й по след-й формуле
            offset = doNumberFromString(width) * (slides.length -1);
            // И если это был не 1-й слайд то знач-е нужно отнимать
        } else {
            offset -=  doNumberFromString(width);
        }
        transformSlidesLeft();
        // При перем-и слайдов мы также должны контр-ть slideIndex в Счетчике.
        // Если мы на 1-м слайде, то при клике на кнопку пред-го слайда мы будем смещ-ся в самый конец
        if (slideIndex == 1) {
            slideIndex = slides.length;
            // кол-во слайдов соот. умен-ся при нажатии
        } else {
            slideIndex--;
        }
        showZeroInCounterSlider();
        setStyleDots();
    });

    // Далее нам нужно на наши буллеты добавить перек-е слайдов при клике
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            // при клике на соот. буллет у нас в slideIndex пойдет соот номер буллета(1 или 5 и тд)
            slideIndex = slideTo;
            // в пере-ю offset мы запишем наш посл-й слайд вычисл-й по след-й формуле
            // где doNumberFromString(width) - общая ширина при расчете
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