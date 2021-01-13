import { EditIcon } from '@chakra-ui/icons';
import { AspectRatio, Flex, IconButton, Skeleton } from '@chakra-ui/react';
import React, { useRef, useState } from 'react'
import { Document, Page } from 'react-pdf';
import { SizeMe } from 'react-sizeme';
import { useUploadResumeMutation } from '../../generated/graphql';

interface PdfViewAreaProps {
    link?: string | undefined
}

const PdfViewArea: React.FC<PdfViewAreaProps> = ({link}) => {
    const [, uploadResume] = useUploadResumeMutation();
    const [pdfLoaded, setPdfLoaded] = useState(false);
    let resumeOverlayRef = useRef<HTMLDivElement>(null);
    let inputFile = useRef<HTMLInputElement>(null); 
    
    return (
        <AspectRatio 
            flex="1 1 auto" 
            ratio={0.707} 
            maxW='600px' 
            onMouseOver={()=>resumeOverlayRef.current? resumeOverlayRef.current.style.display = 'flex': null} 
            onMouseOut={()=>resumeOverlayRef.current? resumeOverlayRef.current.style.display = 'none': null}
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
                <Flex display='none' ref={resumeOverlayRef} grow={1} opacity='0.8' bg='black' zIndex='2'>
                    <IconButton aria-label='change resume pdf' icon={<EditIcon/>} onClick={()=>{inputFile?.current?.click();}}/>
                    <input type='file' ref={inputFile} style={{display:'none'}} onChange={({
                        target:{ 
                            files: [file]
                        }
                        })=> {console.log(file); if(file) uploadResume({resume: file})}}/>
                </Flex>
                <Skeleton position='absolute' zIndex='1'  display='flex' flex='1' isLoaded={pdfLoaded}/>
            </>
        </AspectRatio>
    );
}

export default PdfViewArea;