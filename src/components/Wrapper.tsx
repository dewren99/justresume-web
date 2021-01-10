import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const bg = useColorModeValue("white", "black");
    const text = useColorModeValue("black", "white");
    return (
        <Flex mx="0" w="100vw" h="100vh" direction='column' color={text} bgColor={bg}>
            {children}
        </Flex>
    );
}

export default Wrapper;