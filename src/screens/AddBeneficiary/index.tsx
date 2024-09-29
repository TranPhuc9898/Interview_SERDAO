// src/screens/AddBeneficiaryScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useStore } from '@store';
import { Formik } from 'formik';
import * as Yup from 'yup';
import IBAN from 'iban';
import { TextInput, Button, Text } from 'react-native-paper';

const AddBeneficiaryScreen = ({ navigation }) => {
  const addBeneficiary = useStore(state => state.addBeneficiary);

  const BeneficiarySchema = Yup.object().shape({
    firstName: Yup.string().required('Vui lòng nhập tên'),
    lastName: Yup.string().required('Vui lòng nhập họ'),
    iban: Yup.string().required('Vui lòng nhập IBAN'),
  });

  const generateIBAN = () => {
    const countryCode = 'GB';
    const bankIdentifiers = ['NWBK', 'BARC', 'LOYD', 'HSBC']; // Danh sách mã ngân hàng hợp lệ

    const bankIdentifier =
      bankIdentifiers[Math.floor(Math.random() * bankIdentifiers.length)];
    const branchCode = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0'); // 6 chữ số
    const accountNumber = Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, '0'); // 8 chữ số

    const bban = bankIdentifier + branchCode + accountNumber;

    try {
      const iban = IBAN.fromBBAN(countryCode, bban);
      return iban;
    } catch (error) {
      console.error('Error generating IBAN:', error);
      return generateIBAN(); // Thử lại nếu gặp lỗi
    }
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ firstName: '', lastName: '', iban: '' }}
        validationSchema={BeneficiarySchema}
        onSubmit={values => {
          const newBeneficiary = {
            id: Date.now(),
            firstName: values.firstName,
            lastName: values.lastName,
            iban: values.iban,
          };
          addBeneficiary(newBeneficiary);
          navigation.goBack();
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
            <TextInput
              label="Tên"
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              mode="outlined"
              error={touched.firstName && !!errors.firstName}
              style={styles.input}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}

            <TextInput
              label="Họ"
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              mode="outlined"
              error={touched.lastName && !!errors.lastName}
              style={styles.input}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}

            <TextInput
              label="IBAN"
              onChangeText={handleChange('iban')}
              onBlur={handleBlur('iban')}
              value={values.iban}
              mode="outlined"
              error={touched.iban && !!errors.iban}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon="close"
                  onPress={() => {
                    setFieldValue('iban', '');
                  }}
                />
              }
            />
            {touched.iban && errors.iban && (
              <Text style={styles.errorText}>{errors.iban}</Text>
            )}

            {/* Nút để sinh IBAN */}
            <Button
              mode="outlined"
              onPress={() => {
                const newIBAN = generateIBAN();
                setFieldValue('iban', newIBAN);
              }}
              style={styles.generateButton}
            >
              Tạo IBAN tự động
            </Button>

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              Thêm Beneficiary
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  generateButton: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default AddBeneficiaryScreen;
