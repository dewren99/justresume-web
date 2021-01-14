import { Avatar, AvatarBadge, Box, Flex, Image, Skeleton } from '@chakra-ui/react';
import { query } from '@urql/exchange-graphcache';
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
import { useGetUserQuery, useMeQuery, useUploadResumeMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { isServer } from '../../utils/isServer';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Profile: NextPage = ({username}) => {
    const router = useRouter();
    const [resumeLink, setResumeLink] = useState('');
    const [{data, fetching}, ] = useGetUserQuery({
        pause: isServer(),
        variables: { username: username?? '' }
    });
    const [{data:meData, fetching:meFetching}] = useMeQuery({
        pause: isServer()
    });
    const [{data:resumeData, fetching:resumeFetching}, uploadResume] = useUploadResumeMutation();
    const [userIsOwner, setUserIsOwner] = useState<boolean>(false);

    const loaded = data?.getUser && !fetching;
    const loadedEmpty = !data?.getUser && !fetching

    console.log('useGetUserQuery', fetching);
    console.log('useMeQuery', meFetching);
    console.log('username', username);

    useEffect(() => {
        if(data?.getUser?.resume?.link){
            setResumeLink(data?.getUser?.resume?.link);
        }
    }, [data]);

    useEffect(() => {
        if(resumeData?.uploadResume?.link){
            setResumeLink(resumeData?.uploadResume?.link);
        }
    }, [resumeData]);

    useEffect(()=>{
        const currentUserId = meData?.me?.id;
        const ProfileId = data?.getUser?.id;
        console.log('username (router.query)',router.query.username);
        console.log(meData, currentUserId, ProfileId);
        if(currentUserId) setUserIsOwner(currentUserId === ProfileId);
    }, [data, meData]);
    
    if(loadedEmpty){
        return(
            <UserNotFound username={username}/>
        );
    }
    return (
        <Layout showNavbarMargin>
            <Flex flexGrow={1} flexDir="row" wrap='wrap' overflow='auto' w={'100%'} maxW='1920px' mr={'auto'} ml={'auto'}>
                <Flex flexGrow={1} alignItems='center' justifyContent='center' flexDir='column' minW='sm' w='50%'>

                    <Skeleton isLoaded={!fetching}>
                        <Box position='relative' mt={{base:10, sm:10, md:0, lg:0}}>
                            <Image src="http://broken.test" fallbackSrc="https://via.placeholder.com/300x150" />
                            <Avatar size='lg' position='absolute' left='50%' transform='translateX(-50%)' bottom='-0.75em' name={'test user'} src="http://broken.test">                            
                                <AvatarBadge boxSize="1em" bg="green.500" />
                            </Avatar>
                        </Box>
                        <NameArea value={loaded? `${data?.getUser?.firstName} ${data?.getUser?.lastName}` : ''} editable={userIsOwner}/>
                        <AboutMeArea value={loaded? `${data?.getUser?.profile?.aboutMe}` : ''} editable={userIsOwner}/>
                    </Skeleton>

                </Flex>
                <Flex flexGrow={1} alignItems='center' justifyContent='center' minW='sm' w='50%' p='2em' pt={'4.5em'}>
                    <PdfViewArea link={resumeLink} onClick={uploadResume} editable={userIsOwner} fetchingLink={!loaded || resumeFetching}/>
                </Flex>
            </Flex>
        </Layout>
    );
}

Profile.getInitialProps = async (props) => {
    console.log('getInitialProps PROPS:', props.pathname, props.query)
    return props.query;
  }

export default withUrqlClient(createUrqlClient, {ssr: true})(Profile);