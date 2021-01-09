import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({}) => {
    const [complete, setComplete] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation();
        return (
            <Wrapper variant='small'>
                <Formik
                    initialValues={{email: ''}}
                    onSubmit={async (values)=>{
                        await forgotPassword(values);
                        setComplete(true);
                    }}
                >
                    {({isSubmitting})=> complete? <Box>If an account with that email exists, we will sent you an email </Box> : (
                        <Form>
                            <InputField name='email' placeholder='email' label='Email'/>
                            <Button mt={4} type="submit" colorScheme='teal' isLoading={isSubmitting}>Request Password Change</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword);