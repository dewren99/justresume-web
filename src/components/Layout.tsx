import { Flex } from '@chakra-ui/react';
import React from 'react'
import NavBar from './NavBar';
import Wrapper from './Wrapper';

interface LayoutProps {
    showNavbarMargin?: boolean
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    showNavbarMargin
}) => {
    return (
        <Wrapper>
            <NavBar/>
            {showNavbarMargin? <Flex h={'4.5em'} maxH={'4.5em'} w={'100%'}/> : null}
            {children}
        </Wrapper>
    );
}