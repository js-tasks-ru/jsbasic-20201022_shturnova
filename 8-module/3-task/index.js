export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let cartItem = this.cartItems.find(
      item => item.product.id == product.id
    );
    if (!cartItem) {
      //Если товара еще нет в корзине, то добавить его в массив cartItems с количеством 1:
      cartItem = {
        product,
        count: 1
      };
      this.cartItems.push(cartItem);
    } else {
      //Если товар уже есть в корзине, то увеличить его количество на единицу.
      cartItem.count++;
    }
    //С обновлённым элементом cartItem вызвать метод onProductUpdate
    this.onProductUpdate(cartItem);
  }


  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id == productId);
    //Обновить количество единиц товара в массиве cartItems.
    cartItem.count += amount;
    //Если после изменения количества единиц товара, его количество стало 0, то удалить из корзины этот товар.
    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
    //С обновлённым элементом cartItem вызвать метод onProductUpdate.
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.count,
      0
    );
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

