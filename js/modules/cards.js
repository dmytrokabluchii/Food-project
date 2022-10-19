import {getResource} from '../services/services';

function cards() {
    // Lesson 79. Используем классы в реальной работе
    // Задача: шаблонизировать карточки с меню и созд-ть их перед-я только нужные аргум-ты
    // Для этой задачи будем испол-ть классы и создан-е динамич-х элементов на стр-це с перед-й аргум-в
    // В ...classes испол-м оператор rest из Lesson 80. Т.к. мы не знаем сколько еще может добав-ся аргум-в
    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            // в this.parent помещаем DOM элемент(нащего родителя в верстке) кот-й в дальн-м мы сможем испол-ть
            this.parent = document.querySelector(parentSelector);
            // сюда запишем статич-й курс валют(в будущем можно поменять если курс будет прих-ть от сервера)
            this.transfer = 27;
            // вызовем метод ниже changeToUAN() что-бы он уже верн-л нам прав-е значение
            this.changeToUAN();
        }
        // добавим метод кот-й будет заниматься конвер-й валюты
        changeToUAN() {
            this.price *= this.transfer;
        }
        // здесь мы сфор-м нашу верстку(елементы куда помещ-ся отпер-я верстка), потом допол-ть
        // верстку данными кот-е прих-т от аргум-в и поместить элемент на стр-цу
        render() {
        // сформир-м сам div элемент куда мы поместим нашу верстку
        const element = document.createElement('div');
        // если мы ничего не перед-м в ...classes
            if (this.classes.length === 0) {
                // тогда мы будем ставить дефолт-й класс
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                // т.е. если не было передано ни одного класса сформ-м их самост-но
                // т.к. в classes у нас будет наход-ся массив елементов(его вернет оператор ...rest), переб-м его
                this.classes.forEach(className => element.classList.add(className));
            }     
            // innerHTML позво-т нам динам-ки сформир-ть HTML стр-ру наших карточек
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">
                ${this.description}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            // помещ=м наш элемент во внутрь родителя
            this.parent.append(element);
        }
    }

    // Пересоберем наши карточки new MenuCard()  Lesson 90
    getResource('http://localhost:3000/menu')
    // далее обрабат-м наш ответ с сервера, он(data) к нам приходит уже в транфор-м виде объекта(т.е. массива)
    .then(data => {
        // переб-м все элементы получ-го массива(а он в свою очередь сост. их объектов)
        // Ниже испол-м синтаксис деструктур-и объекта - это когда мы из объекта(db.json) вытаск-м отдел-е св-ва в качестве 
        // отдел-й перем-й {img}. И теперь нам не нужно пост-но обращ-ся к obj
        data.forEach(({img, altimg, title, descr, price}) => {
            // т.е. это конст-р будет созд-ся столько раз сколько у нас будет объектов внутри массива, кот-й приходит от сервера
            // В '' помещаем родителя, т.е. куда мы будем все это пушить
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    // Lesson 91. Библиотека axios. Отправим запрос этим методом, в () помещаем наш URL-адресс
    /* axios.get('http://localhost:3000/menu')
        // .then(data => console.log(data));  // {data: Array(3), status: 200, statusText: 'OK', headers: {…}, config: {…}, …}
        // Т.е. выше она вернет нам все данные о нашем запросе в виде уже готового обычного объекта
        // переб-м все элементы получ-го массива(а он в свою очередь сост. их объектов)
        // Ниже испол-м синтаксис деструктур-и объекта - это когда мы из объекта(db.json) вытаск-м отдел-е св-ва в качестве 
        // отдел-й перем-й {img}. И теперь нам не нужно пост-но обращ-ся к obj
        .then(data => { 
            // небол-е измен-е, нам нужно обрат-ся к данным кот-е мы получили от axios (data.data), а не к объекту с общей инфо
            // это поведение описано в докумен-и к axios
            data.data.forEach(({img, altimg, title, descr, price}) => {
            // т.е. это конст-р будет созд-ся столько раз сколько у нас будет объектов внутри массива, кот-й приходит от сервера
            // В '' помещаем родителя, т.е. куда мы будем все это пушить
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    }); */
        

    // Есть еще 2-й альтернативный вариант создания динамических элементов на стр-це(getResource перем-сь в services.js)
    // Он часто испол-ся, но не формир-т классы, а испол-т верстку на лету:
    /* getResource('http://localhost:3000/menu')
    // далее вызовем сформир-ю ниже фун-ю и в () добавим данные кот-е она будет отраб-ть(data, т.е. то что прих-т с сервера)
    .then(data => createCard(data));
    // далее когда мы получ-м данные нам нужно запустить фун-ю, кот-я будет созд-ть карт-ки на стр-це
    // При этом допустим что у нас нет никакго шаблона(шаблонизации) и карточки нам нужно сфор-ть только один раз
    // При этом мы созд-м фун-ю, но это будет фун-я уже, а не класс
    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            // т.к. у нас нет никакой шаблонизации все элементы созд-м тут внутри
            const element = document.createElement('div');
            // назнач-м класс елементу выше
            element.classList.add('menu__item');
            // далее во внутрь элемента просто помещаем верстку
            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;
            // Далее нам нужно поместить куда-то тот элемент что только-что создали
            document.querySelector('.menu .container').append(element);
        });
    } */

}
export default cards;