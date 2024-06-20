import fs from "fs";
import { get } from "http";
import { v4 as uuid } from "uuid";

let carts = [];

const path = "../cart.JSON";

const getCart = async () => {
	try {
		const cartJson = await fs.promises.readFile(path, "utf-8");
		carts = JSON.parse(cartJson) || [];
		return carts;
	} catch (error) {}
};
const createCart = async () => {
	await getCart()
	const newCart = {
		id: uuid(),
		products: [],
	};
	carts.push(newCart);
	await fs.promises.writeFile(path, JSON.stringify(carts));
	return newCart;
};


const getCartById = async (cid) => {
	await getCart();
	const cart = carts.find((c) => c.id === cid);
	return cart;
};
const addToCart = async (cid, pid) => {
	await getCart();
	const cart = await getCartById(cid);
	const productExistence = cart.products.findIndex(p =>p.pid ===pid)
	if (productExistence ) {
		carts.products[productExistence].quantity++
	}
	else{
		const product ={
			pid,
			quantity:1
		}
		carts.products.push(product)
	}
	
	return carts;
};

export default {
	createCart,
	getCart,
	getCartById,
	addToCart,
};
