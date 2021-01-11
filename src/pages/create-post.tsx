import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import userIsAuth from '../utils/userIsAuth';

const CreatePost = ({}) => {
    const router = useRouter();
    userIsAuth();
    const [, createPost] = useCreatePostMutation();
    
    return (
        <Layout>
            <Formik
                initialValues={{title: '', text: ''}}
                onSubmit={async (values)=>{
                    console.log(values);
                    const {error} = await createPost({input: values});
                    if(!error){
                        router.push('/');
                    }
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
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost);