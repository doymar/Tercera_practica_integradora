import { createOne, findAll, findById, deleteOne, updateOne } from '../services/products.service.js'

export const findAllProducts = async(req,res)=>{
    try{
        const products = await findAll(req.query);
        res.status(200).json({message:'Products found',products});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const findProductById = async(req,res)=>{
    console.log(req.params);
    const {pid} = req.params
    try{
        const product = await findById(pid);
        if(!product){
            return res.status(404).json({message: "The product does not exist"});
        }
        res.status(200).json({message:'Product found',product});
    }catch(error) {
        res.status(500).json({message: error.message});
    }
}

export const createProduct = async (req, res) => {
    try {
      const response = await createOne(req.body);
      if(!response){
        return res.status(400).json({message: "Code already used"});
      }
      res.status(200).json({ message: "Product created", product: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const { idProduct } = req.params;
    try {
      const response = await deleteOne(idProduct);
      if (!response) {
        return res.status(404).json({ message: "Product not found with the id provided" });
      }
      res.status(200).json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

export const updateProduct = async (req, res) => {
    const { pid } = req.params;
    try {
      const response = await updateOne(pid, req.body);
      if (!response) {
        return res.status(404).json({ message: "Product not found with the id provided" });
      }
      res.status(200).json({ message: "Product updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export const addProduct = async(req,res)=>{
    console.log(req.body);
    try {
      const response = await createOne(req.body);
      res.redirect(`/profile/${response.id}`);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}