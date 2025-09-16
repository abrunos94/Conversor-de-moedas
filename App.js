
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from './src/components/Button';
import { styles } from './app.style';
import { currencies } from './src/constants/currencies';
import { Input } from './src/components/input';
import { ResultCard } from './src/components/Resultcard';
import { exchangeRateApi } from './src/services/api';
import { useState } from 'react';
import { convertCurrency } from './src/services/utils/convertCurrency';
import { ActivityIndicator } from 'react-native';


export default function App() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [Tocurrency, setToCurrency] = useState('BRL')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(null)


  async function fetchExchangeRate() {

    try {
      setLoading
      if (!amount) return
      const data = await exchangeRateApi(fromCurrency)
      const rate = data.rates[Tocurrency]
      setExchangeRate(rate)
      const convertedAmount = convertCurrency(amount, rate)

      setResult(convertedAmount)

    } catch (err) {
      alert("Erro, tente novamente")
    } finally {
      setLoading(true)
    }

  }

  function swapCurrency() {
    setFromCurrency(Tocurrency)
    setToCurrency(fromCurrency)
    setResult ('')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <StatusBar style="auto" />

          <View style={styles.header}>
            <Text style={styles.title}>Conversor de moedas</Text>
            <Text style={styles.subTitle}>
              Converta valores entre diferente moedas.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>De:</Text>
            <View style={styles.currencyGrid}>
              {currencies.map((currency) => (
                <Button variant='primary'
                  key={currency.code}
                  currency={currency}
                  onPress={() => setFromCurrency(currency.code)}
                  isSelected={fromCurrency === currency.code}
                >


                </Button>
              ))}

            </View>
            <Input label="Valor: " value={amount} onChangeText={setAmount} />

            <TouchableOpacity style={styles.swapButton} onPress={swapCurrency}>
              <Text style={styles.swapButtonText}>
                ↑↓
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}> Para:  </Text>
            <View style={styles.currencyGrid}>
              {currencies.map((currency) => (
                <Button variant='secondary'
                  key={currency.code}
                  currency={currency}
                  onPress={() => setToCurrency(currency.code)}
                  isSelected={Tocurrency === currency.code}
                >
                </Button>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.convertButton, (!amount || loading) && styles.convertButtonDisabled]}
              onPress={fetchExchangeRate}
              disabled={!amount || loading}
            >
              {loading ? (
                <ActivityIndicator color="White" />
              ) : (
                <Text style={styles.swapButtonText}>
                  Converter
                </Text>
              )}
            </TouchableOpacity>


            <ResultCard
              exchangeRate={exchangeRate}
              result={result}
              fromCurrency={fromCurrency}
              toCurrency={Tocurrency}
              currencies={currencies}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  );
}

