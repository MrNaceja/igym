import { HStack, Heading, Icon, Text, VStack } from "native-base";
import UserAvatar from "./UserAvatar";
import { Alert, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import useAuth from "../hooks/useAuth";
import { api } from "../services/api";

export default function HeaderHome() {
    const { user: { name, avatar }, signOut } = useAuth()

    function onPressSignOut() {
        Alert.alert('Fazer Logout', 'Puxa, já está de saída?', [
            {
                text: 'Sim',
                onPress: signOut
            },
            {
                text: 'Não'
            }
        ])
    }

    return (
        <HStack 
            bg="gray.800"
            pt="16" 
            pb="5" 
            px="5" 
            alignItems="center" 
            justifyContent="space-between"
        >
            <HStack space="4" alignItems="center">
                <UserAvatar 
                    avatarUri={`${api.defaults.baseURL}/avatar/${avatar}`}
                    alt="Avatar do Usuário"
                    size={16}
                />
                <VStack>
                    <Text color="gray.200">Olá,</Text>
                    <Heading color="gray.100">{ name }</Heading>
                </VStack>
            </HStack>

            <TouchableOpacity onPress={onPressSignOut}>
                <Icon 
                    as={MaterialIcons}
                    color="gray.200"
                    name="logout"
                    size="md"
                />
            </TouchableOpacity>
        </HStack>
    )
}