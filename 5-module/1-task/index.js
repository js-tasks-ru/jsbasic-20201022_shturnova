function hideSelf() {

  //Чтобы скрыть кнопку, добавьте ей атрибут hidden.
    const btnToHide = document.querySelector('.hide-self-button');
    btnToHide.addEventListener('click', () => {
    btnToHide.setAttribute('hidden', true);
  });
}
