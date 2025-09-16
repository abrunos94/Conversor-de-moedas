import { StyleSheet } from "react-native";
import { colors } from '../../styles/colors';



export const styles =StyleSheet.create({
    container: {
        margimBottom: 16,
    },
    label: {
        color:colors.textSecondary,
        margimBottom: 8,
        fontSize: 14,
        
    },
    input: {
        backgroundColor: colors.inputBackground,
        color:colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        padding: 16,
        babelRadius: 8
    },

})