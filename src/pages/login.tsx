import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useLoginMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    return (
        <Layout>
            <Flex grow={1} alignItems='center' justifyContent='center'>
                <Formik
                    initialValues={{usernameOrEmail:'', password: ''}}
                    onSubmit={async (values, { setErrors })=>{
                        console.log(values);
                        const res = await login(values);
                        if(res.data?.login.errors) {
                            setErrors( toErrorMap(res.data.login.errors) );
                        }
                        else if(res.data?.login.user){
                            if(typeof router.query.next === 'string'){
                                router.push(router.query.next);
                            }
                            else{
                                router.push('/profile/');
                            }
                        }
                    }}
                >
                    {({isSubmitting})=>(
                        <Box width={{sm:'sm', md: 'md', lg:'md'}}>
                            <Form>
                                <InputField name='usernameOrEmail' placeholder='username or email' label='Username or Email'/>
                                <Box mt={4}>
                                    <InputField name='password' placeholder='password' label='Password' type='password'/>
                                </Box>
                                <Flex alignItems='center' mt={4}>
                                    <NextLink href="/forgot-password">
                                        <Link>forgot password?</Link>
                                    </NextLink>
                                    <Button ml={'auto'} type="submit" isLoading={isSubmitting}>Login</Button>
                                </Flex>
                            </Form>
                        </Box>
                    )}
                </Formik>
            </Flex>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(Login);