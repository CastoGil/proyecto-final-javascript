//Bienvenido al MUNDO DEL CELULAR
//Constantes
const cardCelular = document.getElementById('cardCelular')
const carrito= document.querySelector('.carrito')
const compra= document.querySelector('.compra')
const vacio= document.querySelector('.vacio')
const vaciarCarritoBtn = document.querySelector('#vaciarCarrito')
const comprar = document.querySelector('#comprar')
const formulario = document.querySelector('#formulario')
const boton = document.querySelector('#boton2')
const resultado = document.querySelector('#resultado')
let array=[]
let shopCell= []
//Se separo en un array nada mas la informacion para el buscador
const telefonos = [
    {nombre: 'Samsung Galaxy A12', valor: 60000, img:"./img/samsungicon.jpg"},
    {nombre: 'Nokia 23 M 32 GB 2 GB Ram', valor: 48402, img:"./img/nokiaicon.jpg"} ,   
    {nombre:'LG K50s X540 32 GB 3gb Ram', valor: 35999, img:"./img/lgicon.jpg"},
    {nombre: 'Motorola G22 128GB', valor: 36499,img:"./img/motorolaicon.jpg"},
    {nombre: 'Motorola G22 128GB', valor: 36499,img:"./img/motorolaicon.jpg"},
    {nombre: 'Motorola G22 128GB', valor: 36499,img:"./img/motorolaicon.jpg"},
    {nombre: 'Motorola G22 128GB', valor: 36499,img:"./img/motorolaicon.jpg"},
     
] 
//Fetch
const fetchData = async ()=>{
        try {
            const res= await fetch('./data/productos.json')
            const data= await res.json()
            array=data
            console.log(data);
            pintarCards(data)
        } catch (error) {
            console.log(error);
        }
}
fetchData ()

//Funciones Y DOM

const pintarCards= data =>{
        data.forEach((cell) => {
            const card= document.createElement('div')
            card.setAttribute('class','card')
            card.setAttribute('style','width: 18rem;')
            card.innerHTML = `
                
                    <img src="${cell.img}" class="card-img-top" alt="...">
                    <div class="card-body bg-dark text-white">
                      <h5 class="card-title">Celular ${cell.modelo}  </h5>
                      <p class="card-text">Descripcion: ${cell.descripcion} </p>
                      <p>Precio $${cell.precio}</p>
                      <button data-id="${cell.id}" class="btn btn-danger boton">Agregar al Carrito <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg></button>
                    </div>
                </div>
        
            
            `
            cardCelular.append(card)
        })
        const BotonesCarrito = document.querySelectorAll('.boton')
        console.log(BotonesCarrito);
        BotonesCarrito.forEach((agregar) => {
            agregar.addEventListener('click', articuloagregado)
           
        })
}
const articuloagregado=(e) => {
    const celularelegido= e.target.getAttribute('data-id')
    const buscar_modelo = array.find((productos) => productos.id == celularelegido )
    console.log(celularelegido);
    shopCell.push(buscar_modelo)
    console.log('shopCell', shopCell)
    localStorage.setItem('shopCell', JSON.stringify(shopCell))
    mostrarTotal(compraTotal(shopCell))
    mostrarCuenta(shopCell)
    mostrarcarrito()
    Toastify({
        text: "Agregado al Carrito",
        duration: 1000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#2e2c2c",
        },
        onClick: function(){} // Callback after click
      }).showToast();
   
}
const mostrarcarrito = () => {
    vacio.innerHTML=''
    if (Object.keys(shopCell).length=== 0){
        vacio.innerHTML=`<p>Carrito Vacio <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-dash-fill" viewBox="0 0 16 16">
        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1z"/>
      </svg></p>`
      
    }
    compra.innerHTML = '';
    compra.className = 'listcompra'
    shopCell.forEach((celular)=>{
        const buttonselected = document.createElement('div')
        buttonselected.setAttribute('data-id', celular.id)
        buttonselected.innerHTML= ` <img src="${celular.icon}" alt="celular"></img>
        <p> ${celular.modelo}- Valor: $${celular.precio} </p>
        <button onclick="eliminarDelCarrito(${celular.id})" class="boton-eliminar">X</button>
        `
        
        compra.append(buttonselected)

    })
}
const compraTotal=(agregarCell)=>{
    let compra = 0
    agregarCell.forEach((cellphone)=>{
        compra += cellphone.precio 
    })
    return compra
}
const mostrarTotal=(compra)=>{ 
    const comptotal= document.querySelector('#total')
    comptotal.innerHTML= compra.toLocaleString()
}
const mostrarCuenta = (arr) => {
    const divCuenta = document.querySelector('.total-carrito')
    divCuenta.innerHTML = arr.length
}
const eliminarDelCarrito = (cellid) =>{
    const item = shopCell.find((cell)=> cell.id === cellid)
    const indice = shopCell.indexOf(item)
    shopCell.splice(indice,1)
    let transaction= JSON.stringify(shopCell)
    localStorage.setItem('shopCell',transaction)
    mostrarTotal(compraTotal(shopCell))
    mostrarCuenta(shopCell)
    mostrarcarrito()
    Toastify({
        text: "Eliminado del Carrito",
        duration: 1000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#2e2c2c",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}
const vaciarCarrito = () => {
    (Object.keys(shopCell).length=== 0)?
    Swal.fire({
        icon: 'error',
        title: 'Disculpa',
        text: 'No tienes articulos en el Carrito',
    }):
        Swal.fire({
        title: 'Estas seguro de Borrar el Carrito',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si deseo Borrarlo'
        }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Borrado',
            'Tu Carrito ha sido Borrado',
            'success'
          )
          localStorage.getItem('shopCell')&&(localStorage.removeItem('shopCell'), shopCell= [],mostrarTotal(compraTotal(shopCell)),mostrarCuenta(shopCell),mostrarcarrito())
        }
    })
    
}
const continuarcomprar = () => {
    (Object.keys(shopCell).length=== 0)?
    Swal.fire({
        icon: 'error',
        title: 'Disculpa',
        text: 'No tienes articulos en el Carrito',
         }):
    Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tu compra ha sido Procesada',
            showConfirmButton: false,
            timer: 1500
    }) 
    localStorage.getItem('shopCell')&&(localStorage.removeItem('shopCell'), shopCell= [],mostrarTotal(compraTotal(shopCell)),mostrarCuenta(shopCell),mostrarcarrito())

}
const filtrar = (event) =>{
    event.preventDefault()
    resultado.innerHTML = '';
    const texto = formulario.value.toLowerCase()
    for(let telefono of telefonos){
        let nombre = telefono.nombre.toLowerCase()
        buscador = (nombre.indexOf(texto) !== -1) && (resultado.innerHTML +=`<div><img src="${telefono.img}" alt="...">
        <li>${telefono.nombre}</li>
        <li>Valor: $${telefono.valor} </li>
        </div>
        `)
    }   
    (resultado.innerHTML === '') && (resultado.innerHTML += `<li> Producto no encontrado... </li>`)
}   

//LOCALSTORAGE
JSON.parse(localStorage.getItem('shopCell')) ? (
    shopCell = JSON.parse(localStorage.getItem('shopCell')),
    mostrarTotal(compraTotal(shopCell)),
    mostrarCuenta(shopCell),
    mostrarcarrito()
) 
: (shopCell= [])
 
//LLamados a las funciones 
vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
comprar.addEventListener('click', continuarcomprar)
boton.addEventListener('click', filtrar)

//Fin del ciclo


