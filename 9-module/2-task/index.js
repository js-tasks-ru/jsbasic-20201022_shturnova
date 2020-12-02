import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.renderCarousel();
    this.renderRibbon();
    this.renderStepSlider();
    this.renderCartIcon()

    this.cart = new Cart(this.cartIcon);

    this.products = await this.fetchProducts();

    this.renderProductsGrid();


    //Фильтрация товаров после получения с сервера
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });




    //по productId из объекта события найти нужный товар в массиве товаров и добавить его в корзину
    document.body.addEventListener('product-add', ({ detail: productId }) => {
      let product = this.products.find(product => product.id == productId);
      if (product != undefined) {
        this.cart.addProduct(product);
      }
    });

    //отфильтровать товары по новому значению остроты
    this.stepSlider.elem.addEventListener('slider-change', ({ detail: value }) => {
      this.productsGrid.updateFilter({
        maxSpiciness: value
      });
    });

    //отфильтровать товары по новому значению категории
    this.ribbonMenu.elem.addEventListener('ribbon-select', ({ detail: categoryId }) => {
      this.productsGrid.updateFilter({
        category: categoryId
      });
    });

    //отфильтровать товары по критерию с орехами/без орехов
    document.getElementById('nuts-checkbox').onchange = event => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    };

    //отфильтровать товары по критерию вегетарианские/не вегетарианские
    document.getElementById('vegeterian-checkbox').onchange = event => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    };
  }


//отрисовки компонентов
  renderCarousel() {
    this.carousel = new Carousel(slides);

    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
  }

  renderRibbon() {
    this.ribbonMenu = new RibbonMenu(categories);

    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
  }

  renderStepSlider() {
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });

    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
  }

  renderCartIcon() {
    this.cartIcon = new CartIcon();

    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);
  }


//получение продуктов и отрисовка
  async fetchProducts() {
    let response = await fetch('products.json');
    let products = await response.json();

    return products;
  }

  renderProductsGrid() {
    this.productsGrid = new ProductsGrid(this.products);
    //содержимое элемента, в который мы вставляем список товаров, нужно полностью очистить. До получения товаров, мы отображаем внутри него «заглушки»
    document.querySelector('[data-products-grid-holder]').innerHTML = '';
    document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);
  }


}
