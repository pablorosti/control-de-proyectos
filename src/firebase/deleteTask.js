import {db} from './firebaseConfig';
import swal from 'sweetalert';

export const deleteTask = async id => {
    try {
        await db.collection('tareas').doc(id).delete();
        swal("Tarea eliminada", {
            icon: "success",
        });
    } catch (error) {
        console.log('hubo un error al intentar eliminar la tarea: ', error)
    }
}