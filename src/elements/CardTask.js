import styled from 'styled-components';

export const CardTask = styled.div`
    display:grid;
    grid-template-columns:2fr 1fr;
    align-items:center;
    margin:10px 1rem;
    background:rgb(218, 218, 218);
    padding:10px;
    border-radius:5px;
    border:none;

    @media(min-width:768px){
        margin:.5rem;
    }
   
`;