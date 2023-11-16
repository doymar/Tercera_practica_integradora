import { Router } from "express";
import { CartManager } from "../managers/CartsManager.js";

const router = Router();

router.post("/", async (req, res) => {
    const cart = await CartManager.createCart();
    res.json({ cart });
  });

router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  const cart = await CartManager.findCartById(idCart);
  res.json({ cart });
});

router.post("/:idCart/product/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  const cart = await CartManager.addProductToCart(idCart, idProduct);
  res.json({ cart });
});

router.delete("/:cid/products/pid", async (req,res) => {
  const { idCart, idProduct } = req.params;
  await CartManager.deleteProductToCart(idCart, idProduct);
})

export default router;