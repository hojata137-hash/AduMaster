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




// ==========================================
// کدهای اختصاصی مربوط به صفحه ثبت‌نام (Register)
// ==========================================
var registerForm = document.getElementById('registerForm');
var usernameInput = document.getElementById('username');
var regEmailInput = document.getElementById('email');
var regPasswordInput = document.getElementById('password');
var confirmPasswordInput = document.getElementById('confirmPassword');
var toggleConfirmBtn = document.getElementById('toggleConfirmPassword');
var termsCheck = document.getElementById('termsCheck');
var regAuthCard = document.getElementById('authCard');
var regGlobalError = document.getElementById('globalErrorBox');

// ========================================================
// کد اصلاح‌شده و بدون تداخل دکمه‌های چشم (مخصوص فایل script.js)
// ========================================================
document.addEventListener('DOMContentLoaded', function() {
    
    // فیلد اول رمز عبور (هم در صفحه ورود هست هم ثبت‌نام)
    var togglePassword = document.getElementById('togglePassword');
    var passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function(e) {
            e.preventDefault();
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePassword.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                togglePassword.textContent = '👁️';
            }
        });
    }

    // فیلد دوم تکرار رمز عبور (فقط و فقط در صفحه ثبت‌نام هست)
    var toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    var confirmPasswordInput = document.getElementById('confirmPassword');

    if (toggleConfirmPassword && confirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirmPasswordInput.type === 'password') {
                confirmPasswordInput.type = 'text';
                toggleConfirmPassword.textContent = '🙈';
            } else {
                confirmPasswordInput.type = 'password';
                toggleConfirmPassword.textContent = '👁️';
            }
        });
    }
});

// تابع بررسی معتبر بودن فرمت ایمیل
function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// پردازش ثبت‌نام هنگام ارسال فرم
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var isValid = true;
        regGlobalError.style.display = 'none';

        // بررسی نام کاربری
        if (usernameInput.value.trim().length < 3) {
            document.getElementById('usernameGroup').classList.add('has-error');
            isValid = false;
        } else {
            document.getElementById('usernameGroup').classList.remove('has-error');
        }

        // بررسی ایمیل
        if (!isEmailValid(regEmailInput.value.trim())) {
            document.getElementById('emailGroup').classList.add('has-error');
            isValid = false;
        } else {
            document.getElementById('emailGroup').classList.remove('has-error');
        }

        // بررسی پسورد اول
        if (regPasswordInput.value.length < 6) {
            document.getElementById('passwordGroup').classList.add('has-error');
            isValid = false;
        } else {
            document.getElementById('passwordGroup').classList.remove('has-error');
        }

        // بررسی تطابق پسوردها
        if (confirmPasswordInput.value !== regPasswordInput.value || confirmPasswordInput.value.length === 0) {
            document.getElementById('confirmPasswordGroup').classList.add('has-error');
            isValid = false;
        } else {
            document.getElementById('confirmPasswordGroup').classList.remove('has-error');
        }

        // بررسی تیک قوانین سایت
        if (!termsCheck.checked) {
            regGlobalError.textContent = "لطفاً ابتدا قوانین و مقررات سایت را تایید کنید.";
            regGlobalError.style.display = 'block';
            isValid = false;
        }

        // اگر خطایی وجود داشت کارت لرزش پیدا کند
        if (!isValid) {
            regAuthCard.classList.add('shake-animation');
            setTimeout(function() { regAuthCard.classList.remove('shake-animation'); }, 400);
            return;
        }

        // شبیه‌سازی لودینگ موفقیت‌آمیز ثبت‌نام
        var submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-spinner').style.display = 'block';

        setTimeout(function() {
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').style.display = 'block';
            submitBtn.querySelector('.btn-spinner').style.display = 'none';
            // نمایش پیام فرضی شبیه‌سازی سرور
            regGlobalError.textContent = "این ایمیل قبلاً ثبت‌نام شده است!";
            regGlobalError.style.display = 'block';
            regAuthCard.classList.add('shake-animation');
            setTimeout(function() { regAuthCard.classList.remove('shake-animation'); }, 400);
        }, 1500);
    });

    // حذف خطاها در زمان تایپ مجدد
    usernameInput.addEventListener('input', function() { document.getElementById('usernameGroup').classList.remove('has-error'); });
    confirmPasswordInput.addEventListener('input', function() { document.getElementById('confirmPasswordGroup').classList.remove('has-error'); });
}
