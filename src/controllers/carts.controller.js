import { createOne, addProduct, findById, deleteProduct, updateArray, updateQuantity, deleteAll } from '../services/carts.service.js'

export const createCart = async (req, res) => {
    try {
        const cart = await createOne();
        res.status(200).json({message: "Cart", cart });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const findCartById = async (req, res) => {
    const { idCart } = req.params;
    try {
        const cart = await findById(idCart);
        res.status(200).json({message: "Cart", cart });
    } catch (error) {
        res.status(500).json({error: err.message});
    }
}

export const addProductToCart = async (req, res) => {
    const { idCart, idProduct } = req.params;
    try {
        const cart = await addProduct(idCart, idProduct);
        res.status(200).json({message: "Cart", cart });
    } catch (error) {
        res.status(500).json({error: err.message});
    }
}

export const deleteProductToCart = async (req,res) => {
    const { cid, pid } = req.params;
    try {
      cart = await deleteProduct(cid, pid);
      res.status(200).json({message:'Product deleted', cart});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
}

export const updateProductsArray = async (req,res) => {
    const {cid} = req.params;
    const {products} = req.body;
    try {
      const cart = await updateArray(cid,products)
      res.status(200).json({message:'Products updated', cart});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
}

export const updateProductQuantity =  async (req,res) => {
    const {quantity} = req.body;
    const { cid, pid } = req.params;
    try {
      const cart = await updateQuantity(cid,pid,+quantity);
      res.status(200).json({message:'Product quantity updated', cart});
    } catch (error) {
      res.status(500).json({message: error.message});
    } 
}

export const deleteAllProducts = async (req,res) => {
    const {cid} = req.params;
    try {
      const cart = await deleteAll(cid)
      res.status(200).json({message:'Products deleted'});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
}