export default class StepSlider {
  constructor({steps, value = 0}) {

    let slider = document.createElement('div');
    slider.className += 'slider';

    //ползунок
    let sliderThumb = document.createElement('div');
    slider.appendChild(sliderThumb);
    sliderThumb.className += 'slider__thumb';
    //положение ползунка задается через стиль
    sliderThumb.style.left = '0%';

    //значение под ползунок
    let sliderValue = document.createElement('span');
    sliderThumb.appendChild(sliderValue);
    sliderValue.className += 'slider__value';
    sliderValue.innerHTML = value.toString();

    //закрашенная область
    let sliderProgress = document.createElement('div');
    slider.appendChild(sliderProgress);
    sliderProgress.className += 'slider__progress';
    //прогресс задается через стиль
    sliderProgress.style.width = '0%';

    let sliderSteps = document.createElement('div');
    slider.appendChild(sliderSteps);
    sliderSteps.className += 'slider__steps';

    let sliderStepActive = document.createElement('span');
    sliderSteps.appendChild(sliderStepActive);
    sliderStepActive.className += 'slider__step-active';

    for (let i = 0; i < steps - 1; i++) {
      let span = document.createElement('span');
      sliderSteps.appendChild(span);
    }

    //выключаем встроенный в браузер Drag-and-Drop
    let thumb = slider.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;



    function moveThumb(event) {
      //координата клика по горизонтали минус координата крайней левой точки слайдера
      //получаем расст в пикселях от начала слайдера до места клика
      let left = event.clientX - slider.getBoundingClientRect().left;
      let leftRelative;
      if (slider.offsetWidth == 0) {
        leftRelative = 0;
      } else {
        //делим на ширину слайдера и получаем относит значение
        leftRelative = left / slider.offsetWidth;
      };
      let segments = steps - 1;
      //умножаем относит значение на колво сегментов
      let approximateValue = leftRelative * segments;
      //получаем цифру на ползунок
      let value = Math.round(approximateValue);
      //получаем в процентах (для перемещения и закрашивания)
      let valuePercents = value / segments * 100;

      //выделяем активный степ, убираем выделение неактивного, записываем цифру
      if (sliderValue.innerHTML != value) {
        sliderSteps.children[value].className += ' slider__step-active';
        sliderSteps.children[sliderValue.innerHTML].classList.remove('slider__step-active');
        sliderValue.innerHTML = value;
      };

      //установка стиля для места ползунка и прогресса
      let thumb = slider.querySelector('.slider__thumb');
      let progress = slider.querySelector('.slider__progress');
      let leftPercents = valuePercents;
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      //сообщаем, что произошло изменение слайдера, во внешний код
      slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      }));
    }

    thumb.onpointerdown = function (event) {

      event.preventDefault();

      //добавляем ивенты на перемещение и поднятие
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
      slider.className += ' slider_dragging';

      function onPointerMove(event) {

        //координата клика по горизонтали минус координата крайней левой точки слайдера
        //получаем расст в пикселях от начала слайдера до места клика
        let left = event.clientX - slider.getBoundingClientRect().left;
        //делим на ширину слайдера и получаем относит значение
        let leftRelative = left / slider.offsetWidth;


        //если тянем мышь сильно левее или правее слайдера, возвращаем его на ноль
        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 0;
        }

        //получаем проценты
        let leftPercents = leftRelative * 100;

        //получаем цифру
        let segments = steps - 1;
        let approximateValue = leftRelative * segments;
        let value = Math.round(approximateValue);

        //выделяем активный степ, убираем выделение неактивного, записываем цифру
        if (sliderValue.innerHTML != value) {
          sliderSteps.children[value].className += ' slider__step-active';
          sliderSteps.children[sliderValue.innerHTML].classList.remove('slider__step-active');
          sliderValue.innerHTML = value;
        };
        //установка стиля для места ползунка и прогресса
        let thumb = slider.querySelector('.slider__thumb');
        let progress = slider.querySelector('.slider__progress');
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
      }

      function onPointerUp(event) {
        //удаляем ивенты на перемещение и поднятие
        document.removeEventListener('pointerup', onPointerUp);
        document.removeEventListener('pointermove', onPointerMove);
        slider.classList.remove('slider_dragging');

        moveThumb(event);
      }
    };

    slider.addEventListener('click', moveThumb);
    this.elem = slider;
  }
}
