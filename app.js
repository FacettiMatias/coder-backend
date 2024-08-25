import express from "express"
import productRouter from "./src/routes/productsRoutes.js";
import cartRouter from "./src/routes/cartsRoutes.js";


const PORT = process.env.PORT || 8080
const app = express();
app.use(express.json ())
app.use("/api/cart", cartRouter);
app.use("/api/products",productRouter)












app.listen(PORT, ()=> console.log(`escuchando en el puerto ${PORT}`)) 
