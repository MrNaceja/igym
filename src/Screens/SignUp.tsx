import { VStack, Image, Center, Text, Heading, ScrollView } from 'native-base'

import GymBackground from '../assets/bg_gym.png'
import Logo from '../components/Logo'
import Input from '../components/Input'
import Button from '../components/Button'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TAuthRoutes } from '../routes/auth.routes'

export default function SignUp({ navigation } : NativeStackScreenProps<TAuthRoutes, "SIGN_UP_ROUTE">) {

    const onPressBackToSignIn = () => navigation.goBack()

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <VStack flex={1} justifyContent="space-between" p="5">
                <Image 
                    source={GymBackground}
                    defaultSource={GymBackground}
                    alt="Treinando musculação"
                    resizeMode="contain"
                    position="absolute"
                    width="sm"
                    height="sm"
                />
                <Center mb="5">
                    <Logo />
                    <Text color="gray.300" fontSize="md">Treine sua mente e seu corpo</Text>
                </Center>

                <VStack space="5" my="5">
                    <Heading color="gray.300" textAlign="center">
                        Crie sua conta
                    </Heading>
                    <Input 
                        placeholder='diga seu nome'
                    />
                    <Input 
                        placeholder='seu melhor e-mail'
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                    <Input 
                        placeholder='uma boa senha'
                        secureTextEntry
                    />
                    <Button text="Criar minha conta" />
                </VStack>

                <VStack space="5">
                    <Text color="gray.300" textAlign="center">Já tem uma conta?</Text>
                    <Button text="Voltar e acessar" variant="outline" onPress={onPressBackToSignIn}/>
                </VStack>
            </VStack>
        </ScrollView>
    )
}