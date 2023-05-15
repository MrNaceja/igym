import { useState } from "react";
import useAuth from '../hooks/useAuth';
import { useForm, Controller } from "react-hook-form";
import useToastAlert from "../hooks/useToastAlert";

import { Pressable, ScrollView, VStack, Text, Heading, IScrollViewProps } from "native-base";

import HeaderScreen from "../components/HeaderScreen";
import UserAvatar from "../components/UserAvatar";
import Input from "../components/Input";
import Button from "../components/Button";

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import { api } from "../services/api";
import { AppError } from "../utils/AppError";
import { TUser } from "../utils/types/UserDTO";


type TProfileFormData = {
    name: string,
    email: string,
    password: string,
    newPassword: string
}

export default function Profile() {
    const [userAvatarLoaded, setUserAvatarLoaded] = useState(true)

    const { user, updateUserProfile } = useAuth()

    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<TProfileFormData>({
        defaultValues: {
            name: user.name,
            email: user.email,
        }
    })
    
    const AlertToast = useToastAlert()

    function onPressOpenImageGallery() {
        setUserAvatarLoaded(false)
        try {
            changeUserAvatarImage()
        } catch (error) {
            AlertToast.error({
                placement: 'top',
                title: error instanceof AppError ? error.message : 'Não foi possível atualizar a foto de perfil'
            })
        }
        finally{
            setUserAvatarLoaded(true)
        }
    }

    async function onPressSaveProfile({ name, password, newPassword }: TProfileFormData) {
        await api.put('/users', {name, old_password: password, password: newPassword})
                .then(res => {
                    updateUserProfile({...user, name} as TUser)
                    .then(()  => AlertToast.sucess({ title: 'Seu perfil foi atualizado com sucesso', placement: 'top' }))
                    .catch(() => AlertToast.error({ title: 'Ocorreu um problema inesperado ao salvar a atualização de perfil'}))
                })
                .catch(error => AlertToast.error({ title: error instanceof AppError ? error.message : 'Ops, não foi possível atualiza seu perfil' }))
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
            const imageExtension = imageSelected.split('.').pop()
            const imageFileToUpload = {
                name: `${user.name}.${imageExtension}`.toLowerCase(),
                uri: imageSelectedInfo.uri,
                type: `image/${imageExtension}`
            } as any
            
            const imageForm = new FormData()
            imageForm.append('avatar', imageFileToUpload)

            await api.patch('/users/avatar', imageForm, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(async res => {
                    await updateUserProfile({...user, avatar: res.data.avatar})
                        .then(() => AlertToast.sucess({
                            title: "Imagem alterada com sucesso",
                            placement: "top",
                            bg: "indigo.500"
                        }))
                        .catch(error => {
                            throw error
                        })
                })
                .catch(error => {
                    throw error
                })
        }
    }

    return (
        <VStack flex={1}>
            <HeaderScreen title="Meu Perfil" description="Visualize e atualize informações do seu perfil"/>
            <ScrollView  _contentContainerStyle={{ p: "5", gap: 5 } as Partial<IScrollViewProps>}>
                <VStack space="2" alignItems="center" px="24">
                    <UserAvatar 
                        avatarUri={`${api.defaults.baseURL}/avatar/${user.avatar}`}
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
                    <Controller 
                        control={control}
                        name="name"
                        rules={{ required: 'Ops, precisamos do seu nome' }}
                        render={({ field: { value, onChange } }) => (
                            <Input 
                                placeholder="seu nome"
                                onChangeText={onChange}
                                value={value}
                                invalidMessage={errors.name?.message}
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name="email"
                        render={({ field: { value, onChange } }) => (
                            <Input 
                                placeholder="seu email"
                                isDisabled
                                isReadOnly
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                </VStack>

                <VStack space="3" mt="8">
                    <Heading color="gray.400" fontSize="lg">Alteração de senha</Heading>
                    <Controller 
                        control={control}
                        name="password"
                        render={({ field: { onChange } }) => (
                            <Input 
                                placeholder="senha antiga"
                                secureTextEntry
                                onChangeText={onChange}
                                invalidMessage={errors.password?.message}
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name="newPassword"
                        rules={{
                            minLength: {
                                value: 5,
                                message: 'Ops, a nova senha deve ter pelo menos 5 caracteres'
                            }
                        }}
                        render={({ field: { onChange } }) => (
                            <Input 
                                placeholder="nova senha"
                                secureTextEntry
                                onChangeText={onChange}
                                invalidMessage={errors.newPassword?.message}
                            />
                        )}
                    />
                </VStack>
                <Button text="Salvar" onPress={handleSubmit(onPressSaveProfile)} isLoading={isSubmitting}/>
            </ScrollView>
        </VStack>
    )
}