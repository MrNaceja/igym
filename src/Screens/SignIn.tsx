import { useForm, Controller } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import useToastAlert from '../hooks/useToastAlert'

import { VStack, Image, Center, Text, Heading, ScrollView } from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'

import GymBackground from '../assets/bg_gym.png'

import Logo from '../components/Logo'
import Input from '../components/Input'
import Button from '../components/Button'

import { TAuthRoutes } from '../routes/auth.routes'
import { AppError } from '../utils/AppError'

type TSignInFormData = {
    email: string,
    password: string
}

export default function SignIn({ navigation } : NativeStackScreenProps<TAuthRoutes, "SIGN_IN_ROUTE">) {
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<TSignInFormData>()
    const { signIn } = useAuth()
    const AlertToast = useToastAlert()

    function onPressGoToSignUp() {
        navigation.navigate("SIGN_UP_ROUTE")
    }   

   async function onPressSignIn({ email, password } : TSignInFormData) {
        try {
            await signIn({email, password})
        } catch (error) {
            AlertToast.error({ title: error instanceof AppError ? error.message : 'Não foi possível autenticar. Tente novamente mais tarde' })
        }
    }

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
                        Acesse sua conta
                    </Heading>
                    <Controller 
                        control={control}
                        name="email"
                        rules={{
                            required: 'Ops, precisamos do email do usuário'
                        }}
                        render={({field : { onChange, value }}) => (
                            <Input 
                                placeholder='seu melhor e-mail'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value={value}
                                invalidMessage={errors.email?.message}
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name="password"
                        rules={{
                            required: 'Ops, precisamos da senha do usuário'
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder='uma boa senha'
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                invalidMessage={errors.password?.message}
                                onSubmitEditing={handleSubmit(onPressSignIn)}
                                returnKeyType="send"
                            />
                        )}
                    />
                    <Button text="Acessar" onPress={handleSubmit(onPressSignIn)} isLoading={isSubmitting} />
                </VStack>

                <VStack space="5">
                    <Text color="gray.300" textAlign="center">Ainda não tem uma conta?</Text>
                    <Button text="Criar uma conta" variant="outline" onPress={onPressGoToSignUp}/>
                </VStack>
            </VStack>
        </ScrollView>
    )
}