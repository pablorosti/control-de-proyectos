import {db} from './firebaseConfig';

export const deleteProject = async id => {
    try {
        await db.collection('proyectos').doc(id).delete();
        console.log('se elimino el proyecto con el id: ', id)
    } catch (error) {
        console.log('Error al eliminar el proyecto')
    }
}