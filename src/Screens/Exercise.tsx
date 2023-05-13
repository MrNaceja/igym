import { Box, HStack, Icon, Image, VStack, Text, Divider, useToast } from "native-base";
import HeaderScreen from "../components/HeaderScreen";
import { Ionicons } from '@expo/vector-icons'
import Button from "../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TSignedRoutes } from '../routes/signed.routes';
import { api } from "../services/api";
import { AppError } from "../utils/AppError";
import { useState } from 'react';
import { TExercise } from "../utils/types/ExerciseDTO";
import { useEffect } from 'react';
import Loading from '../components/Loading';


export default function Exercise({ route : { params : { exerciseId } }, navigation } : NativeStackScreenProps<TSignedRoutes, 'EXERCISE_ROUTE'>) {
    const [exercise, setExercise] = useState<TExercise>({} as TExercise)
    const [loadingExerciseDetails, setLoadingExerciseDetails] = useState(true)
    const [registeringHistory, setRegisteringHistory] = useState(false)
    const toast = useToast()

    async function loadExerciseDetails() {
        setLoadingExerciseDetails(true)
        api.get(`/exercises/${exerciseId}`)
        .then(res => {
            setExercise(res.data)
        })
        .catch(error => {
            toast.show({
                title: error instanceof AppError ? error.message : 'Ops, não conseguimos carregar os detalhes do exercício',
            })
            navigation.goBack()
        })
        .finally(() => {
            setLoadingExerciseDetails(false)
        })
    }

    async function registerExerciseHistory() {
        setRegisteringHistory(true)
        api.post('/history', { exercise_id: exercise.id })
        .then(res => {
            toast.show({
                bg: "indigo.500",
                title: 'Exercício realizado, veja-o em seu histórico'
            })
            navigation.navigate("HISTORY_ROUTE")
        })
        .catch(error => {
            toast.show({
                bg:"red.500",
                title: error instanceof AppError ? error.message : 'Ops, não foi possível registrar o exercício no histórico',
            })
        })
        .finally(() => setRegisteringHistory(false))
    }

    useEffect(() => {
        loadExerciseDetails()
    }, [exerciseId])
    return (
        loadingExerciseDetails
         ? <Loading />
         :  <VStack flex={1} space="5" pb="5">
                <HeaderScreen title={exercise.name} description={exercise.group.toUpperCase()} showBackButton />
                <VStack 
                    p="3" 
                    bg="gray.800" 
                    mx="5" 
                    rounded="md" 
                    space="5"
                    flex={1}
                    justifyContent="space-between"
                >
                    <Box rounded="md" overflow="hidden" shadow="9">
                        <Image 
                            source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                            alt="Exerício"
                            h="80"
                            resizeMode="cover"
                            bg="indigo.800"
                            opacity={.8}
                        />
                    </Box>
                    <VStack space="5">
                        <HStack justifyContent="space-between">
                            <Box flexDirection="row" alignItems="center">
                                <Icon 
                                    as={Ionicons}
                                    name="barbell"
                                    color="indigo.500"
                                    size="lg"
                                />
                                <Text ml="3" color="gray.400">{exercise.series} séries</Text>
                            </Box>
                            <Divider orientation="vertical" bg="gray.700" />
                            <Box flexDirection="row" alignItems="center">
                                <Icon 
                                    as={Ionicons}
                                    name="sync-sharp"
                                    color="indigo.500"
                                    size="lg"
                                />
                                <Text ml="3" color="gray.400">{exercise.repetitions} repetições</Text>
                            </Box>
                        </HStack>
                        <Button text="Marcar como realizado" isLoading={registeringHistory} onPress={registerExerciseHistory}/>
                    </VStack>
                </VStack>
            </VStack>
    )
}