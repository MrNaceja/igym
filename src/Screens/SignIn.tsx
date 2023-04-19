import { VStack, Image, Center, Text, Heading } from 'native-base'

import GymBackground from '../assets/bg_gym.png'
import Logo from '../components/Logo'
import Input from '../components/Input'

export default function SignIn() {
    return (
        <VStack flex={1} bg="gray.900" justifyContent="space-between" p="5">
            <Image 
                source={GymBackground}
                alt="Treinando musculação"
                resizeMode="contain"
                position="absolute"
                width="sm"
                height="sm"
            />
            <Center>
                <Logo />
                <Text color="gray.300" fontSize="md">Treine sua mente e seu corpo</Text>
            </Center>
           <VStack flex={.5} space="5">
                <Heading color="gray.300" textAlign="center">
                    Acesse sua conta
                </Heading>
                <Input placeholder='seu melhor e-mail'/>
                <Input placeholder='uma boa senha'/>
           </VStack>
        </VStack>
    )
}