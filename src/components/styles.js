import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },

    add: {
        flexDirection: 'row',
        height: 40,
        marginBottom: 30,
        alignItems: "center",
        justifyContent: 'center',
    },

    delete: {
        flexDirection: 'row',
        marginBottom: 30,
        height: 40,
        alignItems: "center",
        justifyContent: 'center',
    },

    update: {
        flexDirection: 'row',
        marginBottom: 80,
        height: 40,
        width: 90,
        alignItems: "center",
        justifyContent: 'center',
        gap: -10,
    },
    buttonContainer: {
        flexDirection: 'row',  // Arrange buttons horizontally
        justifyContent: 'space-evenly',  // Evenly space buttons
        marginTop: 20,  // Add margin for separation from other elements
        bottom: 20
    },
    button: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 35,
        width: '85%',
        alignSelf: 'center', // Center horizontally
        padding: 20,
        borderRadius: 80,
        alignItems: "center",
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },

    textInput: {
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 50,
        paddingHorizontal: 50,
        marginBottom: 10,
        alignSelf: 'center',
        marginTop: 20,
    },
    textDescription: {
        height: 200,
        width: 200,
        borderColor: 'gray',
        padding: 10,
        alignSelf: 'center',
        borderWidth: 3,
        borderRadius: 20,
        paddingHorizontal: 50,
    },

});

export default styles;