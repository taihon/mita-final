import styled from 'styled-components';

export const TreeWrapper = styled.div`
&, & ul, & li{
    position: relative
}
& ul { 
    list-style:none;
    padding-left: 32px;
}
& li::before, & li::after {
    content: "";
    position: absolute;
    left: -12px;
}
& li::before {
    border-top: 1px solid black;
    top: 9px;
    width: 8px;
    height: 0;
}
& li::after {
    border-left: 1px solid black;
    height: 100%;
    width: 0;
    top: 2px;
}
& ul > li:last-child::after{
    height: 8px;
}
& li > div{
    border: 1px solid black;
}
`;
