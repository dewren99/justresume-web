import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import Wrapper from '../components/Wrapper';
import {useCreatePostMutation} from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const CreatePost = ({}) => {
    const router = useRouter();
    const [, createPost] = useCreatePostMutation();
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{title: '', text: ''}}
                onSubmit={async (values)=>{
                    console.log(values);
                    await createPost({input: values});
                    router.push('/');
                }}
            >
                {({isSubmitting})=>(
                    <Form>
                        <InputField name='title' placeholder='Title' label='Title'/>
                        <Box mt={4}>
                            <InputField textarea name='text' placeholder='text' label='Text'/>
                        </Box>
                        <Button mt={4} type="submit" colorScheme='teal' isLoading={isSubmitting}>Create Post</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost);