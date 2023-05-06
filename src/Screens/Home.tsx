import { VStack, FlatList, Text, HStack, Heading } from "native-base";
import HeaderHome from "../components/HeaderHome";
import MuscleGroup from "../components/MuscleGroup";
import { useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList/types";

export default function Home() {
    const [muscleGroupActive, setMuscleGroupActive] = useState("Peito")
    const muscleGroups = ["Peito", "Ombro", "Pernas", "Braços", "Trapézio"]

    const exercises = ["teste", "teste2", "1", "2", "3", "4", "5"]

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

            <VStack space="5" px="5" flex={1} >
                <HStack justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100" fontSize="lg">Exercícios</Heading>
                    <Text color="gray.400" fontSize="sm">{ exercises.length }</Text>
                </HStack>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ pb: "10" }}
                    data={exercises}
                    keyExtractor={ item => item }
                    renderItem={({ item }) => <ExerciseCard/>}
                />
            </VStack>
        </VStack>
    )
}