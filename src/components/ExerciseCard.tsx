import { HStack, Heading, Image, VStack, Text, Icon } from "native-base";
import { TouchableOpacity } from "react-native";

import { Entypo } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { TSignedNavigationRoutesProps } from "../routes/signed.routes";

export default function ExerciseCard() {

    const screenNavigator = useNavigation<TSignedNavigationRoutesProps>()
    
    function onPressOpenExercise() {
        screenNavigator.navigate("EXERCISE_ROUTE")
    }

    return (
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={onPressOpenExercise}>
            <HStack bg="gray.800" rounded="md" overflow="hidden">
                <Image 
                    source={{ uri: 'https://blog.sardinhaevolution.com.br/wp-content/uploads/2020/04/remada-unilateral.2.jpg' }}
                    alt="Exerício"
                    h="full"
                    w="16"
                    resizeMode="cover"
                />
                <HStack p="3" flex={1} justifyContent="space-between" alignItems="center">
                    <VStack>
                        <Heading color="gray.100">Remada Unilateral</Heading>
                        <Text color="gray.400" numberOfLines={2}>3 repetições de 10x</Text>
                    </VStack>
                    <Icon 
                        as={Entypo}
                        name="chevron-right"
                        color="gray.500"
                        size="lg"
                    />
               </HStack>
            </HStack>
        </TouchableOpacity>
    )
}