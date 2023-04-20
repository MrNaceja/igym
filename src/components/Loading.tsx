import { Spinner, Center } from 'native-base'

export default function Loading() {
    return (
        <Center flex={1}>
            <Spinner color="indigo.700" size="lg"/>
        </Center>
    )
}