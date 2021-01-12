import { Button, Flex, Heading, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import ColorModeToggle from './ColorModeToggle';

interface NavBarProps {

}

const m = {base:1, md: 2, lg: 3};

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
                <NextLink href='/register'>
                    <Button variant='ghost' mr={m}>Register</Button>
                </NextLink>
                <NextLink href='/login'>
                    <Button>Login</Button>
                </NextLink>
            </>
        );
    }
    else{
        body = (
            <Flex alignItems='center'>
                <NextLink href='/profile/'>
                    <Button variant='link'>{data.me.username}</Button>
                </NextLink>
                <NextLink href='/'>
                    <Button position='relative' bottom='1px' ml={m} variant='ghost' onClick={()=>logout()} isLoading={logoutFetching}>Logout</Button>
                </NextLink>
            </Flex>
        );
    }

    return (
        <Flex position='fixed' zIndex='sticky' p={4} w="100%" h='4.5rem' alignItems='center' backgroundColor='inherit'>
            <NextLink href='/'>
                <Link><Heading size='md'>Just Resume</Heading></Link>
            </NextLink>
            <Flex ml={'auto'} alignItems='center' flexDirection='row' wrap='nowrap'>
                <ColorModeToggle variant='ghost' mr={m}/>
                {body}
            </Flex>
        </Flex>
    );
}


export default NavBar;