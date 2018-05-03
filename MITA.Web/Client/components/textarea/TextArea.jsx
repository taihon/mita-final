import Input from '../input/Input';

export const TextArea = Input.extend`
&:first-of-type {
    margin-top:6px;
}
`.withComponent("textarea");
