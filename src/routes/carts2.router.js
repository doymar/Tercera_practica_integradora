import { Router } from "express";
import { cartsManager2 } from "../managers/CartsManager2.js";

const router = Router();

router.post("/", async (req, res) => {
    const cart = await cartsManager2.createCart();
    res.json({ cart });
  });

router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  const cart = await cartsManager2.findCartById(idCart);
  res.json({ cart });
});

router.post("/:idCart/product/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  const cart = await cartsManager2.addProductToCart(idCart, idProduct);
  res.json({ cart });
});

export default router;