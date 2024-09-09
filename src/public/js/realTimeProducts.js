
const socket = io();


const div = document.getElementById("productsList")
socket.on("sendProducts",data =>{
	  div.innerHTML = data.map(product=>{
		
		return `<div>producto:${product.title} id: ${product.id}</div>`
	})

})


const createInput = document.getElementById("create");


createInput.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		socket.emit("send", createInput.value);
		input.value = "";
	}
});

const deleteInput =document.getElementById("delete")

deleteInput.addEventListener("keyup",(event) =>{
	if (event.key ==="Enter") {
		socket.emit("sendDelete",deleteInput.value)
		deleteInput.value=""
	}
})

