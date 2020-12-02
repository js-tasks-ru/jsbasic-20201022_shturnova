import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  // Отрисовать пустую иконку корзины
  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  // Заполнить её данными из объекта cart
  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  //реакция на скролл и изменение размеров окна
    addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }



  // позиционировать иконку корзины на экране
  updatePosition() {

    //проверяем что иконка корзины видима
    if (!this.elem.offsetHeight) {return;}

    if (!this.initialTopCoord) {
      //начальная координата верхней границы корзины = текущая Y-координата относительно окна + текущая прокрутка
      this.initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
    }

    //Если ширина окна браузера меньше или равна 767px, то перемещать иконку корзины не нужно
    if (document.documentElement.clientWidth <= 767) {
      this.resetPosition();
      return;
    }

    //сравниваем степень прокрутки страницы с начальной координатой
    let isHeaderCartScrolled = window.pageYOffset > this.initialTopCoord;

    //если пользователь докрутил страницу до верхнего края иконки корзины, задавать иконке фиксированное позиционирование
    if (isHeaderCartScrolled) {
      this.fixPosition();
    } else {
      //когда страница обратно прокручена вверх, вернуть корзину «как было».
      this.resetPosition();
    }
  }

  fixPosition() {

    Object.assign(this.elem.style, {
      //задать фиксированное позиционирование
      position: 'fixed',
      //иконка корзины должна отстоять на 50px от верхнего края экрана.
      top: '50px',
      zIndex: 1e3,
      //выбрать наименьшее значение
      left: Math.min(
        //отстоять на 20px справа от первого элемента в документе с классом container.
        //возьмём расстояние от края документа этого самого первого элемента с классом container и прибавим к нему 20px
        document.querySelector('.container').getBoundingClientRect().right + 20,
        //быть не ближе 10px от правого края окна
        //из общей ширины страницы  вычесть ширину иконки корзины и размер отступа от края
        document.documentElement.clientWidth - this.elem.offsetWidth - 10
      ) + 'px'
    });
  }

  resetPosition() {
    //всё вернуть как было, когда пользователь докрутил обратно до верха
    Object.assign(this.elem.style, {
      position: '',
      top: '',
      left: '',
      zIndex: ''
    });
  }



}
