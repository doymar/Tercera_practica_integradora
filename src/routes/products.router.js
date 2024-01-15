import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { findAllProducts, findProductById, createProduct, deleteProduct, updateProduct, addProduct } from '../controllers/products.controller.js'

const router = Router();

router.get('/', findAllProducts);

router.get('/:pid', findProductById);

router.post("/", authMiddleware, createProduct);

router.delete("/:idProduct", deleteProduct);

router.put("/:pid", updateProduct);

router.post("/signup", authMiddleware, addProduct)

export default router