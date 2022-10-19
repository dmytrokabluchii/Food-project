function calc() {
    // Lesson 97-98. Создаем калькулятор на сайте
    const calcResult = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;
    // Установим в localStorage введенные польз-м значения и значения по дефолту
    if (localStorage.getItem('sex')) {
        // то заносим эти знач0я в перем-ю sex
        sex = localStorage.getItem('sex');
    } else {
        // если такого значения нет, мы вручную задаем то знач-е кот-е нас интересует
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if (localStorage.getItem('ratio')) {
        // то заносим эти знач-я в перем-ю sex
        ratio = localStorage.getItem('ratio');
    } else {
        // если такого значения нет, мы вручную задаем то знач-е кот-е нас интересует
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    // Фун-я при заходе на стр-цу будет очищать класс активности у кнопок и во время перебора элементов
    // будет проверять когда кнопка совпадет по значению, с ratio например, запис-му с localStorage
    // то на эту кнопку будем навешивать класс активности
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            // Сначала удалим у элементов класс активности
            elem.classList.remove(activeClass);
            // Переберем элементы с id и если id будет = значению что наход. в localStorage 'sex'
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                // и если условие выше хоть раз выпол-ся то данному элементу мы назначим класс-активности
                elem.classList.add(activeClass);
            }
            // Далее проверим элементы с атрибутами
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                // И если знач-я выше совпадают то элементу(блоку) мы назн-м класс активности
                elem.classList.add(activeClass);
            }
        });
    }
    // Запускаем фун-и с 2 арг-ми, тоже самое делали с фун-й getStaticInformation
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
 
    // Фун-я общего вычисления калорий, должна вызыв-я каждый раз когда на стр-це проис-т измен-е
    function calcTotal() {
        // если у нас нет(не введено), т.е. если хот-бы одно их этих условий выпол-ся(будет false)
        if (!sex || !height || !weight || !age || !ratio) {
            // то тогда мы не будем рассчит-ть
            calcResult.textContent = '____';
            // далее досрочно прервем фун-ю
            return; 
        }
        // если же все данные будут заполнены, то
        if (sex === 'female') {
            // Формула расчета базовой нормы калорий:
            // для женщин: BMR = 447.6 + (9.2 x вес, кг) + (3.1 х рост, cм) – (4.3 х возраст, лет)
            // Метод Math.round() возвращает число, округлённое к ближайшему целому.
            calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            // для мужчин: BMR = 88.36 + (13.4 x вес, кг) + (4.8 х рост, см) – (5.7 х возраст, лет)
            calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    // Фун-я получ-я статических данных по калориям и перекл-ю активности, в уроке 98 немного доработали ее
    function getStaticInformation(selector, activeClass) {
        // получаем все div элементы внутри родителя
        const elements = document.querySelectorAll(selector);
        // Исправ-м баги при клике на поля вне кнопок
        elements.forEach(elem => {
            // далее отслеж-м клики по родит-му элементу(parentSelector) кот-й содер-т все div и
            // испол-ть при этом будем делегир-е событий
            elem.addEventListener('click', (e) => {
                // если при клике на элемент он содержит атрибут ...
                if(e.target.getAttribute('data-ratio')) {
                    // то мы получ-м значение этого атрибута как число
                    ratio = +e.target.getAttribute('data-ratio');
                    // занесем в localStorage записанные полз-м данные
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    // если у элемента не будет атрибута, то получ-м знач-е id элемента
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                // Т.к. выше мы уже получили все знач-я элементов, нам нужно поработать с классами активности
                // сначала удалим все классы активности у элем-в, а потом назначим только тому кот-й нужен
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                // и тому элементу на кот-й кликнули назнач-м класс активности
                e.target.classList.add(activeClass);
                // В конце каждой из фун-й вызываем calcTotal(), что-бы примен-сь измен-я на стр-це
                calcTotal();
            });
        });
    }
    // теперь нам нужно запустить фун-ю выше с 2 статич. элементами, где 1-м арг-м идет блок с id="gender"
    // а 2-м наш класс активности
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    // При 2-м вызове укажем нашего родителя, класс активности при этом не меняется
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    // Далее созд-м фун-ю кот-я будет обраб-ть каждый отдел-й input
    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);
        // Событие input срабатывает каждый раз при изменении значения.
        input.addEventListener('input', () => {
            // Если мы видим в input что-то кроме чисел, исправить это можем испол-я РВ
            if (input.value.match(/\D/g)) {
                // то бордер делаем красным, иниче убераем его
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            // когда польз-ль что-то вводит. Конструкция switch заменяет собой сразу несколько if.
            switch(input.getAttribute('id')) {
                // если наш input с id = height
                case 'height':
                    // то запис-м в нее знач-е кот-е ввел польз-ль и прерыв-м операцию(break)
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
        // В конце каждой из фун-й вызываем calcTotal(), что-бы примен-сь измен-я на стр-це
        calcTotal();
        });
    }
    // Далее нам нужно выз-ть фун-ю выше с 3-мя разными селекторами
    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');

}
export default calc;