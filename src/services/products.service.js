import { ProductManager } from "../daos/products.dao.js";

export const findAll = async (obj) =>{
    const products = await ProductManager.findAll(obj);
    return products;
} 

export const findById = async (id) =>{
    const product = await ProductManager.findById(id);
    return product;
}

export const createOne = async (obj) =>{
    const product = await ProductManager.createOne(obj);
    return product;
}

export const deleteOne = async (id) =>{
    const product = await ProductManager.deleteOne(id);
    return product;
}

export const updateOne = async (id, obj) =>{
    const product = await ProductManager.updateOne(id, obj);
    return product;
}