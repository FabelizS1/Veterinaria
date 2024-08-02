import { ToastContainer } from 'react-toastify'    //// Importar el toastify
import PatientForm from "./components/PatientForm"
import PatientsList from "./components/PatientsList"
import "react-toastify/dist/ReactToastify.css"     //// Los css de React
import { useState } from 'react'

function App() {


//const inputHandler = () => {
//  console.log('INFO e::: ' + e)
//}


type producto = {
  id: number,
  nombre: string,
  cantidad: number, 
}

const [numeroActual, setNumeroActual] = useState(0)
const [carrito, setCarrito] = useState([])

const botonIncrementar = () => {
  setNumeroActual( numeroActual + 1 )
}


const botonDecrementar = () => {
  setNumeroActual( numeroActual - 1 )
}


//const botonComprar = (monto: number) => {

  //setCarrito({
    
    //productoId: 0
  //})

//}

/*
function addToCart(item : Guitar) { // Donde Guitar es el tipo de dato de item
  const itemExists = cart.findIndex(guitar => guitar.id === item.id)
  if(itemExists >= 0 ) { // existe en el carrito
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
  } else {
      // Para esete caso como hay un quantity se crea una variable y se le asigna ...item que tiene todos los valores 
      // y luego el valor que se le quantity : 1
      // Con esto actualizo el valor de quantity item.quantity = 1
      const newItem : CartItem = {...item, quantity : 1} 
      setCart([...cart, newItem]) // Aqui se setea el newItem
  }
}

Este es el componente de toast
<ToastContainer />


  */







  return (
    <>
      <div className="container mx-auto mt-20">

          <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
            Seguimiento de Pacientes {''}
            <span className="text-indigo-700">Veterinaria</span>
          </h1>

          <div className="mt-12 md:flex">
              <PatientForm />
              <PatientsList />
          </div>
      </div>

      <ToastContainer />
    </>
  )
}

export default App
