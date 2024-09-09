import { Router } from "express";
import ProductManager from "../managers/productManager.js";


const viewsRouter = Router();
const productManager = new ProductManager();



viewsRouter.get("/",async (req,res) =>{
	const products = await productManager.getProducts()
	const stringified = JSON.stringify(products)
	res.render("home",{stringified})

})
viewsRouter.get("/realtimeproducts" ,async (req,res) =>{
	const products = await productManager.getProducts()
	const stringified = JSON.stringify(products)
	res.render("realTimeProducts",{stringified})
})

export default viewsRouter;
