import { AspectRatio, Avatar, AvatarBadge, Box, Flex, Heading, Image, Skeleton, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { SizeMe } from 'react-sizeme'; //https://github.com/wojtekmaj/react-pdf/issues/129
import { Layout } from '../../components/Layout';
import { useGetUserQuery, useMeQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Profile: NextPage = ({}) => {
    const router = useRouter();
    const [{data, fetching}, ] = useGetUserQuery({
        pause: router.query.userId? false : true,
        variables: {username: router.query.userId as string}
    });
    const [{data:meData, fetching:meFetching}] = useMeQuery();
    const [pdfLoaded, setPdfLoaded] = useState(false);
    const loaded = data?.getUser && !fetching;

    useEffect(()=>{
        console.log(router);
        console.log('fetching', fetching, meFetching);
        console.log(data, meData);
    }, [])
    
    return (
        <Layout showNavbarMargin>
            <Flex flexGrow={1} flexDir="row" wrap='wrap' overflow='auto' w={'100%'} maxW='1920px' mr={'auto'} ml={'auto'}>
                <Flex flexGrow={1} alignItems='center' justifyContent='center' flexDir='column' minW='sm' w='50%'>

                    <Skeleton isLoaded={!fetching}>
                        <Box position='relative' mt={{base:10, sm:10, md:0, lg:0}}>
                            <Image src="gibbresh.png" fallbackSrc="https://via.placeholder.com/300x150" />
                            <Avatar size='lg' position='absolute' left='50%' transform='translateX(-50%)' bottom='-0.75em' name={'test user'} src="broken">                            
                                <AvatarBadge boxSize="1em" bg="green.500" />
                            </Avatar>
                        </Box>

                        <Heading as='h4' fontSize={{base:'md', sm:'lg', md:'2xl', lg:'4lx'}}  mt={8} maxW='300px'>Very Very Long User Name</Heading>
                        <Text w={'inherit'} maxW='300px' h={'auto'} fontSize={{base:'sm', sm:'sm', md:'md', lg:'lg'}}>
                            {loaded? data?.getUser.aboutMe : null}
                        </Text>
                    </Skeleton>

                </Flex>
                <Flex flexGrow={1} alignItems='center' justifyContent='center' minW='sm' w='50%' p='2em' pt={'4.5em'}>
                    <AspectRatio flex="1 1 auto" ratio={0.707} maxW='600px'>
                        <>
                            <SizeMe>
                                {({ size }) => (
                                    <Document
                                        file="https://s3-ap-southeast-1.amazonaws.com/happay-local/HVP/BILL20198261213473719445688HP.pdf"
                                        onLoadSuccess={(opt: any)=>{console.log(opt); setPdfLoaded(true);}}
                                        onLoadError={(err:any)=> console.log(err)}
                                    >
                                        <Page pageNumber={1}  width={size.width ? size.width : 1}/>
                                    </Document>
                                )}
                            </SizeMe>
                            <Skeleton position='absolute' zIndex='23' display='flex' flex='1' isLoaded={pdfLoaded}/>
                        </>
                    </AspectRatio>
                </Flex>
            </Flex>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Profile);