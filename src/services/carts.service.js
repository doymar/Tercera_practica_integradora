import { CartManager } from "../daos/carts.dao.js";

export const findById = async (id) =>{
    const cart = await CartManager.findCartById(id);
    return cart;
}

export const createOne = async () =>{
    const cart = await CartManager.createCart();
    return cart;
}

export const addProduct = async (cid,pid) =>{
    const cart = await CartManager.addProductToCart(cid,pid);
    return cart;
}

export const deleteProduct = async (cid,pid) =>{
    const cart = await CartManager.deleteProductToCart(cid,pid);
    return cart;
}

export const updateArray = async (cid,prod) =>{
    const cart = await CartManager.updateProductsArray(cid,prod);
    return cart;
}

export const updateQuantity = async (cid,pid,quant) =>{
    const cart = await CartManager.updateProductQuantity(cid,pid,quant);
    return cart;
}

export const deleteAll = async (cid) =>{
    const cart = await CartManager.deleteAllProducts(cid);
    return cart;
}