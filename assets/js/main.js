// JavaScript Code
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    document.getElementById("grant_option_form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form from submitting normally;
        location.href='/loads/1';
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const slide = document.querySelector('.slide');
    const slideBox = document.querySelector('.slide-box');
    const slideItems = document.querySelectorAll('.slide-item');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');

    let isDown = false;
    let startX;
    let scrollLeft;

    const slideItemStyle = window.getComputedStyle(slideItems[0]);
    const slideGap = parseInt(slideItemStyle.marginRight) || parseInt(getComputedStyle(slideBox).gap) || 0;
    const slideWidth = slideItems[0].offsetWidth + slideGap;

    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        slide.scrollBy({
            left: -slideWidth,
            behavior: 'smooth'
        });
    });

    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        slide.scrollBy({
            left: slideWidth,
            behavior: 'smooth'
        });
    });
    slide.addEventListener('mousedown', (e) => {
        isDown = true;
        slide.classList.add('active');
        startX = e.pageX - slide.offsetLeft;
        scrollLeft = slide.scrollLeft;
    });

    slide.addEventListener('mouseleave', () => {
        isDown = false;
        slide.classList.remove('active');
    });

    slide.addEventListener('mouseup', () => {
        isDown = false;
        slide.classList.remove('active');
    });

    slide.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slide.offsetLeft;
        const walk = (x - startX) * 1; 
        slide.scrollLeft = scrollLeft - walk;
    });

    slide.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slide.offsetLeft;
        scrollLeft = slide.scrollLeft;
    });

    slide.addEventListener('touchend', () => {
        isDown = false;
    });

    slide.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slide.offsetLeft;
        const walk = (x - startX) * 1;
        slide.scrollLeft = scrollLeft - walk;
    });
});


function setEqualHeight() {
    const boxes = document.querySelectorAll('.box-content');
    let maxHeight = 0;

    // Đặt lại chiều cao của tất cả các hộp về 'auto' để tính toán chính xác
    boxes.forEach(box => {
        box.style.height = 'auto';
    });

    // Tìm chiều cao lớn nhất
    boxes.forEach(box => {
        const boxHeight = box.offsetHeight;
        if (boxHeight > maxHeight) {
            maxHeight = boxHeight;
        }
    });

    // Áp dụng chiều cao lớn nhất cho tất cả các hộp
    boxes.forEach(box => {
        box.style.height = maxHeight + 'px';
    });
}

// Chạy hàm khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    setEqualHeight();
});

// Chạy lại hàm khi cửa sổ thay đổi kích thước để đảm bảo tính responsive
window.addEventListener('resize', () => {
    setEqualHeight();
});
