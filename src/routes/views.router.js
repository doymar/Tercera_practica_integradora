import { Router } from "express";
import { ProductManager } from "../managers/ProductsManager.js";
import { CartManager } from "../managers/CartsManager.js";

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
    res.render('product',{product: response.toObject()});
})

router.get('/home', async (req,res) => {
    const response = await ProductManager.findAll(req.query);
    const {info} = response
    const {payload} = info 
    const productsData = payload.map(doc => doc.toObject());
    res.render("home",{products: productsData})
})

router.get('/signup',(req,res)=>{
    res.render("signup");
});

router.get('/profile/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    console.log(idProduct); 
    const response = await ProductManager.findById(idProduct);
    res.render('profile',{product: response.toObject()});
})

router.get('/products', async(req,res) => {
    res.render('products', {})
})

router.get('/carts/:cid', async (req,res) => {
    const {cid} = req.params;
    try {
        const cart = await CartManager.findCartById(cid);
        const cartProducts = cart.products.map(doc => doc.toObject());
        res.render('carts', {products: cartProducts})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default router;