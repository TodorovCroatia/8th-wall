document.addEventListener('DOMContentLoaded', function () {
    var mySwiper = new Swiper('.swiper-container', {
        speed: 30,
        slidesPerView: 5,
        loop: true,
        breakpointsInverse: true,
    });

    document.getElementById('swiper-container').style.display = 'none';
});