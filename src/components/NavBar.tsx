import { Box, Button, Flex, Heading, Link, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import {useLogoutMutation, useMeQuery} from '../generated/graphql';
import { isServer } from '../utils/isServer';
import ColorModeToggle from './ColorModeToggle';

interface NavBarProps {

}

const mr = {base:1, md: 2, lg: 3};

const NavBar: React.FC<NavBarProps> = () => {
    const [{fetching: logoutFetching}, logout] = useLogoutMutation();
    const [{data, fetching}] = useMeQuery({
        pause: isServer(),
    });
    let body = null;

    // if(fetching){
    //     body = (
    //         null
    //     );
    // }
    // else if(!data?.me){
        body = (
            <>
                <ColorModeToggle mr={mr}/>
                <NextLink href='/register'>
                    <Button mr={mr}>Register</Button>
                </NextLink>
                <NextLink href='/login'>
                    <Button>Login</Button>
                </NextLink>
            </>
        );
    // }
    // else{
    //     body = (
    //         <Flex>
    //             <Box mr={4}>{data.me.username}</Box>
    //             <Button variant='link' onClick={()=>logout()} isLoading={logoutFetching}>Logout</Button>
    //         </Flex>
    //     );
    // }

    return (
        <Flex position='fixed' zIndex='sticky' p={4} w="100%" h='4.5rem' alignItems='center'>
            <Heading size='md'>Just Resume</Heading>
            <Flex ml={'auto'} alignItems='center' flexDirection='row' wrap='nowrap'>
                {body}
            </Flex>
        </Flex>
    );
}


export default NavBar;