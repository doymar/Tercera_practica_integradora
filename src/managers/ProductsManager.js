import { productsModel } from "../db/models/products.model.js";

class ProductsManager {
    // async findAll() {
    //     const response = await productsModel.find().lean();
    //     return response;
    // }
    //Paginate
    async findAll(obj) {
      const {limit=10, page=1, ...query} = obj;
      const response = await productsModel.paginate(query,{limit, page})
      // .aggregate([
      //   {$sort: {price: sort}}
      // ]);
      const info = {
        status: response.status,
        payload: response.docs,
        totalPages: response.totalPages,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        page: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
        prevLink: response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null,
        nextLink: response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null,
      }
      return {info};
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

export const ProductManager = new ProductsManager();