import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useStore } from '@store';

const HomeScreen: React.FC<any> = ({ navigation }) => {
  // Languages
  const { t } = useTranslation();
  // Store
  const balance = useStore(state => state.balance);
  const transactions = useStore(state => state.transactions);
  const beneficiaries = useStore(state => state.beneficiaries);

  // Lấy danh sách 5 giao dịch gần nhất
  const recentTransactions = transactions.slice(0, 5);

  return (
    <View style={styles.container} testID="Home">
      <Text style={styles.balanceText}>
        {t('balance')}: {balance.toFixed(2)} VND
      </Text>

      <Button
        testID="buttonAddBeneficiary"
        mode="contained"
        onPress={() => navigation.navigate('AddBeneficiary')}
        style={styles.button}
      >
        {t('addBeneficiary')}
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Transaction')}
        style={styles.button}
      >
        {t('makeTransaction')}
      </Button>

      <Text style={styles.heading} testID={t('recentTransactions')}>
        {t('recentTransactions')}
      </Text>

      <FlatList
        data={recentTransactions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          const beneficiary = beneficiaries.find(
            b => b.id === item.beneficiaryId,
          );
          return (
            <Card style={styles.card}>
              <Card.Content>
                <Text>
                  {t('to')}:{'  '}
                  {beneficiary
                    ? `${beneficiary.firstName} ${beneficiary.lastName}`
                    : 'N/A'}
                </Text>
                <Text>
                  {t('amount')}: {item.amount.toFixed(2)} VND
                </Text>
                <Text>
                  {t('date')}: {new Date(item.date).toLocaleString()}
                </Text>
              </Card.Content>
            </Card>
          );
        }}
        ListEmptyComponent={<Text>{t('noTransactions')}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  balanceText: {
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    marginBottom: 8,
  },
  heading: {
    fontSize: 20,
    marginVertical: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff', // Màu nền của Card
    borderWidth: 1, // Thêm viền
    borderColor: '#e0e0e0', // Màu viền
    // Loại bỏ các thuộc tính bóng
    elevation: 0, // Không dùng bóng trên Android
    shadowColor: 'transparent', // Không dùng bóng trên iOS
  },
  beneficiaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  amountText: {
    fontSize: 14,
    color: '#28a745', // Màu xanh cho số tiền
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});

export default HomeScreen;
