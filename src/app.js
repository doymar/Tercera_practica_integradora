import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

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
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);

const httpServer = app.listen(8080, () => {
    console.log('Escuchando el puerto 8080');
});

const socketServer = new Server(httpServer);

socketServer.on('connection',socket=>{
    //console.log(`Cliente conectado: ${socket.id}`);
    socket.on('disconnect',()=>{
      //  console.log(`Cliente desconectado: ${socket.id}`);
    })

    //socket.emit("welcome","Welcome to websocket")
    socket.on('newPrice',(value)=>{
        console.log("newPrice", value);
    })
});
