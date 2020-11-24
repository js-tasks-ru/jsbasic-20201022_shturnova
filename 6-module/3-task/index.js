import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    let _elem = document.createElement('div');
    this.elem = _elem;

    _elem.className = 'carousel';

    let lenta = document.createElement('div');
    lenta.className = 'carousel__inner';
    _elem.append(lenta);

    for (let i = 0; i < slides.length; i++) {
      lenta.insertAdjacentHTML('beforeend', `
                <div class="carousel__slide" data-id="${slides[i].id}">
                    <img src="../../assets/images/carousel/${slides[i].image}" class="carousel__img" alt="slide">
                    <div class="carousel__caption">
                        <span class="carousel__price">€${slides[i].price.toFixed(2)}</span>
                        <div class="carousel__title">${slides[i].name}</div>
                        <button type="button" class="carousel__button">
                        <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
                        </button>
                    </div>
                </div>
            `);
    }

    let arrowRight = document.createElement('div');
    arrowRight.className = 'carousel__arrow carousel__arrow_right';
    arrowRight.insertAdjacentHTML('beforeend', '<img src="../../assets/images/icons/angle-icon.svg" alt="icon">');

    let arrowLeft = document.createElement('div');
    arrowLeft.className = 'carousel__arrow carousel__arrow_left';
    arrowLeft.insertAdjacentHTML('beforeend', '<img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">');

    _elem.append(arrowLeft);
    _elem.append(arrowRight);

    const slidesAmount = Array.from(this.elem.querySelectorAll('.carousel__slide')).length;

    let slide = this.elem.querySelector('.carousel__slide');

    let counter = 1;
    this.counter = counter;
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

      const slideWidth = slide.offsetWidth;
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

      const slideWidth = slide.offsetWidth;
      counter = counter - 1;
      pxnumber = pxnumber - slideWidth;
      checkArrows();

      if (counter < slidesAmount) {
        lenta.style.transform = `translateX(-${pxnumber}px)`;
      }
    });

    let buttonAdd = _elem.querySelector('.carousel__button');

    buttonAdd.addEventListener('click', () => this.onClick());

  }


  onClick() {
    const customEvent = new CustomEvent("product-add", {
      detail: this.slides[this.counter - 1].id,
      bubbles: true
    });
    this.elem.dispatchEvent(customEvent);
  }
}
