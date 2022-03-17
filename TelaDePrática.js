import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Keyboard, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TelaDePrática({ tabuada, setModalVisible }) {
    const [resposta, setResposta] = useState();
    const [resultado, setResultado] = useState();
    const [acertos, setAcertos] = useState(0);
    const [erros, setErros] = useState(0);
    const [primeiroFator, setPrimeiroFator] = useState();
    const [segundoFator, setSegundoFator] = useState();
    const [exercícioAtual, setExercícioAtual] = useState(0);
    const [textoDoBotãoVerificar, setTextoDoBotãoVerificar] = useState('VERIFICAR');
    const [verificarPressableBackgroundColor, setVerificarPressableBackgroundColor] = useState('#717171');
    const [verificarPressableDisabled, setVerificarPressableDisabled] = useState(false);
    const [alturaELarguraDaTelaFinal, setAlturaELaguraDaTelaFinal] = useState({ height: 0, width: 0});

    const exercícios = [
        {
            primeiroFator: tabuada,
            segundoFator: 1
        },
        {
            primeiroFator: tabuada,
            segundoFator: 2
        },
        {
            primeiroFator: tabuada,
            segundoFator: 3
        },
        {
            primeiroFator: tabuada,
            segundoFator: 4
        },
        {
            primeiroFator: tabuada,
            segundoFator: 5
        },
        {
            primeiroFator: tabuada,
            segundoFator: 6
        },
        {
            primeiroFator: tabuada,
            segundoFator: 7
        },
        {
            primeiroFator: tabuada,
            segundoFator: 8
        },
        {
            primeiroFator: tabuada,
            segundoFator: 9
        },
        {
            primeiroFator: tabuada,
            segundoFator: 10
        }
    ];

    function fecharTelaPrática() {
        setModalVisible(false);
    };
    
    function verificarResposta() {
        if (textoDoBotãoVerificar === 'VERIFICAR') {
            if (resposta == primeiroFator * segundoFator) {
                setResultado('Acertou!');
                setAcertos(acertos + 1);
                setTextoDoBotãoVerificar('PRÓXIMO');
            } else {
                setResultado(`Errou! A resposta correta é ${primeiroFator * segundoFator}.`);
                setErros(erros + 1);
                setTextoDoBotãoVerificar('PRÓXIMO');
            }
        } else {
            if (exercícioAtual < exercícios.length - 1) {
                setVerificarPressableBackgroundColor('#717171');
                setVerificarPressableDisabled(true);
                setResposta();
                setResultado();
                setExercícioAtual(exercícioAtual + 1);
                setPrimeiroFator(exercícios[exercícioAtual].primeiroFator);
                setSegundoFator(exercícios[exercícioAtual].segundoFator);
                setTextoDoBotãoVerificar('VERIFICAR');
            } else {
                Keyboard.dismiss();
                setTextoDoBotãoVerificar('FINALIZAR');
                setAlturaELaguraDaTelaFinal({ height: '100%', width: '100%' });
            }
        }
    };

    function onChangeText(text) {
        if (!text) {
            setVerificarPressableBackgroundColor('#717171');
            setVerificarPressableDisabled(true);
        } else {
            setVerificarPressableBackgroundColor();
            setVerificarPressableDisabled(false);
        };
        setResposta(text);
    }

    useEffect(() => {
        setPrimeiroFator(exercícios[exercícioAtual].primeiroFator);
        setSegundoFator(exercícios[exercícioAtual].segundoFator);
    });

    return (
        <View style={styles.contêinerView}>
            <View style={styles.cabeçalhoView}>
                <Pressable 
                    style={styles.closePressable}
                    onPress={fecharTelaPrática}
                >
                    <MaterialIcons name='close' size={40} color='#B9BBBD' />
                </Pressable>
                <Text style={styles.títuloDoCabeçalhoText}>
                    {'Acerte 20 exercícios para concluir o desafio'}
                </Text>
            </View>
            <View style={styles.progressoView}>
                <Text style={styles.progressoText}>{`Progresso: ${exercícioAtual + 1}/${exercícios.length}`}</Text>
            </View>
            <View style={styles.exercícioView}>
                <Text style={styles.exercícioText}>{`Quanto é ${primeiroFator} x ${segundoFator}?`}</Text>
            </View>
            <TextInput
                style={styles.respostaTextInput}
                placeholder='Digite aqui sua resposta'
                onChangeText={onChangeText}
                value={resposta}
                keyboardType='number-pad'
            />
            <View style={styles.resultadoView}>
                <Text style={styles.resultadoText}>{resultado}</Text>
            </View>
            <Pressable 
                style={[styles.verificarPressable, { backgroundColor: verificarPressableBackgroundColor }]}
                disabled={verificarPressableDisabled}
                onPress={verificarResposta}
            >
                <Text style={styles.verificarText}>{textoDoBotãoVerificar}</Text>
            </Pressable>
            <View style={[styles.telaFinalView, alturaELarguraDaTelaFinal]}>
                <View style={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Text style={styles.títuloTelaFinalText}>{'Parabéns por concluir os exercícios'}</Text>
                    <Text style={styles.acertosTelaFinalText}>{`Acertos: ${acertos}/${exercícios.length}`}</Text>
                </View>
                <Pressable
                    style={styles.voltarParaTelaInicialPressable}
                    onPress={() => setModalVisible(false)}
                >
                    <Text style={styles.voltarParaTelaInicialText}>{'VOLTAR PARA TELA INICIAL'}</Text>
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    contêinerView: {
        flex: 1,
        backgroundColor: '#0D1117'
    },
    cabeçalhoView: {
        flexDirection: 'row',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#B9BBBD',
        marginHorizontal: 30
    },
    closePressable: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    títuloDoCabeçalhoText: {
        marginHorizontal: 30,
        fontSize: 27,
        fontWeight: 'bold',
        color: '#B9BBBD'
    },
    progressoView: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginHorizontal: 20
    },
    progressoText: {
        color: '#B9BBBD',
        fontSize: 24,
        fontWeight: '700'
    },
    exercícioView: {
        height: 80,
        justifyContent: 'center',
        marginHorizontal: 20
    },
    exercícioText: {
        color: '#B9BBBD',
        fontSize: 28,
        fontWeight: 'bold'
    },
    respostaTextInput: {
        backgroundColor: '#2F2F2F',
        height: 150,
        fontSize: 28,
        color: '#B9BBBD',
        marginHorizontal: 20,
        padding: 20,
        borderWidth: 2,
        borderColor: '#B9BBBD',
        borderRadius: 45
    },
    resultadoView: {
        height: 70,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultadoText: {
        color: '#B9BBBD',
        fontSize: 27,
        fontWeight: 'bold'
    },
    verificarPressable: {
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        borderWidth: 2,
        borderColor: '#B9BBBD',
        borderRadius: 45
    },
    verificarText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#B9BBBD'
    },
    telaFinalView: {
        position: 'absolute',
        backgroundColor: '#0D1117',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    títuloTelaFinalText: {
        marginHorizontal: 30,
        fontSize: 27,
        fontWeight: 'bold',
        color: '#B9BBBD'
    },
    voltarParaTelaInicialPressable: {
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        borderWidth: 2,
        borderColor: '#B9BBBD',
        borderRadius: 45
    },
    voltarParaTelaInicialText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#B9BBBD'
    },
    acertosTelaFinalText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#B9BBBD'
    }
})