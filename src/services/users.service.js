import { UserManager } from "../daos/users.dao.js";
import { CartManager } from "../daos/carts.dao.js";
import { hashData } from "../utils.js";

export const findAll = async ()=>{
    const users = await UserManager.findAll();
    return users;
}

export const findById = async (id)=>{
    const user = await UserManager.findById(id);
    return user;
}

export const createOne = async (obj)=>{
    const hashedPassword = await hashData(obj.password);
    const newCart = await CartManager.createCart();
    const cart = newCart._id
    const newObj = {...obj, password: hashedPassword, cart}
    const createdUser = await UserManager.createOne(newObj);
    return createdUser;
}

export const findByEmail = async (email)=>{
    const user = await UserManager.findByEmail(email);
    return user;
}

export const deleteOne = async (id)=>{
    const user = await UserManager.deleteOne(id);
    return user;
}