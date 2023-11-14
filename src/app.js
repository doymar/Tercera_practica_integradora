import express from 'express';
import productsRouter from './routes/products.router.js';
import productsRouter2 from './routes/products2.router.js'
import cartsRouter from './routes/carts.router.js';
import cartsRouter2 from './routes/carts2.router.js'
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import { MessageManager } from './managers/MessagesManager.js';
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import "./db/configDB.js";

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));

//handlebars
app.engine("handlebars",engine());
app.set('views',__dirname + '/views');
app.set('view engine','handlebars');

//routes
app.use('/api/views',viewsRouter);
app.use('/api/users',usersRouter);
app.use('/api/products',productsRouter);
app.use('/api/products2',productsRouter2);
app.use('/api/carts',cartsRouter);
app.use('/api/carts2',cartsRouter2)

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
});

const socketServer = new Server(httpServer);
const messages = [];
socketServer.on('connection',socket=>{
    console.log(`Cliente conectado: ${socket.id}`);
    socket.on('newUser',(user)=>{
        socket.broadcast.emit("userConnected", user);
        socket.emit("connected");
    })
    socket.on('message', async(infoMessage)  =>{
        messages.push(infoMessage);
        console.log(infoMessage);
        await MessageManager.createOne(infoMessage);
        socketServer.emit('chat',messages);
    })
});
