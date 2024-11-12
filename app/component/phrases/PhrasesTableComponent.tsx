import { ScrollView, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import { useState } from "react";

export const PhrasesTableComponent = ({ items }) => {
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPageList] = useState([5, 10, 15]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    return <ScrollView style={styles.container}>
        {
            items.length === 0
                ? <View>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>No custom idioms found</Text>
                </View>
                : <ScrollView horizontal={true}>
                    <DataTable style={{ width: 800 }}>
                        <DataTable.Header>
                            <DataTable.Title style={{ width: 250 }}>Phraseology</DataTable.Title>
                            <DataTable.Title>Type</DataTable.Title>
                            <DataTable.Title>Category</DataTable.Title>
                            <DataTable.Title>Difficulty</DataTable.Title>
                        </DataTable.Header>

                        {items.slice(from, to).map((item, index) => (
                            <DataTable.Row key={index}>
                                <DataTable.Cell style={{ width: 250 }}>{item.phraseology}</DataTable.Cell>
                                <DataTable.Cell>{item.type}</DataTable.Cell>
                                <DataTable.Cell>{item.category}</DataTable.Cell>
                                <DataTable.Cell>{item.difficultyLevel}</DataTable.Cell>
                            </DataTable.Row>
                        ))}

                        <DataTable.Pagination
                            style={{ marginVertical: 20, justifyContent: 'flex-start' }}
                            page={page}
                            numberOfPages={Math.ceil(items.length / itemsPerPage)}
                            onPageChange={(page) => setPage(page)}
                            label={`${from + 1}-${to} of ${items.length}`}
                            numberOfItemsPerPageList={numberOfItemsPerPageList}
                            numberOfItemsPerPage={itemsPerPage}
                            onItemsPerPageChange={onItemsPerPageChange}
                            showFastPaginationControls
                            selectPageDropdownLabel={'Rows per page'}
                        />
                    </DataTable>
                </ScrollView>}
    </ScrollView>;
};

const styles = {
    container: {
        maxHeight: 400,
    }
};