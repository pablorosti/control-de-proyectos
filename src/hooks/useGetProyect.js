import {db} from '../firebase/firebaseConfig';
import {useState, useEffect} from 'react';
import {useAuth} from '../context/AuthContext';

export const useGetProyect = () => {
    const {user} = useAuth();
    const [proyect, setProyect] = useState([]);

    useEffect(()=>{
        try {
            const unSuscribe = db.collection('proyectos')
            .where('id', '==', user.uid)
            .orderBy('nombre', 'asc')
            .onSnapshot(snapshot => {
                setProyect(snapshot.docs.map(proyecto => {
                    return {...proyecto.data(), id:proyecto.id}
                }))
            })
            return unSuscribe;
        } catch (error) {
            console.log('no se puedo recuperar los proyectos desde useGetProyect')
        }
        
    }, [user])

    return [proyect]
}