import styled from 'styled-components';

export const Button = styled.button`
    display:block;
    background:tomato;
    color:white;
    border:none;
    border-radius:5px;
    padding:8px 15px;
    outline:none;
    font-weight:bold;
    margin:0 auto;
    width:200px;
    text-transform:capitalize;

    @media(min-width:768px){
        width:100%;
        cursor:pointer;
    }
    
`;