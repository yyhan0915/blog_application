import React, { ReactElement } from 'react';
import styled, { StyledComponent } from 'styled-components';

export interface responsiveProps {
    children: ReactElement[] | Element;
}
const ResponsiveBlock: StyledComponent<'div', any, {}, never> = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 1024px;
    margin: 0 auto;

    @media (max-width: 1024px) {
        width: 768px;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Responsive: React.FC<responsiveProps> = ({ children, ...rest }) => {
    return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
