import { VStack, Divider, SectionList, Heading } from "native-base";
import HeaderScreen from "../components/HeaderScreen";
import HistoryCard from "../components/HistoryCard";


export default function History() {
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
    return (
        <VStack flex={1} space="2">
            <HeaderScreen title="Histórico de Atividades" description="Veja o histórico dos exercicios praticads"/>
            <SectionList 
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
        </VStack>
    )
}