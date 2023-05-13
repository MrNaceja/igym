import { useCallback, useState } from "react";
import { VStack, Divider, SectionList, Heading } from "native-base";

import HeaderScreen from "../components/HeaderScreen";
import HistoryCard from "../components/HistoryCard";

import { api } from "../services/api";

import { AppError } from "../utils/AppError";
import useToastAlert from "../hooks/useToastAlert";
import Loading from "../components/Loading";
import { useFocusEffect } from "@react-navigation/native";
import { THistoryByDate } from "../utils/types/HistoryDTO";

export default function History() {
    const [loadingHistory, setLoadingHistory] = useState(true)
    const [historiesByDate, setHistoriesByDate] = useState<THistoryByDate[]>([])

    const AlertToast = useToastAlert()

    async function loadHistory() {
        setLoadingHistory(true)
        api.get('/history')
        .then(res => {
            setHistoriesByDate(res.data)
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
            <HeaderScreen title="Histórico de Atividades" description="Veja o histórico dos exercicios praticados"/>
            {
                loadingHistory
                ? <Loading />
                : <SectionList 
                    sections={historiesByDate}
                    keyExtractor={history => history.id}
                    renderSectionHeader={({ section : { title } }) => (
                        <Heading color="gray.500" fontSize="sm" mt="8" mb="2">{ title }</Heading>
                    )}
                    ItemSeparatorComponent={ (sections) => <Divider bg="gray.900" thickness="5"/>}
                    renderItem={({ item: history }) => <HistoryCard history={ history }/>}
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
                        justifyContent: historiesByDate.length == 0 ? "center" : "flex-start"
                    }}
                />
            }
        </VStack>
    )
}