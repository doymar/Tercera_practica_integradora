import { cartsModel } from "../db/models/carts.model.js";

class CartsManager {
  async createCart() {
    const newCart = { products: [] };
    const response = await cartsModel.create(newCart);
    return response;
  }

  async findCartById(idCart) {
    const response = await cartsModel
      .findById(idCart)
      .populate("products.product", ["title", "price"]);
    return response;
  }

  async addProductToCart(idCart, idProduct) {
    const cart = await cartsModel.findById(idCart);

    const productIndex = cart.products.findIndex((p) =>
      p.product.equals(idProduct)
    );

    if (productIndex === -1) {
      cart.products.push({ product: idProduct, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }
    return cart.save();
  }

  async deleteProductToCart(idCart, idProduct) {
    await cartsModel.updateOne({_id:idCart},{ $pull: {product: idProduct}})
    // const cart = await cartsModel.findById(idCart);

    // const productIndex = cart.products.findIndex((p) =>
    //   p.product.equals(idProduct)
    // );    

    // if (productIndex === -1) {
    //   const error = "The product does not exist";
    //   return error
    // } else {
    //   cart.products[productIndex].pull({_id: idProduct});
    // }
    //return cart.save();
  }
}

export const CartManager = new CartsManager();