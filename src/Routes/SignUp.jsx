import React, {useState} from 'react'
import styled from 'styled-components';

import {CenterScreen} from '../elements/CenterScreen';
import {ContainerForm} from '../elements/ContainerForm';
import {DFlex} from '../elements/DFlex';
import {Input} from '../elements/Input'
import {FontLoginAndSignUp} from '../elements/FontLoginAndSignUp';
import {Label} from '../elements/Label';
import {Button} from '../elements/ButtonLoginAndSignUp';
import {Icon} from '../elements/Icon'
import {Link} from 'react-router-dom';
import {Title} from '../elements/TitleForm';

import {Spinner} from '../components/Spinner';

import {auth} from '../firebase/firebaseConfig';

import {useHistory} from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import swal from 'sweetalert';

import {Helmet} from "react-helmet";

export const SignUp = () => {
    
    const history = useHistory();
    
    const [buttonLoading, changeButtonLoading] = useState(false);

    const [name, getName] = useState('');
    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');
    const [password2, getPassword2] = useState('');
    
    const handleChange = e => {
        switch (e.target.name) {
            case 'name':
                getName(e.target.value)
                break;
            case 'email':
                getEmail(e.target.value)
                break;
            case 'password':
                getPassword(e.target.value)
                break;
            case 'password2':
                getPassword2(e.target.value)
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
        if(name === '' || email === '' || password === '' || password2 === ''){
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
            return
        }
        if(password !== password2){
            toast.error('Las contraseñas deben ser iguales', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            changeButtonLoading(false);
            return
        }
        //if we pass the validations we signUp.
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            .then(user => {
                user.user.updateProfile({
                    //aqui guardas los componentes
                           displayName: name
                })
            });
            swal({
                title: 'Bienvenido',
                text: "Se creo su cuenta exitosamente",
                icon: "success",
                button: "OK",
            });
            changeButtonLoading(false);
            history.push('/');
            
        } catch (error) {
            
            changeButtonLoading(false);

            let mensaje;
            switch (error.code) {
                case 'auth/weak-password':
                    mensaje = 'La contraseña debe de ser al menos de 6 caracteres'
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
                case 'auth/email-already-exists':
                    mensaje = 'El email ingresado ya esta en uso'
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
                case 'auth/invalid-email':
                    mensaje = 'El email ingreado no es valido'
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
                    mensaje = 'Hubo un error al intentar crear la cuenta'
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
            }
        }

    }

    return (
        <>
            <Helmet>
                <title>Crear Cuenta</title>
            </Helmet>
            <FontLoginAndSignUp>
                <ToastContainer/>
                <CenterScreen>
                    
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <Title>Administrá tus proyectos</Title>
                        <ContainerForm>
                            <Icon className="fas fa-user-plus"></Icon>
                            <DFlex>
                                <Label htmlFor="name">nombre</Label>
                                <Input type="text" 
                                    id='name' 
                                    placeholder='Ingrese su nombre'
                                    name='name'
                                    value={name}
                                    onChange={handleChange}
                                />
                            </DFlex>
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
                            <DFlex>
                                <Label htmlFor="password1">Repetir contraseña</Label>
                                <Input type="password" 
                                    id='password1' 
                                    placeholder='Repetir contraseña'
                                    name='password2'
                                    value={password2}
                                    onChange={handleChange}
                                />
                            </DFlex>
                            {buttonLoading ? <Button><Spinner/></Button> : <Button>registrate</Button>}
                            
                            <p>¿Ya tienes una cuenta?</p>
                            <ButtonLink to={'/login'}>Iniciar Sesión</ButtonLink>
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
    