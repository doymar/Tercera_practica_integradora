import { Router } from "express";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { findUsers, findUserById, findUserByEmail, deleteUser, changeRole } from '../controllers/users.controller.js'
import passport from "passport";
const router = Router();

router.get("/", findUsers);

router.get("/:idUser", 
    //jwtValidation, 
    passport.authenticate('jwt', {session: false}),
    authMiddleware('user'), 
    findUserById
);

// router.get("/:email", findUserByEmail)

router.delete("/:idUser", deleteUser)

router.get('/premium/:uid', changeRole)

export default router;