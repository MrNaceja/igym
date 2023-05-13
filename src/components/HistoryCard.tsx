import { HStack, Heading, Text, VStack } from "native-base";
import { THistory } from "../utils/types/HistoryDTO";

interface IHistoryCardProps {
    history: THistory
}
export default function HistoryCard({ history } : IHistoryCardProps) {
    return (
        <HStack bg="gray.800" rounded="md" p="3" justifyContent="space-between" alignItems="center">
            <VStack>
                <Text color="gray.400" fontSize="sm" textTransform="uppercase">{ history.group }</Text>
                <Heading color="gray.100" fontSize="xl">{ history.name }</Heading>
            </VStack>
            <Text color="gray.500" fontWeight="bold">
                { history.hour }
            </Text>
        </HStack>
    )
}