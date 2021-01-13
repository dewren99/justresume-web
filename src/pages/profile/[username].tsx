import { Avatar, AvatarBadge, Box, Flex, Image, Skeleton } from '@chakra-ui/react';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { Layout } from '../../components/Layout';
import AboutMeArea from '../../components/profile/AboutMeArea';
import NameArea from '../../components/profile/NameArea';
import PdfViewArea from '../../components/profile/PdfViewArea';
import UserNotFound from '../../components/profile/UserNotFound';
import { useGetUserQuery, useMeQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { isServer } from '../../utils/isServer';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Profile: NextPage = () => {
    const router = useRouter();
    const [{data, fetching}, ] = useGetUserQuery({
        pause: router.query.username? false : true,
        variables: { username: router.query.username as string }
    });
    const [{data:meData, fetching:meFetching}] = useMeQuery({
        pause: isServer()
    });
    const [userIsOwner, setUserIsOwner] = useState<boolean>(false);

    const loaded = data?.getUser && !fetching;
    const loadedEmpty = !data?.getUser && !fetching;


    useEffect(()=>{
        console.log(router.query.username);
        console.log(meData);
        if(!router.query.username && meData?.me){
            router.replace(`/profile/${meData?.me?.username}`);
        }
        setUserIsOwner(router?.query?.username === meData?.me?.username);
    }, [router.query.username, meData]);
    
    if(loadedEmpty){
        return(
            <UserNotFound username={router.query.username as string}/>
        );
    }
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
                        <NameArea value={loaded? `${data?.getUser?.firstName} ${data?.getUser?.lastName}` : ''} editable={userIsOwner}/>
                        <AboutMeArea value={loaded? `${data?.getUser?.aboutMe}` : ''} editable={userIsOwner}/>
                    </Skeleton>

                </Flex>
                <Flex flexGrow={1} alignItems='center' justifyContent='center' minW='sm' w='50%' p='2em' pt={'4.5em'}>
                    <PdfViewArea link={"https://s3-ap-southeast-1.amazonaws.com/happay-local/HVP/BILL20198261213473719445688HP.pdf"}/>
                </Flex>
            </Flex>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Profile);