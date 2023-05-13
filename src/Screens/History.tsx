import { useCallback, useState } from "react";
import { VStack, Divider, SectionList, Heading } from "native-base";

import HeaderScreen from "../components/HeaderScreen";
import HistoryCard from "../components/HistoryCard";

import { api } from "../services/api";

import { AppError } from "../utils/AppError";
import useToastAlert from "../hooks/useToastAlert";
import Loading from "../components/Loading";
import { useFocusEffect } from "@react-navigation/native";

export default function History() {
    const [loadingHistory, setLoadingHistory] = useState(true)
    const AlertToast = useToastAlert()
    const sectionData = [
        {
            title: '2023, 2 de maio',
            data: [1,2,3]
        },
        {
            title: '2023, 5 de abril',
            data: [1,2]
        }
    ]

    async function loadHistory() {
        setLoadingHistory(true)
        api.get('/history')
        .then(res => {
            
        })
        .catch(error => {
            AlertToast.error({ title: error instanceof AppError ? error.message : 'Ops, não foi possível carregar o histórico' })
        })
        .finally(() => setLoadingHistory(false))
    }

    useFocusEffect(useCallback(() => {
        loadHistory()
    }, []))
    return (
        <VStack flex={1} space="2">
            <HeaderScreen title="Histórico de Atividades" description="Veja o histórico dos exercicios praticads"/>
            {
                loadingHistory
                ? <Loading />
                : <SectionList 
                    sections={sectionData}
                    keyExtractor={item => item.toString()}
                    renderSectionHeader={({ section : { title} }) => (
                        <Heading color="gray.500" fontSize="sm" mt="8" mb="2">{ title }</Heading>
                    )}
                    ItemSeparatorComponent={ (sections) => <Divider bg="gray.900" thickness="5"/>}
                    renderItem={({ item }) => <HistoryCard />}
                    ListEmptyComponent={() => (
                        <Heading color="gray.500" fontSize="md" textAlign="center">
                            Puxa você ainda não praticou exercícios :( {"\n"}
                            Vamos praticar agora?
                        </Heading>
                    )}
                    px="5"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 45,
                        flex: 1,
                        justifyContent: sectionData.length == 0 ? "center" : "flex-start"
                    }}
                />
            }
        </VStack>
    )
}