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

router.delete("/:cid/products/:pid", async (req,res) => {
  const { cid, pid } = req.params;
  try {
    cart = await CartManager.deleteProductToCart(cid, pid);
    res.status(200).json({message:'Product deleted', cart});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

router.put("/:cid", async (req,res) => {
  const {cid} = req.params;
  const {products} = req.body;
  try {
    const cart = await CartManager.updateProductsArray(cid,products)
    res.status(200).json({message:'Products updated', cart});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

router.put("/:cid/products/:pid", async (req,res) => {
  const {quantity} = req.body;
  const { cid, pid } = req.params;
  try {
    const cart = await CartManager.updateProductQuantity(cid,pid,+quantity);
    res.status(200).json({message:'Product quantity updated', cart});
  } catch (error) {
    res.status(500).json({message: error.message});
  } 
})

router.delete("/:cid", async (req,res) => {
  const {cid} = req.params;
  try {
    const cart = await CartManager.deleteAllProducts(cid)
    res.status(200).json({message:'Products deleted'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

export default router;