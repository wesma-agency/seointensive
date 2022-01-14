$(document).ready(function () {
  //=====================HRADER SCROLL================================
  $(window).on("scroll", function () {
    let scrolled = $(this).scrollTop();
    if (scrolled > 141) {
      $(".header").addClass("scrolled");
      $(".header").next().addClass("scrolled");
    }
    if (scrolled <= 141) {
      $(".header").removeClass("scrolled");
      $(".header").next().removeClass("scrolled");
    }
  });

  $(window).on("load", function () {
    if ($(this).scrollTop() > 141) {
      $(".header").addClass("scrolled");
    }
  });

  //====== BURGER
  $(".header__burger").on("click", function () {
    $(this).toggleClass("active");
    $("body").toggleClass("lock");
  });

  //====== SELECT
  $(".select__input").on("click", function () {
    $(this).parent().find($(".select__menu")).toggleClass("active");
    $(this).parent().find($(".select__text")).toggleClass("active");
  });

  $(".select__option").on("click", function () {
    if ($(this).parents(".header__select")[0] == $(".header__select")[0]) {
      // ЕСЛИ ВСТАВЛЯТЬ В СПАН
      $(this).parents(".select").find($(".select__text > span")).text($(this).text());
    } else {
      $(this).parents(".select").find($(".select__text")).text($(this).text());
    }
    $(this).parents(".select").find(".select__option").removeClass("select__option_selected");
    $(this).addClass("select__option_selected");
    $(this).parents(".select").find($(".select__menu")).removeClass("active");
    $(this).parents(".select").find($(".select__text")).removeClass("active");
  });

  //====SLIDER
  $("класс слайдера").slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  //====== МЕДИА ЗАПРОС js
  let match = [window.matchMedia("(min-width: 993px)"), window.matchMedia("(min-width: 769px)")];
  function movingEl() {
    if (!match[0].matches) {
      // ПЕРЕНОС ЭЛЕМЕНТА В НОВЫЙ БЛОК
    } else {
      // ПРЕНОС ЭЛЕМНЕТА ОБРАТНО
    }
  }
  match[0].addListener(movingEl);
  movingEl();

  //====== АНИМАЦИЯ ДВИЖЕНИЯ ОБЪЕКТА ЗА МЫШЬЮ
  let bg = $("КЛАСС С ИЗОБРАЖЕНИЕМ ДЛЯ АНИМАЦИИ");
  $(document).on("mousemove", function (e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    bg.css({ transform: `translate(${-x - 50}%, ${-y * 30}px)` });
  });

  //======= АНИМАЦИЯ СЧЕТА ЧИСЕЛ
  let countbox = "КОНТЕЙНЕР С ЧИСЛАМИ";
  let show = true;
  $(window).on("scroll load resize", function () {
    if (!show) return false;
    let w_top = $(window).scrollTop();
    let e_top = $(countbox).offset().top;
    let w_height = $(window).height();
    let d_height = $(document).height();
    let e_height = $(countbox).outerHeight();

    if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
      $("ЭЛЕМЕНТ С ЧИСЛОМ").spincrement({
        thousandSeparator: "",
        duration: 3000,
      });

      show = false;
    }
  });

  //=====================IMG TO BACKGROUND CSS================================
  $.each($(".ibg"), function (index, val) {
    if ($(this).find("img").length > 0) {
      $(this).css("background", 'url("' + $(this).find("img").attr("src") + '") no-repeat center / cover');
    }
  });

  //===============ANIMATION SCROLL======================
  const animItems = $(".anim-items");

  if (animItems.length > 0) {
    $(window).on("scroll", animOnScroll);
    function animOnScroll() {
      $.each(animItems, function (index, val) {
        const animItem = animItems.eq(index);
        const animItemHeight = animItem.innerHeight();
        const animItemOffset = animItem.offset().top;
        const animStart = 10;

        let animItemPoint = $(window).height() - animItemHeight / animStart;

        if (animItemHeight > $(window).height()) {
          animItemPoint = $(window).height() - $(window).height() / animStart;
        }

        if ($(window).scrollTop() > animItemOffset - animItemPoint && $(window).scrollTop() < animItemOffset + animItemHeight) {
          animItem.addClass("animate");
        } else {
          if (!animItem.hasClass("anim-no-scrollTop")) {
            animItem.removeClass("animate");
          }
        }
      });
    }
    setTimeout(animOnScroll, 0);
  }
});
