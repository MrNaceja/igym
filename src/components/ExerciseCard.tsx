import { HStack, Heading, Image, VStack, Text, Icon } from "native-base";
import { TouchableOpacity } from "react-native";

import { Entypo } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { TSignedNavigationRoutesProps } from "../routes/signed.routes";
import { TExercise } from "../utils/types/ExerciseDTO";
import { api } from "../services/api";

interface ExerciseCardProps {
    exercise: TExercise
}
export default function ExerciseCard({ exercise } : ExerciseCardProps) {

    const screenNavigator = useNavigation<TSignedNavigationRoutesProps>()
    
    function onPressOpenExercise() {
        screenNavigator.navigate("EXERCISE_ROUTE")
    }

    return (
        <TouchableOpacity onPress={onPressOpenExercise}>
            <HStack bg="gray.800" rounded="md" overflow="hidden" shadow="5">
                <Image 
                    source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}` }}
                    alt="Exerício"
                    h="full"
                    w="16"
                    resizeMode="cover"
                />
                <HStack p="3" flex={1} justifyContent="space-between" alignItems="center">
                    <VStack>
                        <Heading color="gray.100" numberOfLines={1} fontSize="lg">{ exercise.name }</Heading>
                        <Text color="gray.400" numberOfLines={2}>
                            {exercise.series} séries de {exercise.repetitions} repetições
                        </Text>
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