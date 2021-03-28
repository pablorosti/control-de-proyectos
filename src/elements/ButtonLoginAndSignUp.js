import styled from 'styled-components';

export const Button = styled.button`
    background: #16222A;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #3A6073, #16222A);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #3A6073, #16222A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    padding:10px 10px;   
    border:none;
    border-radius:5px;
    color:white;
    font-weight:bold;
    text-transform:uppercase;
    width:100%;
    outline:none;
    cursor:pointer;
    margin:10px 0;
    font-size:15px;
`;