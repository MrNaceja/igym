import { Box, HStack, Icon, Image, VStack, Text, Divider } from "native-base";
import HeaderScreen from "../components/HeaderScreen";
import { Ionicons } from '@expo/vector-icons'
import Button from "../components/Button";
export default function Exercise() {
    return (
        <VStack flex={1} space="5" pb="5">
            <HeaderScreen title="Remada Unilateral" description="Peito" showBackButton />
            <VStack 
                p="3" 
                bg="gray.800" 
                mx="5" 
                rounded="md" 
                space="5"
                flex={1}
                justifyContent="space-between"
            >
                <Image 
                    source={{ uri: 'https://blog.sardinhaevolution.com.br/wp-content/uploads/2020/04/remada-unilateral.2.jpg' }}
                    alt="Exerício"
                    h="80"
                    resizeMode="cover"
                    bg="indigo.800"
                    opacity={.8}
                    rounded="md"
                />
                <VStack space="5">
                    <HStack justifyContent="space-between">
                        <Box flexDirection="row" alignItems="center">
                            <Icon 
                                as={Ionicons}
                                name="barbell"
                                color="indigo.500"
                                size="lg"
                            />
                            <Text ml="3" color="gray.400">3 séries</Text>
                        </Box>
                        <Divider orientation="vertical" bg="gray.700" />
                        <Box flexDirection="row" alignItems="center">
                            <Icon 
                                as={Ionicons}
                                name="sync-sharp"
                                color="indigo.500"
                                size="lg"
                            />
                            <Text ml="3" color="gray.400">10 repetições</Text>
                        </Box>
                    </HStack>
                    <Button text="Marcar como realizado"/>
                </VStack>
            </VStack>
        </VStack>
    )
}