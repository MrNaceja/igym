import { HStack, Heading, Icon, Text, VStack } from "native-base";
import UserAvatar from "./UserAvatar";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'

export default function HeaderHome() {
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
                    source={{ uri: 'https://github.com/MrNaceja.png' }}
                    alt="Avatar do Usuário"
                    size={16}
                />
                <VStack>
                    <Text color="gray.200">Olá,</Text>
                    <Heading color="gray.100">Eduardo</Heading>
                </VStack>
            </HStack>

            <TouchableOpacity>
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