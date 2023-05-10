import { Pressable, ScrollView, VStack, Text, Heading, IScrollViewProps } from "native-base";
import HeaderScreen from "../components/HeaderScreen";
import UserAvatar from "../components/UserAvatar";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Profile() {
    return (
        <VStack flex={1}>
            <HeaderScreen title="Meu Perfil" description="Visualize e atualize informações do seu perfil"/>
            <ScrollView  _contentContainerStyle={{ p: "5", gap: 5 } as Partial<IScrollViewProps>}>
                <VStack space="2" alignItems="center" px="24">
                    <UserAvatar 
                        source={{ uri: 'https://github.com/MrNaceja.png' }}
                        alt="Avatar do Usuário"
                        size="32"
                    />
                    <Pressable 
                        _pressed={{ opacity: .5 }}
                        px="5"
                        py="2"
                        w="full"
                        rounded="md"
                        alignItems="center"
                        borderWidth={2}
                        borderColor={"indigo.500"}
                    ><Text color="indigo.500">Trocar foto</Text></Pressable>
                </VStack>
                
                <VStack space="3">
                    <Input 
                        placeholder="seu nome"
                    />
                    <Input 
                        placeholder="seu email"
                        isDisabled
                    />
                </VStack>

                <VStack space="3" mt="8">
                    <Heading color="gray.400" fontSize="lg">Alteração de senha</Heading>
                    <Input 
                        placeholder="senha antiga"
                        secureTextEntry
                    />
                    <Input 
                        placeholder="nova senha"
                        secureTextEntry
                    />
                    <Input 
                        placeholder="confirmar a nova senha"
                        secureTextEntry
                    />
                </VStack>
                <Button text="Salvar"/>
            </ScrollView>
        </VStack>
    )
}