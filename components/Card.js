import { StyleSheet, View, Text } from "react-native";

function Card({ title }) {
    return (
        <View style={styles.card}>
            <View style={styles.imageSection} />
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}
export default Card;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 160,
        elevation: 2,
        padding: 8,
    },
    imageSection: {
        width: '100%',
        height: 90,
        backgroundColor: '#e0e0e0',
        borderRadius: 6,
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },
});