/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});
$(document).ready(function(){

    //Добавление карточек с номерами по кнопке Еше
        var clone = $('.filter-card__link').first();
        $('.filter-card__more').click(function (e) {
            e.preventDefault();
            for (var i = 0; i < 5; i++) {

                clone.clone().appendTo('.filter-cards__wrapper');
                i++;
            };
            $(this).appendTo('.filter-cards__wrapper');

        });
// Слайдеры
    $('.slider-room__block').slick({
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows : false,
        centerMode: true,
        focusOnSelect: true,
        responsive:[
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },{
            breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.bar-slider').slick({
        centerMode: true,
        centerPadding: '10px',
        slidesToShow: 5,
        responsive:[
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '30px',
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },{
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.tour-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive:[
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '30px',
                }
            },{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.road__slider-auto, .road__slider-air, .road__slider-train' ).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    });

    $('.insta-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        centerMode: true,
        centerPadding: '10px',
        autoplaySpeed: 2000,
        responsive:[
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '30px',
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '30px',
                }
            },{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    })

    $('[data-fancybox="foodgallery"]').fancybox({
        baseClass: "foood"

    });

    $('.form-data__button').click(function (e) {
        e.preventDefault();
    });

    $('.form-data__button').click("on", function(e) {
        e.preventDefault();
        var current_value = parseInt($('#adults').val());
        var current_value_child = parseInt($('#children').val());
        if ($(this).hasClass("form-data__adult--minus")) {
                console.log('minus')
                if(current_value == 0){
                    return false;
                }
                $('#adults').val(current_value - 1);
                $('#res').html((current_value - 1));
        } else if($(this).hasClass("form-data__adult--plus")) {
            console.log('plus')
                $('#adults').val(current_value + 1);
                $('#res').html((current_value + 1));
        };


        if ($(this).hasClass("form-data__child--minus")) {
            console.log('minus')
            if(current_value_child == 0){
                return false;
            }

            $('#children').val(current_value_child - 1);
            $('#res_child').html((current_value_child - 1));


        } else if($(this).hasClass("form-data__child--plus")) {
            console.log('plus')
            $('#children').val(current_value_child + 1);
            $('#res_child').html((current_value_child + 1));
        }


    });






    $('[data-fancybox="numbers"]').fancybox({
        autoSize: true,
        btnTpl: {
        arrowLeft:
        '<button data-fancybox-prev class="fancybox-button suite-prev fancybox-button--arrow_left" title="{{PREV}}">' +
        '<span><img src="../img/suite/left.png"> предыдущий</span>' +
        "</button>",

        arrowRight:
        '<button data-fancybox-next class="fancybox-button suite-next fancybox-button--arrow_right" title="{{NEXT}}">' +
        '<span>слудующий<img src="../img/suite/right.png"></span>' +
        "</button>"}
        ,
        afterShow: function () {
            var main = '.suite__slider-for';
            var support = '.suite__slider-nav';
            $(main).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.suite__slider-nav',
                autoplay: true,
                autoplaySpeed: 2000
            });
            $(support).slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.suite__slider-for',
                dots: true,
                centerMode: true,
                focusOnSelect: true,
                arrows: true
            });
        }
    });
});

$(function () {

    $(document).on('change init.checkbox', ':checkbox[name="personalDataAgree"]', function () {

        console.log('12')
        var $form = $(this).closest('form');

        console.log(this.checked);

        if (this.checked) {
            $(':submit', $form).removeAttr('disabled');
        } else {
            $(':submit', $form).attr('disabled', 'disabled');
        }
    });

    $(':checkbox[name="personalDataAgree"]').trigger('init.checkbox');



    $(".nav-item").not('.price__tabs .nav-item').not('.road__tabs .nav-item').on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

    $(".header-mobile__submit a").on("click", function (event) {
        event.preventDefault();
        $(this).hide();
        $('.header_form form').show();
        $('.header').css('height', 'auto');
    });

    $('.sold__show').click(function(event){
        event.preventDefault();
        $(this).toggleClass('active');
        $('.sold__text').toggleClass('active');
    });

    $('input[type=tel]').mask('+7(999)999-99-99');




    $('form[id="headerForm"]').validate({
        rules: {
            arrival: 'required',
            departure: 'required',
            adults: 'required'
        },
        messages: {
            arrival: 'Введите дату прибытия',
            departure: 'Введите дату выезда',
            adults: 'Это поле не может быть пустым'
        },
        submitHandler: function(form) {

                $('#freeNums-wrapper').show();

        }
    });
    $('.block-close').click(function () {
        $('#freeNums-wrapper').hide();
    })



});




let cal = document.querySelector(".days__start");
let sp =document.querySelector(".days__month");

