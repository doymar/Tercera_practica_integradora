import { productsModel } from "../db/models/products.model.js";

class ProductsManager {
    async findAll() {
        const response = await productsModel.find()
        return response;
    }

    async createOne(obj) {
        const response = await productsModel.create(obj);
        return response;
    }
}

export const ProductManager2 = new ProductsManager();