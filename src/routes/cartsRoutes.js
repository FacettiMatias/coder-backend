import { Router } from "express";

import CartManager from "../managers/cartManager.js";

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
		const cid =req.params;
		const cart = await cartManager.getCartById(cid);
		return cart
		
		
	} catch (error) {
		console.log(error)
	}
})

cartRouter.put ("/:cid" ,async (req,res) =>{
	try {
		const cid = req.params
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
	const cid = req.params;

	try {
		cartManager.deleteCartById(cid)
		res.send("el carrito fue borrado");
	} catch (error) {
		console.log(error)
	}
})

export default cartRouter;
