// src/screens/TransactionScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useStore } from '@store';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput, Button, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

const TransactionScreen: React.FC<any> = ({ navigation }) => {
  // Languages
  const { t } = useTranslation();
  // Store
  const beneficiaries = useStore(state => state.beneficiaries);
  const addTransaction = useStore(state => state.addTransaction);
  const balance = useStore(state => state.balance);

  const TransactionSchema = Yup.object().shape({
    beneficiaryId: Yup.number().required(t('choosenBeneficiary')),
    amount: Yup.number()
      .required(t('pleaseEnterAmount'))
      .positive(t('textErrorAmount'))
      .max(balance, t('insufficientBalance')),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ beneficiaryId: '', amount: '' }}
        validationSchema={TransactionSchema}
        onSubmit={values => {
          const newTransaction = {
            id: Date.now(),
            beneficiaryId: Number(values.beneficiaryId),
            amount: Number(values.amount),
            date: new Date().toISOString(),
          };
          addTransaction(newTransaction);
          navigation.navigate('HomeScreen');
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <Text>{t('choosenBeneficiary')}</Text>
            <Picker
              selectedValue={values.beneficiaryId}
              onValueChange={itemValue =>
                setFieldValue('beneficiaryId', itemValue)
              }
            >
              <Picker.Item label={t('choosenBeneficiary')} value="" />
              {beneficiaries.map(b => (
                <Picker.Item
                  key={b.id}
                  label={`${b.firstName} ${b.lastName}`}
                  value={b.id}
                />
              ))}
            </Picker>
            {touched.beneficiaryId && errors.beneficiaryId && (
              <Text style={styles.errorText}>{errors.beneficiaryId}</Text>
            )}

            <TextInput
              label={t('amount')}
              onChangeText={handleChange('amount')}
              onBlur={handleBlur('amount')}
              value={values.amount}
              mode="outlined"
              keyboardType="numeric"
              error={touched.amount && !!errors.amount}
              style={styles.input}
            />
            {touched.amount && errors.amount && (
              <Text style={styles.errorText}>{errors.amount}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
            >
              {t('transferMoney')}
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
});

export default TransactionScreen;
