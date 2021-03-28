import React, {useState} from 'react'
import styled from 'styled-components';
import {Button} from '../elements/ButtonPrincipal';

import {addProyect} from '../firebase/addProyect';
import {useAuth} from '../context/AuthContext';

import {Spinner} from './Spinner';

import uuid from 'react-uuid'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import swal from 'sweetalert';

export const FormNewProyect = () => {

    const {user} = useAuth();
    const [proyect, setProyect] = useState('');
    const [buttonLoading, changeButtonLoading] = useState(false);

    const handleChange = e => {
        if(e.target.name === 'proyect'){
            setProyect(e.target.value)
        }
    }

    const handleSubmit =  e => {
        e.preventDefault();

        //Validation
        if(proyect === ''){
            toast.error('Error, campo obligatorio', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        changeButtonLoading(true);
        
        addProyect({
            nombre:proyect, 
            id:user.uid, 
            idUnico: uuid()
        }).then(()=>{
            swal({
                title: `Se agregó el proyecto correctamente`,
                icon: "success",
                button: "OK",
            });
            changeButtonLoading(false);
        })
        setProyect('');
    } 

    return (
        <>
        <ToastContainer/>
        <Form onSubmit={handleSubmit}>
            <Input type="text" 
                name='proyect'
                placeholder='Agregar proyecto...'
                value={proyect}
                onChange={handleChange}
            />
            {buttonLoading ? <Button disabled><Spinner/></Button> : <Button>Agregar proyecto</Button>}
            
        </Form>
        </>
    )
}

const Form = styled.form`
    margin-top:2rem;
`;
const Input = styled.input`
    display:block;
    margin:0 auto 5px auto;
    outline:none;
    padding:.4rem;
    border-radius:5px;
    

    @media(min-width:768px){
        border-radius:3px;
        padding:3px 5px;
        border:1px solid gray;
        color:gray;
        margin-bottom:3px;
    
        :focus{
            border:1px solid lightblue;
        }
    }
    
`;