$(function(){

    timer({
        timeEnd: '2018-09-03T18:26:00.000',
        interval: 1000
    }, {
        days: '.video__timer-num_days',
        days_text: '.video__timer-num_days-text',
        hours: '.video__timer-num_hours',
        hours_text: '.video__timer-num_hours-text',
        minutes: '.video__timer-num_minutes',
        minutes_text: '.video__timer-num_minutes-text'
    });

    // возвращает склоненное по числу слово. Принимает число и массив ['день','дня','дней']
    function declOfNum(num, titles){

        var cases = [2, 0, 1, 1, 1, 2];
        return titles[ (num%100>4 && num%100<20)? 2 : cases[(num%10<5)?num%10:5] ];

    }

    /*
    сопоставляет 2 объекта и записывает туда значения:
    elements: { money: '.money' }
    values: { money: 100 }

    => $('.money').html(100)
    */
    function multiplyHtml(elements, values){

        for(var el in elements){

            if(!elements.hasOwnProperty(el)) continue;

            if( typeof values[el] !== undefined && $( elements[el] ) ){

                $( elements[el] ).html( values[el] );

            }

        }

    }

    // таймер обратного отсчета
    function timer(op, elements){

        /*

        timeEnd format: YYYY-MM-DDTHH:mm:ss.sss (2017-05-18T10:00:00.000)
        http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15

        */

        var defaults = {

            timeEnd: 0,
            interval: 1000,
            elements: {

                days: 			'.syn-utils-timer__days',
                days_text: 		'.syn-utils-timer__days-text',
                hours: 			'.syn-utils-timer__hours',
                hours_text: 	'.syn-utils-timer__hours-text',
                minutes: 		'.syn-utils-timer__minutes',
                minutes_text: 	'.syn-utils-timer__minutes-text',
                seconds: 		'.syn-utils-timer__seconds',
                seconds_text: 	'.syn-utils-timer__seconds-text'

            }

        };

        $.extend(defaults.elements, elements);
        $.extend(defaults, op);

        defaults.timeEnd = timerGetTimeOffset(defaults.timeEnd);

        var times = timerIterator(defaults.timeEnd);
        multiplyHtml(defaults.elements, times);

        var interval = setInterval(function(){

            var times = timerIterator(defaults.timeEnd);

            if(times.ms <= 0){

                clearInterval(interval);
                $('.video__timer').css('display', 'block');
                $('.video__timer-title').html('Трансляция форума уже началась!');
                $('.video__timer-nums').remove();

                if(/2d3bb47f9495e9cbd987f4c213f163e6/gi.test(window.location.href)){

                    $('.videoplayer').css('display', 'block');
                    $('.video__bg').css('display', 'none');

                }

            } else {

                $('.video__timer').css('display', 'block');

                multiplyHtml(defaults.elements, times);

            }

        }, 1000);

        return {interval: interval, defaults: defaults};

    }

    // преобразует местное время в UTC
    function timerGetTimeOffset(timeEnd){

        //return new Date(timeEnd).getTime() - (new Date().getTimezoneOffset() * 60 * 1000);
        return new Date(timeEnd).getTime();

    }

    // итератор таймера. Используется в setInterval, возвращает остаток времени до timeEnd
    function timerIterator(timeEnd){

        var days = 		['день','дня','дней'];
        var hours = 	['час','часа','часов'];
        var minutes = 	['минута','минуты','минут'];
        var seconds = 	['секунда','секунды','секунд'];

        var diff_ms = timeEnd - Date.now();

        var diff = new Date(diff_ms);

        var d = Math.floor(diff/1000/60/60/24);
        var h = Math.floor(diff/1000/60/60) - d*24;
        var m = diff.getMinutes();
        var s = diff.getSeconds();

        var values = {

            days: 			d,
            days_text: 		declOfNum(d, days),
            hours: 			h,
            hours_text: 	declOfNum(h, hours),
            minutes: 		m,
            minutes_text: 	declOfNum(m, minutes),
            seconds: 		s,
            seconds_text: 	declOfNum(s, seconds),
            ms: 			diff_ms

        }

        return values;

    }

    window.__TIMER = timer;

});

function auth(token){

    $.getJSON("//ulogin.ru/token.php?host=" +
        encodeURIComponent(location.toString()) + "&token=" + token + "&callback=?&fields=first_name,last_name,email",
        function(data){
            data=$.parseJSON(data.toString());
            if(!data.error){

                console.log(data);

                $('.translation-form__input[name="name"]').val(data.first_name + ' ' + data.last_name);
                $('.translation-form__input[name="email"]').val(data.email);

                $('.translation-form__submit').click();

            }
        });

}

function turnPlayerOn() {
    $('.videoplayer').show();
    $('.video__bg').hide();
}