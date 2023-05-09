import { HStack, Heading, Text, VStack } from "native-base";

export default function HistoryCard() {
    return (
        <HStack bg="gray.800" rounded="md" p="3" justifyContent="space-between" alignItems="center">
            <VStack>
                <Text color="gray.400" fontSize="md">Peito</Text>
                <Heading color="gray.100" fontSize="xl">Supino</Heading>
            </VStack>
            <Text color="gray.500" fontWeight="bold">
                26min
            </Text>
        </HStack>
    )
}