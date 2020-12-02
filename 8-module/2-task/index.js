import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

//отрисовка
    let elem = document.createElement('div');
    elem.className += 'products-grid';

    let productsGridInner = document.createElement('div');
    elem.appendChild(productsGridInner);
    productsGridInner.className += "products-grid__inner";

    this.productCards = [];

    for (let product of products) {
      let productCard = new ProductCard(product);
      productsGridInner.append(productCard.elem);
      this.productCards.push(productCard);
    }
    this.elem = elem;
    this.productsGridInner = productsGridInner;
    this.filters = {}
  }

//фильтр
  productSelector(product, filters) {
    if (filters.maxSpiciness !== undefined && filters.maxSpiciness < product.spiciness) {
      return false;
    }
    if (filters.noNuts && product.nuts === true) {
      return false;
    }
    if (filters.category !== undefined && filters.category != "" && filters.category != product.category) {

      return false;
    }
    if (filters.vegeterianOnly && product.vegeterian !== true) {
      return false;
    }
    return true;
  }

//отобразить в списке товаров только те, которые соответствуют критериям фильтрации.
  updateFilter(filters) {
    for (var k in filters) this.filters[k] = filters[k];
    for (let productCard of this.productCards) {
      if (this.productSelector(productCard.product, this.filters)) {
        if (!this.productsGridInner.contains(productCard.elem)) {
          this.productsGridInner.appendChild(productCard.elem);
        }
      } else {
        if (this.productsGridInner.contains(productCard.elem)) {
          this.productsGridInner.removeChild(productCard.elem);
        }
      }
    }
  }
}
