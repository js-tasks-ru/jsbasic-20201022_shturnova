import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    let elem = document.createElement('div');
    elem.className = 'ribbon';

    //стрелки
    let buttonLeft = document.createElement('button');
    elem.appendChild(buttonLeft);
    buttonLeft.className = 'ribbon__arrow ribbon__arrow_left';

    let img = document.createElement('img');
    buttonLeft.appendChild(img);
    img.setAttribute('src', '../../assets/images/icons/angle-icon.svg');
    img.setAttribute('alt', 'icon');

    let buttonRight = document.createElement('button');
    elem.appendChild(buttonRight);
    buttonRight.className = 'ribbon__arrow ribbon__arrow_right ribbon__arrow_visible';

    let img1 = document.createElement('img');
    buttonRight.appendChild(img1);
    img1.setAttribute('src', '../../assets/images/icons/angle-icon.svg');
    img1.setAttribute('alt', 'icon');

    //прокрутка вправо
    buttonLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
      buttonRight.classList.add('ribbon__arrow_visible');
    });

    //прокрутка влево
    buttonRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
      buttonLeft.classList.add('ribbon__arrow_visible');
    });

    //ссылки на категории
    let ribbonInner = document.createElement('nav');
    elem.appendChild(ribbonInner);
    ribbonInner.className = 'ribbon__inner';

    for (let category of categories) {
      let a = document.createElement('a');
      ribbonInner.appendChild(a);
      a.setAttribute('href', '#');
      a.setAttribute('data-id', `${category.id}`);
      a.className = 'ribbon__item';
      a.innerHTML = `${category.name}`;


      ribbonInner.addEventListener('scroll', () => {
        //видимость левой кнопки
        let scrollLeft = ribbonInner.scrollLeft;
        if (scrollLeft == 0) {
          buttonLeft.classList.toggle('ribbon__arrow_visible');
        }

        //видимость правой кнопки
        let scrollWidth = ribbonInner.scrollWidth;
        let clientWidth = ribbonInner.clientWidth;
        let scrollRight = scrollWidth - scrollLeft - clientWidth;
        if (scrollRight < 1) {
          buttonRight.classList.remove('ribbon__arrow_visible')
        }
      });

      //выделение категории
      a.addEventListener('click', (event) => {
        event.preventDefault();
        //удалить выделение предыдущей
        let aActive = document.querySelector('.ribbon__item_active')
        if (aActive) {
          aActive.classList.remove('ribbon__item_active');
        }
        //выделить новую
        a.classList.add('ribbon__item_active');
        let customEvent = new CustomEvent('ribbon-select', {
          detail: category.id,
          bubbles: true
        })
        elem.dispatchEvent(customEvent);
      })

    }

    this.elem = elem;
  }
}
