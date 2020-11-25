import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {

    let modal = document.createElement('div');
    modal.className += 'modal';
    //////////
    this.modal = modal;

    let modalOverlay = document.createElement('div');
    modal.appendChild(modalOverlay);
    modalOverlay.className += 'modal__overlay';

    let modalInner = document.createElement('div');
    modal.appendChild(modalInner);
    modalInner.className += 'modal__inner';

    let modalHeader = document.createElement('div');
    modalInner.appendChild(modalHeader);
    modalHeader.className += 'modal__header';

    let button = document.createElement('button');
    modalHeader.appendChild(button);
    button.className += 'modal__close';
    button.setAtribute = ('type', 'button');

    let img = document.createElement('img');
    button.appendChild(img);
    img.setAttribute('src', '../../assets/images/icons/cross-icon.svg');
    img.setAttribute('alt', 'close-icon');

    let modalTitle = document.createElement('h3');
    modalHeader.appendChild(modalTitle);
    modalTitle.className += 'modal__title';
    ////////////////
    this.modalTitle = modalTitle;

    let modalBody = document.createElement('div');
    modalInner.appendChild(modalBody);
    modalBody.className += 'modal__body';
    ////////////////
    this.modalBody = modalBody;

    //закрытие по клику на Х
    button.addEventListener('click', () => {
      modal.remove();
      document.body.classList.remove('is-modal-open');
    });

    //закрытие по Esc
    document.addEventListener('keydown', function (event) {
      if (event.code === 'Escape') {
        modal.remove();
        document.body.classList.remove('is-modal-open');
      }
    });
    //////////
    this.elem = modal;
  }

  open() {
    document.body.className += 'is-modal-open';
    document.body.appendChild(this.modal);
  }

  setTitle(title) {
    this.modalTitle.innerHTML = title;
  }

  setBody(modalBodyContent) {
    this.modalBody.appendChild(modalBodyContent);
  }

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
  }
}
