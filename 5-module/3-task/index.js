function initCarousel() {

  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');

  const lenta = document.querySelector('.carousel__inner');

  const slidesAmount = Array.from(document.querySelectorAll('.carousel__slide')).length;

  const slide = document.querySelector('.carousel__slide');
  const slideWidth = slide.offsetWidth;

  let counter = 1;
  let pxnumber = 0;

  function checkArrows() {
    if (counter == 1) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }

    if (counter == slidesAmount) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }
  }

  checkArrows();

  arrowRight.addEventListener('click', () => {
    counter = counter + 1;
    pxnumber = pxnumber + slideWidth;
    checkArrows();

    if (counter <= slidesAmount) {
      lenta.style.transform = `translateX(-${pxnumber}px)`;
    } else if (counter > slidesAmount) {
      pxnumber = pxnumber - slideWidth;
    }
  });

  arrowLeft.addEventListener('click', () => {
    counter = counter - 1;
    pxnumber = pxnumber - slideWidth;
    checkArrows();

    if (counter < slidesAmount) {
      lenta.style.transform = `translateX(-${pxnumber}px)`;
    }
  });
}
