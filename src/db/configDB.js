import mongoose from "mongoose";

const URI = 
    "mongodb+srv://doymarurbina:4O0DGavLrdvH4t18@cluster0.duapyc4.mongodb.net/ecommerce?retryWrites=true&w=majority"

mongoose
    .connect(URI)
    .then(()=> console.log('Conectado a la BD'))
    .catch((error)=> console.log(error));