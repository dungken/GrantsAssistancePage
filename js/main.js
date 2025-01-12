document.addEventListener("DOMContentLoaded", () => {
    const slide = document.querySelector(".slide");
    const slideBox = document.querySelector(".slide-box");
    const slideItems = document.querySelectorAll(".slide-item");
    const prevButton = document.querySelector(".prev-slide");
    const nextButton = document.querySelector(".next-slide");

    let isDown = false;
    let startX;
    let scrollLeft;

    slide.addEventListener("mousedown", (e) => {
        isDown = true;
        slide.classList.add("active");
        startX = e.pageX - slide.offsetLeft;
        scrollLeft = slide.scrollLeft;
    });

    slide.addEventListener("mouseleave", () => {
        isDown = false;
        slide.classList.remove("active");
    });

    slide.addEventListener("mouseup", () => {
        isDown = false;
        slide.classList.remove("active");
    });

    slide.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slide.offsetLeft;
        const walk = (x - startX) * 1;
        slide.scrollLeft = scrollLeft - walk;
    });

    slide.addEventListener("touchstart", (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slide.offsetLeft;
        scrollLeft = slide.scrollLeft;
    });

    slide.addEventListener("touchend", () => {
        isDown = false;
    });

    slide.addEventListener("touchmove", (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slide.offsetLeft;
        const walk = (x - startX) * 1;
        slide.scrollLeft = scrollLeft - walk;
    });

    $(".success-stories-slider").slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                },
            },
        ],
    });

    $(".carousel-inner").slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2, // Show 2 items per slide on PC
        slidesToScroll: 2, // Scroll 2 items at a time on PC
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        responsive: [
            {
                breakpoint: 768, // For devices below 768px
                settings: {
                    slidesToShow: 1, // Show 1 item per slide on mobile
                    slidesToScroll: 1, // Scroll 1 item at a time on mobile
                    arrows: false, // Disable arrows on mobile
                },
            },
        ],
    });

    // Custom previous button
    $(".prev-slide").on("click", function () {
        $(".carousel-inner").slick("slickPrev");
    });

    // Custom next button
    $(".next-slide").on("click", function () {
        $(".carousel-inner").slick("slickNext");
    });
});

function setEqualHeight() {
    const boxes = document.querySelectorAll(".box-content");
    let maxHeight = 0;

    // Đặt lại chiều cao của tất cả các hộp về 'auto' để tính toán chính xác
    boxes.forEach((box) => {
        box.style.height = "auto";
    });

    // Tìm chiều cao lớn nhất
    boxes.forEach((box) => {
        const boxHeight = box.offsetHeight;
        if (boxHeight > maxHeight) {
            maxHeight = boxHeight;
        }
    });

    // Áp dụng chiều cao lớn nhất cho tất cả các hộp
    boxes.forEach((box) => {
        box.style.height = maxHeight + "px";
    });
}

// Chạy hàm khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
    setEqualHeight();
});

// Chạy lại hàm khi cửa sổ thay đổi kích thước để đảm bảo tính responsive
window.addEventListener("resize", () => {
    setEqualHeight();
});

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Counter animation function
function runCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const speed = 500;
    const increment = Math.ceil(target / speed);

    const updateCount = () => {
        const current = +counter.innerText.replace(/,/g, ""); // Remove commas
        if (current < target) {
            counter.innerText = new Intl.NumberFormat().format(
                current + increment
            );
            setTimeout(updateCount, 10); // Adjust delay between updates
        } else {
            counter.innerText = new Intl.NumberFormat().format(target);
        }
    };

    updateCount();
}

// Reset the counter
function resetCounter(counter) {
    counter.innerText = "0";
    counter.classList.remove("counted"); // Allow the counter to reanimate
}

// Scroll event listener to trigger counters
window.addEventListener("scroll", () => {
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
        if (isInViewport(counter)) {
            // If in viewport, run the counter
            if (!counter.classList.contains("counted")) {
                counter.classList.add("counted");
                runCounter(counter);
            }
        } else {
            // If out of viewport, reset the counter
            resetCounter(counter);
        }
    });
});

document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("click", () => {
        // Đóng tất cả các mục khác
        document.querySelectorAll(".faq-item").forEach((el) => {
            if (el !== item) el.classList.remove("active");
        });
        // Toggle trạng thái của mục được nhấn
        item.classList.toggle("active");
    });
});