let back = document.querySelector('.days__prev');
back.addEventListener('click', monthBack);
let forth = document.querySelector('.days__next');
forth.addEventListener('click', monthForth);
let now = new Date();
console.log('now :' + now);
let now_month = now.getMonth(); //текущий месяц
let prev_month  = now.getMonth()-1;

console.log('month :' + now_month);
let now_year = now.getFullYear(); //текущий год
console.log('year :' + now_year);
let now_date = now.getDate();
console.log('nowDate :' + now_date);
const month_name = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
function getWeekDay(date) {
    let days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    return days[date];
}

let first_date; //первый день текущего месяца
let first_day; //день недели первого дня тек месяца
let begin;
function getStart() {
    // определяем, с какого для начинается календарь, т.е пн той недели, с кот начинается месяц
    first_date = new Date(now_year, now_month, 1);
    console.log('first_date :' + first_date);
    first_day = first_date.getDay();
    console.log('first_day :' + first_day);
    begin = 2 - first_day;
    console.log('begin :' + begin);

}

createCalendar();
function createCalendar() {
    //создаем календарь
    getStart();
    sp.innerHTML = month_name[now_month] + " " + now_year;
    let calendar = document.createElement("div");
    calendar.className = "days__wrapper";
    for(let i=0; i<5; i++){
        var roww = document.createElement("div");
        roww.className = "days__item-row";
        for (let j = 0; j<7; j++) {
            var day = document.createElement("div");
            day.className = "days__item";
            var dayNum = document.createElement("div");
            console.log(new Date(now_year, now_month, begin));

                day.innerHTML = "<div class='days__date'> <div class='days__date--num'>" +  new Date(now_year, now_month, begin).getDate() + "</div><span>" + getWeekDay(j) + "</span> </div>" + "\n" +
                    "<div class='days__room level'>\n" +
                    "    <div class='level__three'>\n" +
                    "        <div class='level__item '><a href='#'>301</a></div>\n" +
                    "        <div class='level__item'>302</div>\n" +
                    "        <div class='level__item level__item--booked'>303</div>\n" +
                    "        <div class='level__item'>304</div>\n" +
                    "    </div>\n" +
                    "    <div class='level__two'>\n" +
                    "        <div class='level__item'>201</div>\n" +
                    "        <div class='level__item level__item--looking'>202</div>\n" +
                    "        <div class='level__item'>203</div>\n" +
                    "        <div class='level__item'>204</div>\n" +
                    "    </div>\n" +
                    "    <div class='level__one'>\n" +
                    "        <div class='level__item'>101</div>\n" +
                    "        <div class='level__item'>102</div>\n" +
                    "        <div class='level__item'>103</div>\n" +
                    "        <div class='level__item'>104</div>\n" +
                    "        <div class='level__item level__item--looking'>105</div>\n" +
                    "        <div class='level__item'>106</div>\n" +
                    "        <div class='level__item'>107</div>\n" +
                    "        <div class='level__item'>108</div>\n" +
                    "    </div>\n" +
                    "</div>\n";
                roww.appendChild(day);
                begin ++;
    }
        calendar.appendChild(roww);
    }
    cal.appendChild(calendar);
}


function monthBack() {
    //листаем месяцы назад
    now_month--;
    if (now_month == -1) {
        now_month = 11;
        now_year --;
    }

    cal.innerHTML = '';
    createCalendar();
}

function monthForth() {
    //листаем месяцы вперед
    now_month++;
    if (now_month == 12) {
        now_month = 0;
        now_year ++;
    }

    cal.innerHTML = '';
    createCalendar();
}

$(document).ready(function() {

    var dis1 = $('.days__wrapper .days__item-row:nth-child(1)');
    for(i=0; i<= 6; i++){
        var itemAdd = dis1.children(".days__item")[i];
        var itemAddNUm = $(itemAdd).find('.days__date--num').html();
        if(itemAddNUm == '26' ||itemAddNUm == '27' ||itemAddNUm == '28' || itemAddNUm == '29' || itemAddNUm == '30' || itemAddNUm == '31'){
            $(itemAdd).addClass('days__item--other');
        }
    };

    var dis2 = $('.days__wrapper .days__item-row:nth-child(5)');
    for(i=0; i<= 6; i++){
        var itemAdd = dis2.children(".days__item")[i];
        var itemAddNUm = $(itemAdd).find('.days__date--num').html();
        if(itemAddNUm == '1' || itemAddNUm == '2' || itemAddNUm == '3' || itemAddNUm == '4'|| itemAddNUm == '5' || itemAddNUm == '6'){
            $(itemAdd).addClass('days__item--other');
        }
    };

});


