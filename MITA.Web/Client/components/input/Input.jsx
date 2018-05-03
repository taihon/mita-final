import styled from 'styled-components';

const Input = styled.input`
            box-sizing: border-box;
            display: block;
            width:100%;
            padding: 12px;
            margin-bottom:6px;
            &:placeholder{
                color: #eee;
            }
            ${props => !props.valid && props.changed && `
            border:3px solid red;
            background-color: #fda49a;
            `}
        `;
export default Input;
