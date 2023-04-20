import  { Button as ButtonNativeBase, IButtonProps as ButtonPropsNative , ITextProps, Text} from 'native-base'

interface IButtonProps extends ButtonPropsNative {
    text: string
}

export default function Button({ text, variant, ...buttonNativeProps } : IButtonProps) {
    switch (variant) {
        case "outline":
            buttonNativeProps.bg          = "transparent"
            buttonNativeProps.borderWidth = "2"
            buttonNativeProps.borderColor = "indigo.500"
            buttonNativeProps.color       = "gray.100"
             buttonNativeProps._pressed = {bg: "indigo.500"}
        break
        default:
            buttonNativeProps.bg       = "indigo.500"
            buttonNativeProps.color    = "gray.100"
            buttonNativeProps._pressed = {
                bg: "indigo.600",
                color: "gray.100"
            }
    }

    return (
        <ButtonNativeBase 
            rounded="sm"
            h="16"
            w="full"
            children={
                <Text color={buttonNativeProps.color} fontSize="lg" bold>{ text }</Text>
            }
            {...buttonNativeProps}
        />
    )
}