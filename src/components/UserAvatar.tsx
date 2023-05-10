import { IImageProps, Image, Skeleton } from "native-base";
import { SizeType } from "native-base/lib/typescript/components/types";

interface UserAvatarProps extends IImageProps {
    size: SizeType,
    loaded?: boolean
}

export default function UserAvatar({size, loaded = true, ...imageNativeProps} : UserAvatarProps) {
    return (
        <Skeleton 
            isLoaded={loaded}
            h={size}
            w={size}
            rounded="full"
            startColor="gray.700"
            endColor={"gray.600"}
        >
            <Image 
                h={size}
                w={size}
                rounded="full"
                borderWidth="2"
                borderColor="gray.600"
                {...imageNativeProps}
            />
        </Skeleton>
    )
}