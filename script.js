// دریافت المان‌های اسلایدر از صفحه
var mainSlider = document.getElementById('coursesSlider');
var buttonPrev = document.getElementById('prevBtn');
var buttonNext = document.getElementById('nextBtn');

var currentSlideIndex = 0;
var autoScrollTimer = null;

// محاسبه تعداد کارت‌های قابل مشاهده بر اساس عرض صفحه
function countVisibleCards() {
    var pageWidth = window.innerWidth;
    if (pageWidth > 1024) {
        return 3;
    }
    if (pageWidth > 640) {
        return 2;
    }
    return 1;
}

// تغییر موقعیت اسلایدر روی صفحه
function moveSlider() {
    var singleCard = mainSlider.querySelector('.course-card');
    if (!singleCard) {
        return;
    }
    
    var cardWidth = singleCard.getBoundingClientRect().width;
    var spaceGap = 24; // فاصله بین کارت‌ها در سی‌اس‌اس
    
    // محاسبه دقیق میزان جابه‌جایی به پیکسل
    var totalMove = currentSlideIndex * (cardWidth + spaceGap);
    mainSlider.style.transform = 'translateX(' + totalMove + 'px)';
}

// رفتن به اسلاید بعدی
function goToNextSlide() {
    var totalCardsCount = mainSlider.children.length;
    var visibleCardsCount = countVisibleCards();
    
    if (currentSlideIndex >= (totalCardsCount - visibleCardsCount)) {
        currentSlideIndex = 0; // اگر به آخر رسید، برگرد اول
    } else {
        currentSlideIndex = currentSlideIndex + 1;
    }
    moveSlider();
}

// رفتن به اسلاید قبلی
function goToPrevSlide() {
    var totalCardsCount = mainSlider.children.length;
    var visibleCardsCount = countVisibleCards();
    
    if (currentSlideIndex <= 0) {
        currentSlideIndex = totalCardsCount - visibleCardsCount; // اگر اول بود، برو آخر
    } else {
        currentSlideIndex = currentSlideIndex - 1;
    }
    moveSlider();
}

// مدیریت کلیک روی دکمه‌های دستی
if (buttonNext && buttonPrev) {
    buttonNext.addEventListener('click', function() {
        clearInterval(autoScrollTimer);
        goToNextSlide();
        runAutoPlay();
    });
    
    buttonPrev.addEventListener('click', function() {
        clearInterval(autoScrollTimer);
        goToPrevSlide();
        runAutoPlay();
    });
}

// شروع تایمر حرکت اتوماتیک (هر ۴ ثانیه یک‌بار)
function runAutoPlay() {
    autoScrollTimer = setInterval(goToNextSlide, 4000);
}

// اجرای اولیه اسلایدر
runAutoPlay();

// بازتنظیم اسلایدر در صورت تغییر سایز مرورگر
window.addEventListener('resize', function() {
    currentSlideIndex = 0;
    moveSlider();
});


// for prealoader

window.addEventListener('load',()=>{

    const preloader =
    document.getElementById('preloader');

    preloader.style.opacity='0';

    setTimeout(()=>{
        preloader.style.display='none';
    },500);

});
