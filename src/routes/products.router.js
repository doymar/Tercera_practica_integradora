import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { productsMiddleware } from "../middlewares/items.middleware.js";
import { findAllProducts, findProductById, createProduct, deleteProduct, updateProduct, addProduct } from '../controllers/products.controller.js'

const router = Router();

router.get('/', findAllProducts);

router.get('/:pid', findProductById);

router.post("/", 
productsMiddleware, 
authMiddleware(['admin','premium']), createProduct);

router.delete("/:idProduct", authMiddleware(['admin','premium']), deleteProduct);

router.put("/:pid", authMiddleware('admin'), updateProduct);

router.post("/signup", productsMiddleware, authMiddleware(['admin','premium']), addProduct)

export default router