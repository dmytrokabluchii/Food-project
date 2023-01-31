require('es6-promise').polyfill();

import "core-js/stable";
import 'nodelist-foreach-polyfill';

import burgerMenu from './modules/mobileMenu';
import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import slider from './modules/slider';
import calc from './modules/calc';
import forms from './modules/forms';
import {openModal} from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {  
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 500000); 
    burgerMenu ({
        btn: ".hamburger__menu",
        menu: ".mobile",
        links: ".mobile-menu__link"
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2023-11-08');
    modal('[data-modal]', '.modal', modalTimerId);
    cards();
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc();
    forms('form', modalTimerId);
});



// npm install webpack webpack-cli --save-dev - команда по установке webpack
// webpack.config.js - это наш конфигурац-й файл

// Далее выполним: npx webpack
// Команда запуска JSON-Server(в новом терминале): npx json-server db.json
