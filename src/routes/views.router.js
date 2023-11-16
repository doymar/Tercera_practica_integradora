import { Router } from "express";
import { ProductManager } from "../managers/ProductsManager.js";

const router = Router();

router.get("/",(req,res)=>{
    res.render("chat");
});

router.get("/realtimeproducts",(req,res)=>{
    res.render("realTimeProducts");
});

router.get('/product/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    console.log(idProduct); 
    const response = await ProductManager.findById(idProduct);
    const {title, description, price} = response
    res.render('product',{product: {title,description,price}});
})

router.get('/home', async (req,res) => {
    const products = await ProductManager.findAll();
    res.render("home",{products})
})

router.get('/signup',(req,res)=>{
    res.render("signup");
});

router.get('/profile/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    console.log(idProduct); 
    const response = await ProductManager.findById(idProduct);
    const {title, description, price} = response
    res.render('profile',{product: {title,description,price}});
})

export default router;