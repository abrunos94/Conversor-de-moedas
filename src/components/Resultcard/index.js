import { Text, View } from "react-native";
import { styles } from "./style";



export function ResultCard({
    exchangeRate,
    result,
    fromCurrency,
    toCurrency,
    currencies,
}) {

    if (!result || !exchangeRate) return null

    const toSymbol = currencies.find(curreny => curreny.code === toCurrency).symbol



    return (
        <View style={styles.container}>
            <Text style={styles.label} >Resultado: </Text>
            <Text style={styles.amount}>
                {toSymbol} {result}
            </Text>
            <Text style={styles.rate}>
                Taxa de câmbio 1: {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </Text>

        </View>
    )

}