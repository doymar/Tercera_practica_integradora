import { Router } from "express";
import { createCart, addProductToCart, findCartById, deleteProductToCart, updateProductsArray, updateProductQuantity, deleteAllProducts } from '../controllers/carts.controller.js'

const router = Router();

router.post("/", createCart);

router.get("/:idCart", findCartById);

router.post("/:idCart/product/:idProduct", addProductToCart);

router.delete("/:cid/products/:pid", deleteProductToCart)

router.put("/:cid", updateProductsArray)

router.put("/:cid/products/:pid", updateProductQuantity)

router.delete("/:cid", deleteAllProducts)

export default router;