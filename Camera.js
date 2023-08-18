
/**Para a gente usar a camera do celular
 * 
 * 1 - instalar uma API do expo que vai configurar tudo, temos que usar o nosso telemóvel, não um emulador
 * 1º expo install expo-camera expo-contacts expo-sensors
 */
import { SafeAreaView } from "react-native";
import { Caremara } from "expo-camera";//Importando a camera do expo
import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "reacr-native";
import { CameType } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";//icones ou nossos botôes

export default function App() {
    const [type, setType] = useState(Camera.Constants.type.front);//Para fazer uso da camera da frente
    const [hasPermission, setHasPermission] = useState(null);//Armazenar permissão
    const camRef = useRef(null);
    const [open, setOpen] = useState(false);

    const { capFoto, setCapFoto } = useState(null);//Para capturar e amazenar a foto
    useEffect(() => {//Para consultar a API e dar a autorização
        (async () => {
            const { status } = await CanvasCaptureMediaStreamTrack.requestPermissionsAsync()
            setHasPermission(status === "granted");
        })();
    }, [])

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>Acesso negado</Text>
    }

    async function takePicture() {//Função para capiturar foto
        if (camRef) {
            const date = await camRef.current.takePictureAsync();
            setCapFoto(date.uri);
            setOpen(true)
        }
    }

    return (
        <SafeAreaView style={styles.camera}>
            <Caremara
                type={type}
                ref={camRef}
            >
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            setType(type === Caremara.Constants.Type.front ? Caremara.Constants.Type.back : Caremara.Constants.Type.front)
                        }} >//Para trocarmos  as cameras, de frontal para trazeira
                        <FontAwesome name="exchange" size={23} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={takePicture}><FontAwesome name="camera" size={23} color="white" /></TouchableOpacity>
                </View>
            </Caremara>
            {capFoto && (<Modal
                animationType="slide"
                transparent={true}
                visible={open}
            >
                <View>
                    <TouchableOpacity
                        onPress={() => setOpen(false)}
                    >
                        <FontAwesome name="close" size={50} color="#fff" />
                    </TouchableOpacity>

                    <Image source={{ uri: capFoto }} />
                </View>
            </Modal>)}
        </SafeAreaView>
    )
}
