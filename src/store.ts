import { create } from 'zustand'    ////// Crear el store
import { createJSONStorage, devtools, persist } from 'zustand/middleware'   //// Con persist se tiene un estado persistente
import { v4 as uuidv4 } from 'uuid'    ////   El id
import { DraftPatient, Patient } from './types'

type PatientState = {
    patients: Patient[]
    activeId: Patient['id']     //// Paciente Activo   
    addPatient: (data: DraftPatient) => void    ////// Esta es una funcion
    deletePatient: (id: Patient['id']) => void  /////  Para eliminar el paciente
    getPatientById: (id: Patient['id']) => void  /// Tomar el id
    updatePatient: (data: DraftPatient) => void

    ///reset()
}


/// Se crea esta forma para hacer un store
/// export const usePatientStore = create<PatientState>((set, get) => )({  } 
/// Tambien puede ser asi
/// export const usePatientStore = create<PatientState>((set) => )({   set - Con esto se escribe en patients 
    ////  const newPatient = createPatient(data)
    ////  set((state) => ({     Con este se selecciona el state 
    ////     patients: [...state.patients, newPatients]
    ////  }))
/// } 




const createPatient = (patient: DraftPatient) : Patient => {   /// Creo una funcion que es de tipo patient y devuelve un objeto de tipo Patient
    return { ...patient, id: uuidv4() }   /// Devuelve una copia de patient y se le agrega el id
}



export const usePatientStore = create<PatientState>()(   ///// Aqui se crea el store, aqui para decir que la funcion es de tipo PatientState y se crea asi create<PatientState>
    devtools(  /// Se agrega devtools
    persist( (set) => ({
        
        patients: [],  //// Crear un arreglo de pacientes - patients: []   es de tipo PatientState
        activeId: '',  //// Aqui esta el valor de activeId


        addPatient: (data) => {      ////// Agregar la funcion
            const newPatient = createPatient(data)
            set((state) => ({
                patients: [...state.patients, newPatient]
            }))
        },
        deletePatient: (id) => {
            set((state) => ({
                patients: state.patients.filter( patient => patient.id !== id )
            }))
        },
        getPatientById: (id) => {
            set(() => ({
                activeId: id
            }))
        },
        updatePatient: (data) => {    ///// Actualiza el paciente
            set((state) => ({
                patients: state.patients.map( patient => patient.id === state.activeId ? {id: state.activeId, ...data } : patient),
                activeId: ''  /// Se actualiza el activeId
            }))
        }
    }), {

        ///  Toda la informacion del Localstorage es almacenada en estas variables
        ///// patients: [], 
        ///// activeId: '',
        name: 'patient-storage'   
        /// Tambien se puede hacer asi
        //storage: createJSONStorage(() => sessionStorage)
        //storage: createJSONStorage(() => localStorage)
    })
))