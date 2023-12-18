export const authMiddleware = (req,res,next)=>{
    const {title,description,price,code,stock,category} = req.body;
    if (!title || !description || !price || !code || !stock || !category) {
      return res.status(400).json({ message: "Some data is missing" });
    }
    next();
};

export const authMiddleware2 = (role)=> {
  return (req,res,next)=> {
    if(req.user.role !== role){
      return res.status(403).json('Not authoraized')
    }
    next();
  }
}