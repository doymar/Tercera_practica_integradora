import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createCart, addProductToCart, findCartById, deleteProductToCart, updateProductsArray, updateProductQuantity, deleteAllProducts, ticketPurchase } from '../controllers/carts.controller.js'

const router = Router();

router.post("/", createCart);

router.get("/:idCart", findCartById);

router.post("/:idCart/product/:idProduct", 
authMiddleware(['user','premium']), 
addProductToCart);

router.delete("/:cid/products/:pid", deleteProductToCart)

router.put("/:cid", updateProductsArray)

router.put("/:cid/products/:pid", updateProductQuantity)

router.delete("/:cid", deleteAllProducts)

router.get('/:cid/purchase', ticketPurchase)

export default router;