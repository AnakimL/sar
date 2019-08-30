//
// function calendar(id, year, month) {
//     var Dlast = new Date(year,month+1,0).getDate(),
//         D = new Date(year,month,Dlast),
//         DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
//         DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
//         calendar = '<tr>',
//         month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
//     if (DNfirst != 0) {
//         for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
//     }else{
//         for(var  i = 0; i < 6; i++) calendar += '<td>';
//     }
//     for(var  i = 1; i <= Dlast; i++) {
//         if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
//             calendar += '<td class="today">' + i;
//         }else if(i >= 7 && i <=15 ){
//             calendar += '<td class="reserve">' + i;
//         }else{
//             calendar += '<td>' + i;
//         }
//         if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
//             calendar += '<tr>';
//         }
//     }
//     for(var  i = DNlast; i < 7; i++) calendar += '<td> ';
//     document.querySelector('#'+id+' tbody').innerHTML = calendar;
//     document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
//     document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
//     document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
//     if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
//         document.querySelector('#'+id+' tbody').innerHTML += '<tr><td> <td> <td> <td> <td> <td> <td> ';
//     }
// }
// calendar("calendar", new Date().getFullYear(), new Date().getMonth());
// // переключатель минус месяц
// document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
//     calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)-1);
// }
// // переключатель плюс месяц
// document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
//         calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)+1);
//     }


$(document).ready(function(){

        var clone = $('.filter-card__link').first();
        $('.filter-card__more').click(function (e) {
            e.preventDefault();
            for (var i = 0; i < 5; i++) {

                clone.clone().appendTo('.filter-cards__wrapper');
                i++;
            };
            $(this).appendTo('.filter-cards__wrapper');

        });


    console.log('HYUU')
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
        slidesToShow: 5
    });

    $('.tour-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true
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
        autoplaySpeed: 2000
    })

    $('[data-fancybox="foodgallery"]').fancybox({
        baseClass: "foood"

    });

    $('.form-data__button').click(function (e) {
        e.preventDefault();
    });

    $('.form-data__button--minus, .form-data__button--plus').click("on", function(e) {
        e.preventDefault();
        var current_value = parseInt($('#adults').val());
        var classname = $(this).attr("class");
        if (classname === "form-data__button--minus") {
            if (current_value == 0)
                return;
            else {
                $('#adults').val(current_value - 1);
                $('#res').html((current_value - 1));
            }

        } else {
            if (current_value == 100)
                return;
            else {
                $('#adults').val(current_value + 1);
                $('#res').html((current_value + 1));
            }

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


    // $('.suite__slider-for').slick({
    //     infinite: true,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: false,
    //     fade: true,
    //     asNavFor: '.suite__slider-nav'
    // });
    // $('.suite__slider-nav').slick({
    //     infinite: true,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     asNavFor: '.suite__slider-for',
    //     dots: true,
    //     centerMode: true,
    //     focusOnSelect: true,
    //     arrows: true
    // });




});
(function () {
    initScroll();
    initFancy();
    initMobileNav();
    initButtonToTop();
    initFancyboxDefaults();

    function initFancyboxDefaults() {
        $.fancybox.defaults.touch = false;
        $.fancybox.defaults.hideScrollbar = false;
    }

    function initButtonToTop() {
        $(window).scroll(function () {
            if ($(this).scrollTop() !== 0) {

                $('#button-to-top').fadeIn();

            } else {
                $('#button-to-top').fadeOut();
            }
        });

        $('#button-to-top').click(function () {

            $('body,html').animate({
                scrollTop: 0
            }, 800);

        });

    }

    function initMobileNav() {
        /*----- nav-burger -----*/
        $(document).ready(function () {
            $('.burger-menu').click(function () {
                $('.mob-nav').toggleClass('activ-nav nonactiv-nav');
            });
        });
    }


    function initFancy() {
        var NOT_CLONED_SELECTOR_STRING = " " + ".slick-slide:not(.slick-cloned) a"
        var fancyGalleriesSelectorsArr = [
      ".history__gallery-list",
      ".feedback__list"
    ];

        for (var i = 0; i < fancyGalleriesSelectorsArr.length; i++) {
            (function () {


                var selector = fancyGalleriesSelectorsArr[i] + NOT_CLONED_SELECTOR_STRING;
                $().fancybox({
                    selector: selector,
                    backFocus: false
                });

                $(document).on('click', fancyGalleriesSelectorsArr[i] + " " + ".slick-cloned", function (e) {
                    $(selector)
                        .eq(($(e.currentTarget).attr("data-slick-index") || 0) % $(selector).length)
                        .trigger("click.fb-start", {
                            $trigger: $(this)
                        });
                    console.log(e.currentTarget);
                    return false;
                });

            })();
        }

        initCarousel();
    }

    function initCarousel() {
        var $carousel = $('div.battle-carousel');
        if (!$carousel.length) return;

        $carousel.on('carousel.init', function (event, slick, currentSlide, nextSlide) {
            var
                $curCarousel = $(this),
                defaults = {
                    arrows: true,
                    dots: true,
                    infinite: true,
                    nextArrow: '<button type="button" class="slick-next webp no-webp" aria-label="Следующий слайд"></button>',
                    prevArrow: '<button type="button" class="slick-prev webp no-webp" aria-label="Предыдущий слайд"></button>',
                    lazyLoad: 'ondemand',
                    responsive: [
                        {
                            breakpoint: 1199,
                            settings: {
                                slidesToScroll: 1,
								slidesToShow: 2,
                                infinite: true,
                                dots: true,
								 centerMode: true
                            }
            },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
            }
          ]
                },
                options = {};

            if ($curCarousel.data('slick-options')) {
                options = eval('[' + $curCarousel.data('slick-options') + ']')[0];
                $.extend(defaults, options);
            }
            $curCarousel.slick(defaults);
        });

        $carousel.trigger('carousel.init');
    }

    function initScroll() {
        var navLink = $('.navigation__link');
        if (!navLink.length) return;

        navLink.click(function (event) {
            event.preventDefault();
            var hrefId = $(this).attr('href');
            var posTop = $(hrefId).offset().top;
            $('html, body').animate({
                scrollTop: posTop
            }, 1000);
        });
    }


})();


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

});



let cal = document.querySelector(".calendar");
let sp =document.querySelector("#cur_month");

let back = document.querySelector('#back');
back.addEventListener('click', monthBack);
let forth = document.querySelector('#forth');
forth.addEventListener('click', monthForth);
let now = new Date();
console.log('now :' + now);
let now_month = now.getMonth(); //текущий месяц
console.log('month :' + now_month);
let now_year = now.getFullYear(); //текущий год
console.log('year :' + now_year);
let now_date = now.getDate();
console.log('nowDate :' + now_date);
const month_name = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

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
    let table = document.createElement("table");
    for(let i=0; i<5; i++){
        var tr = document.createElement("tr");
        for (let j = 0; j<7; j++) {
            var td = document.createElement("td");
            td.innerHTML = new Date(now_year, now_month, begin).getDate();
            tr.appendChild(td);
            begin ++;
        }
        table.appendChild(tr);
    }
    cal.appendChild(table);
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