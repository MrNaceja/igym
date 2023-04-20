import { IInputProps, Input as InputNativeBase} from 'native-base';

export default function Input({...inputNativeProps} : IInputProps) {
    return <InputNativeBase 
        bg="gray.800"
        h="16"
        color="gray.100"
        px="4"
        fontSize="md"
        borderColor="transparent"
        placeholderTextColor="gray.500"
        borderWidth="2"
        rounded="sm"
        _focus={{bg: "gray.900", borderColor: "indigo.500"}}
        {...inputNativeProps}
    />
}