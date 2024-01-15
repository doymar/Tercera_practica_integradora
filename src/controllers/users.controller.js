import { findAll, findById, createOne, findByEmail, deleteOne } from '../services/users.service.js'

export const findUsers = async (req,res) =>{
    try {
        const users = await findAll();
        res.status(200).json({message: "Users", users});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const findUserById = async (req,res) => {
    const {idUser} = req.params;
    console.log('user', req);
    try {
        const user = await findById(idUser);
        res.status(200).json({message: "User", user});
    } catch (error) {
        res.status(500).json({error: err.message});
    }
}

export const findUserByEmail = async (req,res) => {
    const {email} = req.params;
    try {
        const user = await findByEmail(email);
        res.status(200).json({message: "User", user});
    } catch (error) {
        res.status(500).json({error: err.message});
    }
}

export const deleteUser = async (req,res) =>{
    const {idUser} = req.params;
    try {
        await UserManager.deleteOne(idUser);
    } catch (error) {
        res.status(500).json({error: err.message});
    }
}