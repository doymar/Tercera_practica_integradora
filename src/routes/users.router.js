import { Router } from "express";
import { UserManager } from "../managers/UsersManager.js";
const router = Router();

router.get("/", async (req,res) => {
    try {
        const users = await UserManager.findAll();
        res.status(200).json({message: "Users", users});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// router.get("/:idUser", async (req,res) => {
//     const {idUser} = req.params;
//     try {
//         const user = await UserManager.findById(idUser);
//         res.status(200).json({message: "User", user});
//     } catch (error) {
//         res.status(500).json({error: err.message});
//     }
// })

router.get("/:email", async (req,res) => {
    const {email} = req.params;
    try {
        const user = await UserManager.findByEmail(email);
        res.status(200).json({message: "User", user});
    } catch (error) {
        res.status(500).json({error: err.message});
    }
})

router.delete("/:idUser", async (req,res) =>{
    const {idUser} = req.params;
    try {
        await UserManager.deleteOne(idUser);
    } catch (error) {
        res.status(500).json({error: err.message});
    }
})

export default router;