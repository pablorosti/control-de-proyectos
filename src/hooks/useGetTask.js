import {db} from '../firebase/firebaseConfig';
import {useState, useEffect} from 'react';
import {useAuth} from '../context/AuthContext';

export const useGetTask = () => {
    const [task, setTask] = useState([]);
    const {user} = useAuth();

    useEffect(()=>{
        try {
            const unSuscribe = db.collection('tareas')
            .where('idProyecto', '==', user.uid)
            .orderBy('tarea', 'asc')
            .onSnapshot(snapshot => {
                setTask(snapshot.docs.map(task => {
                    return {...task.data(), id:task.id}
                }))
            })
            return unSuscribe;
        } catch (error) {
            console.log('no se puedo recuperar los proyectos desde useGetProyect')
        }
   
    }, [user])

    return [task]
}