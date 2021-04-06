// const { on } = require("gulp");

$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/prev.svg"</button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/next.svg"</button>',
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                arrows: false,
                dots: true,
                adaptiveHeight: true,
              }
            },
        ]
    });
});

$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');   
        });
    });
}
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    $('[data-modal="consultation"]').on('click', function () {
            $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut();
    });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    function validateForm (form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Введите свое имя",
                    minlength: jQuery.validator.format('Введите больше {0} символов')
                },
                phone:  "Введите свой телефон",
                email:{
                    required: "Введите свой почтовый адресс",
                    email: "Введите верный адресс"
                } 
            }
        });
    }

    validateForm('#consultation form');
    validateForm('#consultation-form');
    validateForm('#order form');


    
    $('input[name=phone]').mask("+38(099) 999-9999");

    $('form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            setTimeout(function () {
                $('.overlay, #thanks').fadeOut();
            }, 3500);

            $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function () {
        if($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });


    new WOW().init();

    // const consultationTrigger = document.querySelectorAll('[data-modal="consultation"]'),
    //       consultationModal = document.querySelector('#consultation'),
    //       overlay = document.querySelector('.overlay'),
    //       buyButton = document.querySelectorAll('.button_mini'),
    //       buyModal = document.querySelector('#order'),
    //       buyProduct = document.querySelector('#order .modal__descr'),
    //       productName = document.querySelectorAll('.catalog-item__subtitle');

    //       consultationTrigger.forEach(item => {
    //           item.addEventListener('click', openModal);
    //       });

    //       function openModal () {
    //           consultationModal.style.display = 'block';
    //           overlay.style.display = 'block';
    //       }

    //       buyButton.forEach((item, i) => {
    //         item.addEventListener('click', () => {
    //           buyModal.style.display = 'block';
    //           overlay.style.display = 'block';
    //           buyProduct.textContent = productName[i].textContent;
    //         });
    //     });

    //     function closeModal (item) {
    //         item.addEventListener('click', (e) => {
    //             if( e.target.getAttribute('data-close') == '') {
    //                 item.style.display = 'none';
    //                 overlay.style.display = 'none';
    //                 console.log(e.target);
    //             }
    //         });
    //         document.addEventListener('keydown', (event) => {
    //             if(event.key == 'Escape'){
    //                 item.style.display = 'none';
    //                 overlay.style.display = 'none';
    //             }
    //         });
    //     }

    //     closeModal(consultationModal);
    //     closeModal(buyModal);

        // Notes ---
        //     function closeModal (modal) {
        //     modal.style.display = 'none';
        //     overlay.style.display = 'none';
        // }

        // consultationModal.addEventListener('click', (e) => {
        //     if( e.target == overlay ||  e.target.getAttribute('data-close') == '') {
        //         closeModal();
        //     }
        // });

        // document.addEventListener('keydown', (event) => {
        //     if(event.key == 'Escape'){
        //         closeModal();
        //     }
        // });
 
        // ---
        
          
// const tabs = document.querySelectorAll('.catalog__tab'),
//       tabContent = document.querySelectorAll('.catalog__content'),
//       tabWrapper = document.querySelector('.catalog__tabs');

//       function hideTabContent(){
//           tabContent.forEach(tab => {
//               tab.style.display = 'none';
//           });
           
//           tabs.forEach(tab => {
//               tab.classList.remove('catalog__tab_active');
//           });
//       }
 

//       function showTabContent( i = 0){
//           tabContent[i].style.display = 'flex';
//           tabs[i].classList.add('catalog__tab_active');
//       }
//       hideTabContent();
//       showTabContent(1);


//       tabWrapper.addEventListener('click', (event) => {
//           const target = event.target;

//           if(target && target.closest('.catalog__tabs')) {
//               tabs.forEach((item, i) => {
//                   if(target == item || target.parentElement == item) {
//                     hideTabContent();
//                     showTabContent(i);
//                   }
//               });
//           }
//       });


// const card = document.querySelectorAll('.catalog-item__content'),
//       cardButton = document.querySelectorAll('.catalog-item__link'),
//       cardDescr = document.querySelectorAll('.catalog-item__list'),
//       cardBack = document.querySelectorAll('.catalog-item__back');


// function changeClass(btn) {
//     btn.forEach((item, i) => {
//         item.addEventListener('click', (e) => {
//             e.preventDefault();
//             card[i].classList.toggle('catalog-item__content_active');
//             cardDescr[i].classList.toggle('catalog-item__list_active');
//         });
//     });
// }

// changeClass(cardBack);
// changeClass(cardButton);




// const slides = document.querySelectorAll('.carousel__slide'),
//       prev = document.querySelector('.carousel__prev'),
//       next = document.querySelector('.carousel__next'),
//       slidesWrapper = document.querySelector('.carousel__wrapper'),
//       slidesField = document.querySelector('.carousel__inner'),
//       width = window.getComputedStyle(slidesWrapper).width;

//       let offset = 0;

//       slidesField.style.width = 100 * slides.length + '%';
//       slidesField.style.display = 'flex';
//       slidesField.style.transition = '0.5s all';

//       slidesWrapper.style.overflow = 'hidden';

//       slides.forEach(item => {
//           item.style.width = width;
//       });
      

//       function deleteNotDigits(str) {
//           return +str.replace(/\D/g, '');
//       }

//       next.addEventListener('click', () => {
//           if(offset == deleteNotDigits(width) * (slides.length -1)) {
//               offset = 0;
//           } else {
//               offset += deleteNotDigits(width);
//           }

//           slidesField.style.transform = `translateX(-${offset}px)`;
//       });

//       prev.addEventListener('click', () => {
//         if(offset == 0) {
//             offset = deleteNotDigits(width) * (slides.length -1);
//         } else {
//             offset -= deleteNotDigits(width);
//         }

//         slidesField.style.transform = `translateX(-${offset}px)`;
//     });