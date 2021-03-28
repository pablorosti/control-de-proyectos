import React, {useState} from 'react';
import styled from 'styled-components';

import {CenterScreen} from '../elements/CenterScreen';
import {ContainerForm} from '../elements/ContainerForm';
import {DFlex} from '../elements/DFlex';
import {Input} from '../elements/Input'
import {FontLoginAndSignUp} from '../elements/FontLoginAndSignUp';
import {Label} from '../elements/Label';
import {Button} from '../elements/ButtonLoginAndSignUp';
import {Icon} from '../elements/Icon'
import {Title} from '../elements/TitleForm';
import {Link} from 'react-router-dom';

import {Spinner} from '../components/Spinner';

import {auth} from '../firebase/firebaseConfig';

import {useHistory} from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import swal from 'sweetalert';

import {Helmet} from "react-helmet";

export const Login = () => {

    const history = useHistory();
    
    const [buttonLoading, changeButtonLoading] = useState(false);

    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');
    
    const handleChange = e => {
        switch (e.target.name) {
            case 'email':
                getEmail(e.target.value)
                break;
            case 'password':
                getPassword(e.target.value)
                break;
            default:
                break;
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        changeButtonLoading(true)

        //validations
        const regex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i
        if(!regex.test(email)){
            
            toast.error('Error, ingresa un correo valido', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

            changeButtonLoading(false);
            return;
        }
        if(email === '' || password === ''){
            toast.error('Todos los campos son obligatorios', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

            changeButtonLoading(false);
            return;
        }
        //if we pass the validations we signUp.
        try {
            await auth.signInWithEmailAndPassword(email, password);
            changeButtonLoading(false);
            swal({
                title: `Bienvenido`,
                icon: "success",
                button: "OK",
            });
            history.push('/');
            
        } catch (error) {
            
            changeButtonLoading(false);

            let mensaje;
            switch (error.code) {
                case 'auth/wrong-password':
                    mensaje = 'Contraseña incorrecta'
                    toast.error(mensaje, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    break;
                case 'auth/user-not-found':
                    mensaje = 'El email que ingreso no esta registrado'
                    toast.error(mensaje, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    break;
                default:
                    break;
            }
        }

    }

    return (
        <>
            <Helmet>
                <title>Iniciar Sesión</title>
            </Helmet>
            <FontLoginAndSignUp>
                <ToastContainer/>
                <CenterScreen>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <Title>Administrá tus proyectos</Title>
                        <ContainerForm>
                            <Icon className="fas fa-user-circle"></Icon>
                            
                            <DFlex>
                                <Label htmlFor="email">email</Label>
                                <Input type="email" 
                                    id='email' 
                                    placeholder='Ingrese su email'
                                    name='email'
                                    value={email}
                                    onChange={handleChange}
                                />
                            </DFlex>
                            <DFlex>
                                <Label htmlFor="password">contraseña</Label>
                                <Input type="password" 
                                    id='password' 
                                    placeholder='Ingrese su contraseña'
                                    name='password'
                                    value={password}
                                    onChange={handleChange}
                                />
                            </DFlex>
                            {buttonLoading ? <Button disabled><Spinner/></Button> : <Button>Ingresar</Button>}
                            <p>¿No tienes una cuenta?</p>
                            <ButtonLink to={'/signUp'}>Crear cuenta</ButtonLink>
                        </ContainerForm>
                    </form>
                </CenterScreen>
            </FontLoginAndSignUp>
        </>
    )
}

const ButtonLink = styled(Link)`
    color:gray;
    text-decoration:none;
`;
    

