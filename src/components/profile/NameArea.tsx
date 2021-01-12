import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSetFullNameMutation } from '../../generated/graphql';

interface NameAreaProps {
    editable?:boolean;
    value?: string;
}

const NameArea: React.FC<NameAreaProps> = ({editable, value}) => {
    const [localValue, setLocalValue] = useState( value );
    const [{data, fetching}, setFullName] = useSetFullNameMutation();
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    console.log(fetching, data);

    return (
        <Editable 
            value={localValue} 
            isDisabled={!editable} 
            fontSize={{base:'md', sm:'lg', md:'2xl', lg:'4lx'}}  
            mt={8} maxW='300px' 
            textAlign='center' 
            fontWeight='bold'
            onChange={(nextValue)=> setLocalValue(nextValue) }
            onSubmit={(nextValue) => {console.log('NameArea new value', nextValue); setFullName({text: nextValue})}}
        >
            <EditablePreview />
            <EditableInput />
        </Editable>
    );
}

export default NameArea;