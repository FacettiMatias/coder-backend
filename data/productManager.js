import fs from "fs"
import {v4 as uuid} from "uuid"
const path = "./products.JSON"

let products = []

const getProducts =async () =>{
    try {
        const fileJSON = await fs.promises.readFile(path, "utf-8")
        const parseFile =JSON.parse(fileJSON)
        products=parseFile || []

        return products
    } catch (error) {
        console.log(error)
    }
}

const addProduct = async (product) =>{
    try {
        getProducts()
        const {title,description,price,thumbnail,stock,category} = product;

        const newProduct ={
            id:uuid(),
            title,
            description,
            price,
            thumbnail
            ,stock ,
            category
        , status:true}

            products.push(newProduct);

            await fs.promises.writeFile(path,JSON.stringify(products))
            console.log("el producto fue cargado con exito")
            return newProduct
    } catch (error) {
        console.log(error)
    }
}

const getProductById = async (id) =>{
    try {
        await getProducts()
        const product =products.find(p => p.id === id)
        return product;
    } catch (error) {
        error
    }
}
const updateProduct =async (id,newData) =>{
    try {
         await getProducts();
         const index = products.findIndex(p => p.id ===id)
         products[index] = {
            ...products[index],
            ...newData
         }
         await fs.promises.writeFile(path,JSON.stringify(products))
         return products[index];
        
    } catch (error) {
        console.log(error);
    }
}
const deleteProduct = async (id) =>{
    try {
        await getProducts()
        const product =products.filter(p => p.id !== id)
        await fs.promises.writeFile(path,JSON.stringify(product))

        return product;
    } catch (error) {
        error
    }
}
export default {
    addProduct,getProducts,getProductById,updateProduct,deleteProduct
}