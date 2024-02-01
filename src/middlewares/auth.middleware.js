export const authMiddleware = (role)=> {
  return (req,res,next)=> {
    if(req.user.role !== role){
      return res.status(403).json('Not authoraized')
    }
    next();
  }
}