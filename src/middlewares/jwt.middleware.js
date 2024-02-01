import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { logger } from '../utils/logger.js';
const SECRET_KEY_JWT = config.secret_jwt;

// export const jwtValidation = (req,res,next) =>{
//     try {
//         const authHeader = req.get('Authorization');
//         const token = authHeader.split(' ')[1];
//         const userToken = jwt.verify(token,SECRET_KEY_JWT);
//         req.user = userToken;
//         next();
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
// }

export const jwtValidation = (req,res,next) =>{
    try {
        
        const token = req.cookies.token;
        const userToken = jwt.verify(token,SECRET_KEY_JWT);
        logger.info(userToken)
        req.user = userToken;
        next();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}