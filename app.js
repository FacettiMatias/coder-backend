import express from "express";
import productRouter from "./src/routes/productsRoutes.js";
import cartRouter from "./src/routes/cartsRoutes.js";
import __dirname from "./util.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import ProductManager from "./src/managers/productManager.js";
import mongoose from "mongoose";
import viewsRouter from './src/routes/viewsRouter.js';
console.log(__dirname)


const PORT = process.env.PORT || 8080;
const app = express();
const productManager = new ProductManager();



app.engine("handlebars", handlebars.engine({
    runtimeOptions:{allowProtoPropertiesByDefault:true}
}));

app.set("view engine", "handlebars");
app.set("views", `./src/views`);
app.use(express.json());



app.use("/views",viewsRouter)
app.use("/api/cart", cartRouter);
app.use("/products", productRouter);

app.use(express.static(`${__dirname}/public`));


const server = app.listen(PORT, () =>
	console.log(` escuchando en puerto ${PORT}`)
);

mongoose.connect("mongodb+srv://facettimatias:Mati43874864@cluster0.b1wxp.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")

const socketServer = new Server(server);



socketServer.on("connection", async (socketClient) => {
     const products = await productManager.getProducts()
    socketServer.emit("sendProducts",products)
    // socketServer.emit("sendProducts",async ()=>{
    //      await productManager.getProducts()

    // } )
	socketClient.on("send", async (data) => {

		const newProduct = await productManager.createProduct({
			title: data,
			status: true,
		});
        const newArray = await productManager.getProducts()
        socketServer.emit("sendProducts",newArray)
		
	});

    socketClient.on("sendDelete",async (data)=>{
        
        const deletedProduct= await productManager.deleteProductByName(data)
        const newArray = await productManager.getProducts()
        socketServer.emit("sendProducts",newArray)
    })

});


