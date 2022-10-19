// фун-я открыв-я модал. окно
function openModal(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);

    // показыв-м и скрываем наше мод. окно, т.е. актив-м соот. css классы + есть вариант с toggle
    modalWindow.classList.add('show', 'fade-modal');
    modalWindow.classList.remove('hide');
    // альтерн-й вариант с toggle
    // modalWindow.classList.toggle('show');
    // когда мы откр-м модал. окно у нас добав-ся стиль не позвол-й прокручивать стр-цу
    document.body.style.overflow = 'hidden';
    // если у нас есть modalTimerId то запустим очистку таймера
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

// Фун-я закрывающая мод. окно
function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    // скрываем и показыв-м наше мод. окно
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    // альтерн-й вариант с toggle
    // modalWindow.classList.toggle('show');
    // восстанав-м скролл на стр-це после закрытия, если остав-м '' то браузер сам решит что ставить по дефолту
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal Lesson 72. Создаем модальное окно
    const btnModalOpen = document.querySelectorAll(triggerSelector),
          modalWindow = document.querySelector(modalSelector);
        //   btnModalClose = document.querySelector('[data-close]');

    // переберем наши кнопки btnModalOpen чтобы мы могли с любой кнопки откр-ть модал.окно
    btnModalOpen.forEach(btn => {
        // ! Испол-м спец. синтаксис запуска фун-и openModal, стрел-я фун-я оборач-т вызыв-ю фун-ю и она выпол-ся уже после клика
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });
 
    // только после сраб-я клика у нас выпол-ся фун-я closeModal
    // btnModalClose.addEventListener('click', closeModal);
    // реал.функ-л закрытия модал. окна по клику вне мод. окна
    // вешаем обраб-к клика на модал-е окно, где в () в callback фун-и помещ-м обьект события(e или event)
    modalWindow.addEventListener('click', (e) => {
        // e.target - куда кликнул польз-ль или "крестик"
        // т.е. если этот атрибут 'data-close' будет при клике мы закроем модал. окно
        if(e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });
    // реал-м функ-л закрытия модал. окна по нажатию на кнопку клав-ры ESC
    // Событие keydown срабатывает, когда клавиша была нажата.
    document.addEventListener('keydown', (e) => {
        // у нашего объекта событие (e) есть св-во .code, кот-е может отслеж-ть код нашей клавиши
        // code – физической код клавиши на клавиатуре; для клав-ши ESC это будет 'Escape'
        // есть спец.сайты где можно узнать как имен-ся необ. клавиша по нажатию на нее https://www.toptal.com/developers/keycode
        // и чтобы фун-я пост-я не запус-ст когда мы нажимаем ESC в условие добавим доп. проверку
        // Метод Node.contains() возвращает Boolean значение, указывающее, является ли узел потомком данного узла, 
        // т.е. проверяет, находится ли элемент ('show') в теле страницы.
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
    
    // Lesson 73 продол-е. 
    // чтобы при пролистывании до конца мод. окно постоянно не вылазило созд-м фун-ю 
    function showModalByScroll() {
        // 2.Когда пользов-ль долистал стр-цу до конца появляется модал-е окно
        // Свойство Element.scrollHeight (только чтение) - измерение высоты контента в элементе, 
        // включая содержимое, невидимое из-за прокрутки.
        // pageYOffset - свойство окна Window , доступное только для чтения. Это то же свойство, что и scrollY и, 
        // как таковое, оно тоже возвращает количество пикселей, на которое прокручен документ по вертикали (вниз или вверх).
        // window.pageYOffset - это прокруч-я часть
        // Document.documentElement - свойство только для чтения, которое возвращает элемент Element(тема парам-ры докум-а)
        // document.documentElement.clientHeight - это видимая часть которую мы прямо сейчас видим на сайте(без прокрутки)
        // document.documentElement.scrollHeight - значит что польз-ль долистал до конца стр-цы
        // -1 (px) указыв-м чтобы не было возможных багов в некот-х браузерах
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, modalTimerId);
            // чтобы при пролистывании до конца окно постоянно не вылазило
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    // чтобы удал-ть обраб-к события нужно делать и ссылку на фун-ю кот-я испол-сь и это showModalByScroll
    window.addEventListener('scroll', showModalByScroll);
}
export default modal;
export {closeModal};
export {openModal};
