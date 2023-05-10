import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

interface HeaderScreenProps {
    title: string,
    description?: string,
    showBackButton?: boolean
}

export default function HeaderScreen({ title, description, showBackButton = false} : HeaderScreenProps) {

    const screenNavigator = useNavigation()

    function onPressBackHome() {
        screenNavigator.goBack()
    }

    return (
        <HStack 
            bg="gray.800"
            pt="16" 
            pb="3" 
            px="5" 
            alignItems="center"
            space="5"
        >
            {
                showBackButton &&
                <TouchableOpacity onPress={onPressBackHome}>
                    <Icon 
                        as={MaterialIcons}
                        color="indigo.500"
                        name="arrow-back"
                        size="lg"
                    />
                </TouchableOpacity>
            }
           <VStack flexShrink={1}>
                <Heading color="gray.100">{ title }</Heading>
                {
                    description &&
                    <Text color="gray.500" fontSize="lg">{ description }</Text>
                }
           </VStack>
        </HStack>
    )
}