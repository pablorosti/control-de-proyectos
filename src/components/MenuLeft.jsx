import React, {useState} from 'react'
import styled from 'styled-components';
import {FormNewProyect} from './FormNewProyect';
import {Button} from '../elements/ButtonPrincipal';
import {useGetProyect} from '../hooks/useGetProyect';

export const MenuLeft = ({handleClickProyect}) => {

    const [click, changeClick] = useState(false);

    const handleClick = e => {
        e.preventDefault();

        changeClick(true);
    }

    const [proyectos] = useGetProyect();

    return (
        <Aside>
            <Title>Control de proyectos</Title>

            <Button onClick={handleClick}>Nuevo proyecto</Button>

            {click ? <FormNewProyect/> : null}

            {proyectos.length !== 0 
                ? <><HR></HR>
                    <H2>Tus proyectos</H2>
                    
                    
                        {proyectos.map(proyecto => {
                            return <ListProyect key={proyecto.id}>
                                    <button onClick={handleClickProyect} value={proyecto.id}>{proyecto.nombre}</button>
                                </ListProyect>
                        })
                        }
                    <HR></HR>
                </>
                : null
            }
            
        </Aside>
    )
}

const Aside = styled.aside`

    @media(min-width:768px){
        width:12rem;
        height:90vh;
        background: #485563;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #29323c, #485563);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #29323c, #485563); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        overflow-y: scroll;
        text-align:center;
        padding:2rem ;

        ::-webkit-scrollbar{
            width:7px;
            
          }
          ::-webkit-scrollbar-thumb{
            background:tomato;
            border-radius:5px;
          }
    }
`;
const Title = styled.h1`
    text-align:center;
    margin-top:5rem;
    margin-bottom:15px;

    @media(min-width:768px){
        color:white;
        margin-bottom:1rem;
        margin-top:10px;
    }
    
`;
const ListProyect = styled.div`
    display:block;
    margin-top:5%;
    
    & > button{
        color:black;
        border:none;
        outline:none;
        background:transparent;
        text-transform:capitalize;
        display:block;
        margin: 0 auto;

        :hover{
            color:red;
            font-size:15px;
            transition:.5s all;
        }

        @media(min-width:768px){
            color:white;
            cursor:pointer;
            transition:.5s all;
    
            :hover{
                color:red;
                font-size:15px;
                transition:.5s all;
            }
        }
        
    } 
`;
const H2 = styled.h2`
    color:black;
    text-align:center;
    
    @media(min-width:786px){
        margin-top:2rem;
        color:white;
    }
    
`;
const HR = styled.div`
    border-bottom:1px solid gray;
    margin-top:2rem;

    @media(min-width:768px){
        border:none;
    }
`;