import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import Product from "../models/products.js";


const productRouter = Router();


productRouter.get("/", async (req, res) => {
	const {limit=10,page=1,category,sort} = req.query
	const products = await Product.paginate({},{page,limit})
	console.log(products)
	if (category) {
		try {
			let result = await Product.aggregate([
				{
					$match:{category:category}
				},
				{
					$sort: { price: 1 }
				}
			])
			if (result) {
					res.render("home",{result})
			}
			
		} catch (error) {
			console.log(error)
		}
	}
	else if (products){
		try {
			res.render("home",{products})
		} catch (error) {
			error	
		}
		
	}
	
});
productRouter.get("/pagecontent", async (req, res) => {
	const products = await Product.paginate({},{limit:1,page:2})
	const pageContent ={
		payload:products.docs,
		prevPage:products.prevPage,
		nextPage:products.nextPage,
		hasNextPage:products.hasNextPage,
		hasPrevPage:products.hasPrevPage,
		nextLink:`/products/${products.nextPage}`,
		prevLink:`/products/${products.prevPage}`
	}
	res.json(pageContent)
	
})
productRouter.get("/:page", async (req, res) => {
	try {
		const { limit, sort, query } = req.query;
		const {page} = req.params;
		console.log(page)
		const products = await Product.paginate({}, {page,limit });
		if (products) {
			
			res.render("home",{products});
			
		} else {
			res.render("home",{message:"no hay productos"});
		}
	} catch (error) {
		console.log(error);
	}
});


productRouter.get("/id/:pid", async (req, res) => {
	try {
		const { pid } = req.params;

		const product = await Product.findOne({ _id: pid });

		if (product) {
			res.json(product);
		} else {
			res.send("el producto no fue encontrado o no existe");
		}
	} catch (error) {
		console.log(error);
	}
});
productRouter.post("/addProducts", async (req, res) => {
	try {
		const body = req.body;
		await Product.create(body);
		res.json({ message: "producto creado" });
	} catch (error) {
		res.send(error);
	}
});

productRouter.put("/:pid", async (req, res) => {
	try {
		const { pid } = req.params;
		const body = req.body;
		const product = await Product.findByIdAndUpdate(pid, body, { new: true });
		if (product) {
			res.json(product);
		} else {
			res.send("el producto no fue encontrado o no existe");
		}
	} catch (error) {
		console.log(error);
	}
});

productRouter.delete("/delete", async (req, res) => {
	try {
		await Product.collection.drop();
		res.send("la coleccion fue eliminada con exito");
	} catch (error) {
		console.log(error);
	}
});

productRouter.delete("/delete/:pid", async (req, res) => {
	const { pid } = req.params;
	await Product.deleteOne({ _id: pid });
	res.send("producto eliminado con exito");
});

productRouter.get("/", async (req, res) => {});
export default productRouter;
