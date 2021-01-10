import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { InputField } from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';

const ChangePassword: NextPage = () => {
    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState('');
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{newPassword: ''}}
                onSubmit={async (values, { setErrors })=>{
                    const res = await changePassword({
                        newPassword: values.newPassword, 
                        token: typeof router.query.token === 'string'? router.query.token : '',
                    });
                    if(res.data?.changePassword.errors) {
                        const errorMap = toErrorMap(res.data.changePassword.errors);
                        if('token' in errorMap) {
                            setTokenError(errorMap.token);
                        }
                        setErrors( errorMap );
                    }
                    else if(res.data?.changePassword.user){
                        router.push('/');
                    }
                }}
            >
                {({isSubmitting})=>(
                    <Form>
                        <InputField name='newPassword' placeholder='New Password' label='New Password'/>
                        {tokenError? 
                            (
                                <Flex>
                                    <Box mr={2}>
                                        {tokenError}
                                    </Box>
                                    <NextLink href="/forgot-password">
                                        <Link>goto forgot password</Link>
                                    </NextLink>
                                </Flex>
                            ) : null}
                        <Button mt={4} type="submit" colorScheme='teal' isLoading={isSubmitting}>Change Password</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient, {ssr: false})(ChangePassword);