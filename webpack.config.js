'use strict';
// path - это технич-я перем-я нужная для правильной работы
let path = require('path');
// Объект с различными настройками
module.exports = {
  mode: 'development',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/js'
  },
  watch: true,
  devtool: "source-map",
  module: {
    // Правила которые будут дейст-ть на опред-е файлы
    rules: [
      {
        // Находим наши js файлы(в виде регул-х выражений)
        test: /\.m?js$/,
        // Какие файлы мы исключаем из этой выборки
        exclude: /(node_modules|bower_components)/,
        // Как и что мы будем испол-ть
        use: {
          // Техн-я loader будет связывать наш webpuck вместе с babel(его нужно доустановить)
          loader: 'babel-loader',
          // Опции, кот-е мы будем испол-ть
          options: {
            // Присет кот-й мы будем испол-ть(preset-env самый востр-й на данный момент)
            presets: [['@babel/preset-env', {
              // Далее внутри мы модем его еще более настроить под себя
              // Включаем св-во debug, кот-е прямо во время компиляции позволяет увидеть 
              // что происходит, возможные проблемы и тд, ставим true когда хочем это видеть
                debug: true,
                // И чтобы подключить все возможные полифилы нам нужна будет еще одна библиотека corejs
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      }
    ]
  }
};