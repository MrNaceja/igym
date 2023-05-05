import { IImageProps, Image } from "native-base";

interface UserAvatrProps extends IImageProps {
    size: number
}

export default function UserAvatar({size, ...imageNativeProps} : UserAvatrProps) {
    return (
        <Image 
            h={size}
            w={size}
            rounded="full"
            borderWidth="2"
            borderColor="gray.600"
            {...imageNativeProps}
        />
    )
}