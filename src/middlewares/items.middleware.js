export const productsMiddleware = (req,res,next)=>{
    const {title,description,price,code,stock,category} = req.body;
    if (!title || !description || !price || !code || !stock || !category) {
      return res.status(400).json({ message: "Some data is missing" });
    }
    next();
};

export const usersMiddleware = (req,res,next)=>{
    const {first_name,last_name, email, password} = req.body = req.body;
    if(!first_name || !last_name || !email || !password ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    next();
};