import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import useToastAlert from "../hooks/useToastAlert";

import { VStack, FlatList, Text, HStack, Heading } from "native-base";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList";

import HeaderHome from "../components/HeaderHome";
import MuscleGroup from "../components/MuscleGroup";
import ExerciseCard from "../components/ExerciseCard";
import Loading from '../components/Loading';

import { api } from "../services/api";

import { AppError } from "../utils/AppError";
import { TExercise } from "../utils/types/ExerciseDTO";

export default function Home() {
    const [muscleGroups, setMuscleGroups] = useState<string[]>([])
    const [exercises, setExercises] = useState<TExercise[]>([])
    const [muscleGroupActive, setMuscleGroupActive] = useState<string>('')
    const [loadingExercises, setLoadingExercises] = useState(true)

    const AlertToast = useToastAlert()

    async function loadMuscleGroups() {
        api.get('/groups')
        .then(res => {
            setMuscleGroups(res.data)
            setMuscleGroupActive(res.data[0])
        })
        .catch(error => {
            AlertToast.error({ title: error instanceof AppError ? error.message : 'Ops, não foi possível carregar os grupos musculares' })
        })
    }

    async function loadExercisesByMuscleGroup() {
        setLoadingExercises(true)
        api.get(`/exercises/bygroup/${muscleGroupActive}`)
        .then(res => {
            setExercises(res.data)
        })
        .catch(error => {
            AlertToast.error({ title: error instanceof AppError ? error.message : 'Ops, não foi possível carregar os exercicios' })
        })
        .finally(() => setLoadingExercises(false))
    }

    useEffect(() => {
        loadMuscleGroups()
    }, [])
    useFocusEffect(useCallback(() => {
        loadExercisesByMuscleGroup()
    }, [muscleGroupActive]))
    return (
        <VStack flex={1} space="5">
            <HeaderHome />
            <FlatList 
                horizontal
                keyExtractor={ item => item }
                data={muscleGroups}
                renderItem={({ item : group }) => (
                    <MuscleGroup 
                        groupName={group}
                        isPressed={muscleGroupActive == group}
                        onPress={() => setMuscleGroupActive(group)}
                    />
                )}
                _contentContainerStyle={{ px:"5" }}
                showsHorizontalScrollIndicator={false}
                maxH="10"
            />

            {
                loadingExercises
                ?   <Loading />
                :   <VStack space="5" px="5" flex={1}>
                        <HStack justifyContent="space-between" alignItems="center">
                            <Heading color="gray.100" fontSize="lg">Exercícios</Heading>
                            <Text color="gray.400" fontSize="sm">{ exercises.length }</Text>
                        </HStack>
                        <FlatList 
                            showsVerticalScrollIndicator={false}
                            _contentContainerStyle={{ pb: "10", gap: 2 } as Partial<IFlatListProps<TExercise>>}
                            data={exercises}
                            keyExtractor={ exercise => exercise.id }
                            renderItem={({ item: exercise }) => <ExerciseCard exercise={exercise}/>}
                        />
                    </VStack>
            }
        </VStack>
    )
}