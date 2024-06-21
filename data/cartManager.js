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
	await getCart();
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
	const productIndex = cart.products.findIndex((p) => p.id === pid);
	if (productIndex != -1) {
		cart.products[productIndex].quantity +=1;
	} else {
		const product = {
			pid,
			quantity: 1,
		};
		cart.products.push(product);
		await fs.promises.writeFile(path, JSON.stringify(cart))
		return cart
	}
	
	
};

export default {
	createCart,
	getCart,
	getCartById,
	addToCart,
};
