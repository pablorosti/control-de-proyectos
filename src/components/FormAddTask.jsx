import React, {useState} from 'react'
import styled from 'styled-components';
import {addTask} from '../firebase/addTask';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FormAddTask = ({name, id, idUnico}) => {

    const [task, changeTask] = useState('');



    const handleChange = e => {
        if(e.target.name === 'task'){
            changeTask(e.target.value)
        }
    }
 
    const handleSubmit = e => {
        e.preventDefault();

        //validation
        if(task === ''){
            toast.error('Error, debe agregar una tarea', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        
        addTask({
            task:task, 
            name:name, 
            id:id, 
            idUnico: idUnico
        })
        changeTask('')
    }
 
    return (
        <>
            <ToastContainer/>
            <Form onSubmit={handleSubmit}>
            <input type="text" 
                placeholder='Nombre tarea...'
                name='task'
                value={task}
                onChange={handleChange}
            />
            <button >Agregar tarea</button> 
            </Form>
        </>
    )
}

const Form = styled.form`
    background: #1B3A4B;
    padding:2rem;
    & > input{
        display:block;
        margin:0 auto 5px auto;
        outline:none;
        padding:.4rem;
        border-radius:5px;
        border:none;
    }
    & > button{
        display:block;
        margin: 0 auto;
        width:200px;
        outline:none;
        background:tomato;
        border:none;
        border-radius:5px;
        padding:8px 15px;
        color:white;
        font-weight:bold;
        cursor:pointer;
        text-transform:capitalize;
    }

    @media(min-width:768px){
        background: #1B3A4B;
        padding:2rem 5rem;

        & > input{
            width:100%;
            margin-bottom:.5rem;
            outline:none;
            padding:.2rem;
            border:1px solid black;
            :focus{
                border:1px solid lightblue;
            }
        }
        & > button{
            display:block;
            margin: 0 auto;
            width:101%;
            outline:none;
            background:tomato;
            border:none;
            border-radius:5px;
            padding:.3rem 0;
            color:white;
            font-weight:bold;
            cursor:pointer;
            text-transform:capitalize;
        }
    }
    
`;

