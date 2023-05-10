import { VStack, Image, Center, Text, Heading, ScrollView } from 'native-base'

import GymBackground from '../assets/bg_gym.png'
import Logo from '../components/Logo'
import Input from '../components/Input'
import Button from '../components/Button'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TAuthRoutes } from '../routes/auth.routes'
import { useForm, Controller } from 'react-hook-form'

type TFormData = {
    name: string,
    email: string,
    password: string
}

export default function SignUp({ navigation }: NativeStackScreenProps<TAuthRoutes, "SIGN_UP_ROUTE">) {

    const { control, handleSubmit, formState: { errors } } = useForm<TFormData>()

    const onPressBackToSignIn = () => navigation.goBack()

    function onPressSignUp({ name, email, password } : TFormData) {

    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                    <Controller
                        control={control}
                        name="name"
                        rules={{
                            required: 'Ops, precisamos do seu nome'
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder='diga seu nome'
                                onChangeText={onChange}
                                value={value}
                                invalidMessage={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: "Ops, precisamos do seu e-mail",
                            pattern: {
                                value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
                                message: "Ops, este e-mail não é válido"
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
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
                            required: "Ops, você precisa de uma senha para sua conta",
                            minLength: {
                                value: 5,
                                message: 'Ops, a senha deve ter pelo menos 5 caracteres'
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                invalidMessage={errors.password?.message}
                                placeholder='uma boa senha'
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(onPressSignUp)}
                                returnKeyType="send"
                            />
                        )}
                    />
                    <Button text="Criar minha conta" onPress={handleSubmit(onPressSignUp)}/>
                </VStack>

                <VStack space="5">
                    <Text color="gray.300" textAlign="center">Já tem uma conta?</Text>
                    <Button text="Voltar e acessar" variant="outline" onPress={onPressBackToSignIn} />
                </VStack>
            </VStack>
        </ScrollView>
    )
}