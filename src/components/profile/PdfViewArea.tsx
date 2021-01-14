import { EditIcon } from '@chakra-ui/icons';
import { AspectRatio, Flex, IconButton, Skeleton, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useRef, useState } from 'react'
import { Document, Page } from 'react-pdf';
import { SizeMe } from 'react-sizeme';

interface PdfViewAreaProps {
    link?: string | undefined | null
    onClick?: any
    editable?: boolean | undefined | null
    fetchingLink?: boolean | undefined | null
}

const PdfViewArea: React.FC<PdfViewAreaProps> = ({link, onClick, editable, fetchingLink}) => {
    const resumeBg = useColorModeValue("black", "white");
    const infoText = useColorModeValue("white", "black");
    const [pdfLoaded, setPdfLoaded] = useState(false);
    let resumeOverlayRef = useRef<HTMLDivElement>(null);
    let inputFile = useRef<HTMLInputElement>(null); 
    
    return (
        <AspectRatio 
            flex="1 1 auto" 
            ratio={0.707} 
            maxW='600px' 
            onMouseOver={()=>editable && resumeOverlayRef.current? resumeOverlayRef.current.style.display = 'flex': null} 
            onMouseOut={()=> editable && resumeOverlayRef.current? resumeOverlayRef.current.style.display = 'none': null}
        >
            <>
                <SizeMe>
                    {({ size }) => (
                        <Document
                            file={link}
                            onLoadSuccess={(opt: any)=>{console.log(opt); setPdfLoaded(true);}}
                            onLoadError={(err:any)=> console.log(err)}
                        >
                            <Page pageNumber={1}  width={size.width ? size.width : 1}/>
                        </Document>
                    )}
                </SizeMe>
                {
                editable && <Flex display='none' ref={resumeOverlayRef} grow={1} opacity='0.9' bg='black' zIndex='3'>
                    <IconButton aria-label='change resume pdf' icon={<EditIcon/>} onClick={()=>{inputFile?.current?.click();}}/>
                    <input type='file' ref={inputFile} style={{display:'none'}} onChange={({
                        target:{ 
                            files: [file]
                        }
                        })=> {console.log(file); if(file && editable) onClick({resume: file})}}/>
                </Flex>
                }
                <Skeleton position='absolute' zIndex='1'  display='flex' flex='1' isLoaded={pdfLoaded}/>
                {!link && !fetchingLink && 
                <Flex grow={1} zIndex='2' bgColor={resumeBg}><Text textAlign='center' color={infoText} fontWeight='bold' opacity='0.5'>
                    No Resume Uploaded<br/>
                    {editable? '(Hover over here to upload one!)' : null}
                    </Text>
                </Flex>}
            </>
        </AspectRatio>
    );
}

export default PdfViewArea;