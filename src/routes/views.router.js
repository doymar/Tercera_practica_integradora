import { Router } from "express";
import { ProductsManager } from "../ProductManager.js";

const router = Router();

router.get("/",(req,res)=>{
    res.render("chat");
});

router.get('/product/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    console.log(idProduct); 
        const product = await ProductsManager.getProductById(+idProduct);
        res.render('product',{product});
})

router.get('/products',async(req,res)=>{
    const products = await ProductsManager.getProducts({});
    res.render("products",{products})
   
})

router.get('/signup',(req,res)=>{
    res.render("signup");
});

router.get('/profile/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    console.log(idProduct); 
        const product = await ProductsManager.getProductById(+idProduct);
        res.render('profile',{product});
})

export default router;