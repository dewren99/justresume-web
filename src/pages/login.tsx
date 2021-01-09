import { Box, Button, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{usernameOrEmail:'', password: ''}}
                onSubmit={async (values, { setErrors })=>{
                    console.log(values);
                    const res = await login(values);
                    if(res.data?.login.errors) {
                        setErrors( toErrorMap(res.data.login.errors) );
                    }
                    else if(res.data?.login.user){
                        router.push('/');
                    }
                }}
            >
                {({isSubmitting})=>(
                    <Form>
                        <InputField name='usernameOrEmail' placeholder='username or email' label='Username or Email'/>
                        <Box mt={4}>
                            <InputField name='password' placeholder='password' label='Password' type='password'/>
                        </Box>
                        <NextLink href="/forgot-password">
                            <Link>forgot password?</Link>
                        </NextLink>
                        <Button mt={4} type="submit" colorScheme='teal' isLoading={isSubmitting}>Login</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(Login);