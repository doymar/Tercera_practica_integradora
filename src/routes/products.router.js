import { Router } from "express";
import { ProductsManager } from "../ProductManager.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/',async(req,res)=>{
    try{
        const products = await ProductsManager.getProducts(req.query);
        res.status(200).json({message:'Products found',products});
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

router.get('/:pid',async(req,res)=>{
    console.log(req.params);
    const {pid} = req.params
    try{
        const product = await ProductsManager.getProductById(+pid);
        if(!product){
            return res.status(404).json({message: "The product does not exist"});
        }
        res.status(200).json({message:'Product found',product});
    }catch(error) {
        res.status(500).json({message: error.message});
    }
});

router.post("/",authMiddleware, async (req, res) => {
    try {
      const response = await ProductsManager.addProduct(req.body);
      if(!response){
        return res.status(400).json({message: "Code already used"});
      }
      res.status(200).json({ message: "Product created", product: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
  router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
      const response = await ProductsManager.deleteProduct(+pid);
      if (!response) {
        return res.status(404).json({ message: "Product not found with the id provided" });
      }
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
      const response = await ProductsManager.updateProduct(+pid, req.body);
      if (!response) {
        return res.status(404).json({ message: "Product not found with the id provided" });
      }
      res.status(200).json({ message: "Product updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post("/signup",authMiddleware, async(req,res)=>{
  console.log(req.body);
  try {
    const response = await ProductsManager.addProduct(req.body);
    res.redirect(`/api/views/profile/${response.id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})





export default router