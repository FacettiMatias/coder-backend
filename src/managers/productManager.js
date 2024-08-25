import fs from "fs"

const PATH = "./products.json"


class ProductManager{
    async getProducts(){
        try {
            if (fs.existsSync(PATH)) {
                
                const data = await fs.promises.readFile(PATH,"utf-8")
                return JSON.parse(data)                   
            }
            else{
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getProductById(pid){
        try {
            const products = await this.getProducts()
            const product = products.find(product => product.id == pid)
            return product
        } catch (error) {
            console.log(error)
        }
    }
    async createProduct (product){
        try {
            const products =  await this.getProducts()
            
            if (products.length === 0) {
                product.id = 1 
            }
            else{
                product.id = products[products.length - 1].id + 1
            }
            products.push(product)
            await fs.promises.writeFile(PATH,JSON.stringify(products,null,"\t"))
            return product
        } catch (error) {
            console.log(error)
        }
}
    async deleteProductById(pid){
        
        const products =await this.getProducts();
        const deleteIndex = products.findIndex(product => product.id == pid)
        const deleteProduct = products.splice(deleteIndex,1);

        await fs.promises.writeFile(PATH,JSON.stringify(products,null,"\t"))
        return deleteProduct
        

    }
    async deleteAllProducts(){
        let products =await this.getProducts()
        products = []
        await fs.promises.writeFile(PATH,JSON.stringify(products,null,"\t"))
    }
    async updateProduct(pid,newInfo){
        try {
            const products = await this.getProducts()
            let updateIndex =products.findIndex(product => product.id == pid)
            console.log(updateIndex)

            if (updateIndex <=0 ) {
                products[updateIndex] = { ...products[updateIndex], ...newInfo }
                
                console.log(products)
            } else {
                return {
                    message:" producto no encontrado"
                }
            }
            await fs.promises.writeFile(PATH,JSON.stringify(products,null,"\t"))
        } catch (error) {
            console.log(error)
        }
    }
}



export default ProductManager;







