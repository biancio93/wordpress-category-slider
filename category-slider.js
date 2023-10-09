window.addEventListener("load", ragouCarousel);

function ragouCarousel() {
    const container_Slider = document.querySelector('.container-slider');
    if(container_Slider === null || container_Slider === undefined){
        return;
    }

/* ===========================================
COMANDI
=========================================== */

const control_Next = document.querySelector('.control-next');
const control_Prev = document.querySelector('.control-prev');
let column_Number;
const mobileQuery = window.matchMedia('(max-width: 576px)');
const tabletQuery = window.matchMedia('(max-width: 1200px)');
if (mobileQuery.matches) {
    column_Number = 1;
} else if (tabletQuery.matches){
    column_Number = 2;
} else {
    column_Number = 5;
}
let cards = document.querySelectorAll('.card');
let cards_rep = document.querySelectorAll('.card');
if(cards.length < column_Number){
    container_Slider.style.transform = "translate3d(0vw, 0vw, 0vw)";
    container_Slider.style.width = "100%";
    control_Next.remove();
    control_Prev.remove();
    let item_width = 100 / cards.length;
    for(i=0; i<cards.length; i++){
      cards[i].style.width = item_width + "%"
    }
    return;
}
let unit_Move = 100 / column_Number;
let item_width = 100 / column_Number;
let actual_Position = -100;
let actual_Position_Index = column_Number;
let cards_Number = cards.length;
let actual_Position_Limit = cards_Number;
let prev_Position_Limit = column_Number;
let prev_Position_End = -(cards_Number * item_width);
let cards_Number_Req = cards.length;
let touchEndX;
let touchStartX;

/* ===========================================
CREO I CLONI
=========================================== */

let clones_Range = column_Number - 1;
let clones_Range_Prev = column_Number - clones_Range;
for (i = 0; i < cards_Number; i++) {
    cards[i].style.width = item_width + 'vw';
}
for (i = 0; i < clones_Range; i++) {
    let cloned_Item_Next = cards[i];
    let clone_Next = cloned_Item_Next.cloneNode(true);
    container_Slider.appendChild(clone_Next);
}
for (i = 0; i < column_Number; i++) {
    let cloned_Item_Prev = cards_rep[cards_Number - 1 - i];
    let clone_Prev_Ref = cards[0];
    let clone_Prev = cloned_Item_Prev.cloneNode(true);
    container_Slider.insertBefore(clone_Prev, clone_Prev_Ref);
    cards = document.querySelectorAll('.card');
}
let container_width = document.querySelectorAll('.card').length * item_width;
container_Slider.style.width = container_width + 'vw';

/* CONTROLLI MANUALI */
control_Next.addEventListener('click', nextSlide);
control_Prev.addEventListener('click', prevSlide);
container_Slider.addEventListener("mousedown", dragCarouselStart);
container_Slider.addEventListener("mouseup", dragCarouselEnd);
container_Slider.addEventListener("touchstart", scrollCarouselStart);
container_Slider.addEventListener("touchend", scrollCarouselEnd);

/* AUTOPLAY */
let autoplay = setInterval(nextSlide, 5000);
container_Slider.addEventListener('mouseenter', stopSlide);
container_Slider.addEventListener('mouseleave', restartSlide);

/* SCORRIMENTO */
function nextSlideLoop() {
    container_Slider.classList.remove('transition-none');
    actual_Position_Index = actual_Position_Index + 1;
    actual_Position = actual_Position - unit_Move;
    container_Slider.style.transform = 'translate3d(' + actual_Position + 'vw, 0vw, 0vw)';
}
function nextSlide() {
    actual_Position_Index = actual_Position_Index + 1;
    actual_Position = actual_Position - unit_Move;
    if (actual_Position_Index > actual_Position_Limit) {
        container_Slider.classList.add('transition-none');
        container_Slider.style.transform = 'translate3d(0vw, 0vw, 0vw)';
        actual_Position_Index = 0;
        actual_Position = 0;
        let remove_Slow_next = setTimeout(nextSlideLoop, 50);
    } else {
        container_Slider.style.transform = 'translate3d(' + actual_Position + 'vw, 0vw, 0vw)';
    }
    console.log(actual_Position_Index);

}
function prevSlideLoop() {
    container_Slider.classList.remove('transition-none');
    actual_Position_Index = cards_Number - 1;
    actual_Position = prev_Position_End + unit_Move;
    container_Slider.style.transform = 'translate3d(' + actual_Position + 'vw, 0vw, 0vw)';
    console.log(actual_Position);
}
function prevSlide() {
    actual_Position_Index = actual_Position_Index - 1;
    actual_Position = actual_Position + unit_Move;
    if (actual_Position_Index < prev_Position_Limit - column_Number) {
        container_Slider.classList.add('transition-none');
        container_Slider.style.transform = 'translate3d(' + prev_Position_End + 'vw, 0vw, 0vw)';
        actual_Position_Index = cards_Number;
        actual_Position = prev_Position_End;
        let remove_Slow_prev = setTimeout(prevSlideLoop, 50);
    } else {
        container_Slider.style.transform = 'translate3d(' + actual_Position + 'vw, 0vw, 0vw)';
    }
}
function stopSlide() {
    clearInterval(autoplay);
}
function restartSlide() {
    autoplay = setInterval(nextSlide, 5000);
}

/* ===========================================
DESKTOP DRAG
=========================================== */

function dragCarouselIndex() {
    if (dragStartX > dragEndX) {
        nextSlide();
    } else {
        prevSlide()
    }
}
function dragCarouselEnd(e) {
    container_Slider.onmousemove = function (e) {
        container_Slider.style.cursor = 'grab';
    };
    dragEndX = e.clientX;
    dragCarouselIndex();
    container_Slider.style.cursor = 'grab';
    setTimeout(function () {
        container_Slider.style.cursor = 'inherit';
    }, 1000);
}
function dragCarouselStart(e) {
    dragStartX = e.clientX;
    container_Slider.style.cursor = 'grab';
    container_Slider.onmousemove = function (e) {
        container_Slider.style.cursor = 'grabbing';
    };
}

/* ===========================================
MOBILE SCROLL
=========================================== */

function scrollCarouselIndex() {
    if (touchStartX > touchEndX) {
        nextSlide();
    } else {
        prevSlide()
    }
}
function scrollCarouselEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    scrollCarouselIndex();
}
function scrollCarouselStart(e) {
    touchStartX = e.changedTouches[0].clientX;
}

}