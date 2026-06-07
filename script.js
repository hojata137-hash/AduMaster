        // Hamburger Menu Logic
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navClose = document.getElementById('nav-close');

        navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
        navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));

        // Theme Toggle Logic
        const themeBtn = document.getElementById('theme-toggle');
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', targetTheme);
        });

        // FAQ Accordion Logic
        document.querySelectorAll('.accordion__header').forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                item.classList.toggle('active');
            });
        });

// اجرای کدها پس از بارگذاری کامل ساختار صفحه
document.addEventListener('DOMContentLoaded', function() {
    var slider = document.getElementById('testimonialSlider');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');

    // مقدار جابه‌جایی اسلایدر (عرض کارت ۳۶۰ پیکسل + فاصله ۳۰ پیکسل)
    var offsetStep = 390;

    if (slider && prevBtn && nextBtn) {
        // کلیک روی دکمه بعدی
        nextBtn.addEventListener('click', function() {
            slider.scrollBy({
                left: -offsetStep, // در جهت راست‌چین عدد منفی به جلو می‌رود
                behavior: 'smooth'
            });
        });

        // کلیک روی دکمه قبلی
        prevBtn.addEventListener('click', function() {
            slider.scrollBy({
                left: offsetStep, // عدد مثبت به عقب بازمی‌گردد
                behavior: 'smooth'
            });
        });
    }
});

// فعال‌سازی دکمه بازگشت به بالای صفحه
var scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // حرکت اسکرول به صورت کاملاً نرم
        });
    });
}
