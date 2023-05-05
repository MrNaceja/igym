import { IPressableProps, Pressable, Text } from "native-base";

interface MuscleGroupProps extends IPressableProps {
    groupName: string
}

export default function MuscleGroup({ groupName, ...pressableNativeProps } : MuscleGroupProps) {
    return (
       <Pressable 
        bg="gray.800"
        px="5"
        py="2"
        rounded="md"
        alignItems="center"
        {...pressableNativeProps}
       >
        <Text
            color="gray.100"
        >{ groupName }</Text>
       </Pressable> 
    )
}