import { HStack, VStack } from "native-base";
import HeaderHome from "../components/HeaderHome";
import MuscleGroup from "../components/MuscleGroup";

export default function Home() {
    return (
        <VStack flex={1} >
            <HeaderHome />
            <HStack>
                <MuscleGroup groupName="Peito"/>
            </HStack>
        </VStack>
    )
}