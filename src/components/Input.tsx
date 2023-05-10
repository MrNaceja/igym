import { IInputProps as InputNativeProps, Input as InputNativeBase, FormControl} from 'native-base';

interface IInputProps extends InputNativeProps {
    invalidMessage?: string | null
}

export default function Input({invalidMessage, isInvalid, ...inputNativeProps} : IInputProps) {
    const invalid = !!invalidMessage || isInvalid
    return (
        <FormControl isInvalid={invalid}>
            <InputNativeBase 
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
            <FormControl.ErrorMessage>{ invalidMessage }</FormControl.ErrorMessage>
        </FormControl>
    )
}