import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ProductManager2 } from "../managers/ProductsManager2.js";

const router = Router();

router.get('/',async(req,res)=>{
    try{
        const products = await ProductManager2.findAll();
        res.status(200).json({message:'Products found',products});
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post("/",authMiddleware, async (req, res) => {
    try {
      const response = await ProductManager2.createOne(req.body);
      res.status(200).json({ message: "Product created", product: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
export default router