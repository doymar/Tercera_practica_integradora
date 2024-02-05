export const authMiddleware = (role)=> {
  return (req,res,next)=> {
    if(!role.includes(req.user.role)){
      return res.status(403).json('Not authoraized')
    }
    next();
  }
}