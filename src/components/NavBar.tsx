import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import {useLogoutMutation, useMeQuery} from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = () => {
    const [{fetching: logoutFetching}, logout] = useLogoutMutation();
    const [{data, fetching}] = useMeQuery({
        pause: isServer(),
    });
    let body = null;

    if(fetching){
        body = (
            null
        );
    }
    else if(!data?.me){
        body = (
            <>
                <NextLink href='/login'>
                    <Link mr={4}>Login</Link>
                </NextLink>
                <NextLink href='/register'>
                    <Link>Register</Link>
                </NextLink>
            </>
        );
    }
    else{
        body = (
            <Flex>
                <Box mr={4}>{data.me.username}</Box>
                <Button variant='link' onClick={()=>logout()} isLoading={logoutFetching}>Logout</Button>
            </Flex>
        );
    }

    return (
        <Flex bg='grey' p={4}>
            <Box ml={'auto'}>
                {body}
            </Box>
        </Flex>
    );
}


export default NavBar;