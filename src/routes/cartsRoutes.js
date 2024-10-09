import { Router } from "express";
import fs from "fs"

import CartManager from "../managers/cartManager.js";
import ProductManager from "../managers/productManager.js";
import Cart from "../models/carts.js";


const cartRouter = Router();
const cartManager = new CartManager();
cartRouter.get("/", async (req, res) => {
	const cart = await Cart.find({})
	console.log(cart)
	if (cart) {
		res.send(cart)
	}
	else{
		const cart = await Cart.create()
	}
});
cartRouter.get("/:cid" , async (req,res) =>{
	try {
		const {cid} = req.params;
		const cart = await Cart.findOne({_id:cid})
		res.send(cart)
		
		
	} catch (error) {
		console.log(error)
	}
})

cartRouter.post("/", async (req, res) => {
	try {
		const newCart =  await Cart.create({})
		res.send(newCart)
	} catch (error) {
		console.log(error);
	}
});

cartRouter.delete("/:cid", async (req, res) => {
	try {
		await Cart.updateOne({_id:cid})
		res.send("todos los carros fueron borrados");
	} catch (error) {
		console.log(error);
	}
});

cartRouter.delete("/:cid" ,async (req,res) =>{
	const {cid} = req.params;
	try {
		cartManager.deleteCartById(cid)
		res.send("el carrito fue borrado");
	} catch (error) {
		console.log(error)
	}
})
cartRouter.put ("/:cid/:pid" ,async (req,res) =>{
	const {cid,pid} = req.params
	try {
		await cartManager.addToCart(cid,pid)
		res.send("el producto fue cargado con exito al carrito")


	} catch (error) {
		
	}
})

export default cartRouter;
