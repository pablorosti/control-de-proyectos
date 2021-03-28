import {db} from './firebaseConfig';

export const addProyect = async ({nombre, id, idUnico}) =>{
    try {
        await db.collection('proyectos').add({nombre:nombre, id:id, idUnico: idUnico})
        console.log('se agrego el proyecto correctamente')
    } catch (error) {
        console.log(error)
    }
    
}