import { Box, Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useRegisterMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

interface registerProps {}

const Register: React.FC<registerProps> = () => {
    const router = useRouter();
    const [, register] = useRegisterMutation();
    return (
        <Layout>
            <Flex grow={1} alignItems='center' justifyContent='center'>
                <Formik
                    initialValues={{username:'', firstName:'', lastName:'', email:'', password: ''}}
                    onSubmit={async (values, { setErrors })=>{
                        console.log(values);
                        const res = await register({options: values});
                        if(res.data?.register.errors) {
                            setErrors( toErrorMap(res.data.register.errors) );
                        }
                        else if(res.data?.register.user){
                            router.push('/');
                        }
                    }}
                >
                    {({isSubmitting})=>(
                        <Box width={{sm:'sm', md: 'md', lg:'md'}}>
                            <Form>
                                <InputField name='firstName' placeholder='First Name' label='First Name' required/>
                                <Box mt={4}>
                                    <InputField name='lastName' placeholder='Last Name' label='Last Name' required/>
                                </Box>
                                <Box mt={4}>
                                    <InputField name='username' placeholder='username' label='Username' required/>
                                </Box>
                                <Box mt={4}>
                                    <InputField name='email' placeholder='email' label='Email' required/>
                                </Box>
                                <Box mt={4}>
                                    <InputField name='password' placeholder='password' label='Password' type='password' required/>
                                </Box>
                                <Flex>
                                    <Button ml='auto' mt={4} type="submit" colorScheme='teal' isLoading={isSubmitting}>Register</Button>
                                </Flex>
                            </Form>
                        </Box>
                    )}
                </Formik>
            </Flex>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(Register);