import { HStack, Text, useTheme } from 'native-base'

import { Ionicons } from '@expo/vector-icons'

export default function Logo() {
    const { colors } = useTheme()
    return (
        <HStack alignItems='center' space="2">
            <Ionicons name="barbell" size={48} color={colors.indigo[400]}/>
            <Text fontSize="5xl" color="indigo.100" bold>iGym</Text>
        </HStack>
    )
}