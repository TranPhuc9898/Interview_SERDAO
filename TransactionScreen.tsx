import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useTransactions } from './TransactionContext';

const TransactionScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');
  const { addTransaction } = useTransactions();

  const handleTransaction = () => {
    const accountDetails = { name, iban };
    addTransaction(amount, accountDetails); // Kiểm tra thêm nếu cần truyền tham số đúng
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Recipient Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setIban}
        value={iban}
        placeholder="Recipient IBAN"
      />
      <Button title="Submit Transaction" onPress={handleTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 8,
    paddingHorizontal: 10,
  },
});

export default TransactionScreen;
