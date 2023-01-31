function timer(id, deadline) {
    // Разница между датами
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0; 
            seconds = 0;
        } else {
        days = Math.floor( (t/(1000*60*60*24)) );
        hours = Math.floor( (t/(1000*60*60) % 24) );
        minutes = Math.floor( (t/1000/60) % 60 );
        seconds = Math.floor( (t/1000) % 60 );
        }
        return {
            // св-во total будет у нас - общее кол-во мс, куда соот. мы поместим значение t
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    // подставить 0 в ячейки с днями и часами, чтобы было 09 дней и тд
    function getZero(num){
        // если пришед-е число от 0-10 тогда подст-м 0
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    // Фун-я устанав-ю таймер на стр-цу
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadline);
}
export default timer;