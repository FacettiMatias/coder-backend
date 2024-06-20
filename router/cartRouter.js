import { Router } from "express";
import cartManager from "../data/cartManager.js";


const cartRouter = Router()

cartRouter.post("/carts",async (req,res) =>{
    try {
        const cart = await cartManager.createCart()
        res.status(201).json({status: "ok",cart})
    } catch (error) {
        res
			.status(500)
			.json({ status: "error", msg: "error interno del servidor" });
			error
    }
})

cartRouter.get("/carts",async (req,res) => {
    try {
        const cart =  await cartManager.getCart()
        res.send (cart);

    } catch (error) {
        // res
		// 	.status(500)
		// 	.json({ status: "error", msg: "error interno del servidor" });
			console.log(error);
    }
})

cartRouter.get("/carts/:cid", async (req,res) =>{
    try {
       const {cid} =req.params;
       const cart = await cartManager.getCartById(cid)
       if (!cart)
        return res
            .status(404)
            .json({ status: "error", msg: "producto no encontrado" });
    res.status(200).json({ status: "ok", cart });
    } catch (error) {
        res
        .status(500)
        .json({ status: "error", msg: "error interno del servidor" });
        
    }
})

cartRouter.post("/carts/:cid/products/:pid", async (req,res) =>{
    try {
        const {cid,pid} =req.params;
        const cart = await cartManager.addToCart(cid,pid)
        res.status(201).json({status:"ok",cart})

    } catch (error) {
        res
        .status(500)
        .json({ status: "error", msg: "error interno del servidor" });
    }
})

export default cartRouter