import { Router } from "express";
import fs from "fs"

import CartManager from "../managers/cartManager.js";
import ProductManager from "../managers/productManager.js";


const cartRouter = Router();
const cartManager = new CartManager();
cartRouter.get("/", async (req, res) => {
	try {
		const cart = [];
		const carts = await cartManager.getCart(cart);

		if (carts.length === 0) {
			res.send("el array esta vacio");
		} else {
			res.send(carts);
		}
	} catch (error) {
		console.log(error);
	}
});
cartRouter.get("/:cid" , async (req,res) =>{
	try {
		const {cid} = req.params;
		const cart = await cartManager.getCartById(cid);
		res.send(cart)
		
		
	} catch (error) {
		console.log(error)
	}
})

cartRouter.post("/", async (req, res) => {
	try {
        const carts = await cartManager.getCart()
		const newCart = {
            id: carts.length + 1 ,
            products:[]
        }
		const createCart = await cartManager.createCart(newCart);


		return res.send({
			message: "cart creado correctamente",
		});
	} catch (error) {
		console.log(error);
	}
});

cartRouter.delete("/", async (req, res) => {
	try {
		cartManager.deleteAllCarts();
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
