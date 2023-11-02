import { productsModel } from "../db/models/products.model.js";

class ProductsManager {
    async findAll() {
        const response = await productsModel.find()
        return response;
    }

    async findById(id) {
        const result = await productsModel.findById(id);
        return result;
      }

    async createOne(obj) {
        const response = await productsModel.create(obj);
        return response;
    }

    async updateOne(id, obj) {
        const result = await productsModel.updateOne({ _id: id }, obj);
        return result;
      }
    
      async deleteOne(id) {
        const result = await productsModel.deleteOne({ _id: id });
        return result;
      }
}

export const ProductManager2 = new ProductsManager();