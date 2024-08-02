import { useEffect } from 'react'
import { useForm } from 'react-hook-form'   //// useForm   
import { toast } from 'react-toastify'      //// Este es el toast
import Error from './Error'
import type { DraftPatient } from '../types'
import { usePatientStore } from '../store'    ////// Se le agrega el Store

export default function PatientForm() {

    ///// Estas son las formas en que se puede hacer para que usePatientStore
    ///// const { addPatient } = usePatientStore()   Asi se comunica el paciente con la funcion addPatient 
    ////  Tambien se puede hacer asi
    ////  const addPatient = usePatientStore(state => state.addPatient)

    const addPatient  = usePatientStore(state => state.addPatient)     
    const activeId = usePatientStore(state => state.activeId)
    const patients = usePatientStore(state => state.patients)
    const updatePatient = usePatientStore(state => state.updatePatient)   //// actualizar el paciente

    
    
    /// const { register, handleSubmit, formState } useForm()     este es el hook de form  donde formState es el estado del formulario
    /// const { register, handleSubmit, formState: {errors} } useForm()     Donde errors se extrae de formState  
    /// {errors.name?.message}    Donde tomo errors.name?.message que es el mensaje de error del campo de texto
    /// Con setValue se puede agregar un valor al formulario
    const { register, handleSubmit, setValue , formState: { errors }, reset } = useForm<DraftPatient>()    /// Cuando se registra vas a tener el mismo tipo de dato que es DraftPatient

    /* Esta es la funcion que agrega el Paciente
    const registerPatient = (data: DraftPatient) => {
        addPatient(data)
    }
    */

    /*


    <input  
        id="name"
        className="w-full p-3  border border-gray-100"  
        type="text" 
        placeholder="Nombre del Paciente" 
        {...register('name', {    //// Donde name es el identificador del input que es el id, y siempre se llama a register
            required: 'El Nombre del paciente es obligatorio'   Que es requerido y tiene un mensaje
            maxLength:{
                value: 8,
                message: 'Maximo 8 caracteres'
            }
        })}
    />




    <form 
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}   /// Donde la funcion es handleSubmit y se le pasa registerPatient
    >




    {errors.maxLenght && (      //// Si el error se excede del maxLenght
        <Error>{errors.maxLenght?.message}</Error>
    )}



    */


    useEffect(() => {
        if(activeId) {
            const activePatient = patients.filter( patient => patient.id === activeId)[0]  /// Tomo el paciente activo
            setValue('name', activePatient.name)    //// Setea los valores en el formulario
            setValue('caretaker', activePatient.caretaker)
            setValue('date', activePatient.date)
            setValue('email', activePatient.email)
            setValue('symptoms', activePatient.symptoms)
        }
    }, [activeId])

    const registerPatient = (data: DraftPatient) => {
        if(activeId) {  /// Si esta activo el activeId indica si se va a updatePatient  o si se va a     addPatient
            updatePatient(data)
            toast('Paciente Actualizado Correctamente', {
                type: 'success'
            })
        } else {
            addPatient(data)
            toast.success('Paciente Registrado Correctamente')
        }
        reset()
    }


  
    return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
  
          <p className="text-lg mt-5 text-center mb-10">
              Añade Pacientes y {''}
              <span className="text-indigo-600 font-bold">Administralos</span>
          </p>

          <form 
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
              noValidate
              onSubmit={handleSubmit(registerPatient)}
          >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente 
                    </label>
                    <input  
                        id="name"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Paciente" 
                        {...register('name', {
                            required: 'El Nombre del paciente es obligatorio'
                        })}
                    />

                    {errors.name && (
                        <Error>{errors.name?.message}</Error>
                    )}
                    
                </div>
  
                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Propietario 
                    </label>
                    <input  
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Propietario" 
                        {...register('caretaker', {
                                required: 'El Propietario es obligatorio'
                        })}
                        />

                        {errors.caretaker && (
                            <Error>{errors.caretaker?.message}</Error>
                        )}
                </div>
  
              <div className="mb-5">
                <label htmlFor="email" className="text-sm uppercase font-bold">
                    Email 
                </label>
                <input  
                    id="email"
                    className="w-full p-3  border border-gray-100"  
                    type="email" 
                    placeholder="Email de Registro" 
                    {...register("email", {
                    required: "El Email es Obligatorio",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email No Válido'
                        }
                    })} 
                />

                {errors.email && (
                    <Error>{errors.email?.message}</Error>
                )}
              </div>
  
              <div className="mb-5">
                  <label htmlFor="date" className="text-sm uppercase font-bold">
                      Fecha Alta 
                  </label>
                  <input  
                      id="date"
                      className="w-full p-3  border border-gray-100"  
                      type="date" 
                      {...register('date', {
                                required: 'La fecha de alta es obligatoria'
                        })}
                    />

                    {errors.date && (
                        <Error>{errors.date?.message}</Error>
                    )}
              </div>
              
              <div className="mb-5">
                  <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                    Síntomas 
                  </label>
                  <textarea  
                      id="symptoms"
                      className="w-full p-3  border border-gray-100"  
                      placeholder="Síntomas del paciente" 
                      {...register('symptoms', {
                        required: 'Los síntomas son obligatorios'
                        })}
                    />

                    {errors.symptoms && (
                        <Error>{errors.symptoms?.message}</Error>
                    )}
              </div>
  
              <input
                  type="submit"
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  value='Guardar Paciente'
              />
          </form> 
      </div>
    )
  }