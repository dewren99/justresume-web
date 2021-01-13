import { Flex, Text } from '@chakra-ui/react';
import React from 'react'
import { largeHeaderSize, largeSubHeaderSize } from '../../constants';
import { Layout } from '../Layout';

interface UserNotFoundProps {
    username?: string | undefined
}

const UserNotFound: React.FC<UserNotFoundProps> = ({ username }) => {
        return (
            <Layout>
                <Flex flexGrow={1} flexDir="column" w={'100%'} maxW='1920px' mr={'auto'} ml={'auto'} justifyContent='center' alignItems='center' p={{base:4, sm:4}}>
                    <Text fontWeight='bold' fontSize={largeHeaderSize}>
                        Hol' Up ✋
                    </Text>
                    <Text fontWeight='bold' fontSize={largeSubHeaderSize}>
                        {username? `Username "${username}" not found` : 'No user found'}
                    </Text>
                </Flex>
            </Layout>
        );
}

export default UserNotFound;