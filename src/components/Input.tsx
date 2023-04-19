import { IInputProps, Input as InputNativeBase} from 'native-base';

export default function Input({...inputNativeProps} : IInputProps) {
    return <InputNativeBase 
        bg="gray.800"
        h="16"
        color="gray.100"
        px="4"
        fontSize="md"
        borderColor="transparent"
        borderWidth="2"
        _focus={{bg: "gray.900", borderColor: "indigo.500"}}
        {...inputNativeProps}
    />
}