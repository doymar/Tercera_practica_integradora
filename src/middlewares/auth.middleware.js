export const authMiddleware = (req,res,next)=>{
    const {title,description,price,code,stock,category} = req.body;
    if (!title || !description || !price || !code || !stock || !category) {
      return res.status(400).json({ message: "Some data is missing" });
    }
    next();
};

