function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Lesson 64. Tabs
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
    // родитель кот-й будет содер-ть все наши табы(тема делегирование событий)
          tabsParent = document.querySelector(tabsParentSelector);

    // делаем фун-ю(она может быть универсальной) где скрываем все ненуж-е нам табы!
    function hideTabContent() {
        // т.к. это псевдомассив нам его нужно перебрать, где item - это каждый отдел-й контент
        tabsContent.forEach(item => {
                // т.е. добав-м к item css стиль - display = 'none', кот-й скрывает контент
                // item.style.display = 'none';
            // чтобы добавить анимацию при перек-и табов нам нужны будут css классы при перек-и, а не inline стили испол-е выше
            // класс 'hide' прячет контент (display = 'none')
            // класс 'show' показ-т контент (display = 'block')
            // класс 'fade' у нас отвеч-т за анимацию
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        // убер-м класс активности у всех табов которые нам не нужны будут
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    // теперь делаем фун-ю которая будет показывать нам таб-контент(она может быть универсальной)!
    // где i - это элемент(номер) к кот-му мы обращ-ся и кот-й нужно будет показать.
    // в ES6 есть такой функционал где мы можем устан-ть значение по умолчанию уже в нашей фун-и! 
    // Т.е. если мы выз-м фун-ю без аргум-та, то у нас вместо i будет подст-ся 0. Т.е. i мы сразу присв-м 0 !
    function showtabContent(i = 0) {
            // испол-м inline стили при перекл-и, но также в перек-и часто испол-т и классы(далее рассмотрим)
            // tabsContent[i].style.display = 'block';
        // для того что бы у нас работали классы и соот. анимация заменим пример выше на:
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    // чтобы фун-и выше заработали не забываем их вызывать после!
    hideTabContent();
    // арг-м в() устан-м в фун-и по умолчанию, т.е. 0, в ES6 функ-и мы можем сразу присв-ть 0, (i = 0)
    showtabContent();

    // испол-я делегирование, созд-м событие на клик
    tabsParent.addEventListener('click', (event) => {
        // если мы часто будем испол-ть событие event.target мы можем опред-ть его в перем-ю
        const target = event.target;
        // tabsSelector.slice(1) - удалим точку у нашей строки(метод сформ-т новую строку без 1-го символа)
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            // методом перебора делаем расп-е куда кликнул польз-ль и подст-м соот. по номеру элемент для показа
            // где item - это каждый таб что бы будем передавать, а i - это номер элемента по порядку(согласно синтаксису метода)
            tabs.forEach((item, i) => {
                // если target(тот элемент в кот-й мы кликнули) будет совпадать с элементом что мы перебираем
                if(target == item) {
                    // вызыв-м 2 фун-и т.к. при перекл-и мы должны скрыть остальные и ост-ть только нужную
                    hideTabContent();
                    // где в i хранит-ся нужный нам номер по порядку
                    showtabContent(i);
                }
            });
        }
    });
}
// Далее просто экспортируем эту функ-ю в модули
export default tabs;