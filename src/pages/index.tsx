import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from 'next/link';
import React, { useState } from "react";
import Emoji from "../components/Emoji";
import { Layout } from "../components/Layout";
import Wrapper from "../components/Wrapper";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  // const [variables, setVariables] = useState({limit:10, cursor: null as string | null})
  // const [{data, fetching}] = usePostsQuery({variables});

  return (
    <Layout>
      <Flex grow={1} alignItems='center' justify='center' direction='column'>
          <Text fontSize={{ base: "5xl", sm: '6xl', md: "7xl", lg: "8xl" }} fontWeight='bold'>Just Resume</Text>
          <Flex>
            <Text fontSize={{ base: "2xl", sm: '3xl', md: "4xl", lg: "5xl" }} fontWeight='bold'>No 🐂</Text>
            <Text fontSize={{ base: "2xl", sm: '3xl', md: "4xl", lg: "5xl" }} fontWeight='bold'>, Just Resume </Text>
          </Flex>
      </Flex>
      <Flex m={2}>
        <Text fontSize={{base:'sm', sm:'sm', md:'md', lg:'md'}}>Passion Project by <Link href="http://www.denizevrendilek.com" isExternal>Deniz Evrendilek</Link></Text>
      </Flex>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
