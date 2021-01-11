import { AspectRatio, Avatar, AvatarBadge, Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { SizeMe } from 'react-sizeme'; //https://github.com/wojtekmaj/react-pdf/issues/129
import { Layout } from '../../components/Layout';
import { useMeQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { isServer } from '../../utils/isServer';
import userIsAuth from '../../utils/userIsAuth';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface ProfileProps {

}

const Profile: React.FC<ProfileProps> = ({}) => {
    const router = useRouter();
    userIsAuth();
    const [{data, fetching}] = useMeQuery({
        pause: isServer(),
    });

    useEffect(()=>{
        console.log(router);
        console.log(data);
    })
    
    return (
        <Layout showNavbarMargin>
            <Flex flexGrow={1} flexDir="row" wrap='wrap' overflow='auto' w={'100%'} maxW='1920px' mr={'auto'} ml={'auto'}>
                <Flex flexGrow={1} alignItems='center' justifyContent='center' flexDir='column' minW='sm' w='50%'>
                    <Box position='relative' mt={{sm:6}}>
                        <Image src="gibbresh.png" fallbackSrc="https://via.placeholder.com/300x150" />
                        <Avatar size='lg' position='absolute' left='50%' transform='translateX(-50%)' bottom='-0.75em' name={'test user'} src="broken">                            
                            <AvatarBadge boxSize="1em" bg="green.500" />
                        </Avatar>
                    </Box>
                    <Heading as='h4' fontSize={{base:'md', sm:'lg', md:'2xl', lg:'4lx'}}  mt={8} maxW='300px'>Very Very Long User Name</Heading>
                    <Text w={'inherit'} maxW='300px' h={'auto'} fontSize={{base:'sm', sm:'sm', md:'md', lg:'lg'}}>
                        testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,
                    </Text>
                </Flex>
                <Flex flexGrow={1} alignItems='center' justifyContent='center' minW='sm' w='50%' p='2em' pt={'4.5em'}>
                    <AspectRatio flex="1 1 auto" ratio={0.707} maxW='600px'>
                        {/* <Flex maxH='75vh' style={{backgroundColor:'#fafafa'}}>PDF</Flex> */}
                        <SizeMe>
                            {({ size }) => (
                                <Document
                                    file="https://s3-ap-southeast-1.amazonaws.com/happay-local/HVP/BILL20198261213473719445688HP.pdf"
                                    onLoadSuccess={(opt: any)=>console.log(opt)}
                                    onLoadError={(err:any)=> console.log(err)}
                                >
                                    <Page pageNumber={1}  width={size.width ? size.width : 1} />
                                </Document>
                            )}
                        </SizeMe>
                    </AspectRatio>
                </Flex>
            </Flex>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(Profile);