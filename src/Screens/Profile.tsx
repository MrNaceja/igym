import { useState } from "react";
import useToastAlert from "../hooks/useToastAlert";

import { Pressable, ScrollView, VStack, Text, Heading, IScrollViewProps } from "native-base";

import HeaderScreen from "../components/HeaderScreen";
import UserAvatar from "../components/UserAvatar";
import Input from "../components/Input";
import Button from "../components/Button";

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';

export default function Profile() {
    const [userAvatarProfile, setUserAvatarProfile] = useState('https://github.com/MrNaceja.png')
    const [userAvatarLoaded, setUserAvatarLoaded]   = useState(true)
    
    const AlertToast = useToastAlert()

    function onPressOpenImageGallery() {
        setUserAvatarLoaded(false)
        try {
            changeUserAvatarImage()
        } catch (error) {
            console.log(error)
        }
        finally{
            setUserAvatarLoaded(true)
        }
    }

    async function changeUserAvatarImage() {
        const galleryDataSelect = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        })
        
        if (galleryDataSelect.canceled) {
            return;
        }
        const imageSelected = galleryDataSelect.assets[0].uri
        if (imageSelected) {
            const imageSelectedInfo = await FileSystem.getInfoAsync(imageSelected)
            if (imageSelectedInfo.exists) {
                const imageSize = imageSelectedInfo.size / 1024 / 1024
                if (imageSize > 3) {
                    return AlertToast.error({
                        title: "Imagem muito grande!",
                        description: "Por favor selecione uma imagem de até 3MB",
                        placement: "top",
                        bg: "red.500",
                        _title: {
                            textAlign:"center"
                        }
                    })
                }
            }
            setUserAvatarProfile(imageSelected)
            return AlertToast.sucess({
                title: "Imagem alterada com sucesso",
                placement: "top",
                bg: "indigo.500"
            })
        }
    }

    return (
        <VStack flex={1}>
            <HeaderScreen title="Meu Perfil" description="Visualize e atualize informações do seu perfil"/>
            <ScrollView  _contentContainerStyle={{ p: "5", gap: 5 } as Partial<IScrollViewProps>}>
                <VStack space="2" alignItems="center" px="24">
                    <UserAvatar 
                        avatarUri={userAvatarProfile}
                        alt="Avatar do Usuário"
                        size="32"
                        loaded={userAvatarLoaded}
                    />
                    <Pressable 
                        onPress={onPressOpenImageGallery}
                        _pressed={{ opacity: .5 }}
                        px="5"
                        py="2"
                        w="full"
                        rounded="md"
                        alignItems="center"
                        borderWidth={2}
                        borderColor={"indigo.500"}
                    ><Text color="indigo.500">Trocar foto</Text></Pressable>
                </VStack>
                
                <VStack space="3">
                    <Input 
                        placeholder="seu nome"
                    />
                    <Input 
                        placeholder="seu email"
                        isDisabled
                    />
                </VStack>

                <VStack space="3" mt="8">
                    <Heading color="gray.400" fontSize="lg">Alteração de senha</Heading>
                    <Input 
                        placeholder="senha antiga"
                        secureTextEntry
                    />
                    <Input 
                        placeholder="nova senha"
                        secureTextEntry
                    />
                    <Input 
                        placeholder="confirmar a nova senha"
                        secureTextEntry
                    />
                </VStack>
                <Button text="Salvar"/>
            </ScrollView>
        </VStack>
    )
}