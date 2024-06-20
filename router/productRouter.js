import { Router } from "express";
import productManager from "../data/productManager.js";
import {checkProductData} from "../middlewares/checkProductData.middleware.js"

const router = Router()


router.get("/products", async (req, res) => {
	const products = await productManager.getProducts();
	res.send(products);
});

router.get("/products/:pid", async (req, res) => {
	const { pid } = req.params;
	const product = await productManager.getProductById(pid);

	try {
		if (!product)
			return res
				.status(404)
				.json({ status: "error", msg: "producto no encontrado" });
		res.status(200).json({ status: "ok", product });
	} catch (error) {
		res
			.status(500)
			.json({ status: "error", msg: "error interno del servidor" });
	}
});
router.put("/products/:pid", async (req, res) => {
	const { pid } = req.params;
	const { price, title } = req.query;
	const product = await productManager.updateProduct(pid, {
		price: Number(price),
		title: title,
	});
	res.send(product);
});

router.post("/products", checkProductData ,async (req, res) => {
	try {
		const body = req.body;
		const product = await productManager.addProduct(body);
		res.status(201).json({ status: "ok", product });
		console.log(product);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ status: "error", msg: "error interno del servidor" });
	}
});
router.delete("/products/:pid", async (req, res) => {
	try {
		const { pid } = req.params;
		const product = await productManager.getProductById(pid);
		if (!product)
			return res
				.status(404)
				.json({ status: "error", msg: "producto no encontrado" });

		await productManager.deleteProduct(pid);
		res
			.status(200)
			.json({ status: "ok", msg: `producto con el id ${pid} fue eliminado` });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ status: "error", msg: "error interno del servidor" });
	}
});

export default router