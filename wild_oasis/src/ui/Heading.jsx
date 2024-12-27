import styled, { css } from 'styled-components';

const h1 = css`
    font-size: 3rem;
    font-weight: 600;
`;

const h2 = css`
    font-size: 2rem;
    font-weight: 600;
`;

const h3 = css`
    font-size: 2rem;
    font-weight: 500;
`;

const Heading = styled.h1`
    ${(props) => props.as === 'h1' && h1}
    ${(props) => props.as === 'h2' && h2}
    ${(props) => props.as === 'h3' && h3}

    line-height: 1.4;
`;

export default Heading;
