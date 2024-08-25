import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const productRouter = Router();
const productManager = new ProductManager();
productRouter.get("/", async (req, res) => {
	try {
		const products = await productManager.getProducts();

		if (products.length === 0) {
			res.send("el array esta vacio");
		} else {
			res.send(products);
		}
	} catch (error) {
		console.log(error);
	}
});

productRouter.get("/:pid", async (req, res) => {
	try {
		const { pid } = req.params;
		const findProduct = await productManager.getProductById(pid);
		res.send(findProduct);
	} catch (error) {
		console.log(error);
	}
});
productRouter.post("/", async (req, res) => {
	try {
		const { title, price, thumbnail, description, code, stock, category } =
			req.body;

		const newProduct = await productManager.createProduct({
			title,
			price,
			thumbnail,
			status: true,
			description,
			code,
			stock,
			category,
		});
		return res.send({
			message: "el producto fue creado con exito",
			newProduct,
		});
	} catch (error) {
		console.log(error);
	}
});

productRouter.put("/:pid", async (req, res) => {
	try {
		const pid = req.params.pid;
		const body = req.body;
		const updateProduct = await productManager.updateProduct(pid, body);
		if (!updateProduct) {
			res.send("el producto fue actualizado con exito");
		} else {
		}
	} catch (error) {
		console.log(error);
	}
});

productRouter.delete("/", async (req, res) => {
	const deleteAllProducts = await productManager.deleteAllProducts();
	res.send("el producto fue eliminado con exito");
});

productRouter.delete("/:pid", async (req, res) => {
	const pid = req.params.pid;

	const deleteProduct = await productManager.deleteProductById(pid);

	res.send(deleteProduct);
});
export default productRouter;
