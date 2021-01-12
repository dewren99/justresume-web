import { Flex, Link, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { largeHeaderSize, largeSubHeaderSize } from "../constants";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  // const [variables, setVariables] = useState({limit:10, cursor: null as string | null})
  // const [{data, fetching}] = usePostsQuery({variables});

  return (
    <Layout>
      <Flex grow={1} alignItems='center' justify='center' direction='column'>
          <Text fontSize={largeHeaderSize} fontWeight='bold'>Just Resume</Text>
          <Flex>
            <Text fontSize={largeSubHeaderSize} fontWeight='bold'>No 🐂</Text>
            <Text fontSize={largeSubHeaderSize} fontWeight='bold'>, Just Resume </Text>
          </Flex>
      </Flex>
      <Flex m={2}>
        <Text fontSize={{base:'sm', sm:'sm', md:'md', lg:'md'}}>Passion Project by <Link href="http://www.denizevrendilek.com" isExternal>Deniz Evrendilek</Link></Text>
      </Flex>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
