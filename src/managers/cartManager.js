import fs from "fs"
import ProductManager from './productManager.js';
const PATH = "./cart.json"

class CartManager{
    async getCart(){
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
    async createCart (cart){
        try {
            
            const carts =  await this.getCart()
            
            
            if (carts.length === 0) {
                carts.id = 1 
            }
            else{
                carts.id = carts[carts.length - 1].id + 1
            }
            carts.push(cart)
            await fs.promises.writeFile(PATH,JSON.stringify(carts,null,"\t"))
            return cart
        } catch (error) {
            console.log(error)
        }
}
    async deleteCartById(pid){
        
        const carts = await this.getCart();
        const deleteIndex = carts.findIndex(cart => cart.id == pid)
        const deleteCart = carts.splice(deleteIndex,1);

        await fs.promises.writeFile(PATH,JSON.stringify(carts,null,"\t"))
        return deleteCart
        

    }
    async deleteAllCarts(){
        let carts =await this.getCart()
        carts = []
        await fs.promises.writeFile(PATH,JSON.stringify(carts,null,"\t"))
    }
    async updateCart(pid,newInfo){
        try {
            const carts = await this.getCart()
            let updateIndex =carts.findIndex(cart => cart.id == pid)
            console.log(updateIndex)

            if (updateIndex <=0 ) {
                carts[updateIndex] = { ...carts[updateIndex], ...newInfo }
                
                console.log(carts)
            } else {
                return {
                    message:" carrito no encontrado"
                }
            }
            await fs.promises.writeFile(PATH,JSON.stringify(carts,null,"\t"))
        } catch (error) {
            console.log(error)
        }
    }
    async getCartById(cid){
        try {
            const carts = await this.getCart()
            const cart = carts.find(c => c.id ==cid)
            console.log(cart)
        } catch (error) {
            console.log(error)
        }
    }
    async addToCart(cid,pid){
        try {
            const product = await this.getProductById(pid)
            const carts = this.getCart()
            

        } catch (error) {
            console.log(error)
        }
    }
}
export default CartManager