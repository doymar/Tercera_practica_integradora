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

router.get('/:pid',async(req,res)=>{
  console.log(req.params);
  const {pid} = req.params
  try{
      const product = await ProductManager2.findById(pid);
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
      const response = await ProductManager2.createOne(req.body);
      res.status(200).json({ message: "Product created", product: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    await ProductManager2.deleteOne(idProduct);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router