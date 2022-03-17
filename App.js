import { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Text, FlatList, Pressable, Modal, Alert } from 'react-native';
import TelaDePrática from './TelaDePrática';

const TABUADAS = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

export default function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [tabuadaParaPraticar, setTabuadaParaPraticar] = useState();

    const TabuadaPressable = ({ item }) => {
        return (
            <Pressable
                style={styles.tabuadaPressable}
                onPress={() => {
                    setTabuadaParaPraticar(item);
                    setModalVisible(true);
                }}
            >
                <Text style={styles.títuloDaTabuadaText}>{item}</Text>
            </Pressable>
        )
    }

    return (
        <SafeAreaView style={styles.contêinerView}>
            <StatusBar translucent={true} />
            <View style={styles.cabeçalhoView}>
                <Text style={styles.títuloDoCabeçalhoText}>{'Escolha uma tabuada para praticar'}</Text>
            </View>
            <View>
                <FlatList
                    data={TABUADAS}
                    contentContainerStyle={styles.flatListContentContainerStyle}
                    renderItem={TabuadaPressable}
                    keyExtractor={item => item}
                />
            </View>
            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Atenção', 'Se optar por sair agora, perderá seu progresso.', [
                        { text: 'sair', style: 'cancel', onPress: () => setModalVisible(false) },
                        { text: 'continuar praticando' }
                    ])
                }}
            >
                <TelaDePrática 
                    tabuada={tabuadaParaPraticar} 
                    setModalVisible={setModalVisible}
                />
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contêinerView: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#0D1117'
    },
    cabeçalhoView: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#B9BBBD',
        marginHorizontal: 30
    },
    títuloDoCabeçalhoText: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#B9BBBD'
    },
    flatListContentContainerStyle: {
        margin: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    tabuadaPressable: {
        width: 120,
        height: 120,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#B9BBBD',
        borderRadius: 45
    },
    títuloDaTabuadaText: {
        fontSize: 50,
        fontWeight: '600',
        color: '#B9BBBD'
    }
})
