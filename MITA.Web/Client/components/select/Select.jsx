import Input from '../input/Input';

export const Select = Input.extend`
&:first-of-type {
    margin-top:6px;
}
`.withComponent("select");
