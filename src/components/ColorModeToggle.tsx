import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';
import React from 'react'

export default function ColorModeToggle (props: any): React.ReactElement<{}> {
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <IconButton {...props} aria-label="toggle color mode" icon={colorMode==='light'? <MoonIcon color='#3700b3'/> : <SunIcon color='#fdd835'/>} onClick={()=>toggleColorMode()}/>
    );
}