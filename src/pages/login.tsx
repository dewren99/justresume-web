import React from 'react'
import {Form, Formik} from 'formik'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';

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
                        <Button mt={4} type="submit" colorScheme='teal' isLoading={isSubmitting}>Login</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(Login);