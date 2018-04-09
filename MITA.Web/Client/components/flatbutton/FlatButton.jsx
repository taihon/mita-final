import styled from 'styled-components';
import { colors } from '../styles';

export const FlatButton = styled.button`
    background-color: ${colors.dark};
    border: none;
    color: white;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;
`;
