import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from 'next/link';
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({limit:10, cursor: null as string | null})
  const [{data, fetching}] = usePostsQuery({variables});

  let body;

  if(!fetching && !data){
    body =  <div>No Post Found</div>;
  }
  else if(fetching){
    body = (
      <div>Loading...</div>
    );
  }
  else{
    body = (
      <>
        <Stack spacing={10}>
          {
            data!.posts.posts.map(post => {
              return(
                <Box p={6} shadow="md" borderWidth="1px">
                  <Heading fontSize='xl'>{post.title}</Heading>
                  <Text>{post.textSnippet}</Text>
                </Box>
              );
            })
          }
        </Stack>
        {data && data.posts.hasMore? <Flex m={4}><Button isLoading={fetching} onClick={()=>{
          setVariables({
            limit: variables.limit,
            cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
          });
        }}>load more</Button></Flex> : null}
      </>
    );
  }

  return (
    <Layout>
      <NextLink href='/create-post'>
        <Link>Create Post</Link>
        {body}
      </NextLink>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
