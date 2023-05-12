import { IPressableProps, Pressable, Text } from "native-base";

interface MuscleGroupProps extends IPressableProps {
    groupName: string
}

export default function MuscleGroup({ groupName, isPressed, ...pressableNativeProps } : MuscleGroupProps) {
    return (
       <Pressable 
        bg="gray.800"
        px="5"
        py="2"
        mr="2"
        rounded="md"
        alignItems="center"
        borderWidth={2}
        borderColor={isPressed ? "indigo.500" : "transparent"}
        {...pressableNativeProps}
       >
        <Text
            color={isPressed ? "indigo.300" : "gray.400"} textTransform="uppercase"
        >{ groupName }</Text>
       </Pressable> 
    )
}