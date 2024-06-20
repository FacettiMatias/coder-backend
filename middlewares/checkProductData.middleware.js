export const checkProductData = (req,res,next) =>{
	
	try {
		const  {title,description,price,thumbnail,stock,category} =req.body;
	const newProduct ={
		title,description,price,thumbnail,stock,category

	}
	if (Object.values(newProduct).includes(undefined)) {
		return res.status(400).json({status:"error", msg:"todos los campos deben ser llenados"})

	}
	next()

} catch (error) {
	res
			.status(500)
			.json({ status: "error", msg: "error interno del servidor" });
			error
}
}