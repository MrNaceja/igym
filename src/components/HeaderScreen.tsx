import { Center, Heading } from "native-base";

interface HeaderScreenProps {
    /** Titulo da tela */
    title: string
}

export default function HeaderScreen({ title } : HeaderScreenProps) {
    return (
        <Center 
            bg="gray.800"
            pt="16" 
            pb="5" 
            px="5" 
        >
            <Heading color="gray.100">{ title }</Heading>
        </Center>
    )
}