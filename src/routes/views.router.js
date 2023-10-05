import { Router } from "express";
import { ProductsManager } from "../ProductManager.js";

const router = Router();

const product = {
    title: 'Iphone',
    description: '15 Plus',
    price: 1200
}

const products = [{
    title: 'Iphone',
    description: '15 Plus',
    price: 1200
},
{
    title: 'Iphone',
    description: '14 Plus',
    price: 1100
},
{
    title: 'Iphone',
    description: '13 Plus',
    price: 1000
},
{
    title: 'Iphone',
    description: '12 Plus',
    price: 900
}
]

router.get("/",(req,res)=>{
    res.render("websocket");
});

router.get('/view1',(req,res)=>{
    res.render("view1");
});

router.get('/view2',(req,res)=>{
    res.render("view2");
});

router.get('/product',(req,res)=>{
    res.render("product",{product})
})

router.get('/products',async(req,res)=>{
    const products = await ProductsManager.getProducts({});
    res.render("products: ",products)
   
})

router.get('/signup',(req,res)=>{
    res.render("signup");
});

router.get('/product/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    console.log(idProduct); 
        const product = await ProductsManager.getProductById(+idProduct);
        res.render('profile',{product});
})

export default router;