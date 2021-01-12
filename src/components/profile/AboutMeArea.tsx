import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useSetAboutMeMutation } from '../../generated/graphql';

interface AboutMeAreaProps {
    editable?:boolean;
    value?: string;
}

const AboutMeArea: React.FC<AboutMeAreaProps> = ({editable, value}) => {
    const [localValue, setLocalValue] = useState( value );
    const [{data, fetching}, setAboutMe] = useSetAboutMeMutation();

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        if(data?.setAboutMe?.user && !fetching){
            console.log('updating local value for about me section: ',data.setAboutMe.user.aboutMe);
            setLocalValue(data.setAboutMe.user.aboutMe as string);
        }
    }, [data, fetching]);

    console.log(fetching, data);

    return (
        <Editable 
            w='inherit'
            maxW='300px' 
            h='auto' 
            textAlign='center' 
            fontSize={{base:'sm', sm:'sm', md:'md', lg:'lg'}}
            value={localValue}
            placeholder={'Your elevator picth goes here. Max 60 characters, so use them wisely.'}
            opacity={value? 1 : 0.5}
            isDisabled={!editable} 
            onChange={(nextValue)=> setLocalValue(nextValue) }
            onSubmit={(nextValue) => {console.log('NameArea new value', nextValue); setAboutMe({text: nextValue})}}
        >
            <EditablePreview />
            <EditableInput maxLength={60}/>
        </Editable>
    );
}

export default AboutMeArea;