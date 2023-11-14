import { Router } from "express";
import { ProductManager2 } from "../managers/ProductsManager2.js";

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
    const response = await ProductManager2.findById(idProduct);
    const {title, description, price} = response
    res.render('product',{product: {title,description,price}});
})

router.get('/products',async(req,res)=>{
    const response = await ProductManager2.findAll({});
    const {title, description, price} = response
    res.render("products",{products:{title,description,price}})
   
})

router.get('/signup',(req,res)=>{
    res.render("signup");
});

router.get('/profile/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    console.log(idProduct); 
    const response = await ProductManager2.findById(idProduct);
    const {title, description, price} = response
    res.render('profile',{product: {title,description,price}});
})

export default router;