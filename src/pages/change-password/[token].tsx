import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { InputField } from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const ChangePassword: NextPage<{token: string}> = ({token}) => {
    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState('');
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{newPassword: ''}}
                onSubmit={async (values, { setErrors })=>{
                    const res = await changePassword(newPassword: values.newPassword, token);
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
                        {tokenError? <Box>{tokenError}</Box> : null}
                        <Button mt={4} type="submit" colorScheme='teal' isLoading={isSubmitting}>Change Password</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

ChangePassword.getInitialProps = ({query}) => {
    return {
        token: query.token as string
    };
};

export default withUrqlClient(createUrqlClient, {ssr: false})(ChangePassword);