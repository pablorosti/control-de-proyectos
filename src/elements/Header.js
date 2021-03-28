import styled from 'styled-components';

export const Header = styled.header`
    position:fixed;
    top:0;
    background: #212F45;
    min-width:90%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:20px;

    @media(min-width:400px){
        min-width:95%;
    }

    @media(min-width:768px){
        position:static;
        background: #212F45;
        display:flex;
        justify-content:space-between;
        padding:20px;
        align-items:center;
        min-width:60%;
    }
    
`;