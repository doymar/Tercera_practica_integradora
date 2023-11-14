import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //Forma de indexar un campo que no sea unique
        //index: true;
    },
    gender: {
        type: String,
        required: true,
    },
});

export const usersModel = mongoose.model("Users", usersSchema);