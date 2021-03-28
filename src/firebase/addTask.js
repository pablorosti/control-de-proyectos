import {db} from './firebaseConfig';

export const addTask = async ({task, name, id, idUnico}) => {
    try {
        await db.collection('tareas').add({tarea:task, nombreProyecto: name, idProyecto:id, idUnicoProyecto:idUnico})
        console.log('se agrego la tarea correctamente.')
    } catch (error) {
        console.log('error al agregar la tarea: ', error)
    }
}  